import React from 'react';
import Reflux from 'reflux';
import {History} from 'react-router';
import Cookies from 'js-cookie';
import Sticky from 'react-sticky';
import classNames from 'classnames';
import _ from 'underscore';
import ApiMixin from '../mixins/apiMixin';
import GroupStore from '../stores/groupStore';
import LoadingError from '../components/loadingError';
import LoadingIndicator from '../components/loadingIndicator';
import Pagination from '../components/pagination';
import StreamGroup from '../components/stream/group';
import StreamActions from './stream/actions';
import StreamTagActions from '../actions/streamTagActions';
import StreamTagStore from '../stores/streamTagStore';
import StreamFilters from './stream/filters';
import StreamSidebar from './stream/sidebar';
import GroupOverlay from './stream/groupOverlay';
import utils from '../utils';
import parseLinkHeader from '../utils/parseLinkHeader';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SDKInstallWizard from '../components/sdkInstallWizard';

import {t} from '../locale';

const Stream = React.createClass({
  propTypes: {
    setProjectNavSection: React.PropTypes.func
  },

  mixins: [
    Reflux.listenTo(GroupStore, 'onGroupChange'),
    Reflux.listenTo(StreamTagStore, 'onStreamTagChange'),
    History,
    ApiMixin
  ],

  getDefaultProps() {
    return {
      // intentional trailing whitespace / better UX for when uesrs focus on search input
      defaultQuery: 'is:unresolved ',
      defaultSort: 'date',
      defaultStatsPeriod: '24h',
      maxItems: 25
    };
  },

  getInitialState() {
    return {
      groupIds: [],
      selectAllActive: false,
      multiSelected: false,
      anySelected: false,
      statsPeriod: this.props.defaultStatsPeriod,
      realtimeActive: false,
      pageLinks: '',
      loading: true,
      error: false,
      query: this.props.defaultQuery,
      sort: this.props.defaultSort,
      filter: {},
      tags: StreamTagStore.getAllTags(),
      tagsLoading: true,
      isSidebarVisible: false,
      isStickyHeader: false,
      overlayId: null,
      showWizard: this.props.location.state && this.props.location.state.isNew,
      ...this.getQueryStringState()
    };
  },

  componentWillMount() {
    this.props.setProjectNavSection('stream');

    this._streamManager = new utils.StreamManager(GroupStore);
    this._poller = new utils.CursorPoller({
      success: this.onRealtimePoll
    });

    let realtime = Cookies.get('realtimeActive');
    if (realtime) {
      let realtimeActive = realtime === 'true';
      this.setState({
        realtimeActive: realtimeActive
      });
    }

    this.fetchTags();
    this.fetchData();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.setState(this.getQueryStringState(nextProps), this.fetchData);
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.state, nextState, true);
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.realtimeActive !== this.state.realtimeActive) {
      // User toggled realtime button
      if (this.state.realtimeActive) {
        this.resumePolling();
      } else {
        this._poller.disable();
      }
    }
  },

  componentDidMount() {
    // 只需isNew 时只需一次提示
    if (this.props.location.state && this.props.location.state.isNew) {
      this.history.replaceState(null, window.location.pathname);
    }
  },

  componentWillUnmount() {
    this._poller.disable();
    GroupStore.reset();
  },

  fetchTags() {
    StreamTagStore.reset();
    StreamTagActions.loadTags();

    this.setState({
      tagsLoading: true
    });

    let params = this.props.params;
    this.api.request(`/projects/${params.orgId}/${params.projectId}/tags/`, {
      success: (tags) => {
        this.setState({tagsLoading: false});
        StreamTagActions.loadTagsSuccess(tags);
      },
      error: (error) => {
        this.setState({tagsLoading: false});
        StreamTagActions.loadTagsError();
      }
    });
  },

  getQueryStringState(props) {
    props = props || this.props;
    let currentQuery = props.location.query;

    let filter = {};
    if (currentQuery.bookmarks) {
      filter = {bookmarks: '1'};
    } else if (currentQuery.assigned) {
      filter = {assigned: '1'};
    }

    let query =
      currentQuery.hasOwnProperty('query') ?
      currentQuery.query :
      this.props.defaultQuery;

    let sort =
      currentQuery.hasOwnProperty('sort') ?
      currentQuery.sort :
      this.props.defaultSort;

    let statsPeriod =
      currentQuery.hasOwnProperty('statsPeriod') ?
      currentQuery.statsPeriod :
      this.props.defaultStatsPeriod;

    if (statsPeriod !== '14d' && statsPeriod !== '24h') {
      statsPeriod = this.props.defaultStatsPeriod;
    }

    return {
      filter: filter,
      query: query,
      sort: sort,
      statsPeriod: statsPeriod
    };
  },

  fetchData() {
    GroupStore.loadInitialData([]);

    this.setState({
      loading: true,
      error: false
    });

    let url = this.getGroupListEndpoint();

    let requestParams = {
      ...this.props.location.query,
      limit: this.props.maxItems,
      statsPeriod: this.state.statsPeriod
    };

    if (!requestParams.hasOwnProperty('query')) {
      requestParams.query = this.props.defaultQuery;
    }

    if (this.lastRequest) {
      this.lastRequest.cancel();
    }

    this._poller.disable();

    this.lastRequest = this.api.request(url, {
      method: 'GET',
      data: requestParams,
      success: (data, ignore, jqXHR) => {
        // Was this the result of an event SHA search? If so, redirect
        // to corresponding group details
        if (data.length === 1 && /^[a-zA-Z0-9]{32}$/.test(requestParams.query.trim())) {
          let params = this.props.params;
          let groupId = data[0].id;

          return void this.history.pushState(null, `/${params.orgId}/events/${params.projectId}/${groupId}/`);
        }

        this._streamManager.push(data);

        this.setState({
          error: false,
          loading: false,
          pageLinks: jqXHR.getResponseHeader('Link')
        });
      },
      error: () => {
        this.setState({
          error: true,
          loading: false
        });
      },
      complete: (jqXHR) => {
        this.lastRequest = null;

        this.resumePolling();
      }
    });
  },

  resumePolling() {
    if (!this.state.pageLinks)
      return;

    // Only resume polling if we're on the first page of results
    let links = parseLinkHeader(this.state.pageLinks);
    if (links && !links.previous.results && this.state.realtimeActive) {
      this._poller.setEndpoint(links.previous.href);
      this._poller.enable();
    }
  },

  getGroupListEndpoint() {
    let params = this.props.params;

    return '/projects/' + params.orgId + '/' + params.projectId + '/issues/';

  },


