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
import OrganizationState from '../../mixins/organizationState';
const AddBtn = React.createClass({
  mixins: [
    OrganizationState
  ],

  getInitialState() {
    return {
      showTeamModal: false,
      showProjectModal: false
    };
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
    if(/^\/manage\/*/.test(window.location.pathname)){
      return false;
    }
    let access = this.getAccess();
    if(!access.has('project:write') && !access.has('team:write')){
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
