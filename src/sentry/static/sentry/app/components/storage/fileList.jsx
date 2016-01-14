/**
 * Title: fileList.jsx
 * Author: bold
 * Date: 1/12/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import {Link,IndexLink} from 'react-router';
import OrganizationState from 'mixins/organizationState';

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

    return (
      <li className={`list-item ${this.state.active ? 'active' : ''}`}>
        <h5 className="item-name">
          {this.props.file_name}
        </h5>
        <ul className="props-list clearfix">
          <li><strong>{t('ID')}:</strong> {this.props.id} </li>
          <li><strong>{t('File Size')}:</strong> {fileSize}</li>
          <li><strong>{t('File Path')}:</strong> {this.props.file_path + '/' + this.props.file_name} </li>
        </ul>
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

  renderList() {
    return this.state.fileList.map((file,i)=> {
      return (
        <FileItem {...file} key={i} />
      )
    });
  },

  render() {
    const activeStreamId = HmStatusStore.status.activeStream;
    const activeStream = StreamStore.getById(activeStreamId);

    return (
      <div className="file-list-container">
        <div className="list-wrap file-list">
          <div className="list-head">
            <h5>File List</h5>
          </div>
          <ul>
            { this.renderList() }
          </ul>
        </div>
      </div>
    )
  }
});

export default FileList;