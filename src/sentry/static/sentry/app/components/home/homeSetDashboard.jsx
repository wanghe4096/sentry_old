import React from 'react';
import ListLink from '../listLink';
import OrganizationState from '../../mixins/organizationState';
import ConfigStore from '../../stores/configStore';
import HookStore from '../../stores/hookStore';
import {t} from '../../locale';
import SetHomeModal from './setHomeModal';

const HomeSetDashboard = React.createClass({

  getInitialState: function() {
    return {
      showSetHomeModal: false
    };
  },

  showSetHomePage() {
    this.setState({
      showSetHomeModal: true,
    });
  },

  closeSetHomeModal() {
    this.setState({showSetHomeModal: false})
  },

  render() {
    return (
        <div className="home-dashboard-empty">
          <a href="javascript:;"  onClick={this.showSetHomePage} >
            <div className="icon-chart">
              <div>
                <span className="fa fa-5x fa-bar-chart"></span>
                <span className="fa fa-5x fa-pie-chart"></span>
              </div>
              <div>
                <span className="fa fa-5x fa-area-chart"></span>
                <span className="fa fa-5x fa-line-chart"></span>
              </div>
            </div>
            <h4>选择主页仪表板</h4>
          </a>
          {this.state.showSetHomeModal && (
            <SetHomeModal
              onHide={this.closeSetHomeModal}
            />
          )}
        </div>
    );
  }
});

export default HomeSetDashboard;
