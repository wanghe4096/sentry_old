/**
 * Title: tabsToggle.jsx
 * Author: yuan
 * Date: 1/8/16.
 * Description: 。
 */

import React from 'react';
import {Modal} from 'react-bootstrap';
import {t} from '../../locale';
{/*
import AlertNav from './alertNav';
*/}

const TabsContent = React.createClass({
  render: function() {
    var items = this.props.items.map(function(item) {
      return <div>{item.content}</div>;
    }.bind(this));
    return (
        <div className="tabs-panel">{items}</div>
    )
  }
});

export default TabsContent;