onRealtimeChange(realtime) {
    Cookies.set('realtimeActive', realtime.toString());
    this.setState({
      realtimeActive: realtime
    });
  },

  onSelectStatsPeriod(period) {
    if (period != this.state.statsPeriod) {
      // TODO(dcramer): all charts should now suggest "loading"
      this.setState({
        statsPeriod: period
      }, function() {
        this.transitionTo();
      });
    }
  },

  onRealtimePoll(data, links) {
    this._streamManager.unshift(data);
    if (!utils.valueIsEqual(this.state.pageLinks, links, true)) {
      this.setState({
        pageLinks: links,
      });
    }
  },

  onGroupChange() {
    let groupIds = this._streamManager.getAllItems().map((item) => item.id);
    if (!utils.valueIsEqual(groupIds, this.state.groupIds)) {
      this.setState({
        groupIds: groupIds
      });
    }
  },

  onStreamTagChange(tags) {
    // new object to trigger state change
    this.setState({
      tags: {...tags}
    });
  },

  onSearch(query) {
    this.setState({
      query: query
    }, this.transitionTo);
  },

  onSortChange(sort) {
    this.setState({
      sort: sort
    }, this.transitionTo);
  },

  onFilterChange(filter) {
    this.setState({
      filter: filter
    }, this.transitionTo);
  },

  onSidebarToggle() {
    this.setState({
      isSidebarVisible: !this.state.isSidebarVisible
    });
  },

  onStickyStateChange(state) {
    this.setState({
      isStickyHeader: state
    });
  },

  transitionTo() {
    let queryParams = {};

    for (let prop in this.state.filter) {
      queryParams[prop] = this.state.filter[prop];
    }

    if (this.state.query !== this.props.defaultQuery) {
      queryParams.query = this.state.query;
    }

    if (this.state.sort !== this.props.defaultSort) {
      queryParams.sort = this.state.sort;
    }

    if (this.state.statsPeriod !== this.props.defaultStatsPeriod) {
      queryParams.statsPeriod = this.state.statsPeriod;
    }

    let params = this.props.params;
    this.history.pushState(null, `/${params.orgId}/events/${params.projectId}/`, queryParams);
  },

  renderGroupNodes(ids, statsPeriod) {
    let {orgId, projectId} = this.props.params;
    let groupNodes = ids.map((id) => {
      return (
        <StreamGroup
          key={id}
          id={id}
          orgId={orgId}
          projectId={projectId}
          active={this.state.overlayId === id}
          onSelectect={this.selectGroup}
          statsPeriod={statsPeriod} />
      );
    });

    return (<ul className="group-list" ref="groupList">{groupNodes}</ul>);
  },

  selectGroup(groupId) {
    console.log('groupId:',groupId);
    this.setState({
      overlayId: this.state.overlayId === groupId ? null : groupId
    });
  },

  renderEmpty() {
    return (
      <div className="box empty-stream">
        <span className="icon icon-exclamation"></span>
        <p>{t('Sorry, no events match your filters.')}</p>
      </div>
    );
  },

  renderLoading() {
    return (
      <div className="box">
        <LoadingIndicator />
      </div>
    );
  },

  renderStreamBody() {
    let body;

    if (this.state.loading) {
      body = this.renderLoading();
    } else if (this.state.error) {
      body = (<LoadingError onRetry={this.fetchData} />);
    } else if (this.state.groupIds.length > 0) {
      body = this.renderGroupNodes(this.state.groupIds, this.state.statsPeriod);
    } else {
      body = this.renderEmpty();
    }

    return body;
  },

  closeHandler() {
    this.setState({
      overlayId:null
    });
  },

  renderOverlay() {
    if(this.state.overlayId){
      return (
        <GroupOverlay
          closeHandler={this.closeHandler}
          groupId={this.state.overlayId}
          params={this.props.params}>
        </GroupOverlay>
      );
    }
  },

  render() {

    let params = this.props.params;
    let classes = ['stream-row'];
    let {orgId, projectId} = this.props.params;
    if (this.state.isSidebarVisible)
      classes.push('show-sidebar');

    // todo: 需要支持<下次不提醒>
    let showWizard = this.state.showWizard;

    //todo:临时调试用
    if(!!(this.props.location.query && typeof this.props.location.query.wizard === 'string')){
      showWizard = true;
    }

    // todo: wizard 任务往后推移
    showWizard = false;

    return (
      <div className={classNames(classes)}>

        { showWizard && (
          <SDKInstallWizard
            projectId={projectId}
            onHide={() => this.setState({isNew:false})}
            org={orgId}/>
        ) }

        <div className="stream-content">
          <StreamFilters
            orgId={orgId}
            projectId={projectId}
            query={this.state.query}
            sort={this.state.sort}
            tags={this.state.tags}
            defaultQuery={this.props.defaultQuery}
            onSortChange={this.onSortChange}
            onFilterChange={this.onFilterChange}
            onSearch={this.onSearch}
            onSidebarToggle={this.onSidebarToggle}
            isSearchDisabled={this.state.isSidebarVisible}
          />
          <div className="group-header">
            <Sticky onStickyStateChange={this.onStickyStateChange}>
              <div className={this.state.isStickyHeader ? 'container' : null}>
                <StreamActions
                  orgId={params.orgId}
                  projectId={params.projectId}
                  query={this.state.query}
                  onSelectStatsPeriod={this.onSelectStatsPeriod}
                  onRealtimeChange={this.onRealtimeChange}
                  realtimeActive={this.state.realtimeActive}
                  statsPeriod={this.state.statsPeriod}
                  groupIds={this.state.groupIds} />
              </div>
            </Sticky>
          </div>
          {this.renderStreamBody()}
          <ReactCSSTransitionGroup
            transitionName="streamOverlay"
            component="div"
            className="streamOverlay-ani"
            transitionEnterTimeout={400}
            transitionLeaveTimeout={300}
          >
          {this.renderOverlay()}
          </ReactCSSTransitionGroup>
          <Pagination pageLinks={this.state.pageLinks}/>
        </div>
        <StreamSidebar
          loading={this.state.tagsLoading}
          tags={this.state.tags}
          query={this.state.query}
          onQueryChange={this.onSearch}
          orgId={params.orgId}
          projectId={params.projectId}
          />
      </div>
    );
  }

});

export default Stream;
