import React from 'react';
import ApiMixin from '../mixins/apiMixin';
import Alerts from '../components/alerts';
import AlertActions from '../actions/alertActions.jsx';
import ConfigStore from '../stores/configStore';
import Indicators from '../components/indicators';
import LoadingIndicator from '../components/loadingIndicator';
import BorderMenu from '../components/borderMenu';
//import OrganizationStore from '../stores/organizationStore';
import {t} from '../locale';

const App = React.createClass({
  mixins: [ApiMixin],

  getInitialState() {
    return {loading: false, error: false};
  },

  componentWillMount() {
    this.api.request('/internal/health/', {
      success: (data) => {
        if (data && data.problems) {
          data.problems.forEach(problem => {
            AlertActions.addAlert(problem, 'error', 0);
          });
        }
      },
      error: () => {} // TODO: do something?
    });

    ConfigStore.get('messages').forEach((msg) => {
      AlertActions.addAlert(msg.message, msg.level);
    });
  },

  componentWillUnmount() {
    // 暂时关闭,不清楚后遗症
    //OrganizationStore.load([]);
  },

  render() {

    let user = ConfigStore.get('user');

    if (this.state.loading) {
      return (
        <LoadingIndicator triangle={true}>
          {t('Getting a list of all of your organizations.')}
        </LoadingIndicator>
      );
    }

    return (
      <div >
        <Alerts className="messages-container"/>
        <Indicators className="indicators-container"/>
        {this.props.children}
      </div>
    );
  }

});

export default App;
