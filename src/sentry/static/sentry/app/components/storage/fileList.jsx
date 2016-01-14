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

import HostStore from 'stores/storage/hostStore';
import StreamStore from 'stores/storage/streamStore';
import FileStore from 'stores/storage/fileStore';
import HmStatusStore from 'stores/storage/hostManageStatusStore';

const FileItem = React.createClass({
  mixins: [],

  getInitialState() {
    return {}
  },

  render() {
    return (
      <li className={`list-item ${this.state.active ? 'active' : ''}`}>
        <h5 className="item-name">
          {this.props.file_name}
        </h5>
        <ul className="props-list clearfix">
          <li>{t('ID')}: {this.props.id} </li>
          <li>{t('Created Time')}: {this.props.create_timestamp || 'none'} </li>
          <li>{t('Latest Updated')}: {this.props.modify_timestamp || 'none'} </li>
          <li>{t('File SIze')}:  {this.props.file_size || 'none'}</li>
          <li>{t('File Path')}: {this.props.file_path || 'none'} </li>
        </ul>
        <ul className="actions clearfix">
          <li>
            <Link className="btn btn-link btn-sm" to="xxx">查看文件</Link>
          </li>
          <li>
            <a className="btn btn-link btn-sm" href="xxx">下载文件</a>
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
    return this.state.fileList.map((file)=> {
      return (
        <FileItem {...file} key={file.id}/>
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