import React from 'react';
import ListLink from '../listLink';
import OrganizationState from '../../mixins/organizationState';
import ConfigStore from '../../stores/configStore';
import HookStore from '../../stores/hookStore';
import {t} from '../../locale';

const HomeSetDashboard = React.createClass({

  render() {
    return (
        <div className="home-dashboard-empty">
          <a href="javascript:;">
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
        </div>
    );
  }
});

export default HomeSetDashboard;
