/**
 * Title: hostStat.jsx
 * Author: bold
 * Date: 1/12/16.
 * Description: 。
 */

import React from 'react';
import {t} from 'app/locale';

const HostStat = React.createClass({
  render() {
    return (
      <ul className="host-stat clearfix">
        <li>
          <h6 className="nav-header">{t('Total Host:')}</h6>
          <p className="count">
            0
            <span className="unit">个</span>
          </p>
        </li>
        <li>
          <h6 className="nav-header">{t('Total Stream:')}</h6>
          <p className="count">
            0
            <span className="unit">条</span>
          </p>
        </li>
      </ul>
    )
  }
});

export default HostStat;