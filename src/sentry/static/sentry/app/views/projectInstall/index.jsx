import React from 'react';
import {History,Link} from 'react-router';
import ApiMixin from '../../mixins/apiMixin';
import LoadingError from '../../components/loadingError';
import LoadingIndicator from '../../components/loadingIndicator';

const ProjectInstall = React.createClass({
  propTypes: {
    setProjectNavSection: React.PropTypes.func
  },

  mixins: [
    ApiMixin
  ],

  getInitialState() {
    return {
      loading: true,
      platformList: null
    };
  },

  componentWillMount() {
    this.props.setProjectNavSection('settings');
  },

  componentDidMount() {
    this.fetchData();
  },

  fetchData() {
    let {orgId, projectId} = this.props.params;
    this.api.request(`/projects/${orgId}/${projectId}/docs/`, {
      success: (data) => {
        this.setState({
          loading: false,
          data: data
        });
      }
    });
  },

  render() {
    if (this.state.loading)
      return <LoadingIndicator />;
    else if (this.state.error)
      return <LoadingError onRetry={this.fetchData} />;

    let data = this.state.data;
    return (
      <div className="row">
        <div className="project-install">
          <h2 className="card-heading simple no-p-l">
            <div className="container-alligment">
              <span className="selected-step">1</span>
              <span className="selected-step-text">选择日志接入方式</span>
            </div>
            <div className="container-alligment">
              <span className="unselected-step">2</span>
              <span className="unselected-step-text">配置</span>
            </div>
          </h2>
          <div className="card-body clearfix">
            {React.cloneElement(this.props.children, {
              platformData: data // {...this.props}
            })}
          </div>
        </div>
      </div>
    );
  }
});

export default ProjectInstall;
