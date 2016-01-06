/**
 * Title: addProjectModal.jsx
 * Author: bold
 * Date: 1/5/16.
 * Description: 。
 */


import React from 'react';
import Reflux from 'reflux';
import {History} from 'react-router';
import {Modal,Button,Input} from 'react-bootstrap';
import OrganizationState from '../mixins/organizationState';
import TeamStore from '../stores/teamStore';
import ApiMixin from '../mixins/apiMixin';
import {t} from '../locale';
import AlertActions from '../actions/alertActions.jsx';
import {sortArray} from '../utils';

const ProjectModal = React.createClass({
  mixins: [
    OrganizationState,
    ApiMixin,
    History
  ],

  getInitialState() {
    let newTeamList = sortArray(TeamStore.getAll(), function (o) {
      return o.name;
    });
    return {
      projectName: '',
      team: newTeamList[0].slug,
      inSaving: false,
      error: false,
      teamList: newTeamList
    }
  },

  submitHandler(e) {
    e.preventDefault();
    let data = {
      name: this.state.projectName,
      team: this.state.team
    };

    this.saveData(data);
  },

  validationState() {

    let length = this.state.projectName.length;
    let stateClass;

    // todo: 优化体验,引入validate库
    if (length < 2) {
      stateClass = 'error';
    }

    if (!this.state.team) {
      stateClass = 'error';
    }

    return stateClass;
  },

  handleProjectName(e) {
    this.setState({
      projectName: e.target.value,
      error: false
    });
  },

  handleTeam(e) {
    this.setState({
      team: e.target.value,
      error: false
    });
  },

  saveData(data) {
    let org = this.getOrganization();

    this.setState({
      inSaving: true
    });

    this.api.request(`/teams/${org.slug}/${data.team}/projects/`, {
      method: 'POST',
      data: {
        name: data.name
      },
      success: (result) => {
        const newTeamList = TeamStore.items.map((item) => {
          if (item.slug === data.team) {
            item.projects = [...item.projects, result];
          }
          return item;
        });

        TeamStore.loadInitialData(newTeamList);
        AlertActions.addAlert(t('Creating Success'), 'success', 3000);
        this.props.onHide();
        this.history.pushState({isNew: true}, `/${org.slug}/${result.slug}/`);
      },
      error: () => {
        // todo : 错误详情提示
        this.setState({
          inSaving: false,
          error: true
        });
      }
    });
  },

  renderTeamList() {
    return this.state.teamList.map((team) => (
      <option key={team.slug} value={team.slug}>{team.name}</option>
    ));
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
          <Modal.Title>{t('add project')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.submitHandler} className="form-horizontal">
            <p>
              你可以通过“项目”将组织中的事件细分至具体应用。例如，你可以将项目区分为生产和开发实例，或是将网络应用和移动客户端应用划分为独立的项目。
            </p>
            <Input
              type="text"
              value={this.state.projectName}
              placeholder={t('E.g. API, Frontend, My Application Name, ...')}
              label={t('project name')}
              help={t('* At least two characters,Using the repository name generally works well.')}
              hasFeedback
              autoFocus
              disabled={inSaving}
              labelClassName="col-xs-3"
              wrapperClassName="col-xs-9"
              onChange={this.handleProjectName}
            />
            <div className="form-group has-feedback">
              <label className="control-label col-xs-3">
                <span>{t('team')}*</span>
              </label>
              <div className="col-xs-9">
                <select
                  className="form-control"
                  value={this.state.team}
                  onChange={this.handleTeam}>
                  {this.renderTeamList()}
                </select>
                <span className="help-block">The team controls who has access to this project.</span>
              </div>
            </div>

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

export default ProjectModal;