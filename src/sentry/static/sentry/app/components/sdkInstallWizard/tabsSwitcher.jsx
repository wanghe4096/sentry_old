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
  render() {
    function(){
      var tabs = this.props.data.map(item){
      var selected = item
      }
    }
    return (
        <div>
          <ul>{tabs}</ul>
        </div>
    )
  }
});

export default TabsSwitcher;