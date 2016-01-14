/**
 * Title: logPreview.jsx
 * Author: bold
 * Date: 1/15/16.
 * Description: 。
 */

import React from 'react';
import {Link,IndexLink,History} from 'react-router';
import {t} from 'app/locale';
import ApiMixin from 'mixins/apiMixin';
import AlertActions from 'actions/alertActions.jsx';
import OrganizationState from 'mixins/organizationState';

const LogPreview = React.createClass({
  mixins: [
    ApiMixin,
    OrganizationState
  ],

  getInitialState() {
    return {
      loading: true,
      events: []
    }
  },

  componentWillMount() {
    let that = this;
    const fileId = this.props.params.logId;
    const apiUrl = '/logevents?file_id=' + fileId + '&event_offset=1&event_count=1000';

    this.api.request(apiUrl, {
      success: (data) => {
        that.setState({
          loading: false,
          events: data
        });
      },
      error: (e) => {
        that.setState({
          loading: false
        });
        AlertActions.addAlert(t('Loaded Error, Please Retry!'), 'error');
        console.log(e);
      }
    });
  },

  renderEmpty() {
    return (
      <div className="alert alert-block">
        {t('This file is empty')}
      </div>
    )
  },

  renderEvents() {
    const isEmpty = !this.state.loading && this.state.events.length === 0;

    if (this.state.loading) {
      return (
        <div className="loading">
          loading...
        </div>
      )
    } else if (isEmpty) {
      return this.renderEmpty()
    } else {
      return this.state.events.map((event, i) => {
        return (
          <div className="event-item" key={i}>
            <pre>
              { event.payload }
            </pre>
          </div>
        )
      });
    }
  },

  render() {
    const org = this.getOrganization();

    return (
      <div className="log-preview">
        <ol className="breadcrumb">
          <li>
            <Link to={`/${org.slug}/storage`}>{t('Log Storage')}</Link>
          </li>
          <li className="active">preview</li>
        </ol>
        <div className="preview-head">
          <h4>Preview log file: {this.props.params.logId}</h4>
        </div>
        <div className="events">
          { this.renderEvents() }
        </div>
      </div>
    )
  }
});

export default LogPreview;