import React from 'react';

import ApiMixin from '../../mixins/apiMixin';
import DropdownLink from '../dropdownLink';
import LoadingIndicator from '../loadingIndicator';
import {t} from '../../locale';

// todo alterNav 和 boardcast 功能是否冲突?

const AlertNav = React.createClass({
  mixins: [
    ApiMixin
  ],

  getInitialState() {
    return {
      broadcasts: [],
      loading: true,
      error: false
    };
  },

  componentWillMount() {
    this.fetchData();
  },

  componentWillUnmount() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.poller) {
      window.clearTimeout(this.poller);
      this.poller = null;
    }
  },

  remountComponent() {
    this.setState(this.getInitialState(), this.fetchData);
  },

  fetchData(callback) {
    if (this.poller) {
      window.clearTimeout(this.poller);
    }
    this.api.request('/broadcasts/', {
      method: 'GET',
      success: (data) => {
        this.setState({
          broadcasts: data,
          loading: false
        });
        this.poller = window.setTimeout(this.fetchData, 60000);
      },
      error: () => {
        this.setState({
          loading: false,
          error: true
        });
        this.poller = window.setTimeout(this.fetchData, 60000);
      }
    });
  },

  onOpen() {
    this.timer = window.setTimeout(this.markSeen, 1000);
  },

  onClose() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },

  markSeen() {
    let broadcastIds = this.state.broadcasts.filter((item) => {
      return !item.hasSeen;
    }).map((item) => {
      return item.id;
    });

    if (broadcastIds.length === 0)
      return;

    this.api.request('/broadcasts/', {
      method: 'PUT',
      query: {id: broadcastIds},
      data: {
        hasSeen: '1'
      },
      success: () => {
        this.setState({
          broadcasts: this.state.broadcasts.map((item) => {
            item.hasSeen = true;
            return item;
          })
        });
      },
    });
  },

  render() {
    let {broadcasts, loading} = this.state;
    let unseenCount = broadcasts.filter((item) => {
      return !item.hasSeen;
    }).length;

    let title = <span className="glyphicon glyphicon-import" />;
    return (
        <a href="javascript:;" className="pull-right alert-nav">
          <span className="fa fa-lg fa-bell"></span>
          <span className="badge badge-sm up bg-danger pull-right-xs">2</span>
        </a>
    );
  }
});

export default AlertNav;
