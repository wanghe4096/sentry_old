/**
 * Title: groupOverlay.js
 * Author: bold
 * Date: 12/28/15.
 * Description: 。
 */



import React from 'react';
import Reflux from 'reflux';
import ApiMixin from '../../mixins/apiMixin';
import EventEntries from '../../components/events/eventEntries';
import GroupEventToolbar from '../groupDetails/eventToolbar';
import GroupSidebar from '../../components/group/sidebar';
//import GroupState from '../../mixins/groupState';
import GroupStore from '../../stores/groupStore';
import MutedBox from '../../components/mutedBox';
import LoadingError from '../../components/loadingError';
import PropTypes from '../../proptypes';
import LoadingIndicator from '../../components/loadingIndicator';
import {t} from '../../locale';


const GroupEventDetails = React.createClass({
  mixins: [
    ApiMixin
  ],

  childContextTypes: {
    group: PropTypes.Group,
    inOverlay:React.PropTypes.bool
  },

  getChildContext() {
    return {
      group: this.state.group,
      inOverlay:true
    };
  },

  getInitialState() {
    return {
      loading: true,
      error: false,
      event: null,
      group: GroupStore.get(this.props.groupId),
      eventNavLinks: ''
    };
  },

  componentWillMount() {
    this.fetchData();
  },

  componentWillReceiveProps(x) {
    //this.setState({
    //  loading: true
    //})
  },

  componentWillUpdate() {
    //this.fetchData();
  },

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.groupId !== this.props.groupId) {
      this.fetchData();
    }
  },

  fetchData() {
    // todo: 搞清楚什么是 group,什么是 event
    let url = '/issues/' + this.props.groupId + '/events/oldest/';

    this.setState({
      loading: true,
      error: false
    });

    this.api.request(url, {
        success: (data, _, jqXHR) => {
        this.setState({
        event: data,
        error: false,
        loading: false
      });
          window.sss = this.state;

    this.api.bulkUpdate({
      orgId: this.props.params.orgId,
      projectId: this.props.params.projectId,
      itemIds: [this.props.groupId],
      failSilently: true,
      data: {hasSeen: true}
    });
  },
    error: () => {
      this.setState({
        error: true,
        loading: false
      });
    }
  });
  },

  render() {
    let group = this.state.group;
    let evt = this.state.event;
    let params = this.props.params;
    let css = {
      position: 'fixed',
      top:'200px',
      right:0,
      bottom:0,
      width:'600px',
      backgroundColor:'#fff',
      borderTop:'1px solid #ccc',
      borderLeft:'1px solid #ccc',
      boxShadow:'-3px -3px 10px #ccc',
      overflowY:'auto',
      padding:'20px',
      zIndex:8888
    };

    return (
      <div className="group-overlay" style={css}>
        <div className="row event">
          <div className="col-md-12">
          {evt &&
            <GroupEventToolbar group={group} event={evt} orgId={params.orgId} projectId={params.projectId} />
          }
          {group.status === 'muted' &&
          <MutedBox statusDetails={group.statusDetails} />
          }
          {group.status === 'resolved' && group.statusDetails.inNextRelease &&
          <div className="alert alert-info alert-block">
            <span>{t(`This issue has been marked as being resolved in the next
                        release. Until then, you will not get notified about new
                        occurrences.`)}</span>
          </div>
          }
          {group.status === 'resolved' && group.statusDetails.autoResolved &&
          <div className="alert alert-info alert-block">
            <span>{t(`This issue was automatically marked as resolved due to
                        the Auto Resolve configuration for this project.`)}</span>
          </div>
          }
          {this.state.loading ? <LoadingIndicator /> : (
            this.state.error ? <LoadingError onRetry={this.fetchData} />
            :
            <EventEntries
              group={group}
              event={evt}
              orgId={params.orgId}
              projectId={params.projectId} />
          )}
          </div>
        </div>
      </div>
  );
  }
});

export default GroupEventDetails;
