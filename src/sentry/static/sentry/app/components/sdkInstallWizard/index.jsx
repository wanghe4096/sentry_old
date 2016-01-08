/**
 * Title: index.jsx
 * Author: bold
 * Date: 1/6/16.
 * Description: 。
 */

import React from 'react';
import {Modal} from 'react-bootstrap';
import {t} from '../../locale';
import TabsToggle from './tabsToggle';

const SDKInstallWizard = React.createClass({
  propsType:{
    onHide:React.PropTypes.func.isRequired
  },

  render() {
    return (
      <Modal show={true} keyboard={true} onHide={this.props.onHide}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{t('project install sdk wizard')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          wizard
            <TabsToggle />
        </Modal.Body>
      </Modal>
    )
  }
});

export default SDKInstallWizard;