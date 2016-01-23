/**
 * Title: fileList.jsx
 * Author: bold
 * Date: 1/12/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import _ from 'underscore';
import {Link,IndexLink} from 'react-router';
import OrganizationState from 'mixins/organizationState';
import LoadingIndicator from 'components/loadingIndicator';
import LoadingError from 'components/loadingError';

import FileAction from 'actions/storage/fileAction';
import HostStore from 'stores/storage/hostStore';
import StreamStore from 'stores/storage/streamStore';
import FileStore from 'stores/storage/fileStore';
import HmStatusStore from 'stores/storage/hostManageStatusStore';

const FileItem = React.createClass({
  mixins: [
    OrganizationState
  ],

  getInitialState() {
    return {}
  },

  downLogFile(e) {

    e.preventDefault();
    var aLink = document.createElement('a');
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);
    aLink.download = this.props.file_name;
    aLink.href = '/api/0/logevents?file_id=' + this.props.id + '&event_offset=1&event_count=10000000000';
    aLink.dispatchEvent(evt);

  },

  render() {
    const org = this.getOrganization();
    const fileSize = this.props.size ? (this.props.size / 1000) + 'M' : null;

    const analytic = [];
    for (let i = 0; i < 30; i++) {
      analytic.push(_.random(1, 10))
    }

    return (
      <li className={`list-item ${this.state.active ? 'active' : ''}`}>
        <h5 className="item-name">
          <a href={`/${org.slug}/storage/preview/${this.props.id}/`} target="_blank">
            {this.props.file_name}
          </a>
        </h5>
        <div className="clearfix">
          <ul className="props-list clearfix pull-left">
            <li><strong>{t('ID')}:</strong> {this.props.id} </li>
            <li><strong>{t('Size')}:</strong> {fileSize}</li>
            <br />
            <li className="path-block">
              <strong>{t('Path')}:</strong> {this.props.file_path + '/' + this.props.file_name}
            </li>
          </ul>
          <div className="analytic">
            <ul>
              {
                analytic.map((s, i) => {
                  return (
                    <li className="sl" key={i}>
                      <div className="s" style={{top:(50-s*5)+'px'}}></div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <ul className="actions clearfix">
          <li>
            <a
              className="a-btn"
              href={`/${org.slug}/storage/preview/${this.props.id}/`}
              target="_blank"
            >查看文件</a>
          </li>
          <li>
            <a className="a-btn" onClick={this.downLogFile}>下载文件</a>
          </li>
        </ul>
      </li>
    );
  }
});

const FileList = React.createClass({
  mixins: [
    Reflux.connect(FileStore, 'fileList')
  ],

  getInitialState() {
    return {
      fileList: []
    }
  },

  renderBody() {
    if (this.state.loading) {
      return (
        <div className="box">
          <LoadingIndicator />
        </div>
      );
    } else if (this.state.error) {
      return (
        <LoadingError onRetry={()=>{
          FileAction.fetch(HmStatusStore.status.activeStream);
        }}/>
      )
    } else if (!this.state.fileList.length) {
      return (
        <div className="box empty-stream">
          <span className="icon icon-exclamation"/>
          <p>{t('Sorry, not found.')}</p>
        </div>
      );
    } else {
      return this.state.fileList.map((file, i)=> {
        return (
          <FileItem {...file} key={i}/>
        )
      });
    }
  },

  render() {
    const activeStreamId = HmStatusStore.status.activeStream;
    const activeStream = StreamStore.getById(activeStreamId);

    return (
      <div className="file-list-container">
        <div className="list-wrap file-list">
          <div className="list-head">
            <h5>{t('File List')}</h5>
          </div>
          <ul>
            { this.renderBody() }
          </ul>
        </div>
      </div>
    )
  }
});

export default FileList;