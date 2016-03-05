import React from 'react';
import Reflux from 'reflux';
import {History} from 'react-router';
import {Modal,Button,Input,ProgressBar,Panel} from 'react-bootstrap';
import ApiMixin from 'mixins/apiMixin';
import {t} from '../../locale';
import AlertActions from 'actions/alertActions.jsx';
import {sortArray} from '../../utils';
var Dropzone = require('react-dropzone');
import IndexStore from 'stores/indexStore';

const UploadModal = React.createClass({
  mixins: [
    ApiMixin,
    History
  ],

  getInitialState() {
    //let newIndexList = sortArray(IndexStore.getAll(), function (o) {
    //  return o.name;
    //});
    return {
      options: 'json',
      //index: newIndexList[0],
      now: 10,
      hostName: '',
      indexName: '',
      inSaving: false,
      error: false,
      index:[
        {
          name: 'default'
        },
        {
          name: 'index-01'
        }
      ],
      //indexList: newIndexList
    }
  },

  onDrop: function (files) {
    console.log('Received : ', files);
    this.setState({
      files: files
    });

    console.log(allFilesAccepted)

    const dataTransferItems = files.dataTransfer && files.dataTransfer.items ? files.dataTransfer.items : [];
    const allFilesAccepted = this.allFilesAccepted(Array.prototype.slice.call(dataTransferItems));

    var fd = new FormData();
    fd.append( 'file', files[0] );
    $.ajax({
      url: '/api/0/upload/',
      data: fd,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data){
        alert(data.toString());
      }
    });
    e.preventDefault()

    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        var complete = (event.loaded / event.total * 100 | 0);
        var progress = document.getElementById('uploadprogress');
        progress.value = progress.innerHTML = complete;
        this.setState({now:complete});
      }
    };

    this.setState({now:30});

  },

  allFilesAccepted: function(files) {
    return files.every(file => accepts(file, this.props.accept));
  },

  onOpenClick: function () {
    this.refs.dropzone.open();
  },

  onInputChange: function(event) {
    var checked = [];
    for (var i = 0;i < event.target.length; i++){
      var options = event.target.options[i];
      if (option.selected) {
        checked.push(option.value);
      }
      else{
        filename.substring(filename.lastIndexOf('.') + 1) ;
      }
    }
    this.setState({options: checked});
  },

  handleChange(e) {
    var newState = {};
    newState[e.target.name] =  e.target.value;
    this.setState(newState);
    //this.setState({
    //  hostName: e.target.value,
    //  error: false
    //});
  },

  //handleHostName(e) {
  //  this.setState({
  //    hostName: e.target.value,
  //    error: false
  //  });
  //},


  //handleIndex(e) {
  //  this.setState({
  //    index: e.target.value,
  //    error: false
  //  });
  //},

  submitHandler(e) {
    e.preventDefault();
    let data = {
      index:this.state.indexName,
      host:this.state.hostName
    };

    this.saveData(data);
  },

  saveData(data) {
    this.setState({
      inSaving:true
    });

    this.api.request(`/api/0/upload/`, {
      method: 'POST',
      data:{
        index:data.index,
        host:data.host

      },
      success: (data) => {
        data.projects = [];
        IndexStore.loadInitialData(Array.concat(...IndexStore.items,data));
        AlertActions.addAlert(t('Creating Success'+ data ), 'success', 3000);
        //this.props.onHide();
        console.log(data.name)
      },
      error: () => {
        // todo : 错误详情提示
        this.setState({
          inSaving:false,
          error:true
        });
      }
    });
  },

  validationState(){
    let length = this.state.indexName.length;
    let stateClass;

    // todo: 优化体验,引入validate库
    if(length<2){
      stateClass = 'error';
    }

    return stateClass;
  },

  //handleChange() {
  //  this.setState({
  //    indexName: this.refs.input.getValue(),
  //    error: false
  //  });
  //},

  renderIndexList() {
    return this.state.index.map((index,i) => (
      <option key={index.i} value={index.name}>{index.name}</option>
    ));
  },

  render() {

    let inSaving = this.state.inSaving;
    let stateClass = this.validationState();
    let files = [];
    var styles = {
      width: '100%',
      border: 'none'
    };

    var activeStyle = {
      backgroundColor: '#eee'
    };

    let error = this.state.error &&
      <div className="alert alert-block alert-danger">
        {t('Creation Failed')}
      </div>;

      return (
        <Modal show={true} keyboard={true} onHide={this.props.onHide} dialogClassName="custom-modal">
          <Modal.Header closeButton={true}>
            <Modal.Title>{t('手动上传')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitHandler} className="form-horizontal">
              <div className="box-content p-l-r-md">
                <div className="section">
                  <h4>选择来源</h4>
                  <p>
                    选定的文件
                    {
                      this.state.files ?
                        <span>
                        { this.state.files.map(function(file){
                          return <span ref="filename">:{file.name}</span>
                        }) }
                      </span>
                        : null
                    }
                  </p>
                  <a href="javascript:;" className="btn btn-default" onClick={this.onOpenClick}>选择文件</a>

                  <Dropzone ref="dropzone" style={styles} activeStyle={activeStyle} onDrop={this.onDrop} accept={this.props.accept} id="file">
                    <div className="dropzone">
                      {/*
                       <i className="fa fa-upload-alt dropzone-icon"></i>
                       */}
                      <div className="dropzone-box">
                        <div className="dashed">
                          <div className="dropzone-icon">
                            <i className="fa fa-cloud-upload"></i>
                          </div>
                          <div className="dropzone-text">
                            <h2>将您的数据文件拖到这儿</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <progress id="uploadprogress" min="0" max="100" value="0">0</progress>
                  </Dropzone>

                  <span className="max-filesize text-center">最大文件上载大小为500 Mb</span>
                  <ProgressBar bsStyle="success" now={this.state.now} label="%(percent)s%" />
                </div>
                <div className="section no-border clearfix">
                  <h4>日志类型</h4>
                  <div className="col-md-4">
                    <Input type="select" placeholder="select" onChange={this.onInputChange} value={this.state.options} className="form-control select-height">
                      <option value="log">log</option>
                      <option value="json">json</option>
                      <option value="jpg">jpg</option>
                      <option value="other">自定义</option>
                    </Input>
                  </div>
                </div>
                {/*log message*/}
                <div className="view-table">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th>时间</th>
                        <th>日志信息</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span>1</span>
                        </td>
                        <td>
                          <i className="fa fa-exclamation-triangle text-danger"></i>
                        </td>
                        <td>
                          <span>2016/03/01</span>
                          <span>1:00</span>
                        </td>
                        <td>
                          <div>
                            <span>
                              / use jsx to render html, do not modify simple.html var Dropzone = require('../lib/Dropzone'); require('../assets/index.css'); require('./simple.css'); var React = require('react');
                            </span>
                            <ul>
                              <li>
                                <span>timestamp =</span>
                                <span>none</span>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>1</span>
                        </td>
                        <td>
                          <i className="fa fa-exclamation-triangle text-danger"></i>
                        </td>
                        <td>
                          <span>2016/03/01</span>
                          <span>1:00</span>
                        </td>
                        <td>
                          <div>
                            <span>
                              / use jsx to render html, do not modify simple.html var Dropzone = require('../lib/Dropzone'); require('../assets/index.css'); require('./simple.css'); var React = require('react');
                            </span>
                            <ul>
                              <li>
                                <span>timestamp =</span>
                                <span>none</span>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/*settings*/}
                <div className="section no-border clearfix">
                  <h4>设置</h4>
                  {/*index list*/}


                  <ul className="upload-set no-p-l-r">
                    <li>
                      {/*
                      <span>设置您的host名称</span>
                      <input type="text" className="form-control"/>
                       */}
                      <Input
                        type="text"
                        name="hostName"
                        value={this.state.hostName}
                        placeholder={t('输入您的主机名 ...')}
                        label={t('设置您的host名称')}
                        help={t('* 设置您的主机名,方便搜索.')}
                        //hasFeedback
                        autoFocus
                        //disabled={inSaving}
                        labelClassName=""
                        wrapperClassName="col-xs-12"
                        onChange={this.handleChange}
                      />

                    </li>
                    <li>
                      <div className="form-group">
                        <label className="control-label">
                          <span>{t('索引')}*</span>
                        </label>
                        <div className="col-xs-12">
                          <select
                            className="form-control select-height"
                            value={this.state.index}
                            onChange={this.handleChange}>
                            {this.renderIndexList()}
                          </select>
                          <span className="help-block">选择你文件存储到的位置.</span>
                        </div>
                      </div>

                      {/*
                      <span>设置您要存储的索引</span>
                      <Input type="select" placeholder="select" onChange={this.onInputChange} value={this.state.options} className="form-control">
                        <option value="default">default</option>
                        <option value="index-01">{this.state.indexName}</option>
                        <option value="index-02">index-02</option>
                        <option value="index-02">index-03</option>
                      </Input>
                       */}
                      <a href="#">新建索引</a>
                    </li>
                  </ul>
                  <Panel header="新建索引" className="create-index">
                    <div className="index-item">
                      <Input
                        type="text"
                        name="indexName"
                        value={this.state.indexName}
                        placeholder={t('输入您的索引名称')}
                        label={t('索引名称')}
                        help={t('* 输入您要创建的索引名称.')}
                        hasFeedback
                        autoFocus
                        ref="input"
                        //disabled={inSaving}
                        groupClassName="group-class"
                        labelClassName="label-class"
                        onChange={this.handleChange}
                      />

                    </div>
                    <div className="footer">
                      <Button type="reset" disabled={inSaving}>{t('Cancel')}</Button>
                      <Button type="submit"  bsStyle="primary">
                        保存
                      </Button>
                    </div>
                  </Panel>

                </div>
                {/*upload result*/}
                <div className="section no-border clearfix">
                  <h4>显示结果</h4>
                  <ul className="upload-result no-p-l-r">
                    <li>
                      <span>数据来源方式</span>
                      <span>上传文件</span>
                    </li>
                    <li>
                      <span>文件名称</span>
                      <span>000.log</span>
                    </li>
                    <li>
                      <span>日志类型</span>
                      <span>upload</span>
                    </li>
                    <li>
                      <span>主机名</span>
                      <span>host-01</span>
                    </li>
                    <li>
                      <span>索引名</span>
                      <span>default</span>
                    </li>
                  </ul>
                </div>



                {/*
                <div className="form-actions">
                  <a href="#" className="btn btn-primary ">完成</a>
                </div>
                 */}
              </div>

              {error}

              <Modal.Footer>
                <Button type="reset" disabled={inSaving}>{t('Cancel')}</Button>
                <Button type="submit" disabled={!!stateClass || inSaving} bsStyle="primary">
                  {inSaving ? t('Saving ... ') : t('完成')}
                </Button>
              </Modal.Footer>
              {/**/}
            </form>
          </Modal.Body>
        </Modal>
      )
    }
});


export default UploadModal;