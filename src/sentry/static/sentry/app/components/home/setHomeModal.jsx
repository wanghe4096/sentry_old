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
import {Modal,Button,Input} from 'react-bootstrap';


const SetHomeModal = React.createClass({

  mixins:[
    ApiMixin
  ],

  getInitialState: function () {
    return {show: true};
  },

  render() {

    let error = this.state.error &&
      <div className="alert alert-block alert-danger">
        {t('Creation Failed')}
      </div>;

    return (
      <Modal show={true} keyboard={true} onHide={this.props.onHide}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{t('Set Home')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.submitHandler}>
            <h6>选择您简要作为首页显示的内容，默认为您设定的仪表盘。</h6>
              <ul className="text-center set-homemodal">
                <li>
                  <a href="javascript:;">
                    <i className="fa fa-bug"/>错误管理
                  </a>
                  <div className="set-check">
                    <i className="fa fa-check pull-right"></i>
                  </div>
                </li>
                <li>
                  <a onClick={this.addDemo}>
                    <i className="fa fa-database"/>日志仓库
                  </a>
                </li>
                <li>
                  <a href="javascript:;">
                    <i className="fa fa-columns"/>实时日志
                  </a>
                </li>
              </ul>
              <Input
                type="select"
                label={t('选择你即将要设置为首页的仪表盘')}
                className="select-height"
                placeholder="select dashboard">
                <option value="dashboard1">{t('dashboard1')}</option>
                <option value="dashboard2">{t('dashboard2')}</option>
                <option value="dashboard3">{t('dashboard3')}</option>
                <option value="dashboard4">{t('dashboard4')}</option>
              </Input>
            {error}
            <Modal.Footer>
              <Button type="reset">{t('Reset')}</Button>
              <Button type="submit"  bsStyle="primary">
                {t('Submit')}
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
});

export default SetHomeModal;
