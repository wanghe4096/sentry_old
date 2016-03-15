import jQuery from 'jquery';
import {Client} from './api';
import OrganizationStore from './stores/organizationStore';

// setup jquery for CSRF tokens
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

let csrftoken = getCookie('csrf');

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
jQuery.ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader('X-CSRFToken', csrftoken);
    }
  },
  error: function() {
    console.log('error1:',arguments);
  }
});


function App() {
  this.initialize();
}

App.prototype = {
  initialize: function () {
    this.fetchOrg();
  },
  fetchOrg: function () {
    var that = this;
    new Client().request('/organizations/', {
      query: {
        'member': '1'
      },
      success: function (data) {
        OrganizationStore.load(data);
        that.render();
      },
      error: function () {
        console.log('读取错误');
      }
    });
  },
  render: function () {

    let routes = require('./routes');
    ReactDOM.render(
      React.createElement(Router.Router, {history: Sentry.createHistory()}, routes),
      document.body
    );

  }
};

// these get exported to a global variable, which is important as its the only
// way we can call into scoped objects
  window.App = App;
  window.jQuery = jQuery;
  window.moment = require('moment');
  window.Raven = require('raven-js');
  window.React = require('react');
  window.ReactDOM = require('react-dom');
  window.Router = require('react-router');
  window.Sentry = {
    api: require('./api'),
    //routes: require('./routes'),
    createHistory: require('history/lib/createBrowserHistory'),
    Alerts: require('./components/alerts'),
    mixins: {
      ApiMixin: require('./mixins/apiMixin')
    },
    BarChart: require('./components/barChart'),
    i18n: require('./locale'),
    ConfigStore: require('./stores/configStore'),
    DropdownLink: require('./components/dropdownLink'),
    FlotChart: require('./components/flotChart'),
    HookStore: require('./stores/hookStore'),
    Indicators: require('./components/indicators'),
    LoadingError: require('./components/loadingError'),
    LoadingIndicator: require('./components/loadingIndicator'),
    ListLink: require('./components/listLink'),
    MenuItem: require('./components/menuItem'),
    Pagination: require('./components/pagination'),
    ProjectSelector: require('./components/projectHeader/projectSelector'),
    RuleEditor: require('./views/ruleEditor'),
    TimeSince: require('./components/timeSince'),
    BorderMenu: require('./components/borderMenu'),
    ApiClient: Client
  };



new Client().request('/react/', {
  success : function(data) {
    // console.log(111);
    // console.log('data:',data)

    window.Sentry.ConfigStore.loadInitialData(data);
    new App();
  }
})
