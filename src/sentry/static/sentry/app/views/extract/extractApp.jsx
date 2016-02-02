/**
 * Title: structureApp.jsx
 * Author: bold
 * Date: 1/20/16.
 * Description: 。
 */

import React from 'react';
import DocumentTitle from 'react-document-title';
import {Link} from 'react-router';
import {t} from 'app/locale';

const ExtractApp = React.createClass({
  getInitialState() {
    return {}
  },
  render() {

    const depth = this.props.routes.length;

    return (
      <DocumentTitle title="Extract">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="sub-app sa-extract">
                { this.props.children }
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default ExtractApp;