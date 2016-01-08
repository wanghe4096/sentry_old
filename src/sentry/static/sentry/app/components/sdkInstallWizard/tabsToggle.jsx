/**
 * Title: tabsToggle.jsx
 * Author: yuan
 * Date: 1/8/16.
 * Description: 。
 */

import React from 'react';
import {Modal} from 'react-bootstrap';
import {t} from '../../locale';
import TabsSwitcher from './tabsSwitcher';
import TabsContent from './tabsContent';

const TabsToggle = React.createClass({
  render() {
    return (
        <div>
          <TabsSwitcher />
          <TabsContent />
        </div>
    )
  }
});

export default TabsToggle;