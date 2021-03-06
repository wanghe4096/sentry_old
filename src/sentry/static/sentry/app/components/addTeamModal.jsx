/**
 * Title: addTeamModal.js
 * Author: bold
 * Date: 1/4/16.
 * Description: 。
 */

import React from 'react';
import {Modal,Button,Input} from 'react-bootstrap';
import OrganizationState from '../mixins/organizationState';
import TeamStore from '../stores/teamStore';
import ApiMixin from '../mixins/apiMixin';
import {t} from '../locale';
import AlertActions from '../actions/alertActions.jsx';

const TeamModal = React.createClass({
  mixins: [
    OrganizationState,
    ApiMixin
  ],

  getInitialState() {
    return {
      teamName: '',
      inSaving: false,
      error: false
    }
  },

  submitHandler(e) {
    e.preventDefault();
    let data = {
      name:this.state.teamName
    };

    this.saveData(data);
  },

  saveData(data) {
    let org = this.getOrganization();

    this.setState({
      inSaving:true
    });

    this.api.request(`/organizations/${org.slug}/teams/`, {
      method: 'POST',
      data:{
        name:data.name
      },
      success: (data) => {
        data.projects = [];
        TeamStore.loadInitialData(Array.concat(...TeamStore.items,data));
        AlertActions.addAlert(t('Creating Success'), 'success', 3000);
        this.props.onHide();
      },
      error: () => {
        // todo : 错误详情提示
        this.setState({
          inSaving:false,
          error:true
        });
      }
    });
  },

  validationState(){
    let length = this.state.teamName.length;
    let stateClass;

    // todo: 优化体验,引入validate库
    if(length<2){
      stateClass = 'error';
    }

    return stateClass;
  },

  handleChange() {
    this.setState({
      teamName: this.refs.input.getValue(),
      error: false
    });
  },

  render() {

    let inSaving = this.state.inSaving;
    let stateClass = this.validationState();

    let error = this.state.error &&
      <div className="alert alert-block alert-danger">
        {t('Creation Failed')}
      </div>;

    return (
      <Modal show={true} keyboard={true} onHide={this.props.onHide}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{t('add team')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.submitHandler}>
            <p>
              群组成员可访问特定重点内容，例如，拥有子项目的主打产品或应用。
            </p>
            <Input
              type="text"
              value={this.state.teamName}
              placeholder={t('E.g. Operations, Web, Desktop, ...')}
              label={t('team name')}
              help={t('* At least two characters,The team name has no significant impact and can be changed later.')}
              hasFeedback
              autoFocus
              ref="input"
              disabled={inSaving}
              groupClassName="group-class"
              labelClassName="label-class"
              onChange={this.handleChange}
            />
            {error}
            <Modal.Footer>
              <Button type="reset" disabled={inSaving}>{t('Reset')}</Button>
              <Button type="submit" disabled={!!stateClass || inSaving} bsStyle="primary">
                {inSaving ? t('Saving ... ') : t('Submit')}
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
});

export default TeamModal;