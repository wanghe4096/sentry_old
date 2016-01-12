/**
 * Title: tabsToggle.jsx
 * Author: yuan
 * Date: 1/8/16.
 * Description: 。
 */

import React from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import {t} from '../../locale';
{/*
import TabsSwitcher from './tabsSwitcher';
import TabsContent from './tabsContent';
*/}

const TabsToggle = React.createClass({
  getInitialState() {
    return {
      key: 1
    };
  },

  handleSelect(key) {
    this.setState({key});
  },
  render() {
    return (
        <Tabs>
            <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
            <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
            <Tab eventKey={3} title="Tab 3">Tab 3 content</Tab>
        </Tabs>
    )
  }
});

export default TabsToggle;