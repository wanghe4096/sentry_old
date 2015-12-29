/**
 * Title: groupOverlay.js
 * Author: bold
 * Date: 12/28/15.
 * Description: 。
 */

// todo:点击非overlay区域时关闭
// todo:需要关闭按钮
// todo:需要进入详情页面按钮
// todo:单页面实现左右切换按钮
// todo:支持键盘左右切换

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

  componentDidUpdate(prevProps) {
    if (prevProps.groupId !== this.props.groupId) {
      this.fetchData();
    }
  },

  keyDownHandler(evt){
    if (evt.keyCode === 27) {
      this.props.closeHandler();
    }
  },

  componentDidMount() {
    $(document).on('keydown', this.keyDownHandler);
  },

  componentWillUnmount() {
    $(document).off('keydown', this.keyDownHandler);
  },

  fetchData() {
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
    console.log(this.state);
    return (
      <div className="group-overlay">
        <div className="row event">
          <div className="col-md-9">
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
          <div className="col-md-3">
            
          </div>
        </div>
      </div>
  );
  }
});

export default GroupEventDetails;
