import React from 'react';
import Reflux from 'reflux';
import {History} from 'react-router';
import {Modal,Button,Input} from 'react-bootstrap';
import ApiMixin from '../../mixins/apiMixin';
import {t} from '../../locale';
import AlertActions from '../../actions/alertActions.jsx';
import {sortArray} from '../../utils';

const RslogModal = React.createClass({
  mixins: [
    ApiMixin,
    History
  ],

  getDefaultProps(){
    return {
    }
  },

  getInitialState() {
    return {
        rslogName: '',
        ipAddress: '',
        inSaving: false,
        error: false,
    }
  },

  submitHandler(e) {
    e.preventDefault();
    let data = {
        name: this.state.rslogName,
          ip:this.state.ipAddress
    };

      this.saveData(data);
  },

  validationState() {

    let length = this.state.rslogName.length;
    let stateClass;

      // todo: 优化体验,引入validate库
        if (length < 2) {
        stateClass = 'error';
      }

      if (!this.state.rslogName) {
        stateClass = 'error';
      }

      return stateClass;
  },

  handleRslogName(e) {
    this.setState({
        rslogName: e.target.value,
        error: false
    });
  },

  handleIp(e) {
    this.setState({
        ipAddress: e.target.value,
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
          name: data.name,
          ip:data.ip
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
            <Modal.Title>{t('Rslog Config')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitHandler}>
              <div className="box-content with-padding">
                <div>
                  <h4>{t('Config Rslog')}</h4>
                  <p>{('填写以下信息')}</p>
                  <Input
                    type="text"
                    value={this.state.rslogName}
                    placeholder={t('rslog name...')}
                    label={t('Name')}
                    help={t('* At least two characters.')}
                    hasFeedback
                    autoFocus
                    ref="input"
                    disabled={inSaving}
                    groupClassName="group-class"
                    labelClassName="label-class"
                    onChange={this.handleRslogName}
                  />
                  <Input
                    type="text"
                    value={this.state.ipAddress}
                    placeholder={t('IP Address...')}
                    label={t('Ip Address')}
                    help={t('* Ip Address.')}
                    hasFeedback
                    ref="input"
                    disabled={inSaving}
                    groupClassName="group-class"
                    labelClassName="label-class"
                    onChange={this.handleIp}
                  />
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


export default RslogModal;
