/**
 * Title: AddBtn.jsx
 * Author: bold
 * Date: 1/4/16.
 * Description: 。
 */


import React from 'react';
import {render} from 'react-dom'
import {t} from '../../locale';
import DropdownLink from '../dropdownLink';
import MenuItem from '../menuItem';
import TeamModal from '../addTeamModal';
import ProjectModal from '../addProjectModal';
import OrganizationState from 'mixins/organizationState';
import ApiMixin from 'mixins/apiMixin';
import AlertActions from 'actions/alertActions.jsx';
import AlertStore from 'stores/alertStore';

const AddBtn = React.createClass({
  mixins: [
    OrganizationState,
    ApiMixin
  ],

  getInitialState() {
    return {
      showTeamModal: false,
      showProjectModal: false
    };
  },
  addDemo() {
    this.fetchData();
    //this.fetchData()
    //this.setState({
    //  showTeamModal: true
    //});
  },
  fetchData() {
    AlertActions.addAlert(t('Being imported demo data!'), 'success', 1000 * 60 * 30);
    const alertId = AlertStore.count;
    this.api.request('/api/0/create_demo', {
      method: 'post',
      success: function (msg) {
        AlertActions.addAlert(t('Create demo data is successfully!'), 'success', 3000);
        AlertActions.closeAlert(alertId);
      },
      error: function () {
        AlertActions.addAlert(t('Create demo data failed!'), 'error');
        AlertActions.closeAlert(alertId);
      }
    });

    //$.post("/api/0/create_demo", function(data){
    //  console.log('msg=', data)
    //})
  },
  addNewTeam() {
    this.setState({
      showTeamModal: true
    });
  },

  addNewProject() {
    this.setState({
      showProjectModal: true
    });
  },

  closeTeamModal() {
    this.setState({
      showTeamModal: false
    });
  },

  closeProjectModal() {
    this.setState({
      showProjectModal: false
    });
  },

  render (){
    if (/^\/manage\/*/.test(window.location.pathname)) {
      return false;
    }
    let access = this.getAccess();
    if (!access.has('project:write') && !access.has('team:write')) {
      return false;
    }

    const title = <span className="fa fa-lg fa-plus"></span>;

    return (
      <DropdownLink
        topLevelClasses={this.props.className}
        menuClasses="dropdown-menu-right"
        title={title}>
        {
          access.has('project:write') && (
            <MenuItem onSelect={this.addDemo }>{t('New demo')}</MenuItem>
          )
        }
        {
          access.has('project:write') && (
            <MenuItem onSelect={this.addNewTeam}>{t('New team')}</MenuItem>
          )
        }
        {
          access.has('team:write') && (
            <MenuItem onSelect={this.addNewProject}>{t('New project')}</MenuItem>
          )
        }

        {this.state.showTeamModal && (
          <TeamModal
            onHide={this.closeTeamModal}
          />
        )}

        {this.state.showProjectModal && (
          <ProjectModal
            onHide={this.closeProjectModal}
          />
        )}
      </DropdownLink>
    )
  }
});

export default AddBtn;
