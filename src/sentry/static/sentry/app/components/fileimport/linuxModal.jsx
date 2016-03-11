import React from 'react';
import Reflux from 'reflux';
import {History} from 'react-router';
import {Modal} from 'react-bootstrap';
import ApiMixin from '../../mixins/apiMixin';
import {t} from '../../locale';
import AlertActions from '../../actions/alertActions.jsx';
import {sortArray} from '../../utils';
import ReactZeroClipboard from 'react-zeroclipboard';

const LinuxModal = React.createClass({
  mixins: [
    ApiMixin,
    History
  ],

  getInitialState() {
    return {
        inSaving: false,
        error: false
    }
  },

  render() {
    let inSaving = this.state.inSaving;
    let error = this.state.error &&
      <div className="alert alert-block alert-danger">
        {t('Creation Failed')}
      </div>;

      return (
        <Modal show={true} keyboard={true} onHide={this.props.onHide} dialogClassName="custom-modal">
          <Modal.Header closeButton={true}>
            <Modal.Title>{t('Linux Config')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitHandler} className="form-horizontal">
              <div className="box-content with-padding">
                <div className="section">
                  <h4>
                    {t('Installation LogInsight linux agent')}
                  </h4>
                  <p>
                    {t('Copy and paste the following code snippet into your terminal to install the agent')}
                  </p>
                    <span className="code">
                      wget http://loginsight.cn/loginsight/linux
                    </span>
                    <ReactZeroClipboard text={this.props.code}>
                      <a className="copy">
                        {t('copy')}
                      </a>
                    </ReactZeroClipboard>
                </div>
              </div>
              {error}
            </form>
          </Modal.Body>
        </Modal>
      )
    }
});


export default LinuxModal;
