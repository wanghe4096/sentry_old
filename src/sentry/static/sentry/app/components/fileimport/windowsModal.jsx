import React from 'react';
import Reflux from 'reflux';
import {History} from 'react-router';
import {Modal} from 'react-bootstrap';
import ApiMixin from '../../mixins/apiMixin';
import {t} from '../../locale';
import AlertActions from '../../actions/alertActions.jsx';
import {sortArray} from '../../utils';
import ReactZeroClipboard from 'react-zeroclipboard';

const WindowsModal = React.createClass({
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
            <Modal.Title>{t('Windows Config')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitHandler} className="form-horizontal">
              <div className="box-content with-padding">
                <div className="section">
                  <h4>{t('安装LogInsight Windows的代理程序')}</h4>
                  <p>{t('复制并粘贴下面的代码片段到你的终端上安装代理')}</p>
                  <span className="code">
                    {t('wget http://loginsight.cn/loginsight/windows')}
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


export default WindowsModal;
