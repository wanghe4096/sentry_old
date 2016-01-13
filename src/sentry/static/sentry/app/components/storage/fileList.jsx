/**
 * Title: fileList.jsx
 * Author: bold
 * Date: 1/12/16.
 * Description: 。
 */

import React from 'react';
import Reflux from 'reflux';

import HostStore from 'stores/storage/hostStore';
import StreamStore from 'stores/storage/streamStore';
import FileStore from 'stores/storage/fileStore';
import HmStatusStore from 'stores/storage/hostManageStatusStore';

const FileItem = React.createClass({
  mixins: [

  ],

  getInitialState() {
    return {
      active: false
    }
  },

  onClickHandler() {
    this.setState({
      active:!!this.state.active
    })
  },

  render() {
    return (
      <li className={`file-item ${this.state.active ? 'active' : ''}`} onClick={this.onClickHandler}>
        <h5 className="file-name">
          {this.props.file_name}
        </h5>
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
        <FileItem {...file} key={file.file_id} />
      )
    });
  },

  render() {
    const activeStreamId = HmStatusStore.status.activeStream;
    const activeStream = StreamStore.getById(activeStreamId);

    return (
      <div className="file-list-container">
        <div className="list-head file-list-head">
          <h5>Stream:{activeStream.stream_name} 的 File List</h5>
        </div>
        <ul className="file-list">
          { this.renderList() }
        </ul>
      </div>
    )
  }
});

export default FileList;