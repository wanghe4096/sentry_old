import React from 'react';
import ListLink from '../listLink';
import OrganizationState from '../../mixins/organizationState';
import ConfigStore from '../../stores/configStore';
import HookStore from '../../stores/hookStore';
import {t} from '../../locale';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ApiMixin from 'mixins/apiMixin';
import AlertActions from 'actions/alertActions.jsx';
import AlertStore from 'stores/alertStore';

const AddLogHeader = React.createClass({

  mixins:[
    ApiMixin
  ],

  render() {
    return (
      <div className="">
        <div className="home-getstart clearfix">
          <h5>上传日志</h5>
        </div>
      </div>
    );
  }
});

export default AddLogHeader;

