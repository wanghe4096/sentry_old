import React,{Component,PropTypes} from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import _ from 'underscore';
import moment from 'moment';
import {Link,IndexLink} from 'react-router';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import DocumentTitle from 'react-document-title';
import ListStore from 'stores/dashboard/listStore';
import ListAction from 'actions/dashboard/listAction';

const css = require('css/dashboard.less');

const AddBox = React.createClass({
  propTypes:{
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func
  },
  getInitialState() {
    return {
      submit_ing:false
    }
  },
  submitHandler(e) {
    e.preventDefault();

    this.setState({submit_ing: true});

    // const data = _.pick(this.props,'id','desc','name','is_fav','layout','name','created_at','updated_at');

    // setTimeout(() => {
    //   this.props.onClose();
    // }, 3 * 1000);
    const data = {
      name: this.refs.name.value,
      desc: this.refs.desc.value,
      layout: this.props.layout || null,
      is_fav: !!this.props.is_fav // todo
    }

    if(this.props.id){
      data.id = this.props.id
    }


    ListAction.update(data)
      .done(function(){

      })
      .fail(function(){

      });

  },
  render() {
    return (
      <li className="add-box list-item">
        <form onSubmit={this.submitHandler}>
          <div className="b-name">
            <input
              ref="name"
              defaultValue={this.props.name}
              onChange={() => {}}
              disabled={!!this.state.submit_ing}
              placeholder="Dashboard Title" />
          </div>
          <p className="b-desc">
            <input
              ref="desc"
              defaultValue={this.props.desc}
              onChange={() => {}}
              disabled={!!this.state.submit_ing}
              placeholder="Dashboard Description"  />
          </p>
          <div className="enter-btn btn-group">
            <button
              type="submit"
              disabled={!!this.state.submit_ing}
              className="btn btn-primary">
              {this.state.submit_ing?'Submit ... ':'Save'}</button>
            <button
              type="button"
              onClick={this.props.onClose}
              disabled={!!this.state.submit_ing}
              className="btn btn-default">Cancel</button>
          </div>
        </form>
      </li>
    )
  }
});

