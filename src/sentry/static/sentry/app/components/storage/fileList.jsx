/**
 * Title: fileList.jsx
 * Author: bold
 * Date: 1/12/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';

import HostStore from 'stores/storage/hostStore';
import StreamStore from 'stores/storage/streamStore';
import FileStore from 'stores/storage/fileStore';
import HmStatusStore from 'stores/storage/hostManageStatusStore';

const FileItem = React.createClass({
  mixins: [],

  getInitialState() {
    return {
      active: false
    }
  },

  onClickHandler() {
    this.setState({
      active: !this.state.active
    })
  },

  render() {
    return (
      <li className={`list-item ${this.state.active ? 'active' : ''}`} onClick={this.onClickHandler}>
        <h5 className="item-name">
          {this.props.file_name}
        </h5>
        <ul className="props-list clearfix">
          <li>{t('ID')}: {this.props.file_id} </li>
          <li>{t('Created Time')}: xxx</li>
          <li>{t('Latest Updated')}: xxx</li>
          <li>{t('File SIze')}: xxx</li>
          <li>{t('File Path')}: xxx</li>
          <li>{t('Total Event')}: xxx</li>
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
        <FileItem {...file} key={file.file_id}/>
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