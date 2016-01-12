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


const TabsSwitcher = React.createClass({
  onClick: function(item) {
    this.props.onTabClick(item);
  },
  render: function() {
    var items = this.props.items.map(function(item) {
      return <a onClick={this.onClick.bind(this, item)}>{item.name}</a>;
    }.bind(this));
    return (
        <div>{items}</div>
    )
  }
});


export default TabsSwitcher;