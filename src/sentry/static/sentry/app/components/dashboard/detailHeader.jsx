import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import _ from 'underscore';
import {Link,IndexLink} from 'react-router';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';


const DetailHeader = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState() {
    return {
      title_edit_mode : false,
      desc_edit_mode : false
    }
  },
  toggleTitleEdit(f) {
    this.setState({title_edit_mode:!!f});
  },
  toggleDescEdit(f) {
    this.setState({desc_edit_mode:!!f});
  },
  render() {
    const orgId = this.props.orgId;
    const newWidgetUrl = `/${orgId}/search/vs/new/`;
    const backState = {
      backTo: {
        url: window.location.pathname,
        title: t('Back to Dashboard')
      }
    };

    return (
      <div className="dashboard-header">
        <h5 className="app-tit">Dashboard</h5>
        <div className="info-wrap">
          {
            this.state.title_edit_mode ? (
              <div className="dashboard-tit dashboard-info edit-mode">
                <div className="input-group input-group-sm">
                  <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" />
                  <span className="input-group-addon">Save</span>
                  <span
                    onClick={() => this.toggleTitleEdit(false)}
                    className="input-group-addon"
                    >Cancel</span>
                </div>
              </div>
            ) : (
              <div className="dashboard-tit dashboard-info">
                asdfasdfsadfasdf
                <span
                  onClick={() => this.toggleTitleEdit(true)}
                  className="fa fa-pencil" />
              </div>
            )
          }
          {
            this.state.desc_edit_mode ? (
              <div className="dashboard-desc dashboard-info">
                <div className="input-group input-group-sm">
                  <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" />
                  <span className="input-group-addon">Save</span>
                  <span
                    onClick={() => this.toggleDescEdit(false)}
                    className="input-group-addon">Cancel</span>
                </div>
              </div>
            ) : (
              <div className="dashboard-desc dashboard-info">
                asd爱上谁打的阿萨德  阿萨德ASD fasdfs地方adfa 案发地方 是打发 sdfadasdalsDLasd 是打发士大夫
                <span
                  onClick={() => this.toggleDescEdit(true)}
                  className="fa fa-pencil" />
              </div>
            )
          }
        </div>
        <div className="add-btn btn-group btn-group-sm">
          <Link
            to={`/${orgId}/dashboard/`}
            className="btn btn-default">
            <i className="glyphicon glyphicon-th-list" /> Dashboard List
          </Link>
          <Link
            to={`/${orgId}/dashboard/new/`}
            className="btn btn-default">
            <i className="glyphicon glyphicon-plus" /> New Dashboard
          </Link>
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="glyphicon glyphicon-unchecked" /> Add Widget
          </button>
          <ul className="dropdown-menu-right dropdown-menu">
            <li>
              <Link
                to={newWidgetUrl}
                state={backState}>
                Design New Widget
              </Link>
            </li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Load Widget</a></li>
          </ul>
        </div>
      </div>
    )
  }
});

export default DetailHeader;