const DashboardItem = React.createClass({
  mixins: [
    PureRenderMixin,
  ],
  getInitialState() {
    return {
      edit_mode:false
    }
  },
  editHandler() {
    this.setState({edit_mode: true});
  },
  removeHandler() {
    if(confirm('确定要删除?')){
      console.log('remove!!!');
    }
  },
  render() {
    const orgId = this.props.orgId;
    const itemUrl = `/${orgId}/dashboard/${this.props.id}/`;

    if(this.state.edit_mode){
      return (
        <AddBox
          {...this.props}
          onClose={() => this.setState({edit_mode:false})}
         />
      )
    }

    return (
      <li className="list-item">
        <h5 className="b-name">
          <Link
            to={itemUrl}>
            {this.props.name}
          </Link>
        </h5>
        <p className="b-desc">{ this.props.desc || this.props.name }</p>
        <div className="b-wrap">
          <span className="b-f"><b>widget count:</b>{this.props.widget_count}</span>
          <span className="b-f">
            <b>created at:</b>
            {moment(this.props.created_at).format('YYYY-MM-DD HH:mm:ss')}
          </span>
          <span className="b-f">
            <b>latest update at:</b>
            {moment(this.props.update_at).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
        <div className="enter-btn btn-group">
          <Link
            className="btn btn-default"
            to={itemUrl}>
            <i className="glyphicon glyphicon-new-window" title="Enter" />
            <span className="hide" style={{marginLeft:5}}>Enter</span>
          </Link>
          <a className="btn btn-default">
            <i className={`glyphicon ${this.props.is_fav?'glyphicon-star':'glyphicon-star-empty'}`} />
            <span style={{marginLeft:5}}>Fav</span>
          </a>
          <div className="btn-group">
            <a className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="glyphicon glyphicon-option-horizontal" />
            </a>
            <ul className="dropdown-menu">
              <li><a
                onClick={this.editHandler}
                >Edit</a></li>
              <li><a
                onClick={this.removeHandler}
                >Delete</a></li>
            </ul>
          </div>
        </div>
      </li>
    )
  }
})

const DashboardList = React.createClass({
  mixins: [
    PureRenderMixin,
    Reflux.connect(ListStore,'list')
  ],
  getInitialState() {
    return {
      fav_filter : false,
      text_filter : '',
      show_add_box: false
    }
  },
  componentWillMount() {
    css.use();
    ListAction.fetch();
  },
  componentWillUnmount() {
    css.unuse();
  },
  toggleFavTab(t) {
    this.setState({
        fav_filter:!!t
    });
  },
  renderBody() {
    return this.state.list.map(({...prop},i) => {

      const title = prop.name.toLocaleLowerCase().replace(/\s+/g,'');
      const desc = (prop.desc || '').toLocaleLowerCase().replace(/\s+/g,'');
      const fulltext = title + desc;
      const text_filter = this.state.text_filter;

      if(this.state.fav_filter && !prop.is_fav){
        return false;
      }

      if(text_filter && fulltext.indexOf(text_filter) === -1){
        return false;
      }
      return (
        <DashboardItem {...prop} orgId={this.props.params.orgId} i={i} key={i} />
      )
    });
  },
  filterOnchange(e) {
    this.setState({
      text_filter:e.target.value.toLocaleLowerCase().replace(/\s+/g,'')
    });
  },
  addBoxHandler(d) {
    this.setState({show_add_box: !!d})
  },
  render() {
    return (
      <DocumentTitle title="dashboard">
        <div className="sub-app sa-dashboard">
          <div className="dashboard-header">
            <h5 className="app-tit" style={{borderWidth:0}}>Dashboard</h5>
            <a
              onClick={() => this.addBoxHandler(true)}
              className="add-btn btn btn-sm btn-default">
              Add Dashboard
            </a>
          </div>
          <div className="dashboard-list-body">
            <div className="left-sec">
              <div className="sec-head">
                <div
                  className={`filter-input input-group input-group-sm ${this.state.text_filter?'active':''}`}>
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-search" />
                  </span>
                  <input type="text" className="form-control"  placeholder="filter" onChange={this.filterOnchange} />
                </div>
                <div className="nav-group">
                  <span
                    onClick={()=>this.toggleFavTab(false)}
                    className={`tab-nav ${this.state.fav_filter ? '' : 'active'}`}>
                    All list</span>
                  <span
                    onClick={()=>this.toggleFavTab(true)}
                    className={`tab-nav ${this.state.fav_filter ? 'active' : ''}`}>
                    Favorites</span>
                </div>
              </div>
              <ul className="list-wrap">
                {this.state.show_add_box && (
                  <AddBox
                    onClose={() => this.addBoxHandler(false)} />
                )}
                { this.renderBody() }
              </ul>
            </div>
            <section className="right-sec">
              <div className="cd-wrap">
                <h5 className="c-tit">Search List(Saved)</h5>
                <p className="c-desc">进入已保存的search列表</p>
                <div className="c-btn">
                  <Link
                    to={`/${this.props.params.orgId}/search/list/`}
                    disabled={true}
                    className="btn btn-sm btn-default">
                    <i className="glyphicon glyphicon-new-window" style={{marginRight:5}} />
                    Saved Search List
                  </Link>
                </div>
              </div>
              <div className="separator"></div>
              <div className="cd-wrap">
                <h5 className="c-tit">Searched History</h5>
                <p className="c-desc">进入已保存的search列表xxx阿萨德回复怕黑适度腐败</p>
                <div className="c-btn">
                  <Link
                    to={`/${this.props.params.orgId}/search/history/`}
                    disabled={true}
                    className="btn btn-sm btn-default">
                    <i className="glyphicon glyphicon-new-window" style={{marginRight:5}} />
                    Searched History
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default DashboardList;
