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
      <div className="host-stat">
        <ul className="clearfix">
          <li>
            <h6 className="nav-header">{t('Total Streamtype:')}</h6>
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
        <div className="statistics clearfix">
          {
            [1,4,2,8,1,6,3,2,4,7,2,1,6,7,2,1,3,6,3].map((s,i) => {
              return (
                <div className="sl" key={i}>
                  <span className="s" style={{top:(100-s*10)+'px'}}></span>
                </div>
              )
            })
          }
        </div>
        {/*  ==========show tag=========
        <div className="box streamtype-box">
          <div className="box-header clearfix">
            <div className="row">
              <div className="col-xs-8">
                <h3>{t('Tag')}</h3>
              </div>

              //<div className="col-xs-2 align-right">{t('Events')}</div>
              //<div className="col-xs-2 align-right">{t('Users')}</div>

            </div>
          </div>
          <div className="box-content">
            <div className="tab-pane active">
              <div className="group-list-empty">{t('No tag available.')}</div>
            </div>
          </div>
        </div>
        */}
      </div>
    )
  }
});

export default HostStat;