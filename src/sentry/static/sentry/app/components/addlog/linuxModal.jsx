import React from 'react';
import Reflux from 'reflux';
import {History} from 'react-router';
import {Modal,Button,Input} from 'react-bootstrap';
import OrganizationState from '../../mixins/organizationState';
import ApiMixin from '../../mixins/apiMixin';
import {t} from '../../locale';
import AlertActions from '../../actions/alertActions.jsx';
import {sortArray} from '../../utils';

const LinuxModal = React.createClass({
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
          setTimeout(()=>{
              this.history.pushState({isNew: true}, `/${org.slug}/events/${result.slug}/`);
            },300);

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
        <Modal show={true} keyboard={true} onHide={this.props.onHide} dialogClassName="custom-modal">
          <Modal.Header closeButton={true}>
            <Modal.Title>{t('linux配置')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitHandler} className="form-horizontal">
              <div className="box-content with-padding">
                <div className="section">
                  <h4>安装LogInsight Linux的代理程序</h4>
                  <p>复制并粘贴下面的代码片段到你的终端上安装代理</p>
                      <span className="code">
                        wget http://loginsight.cn/loginsight/
                      </span>
                </div>
                <div className="form-actions">
                  <a href="#" className="btn btn-primary ">完成</a>
                </div>
              </div>

              {error}
              {/*
              <Modal.Footer>
                <Button type="reset" disabled={inSaving}>{t('Reset')}</Button>
                <Button type="submit" disabled={!!stateClass || inSaving} bsStyle="primary">
                  {inSaving ? t('Saving ... ') : t('Submit')}
                </Button>
              </Modal.Footer>
               */}
            </form>
          </Modal.Body>
        </Modal>
      )
    }
});


export default LinuxModal;