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
const AddBtn = React.createClass({
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

    const title = <span className="fa fa-lg fa-plus"></span>;

    return (
      <DropdownLink
        topLevelClasses={this.props.className}
        menuClasses="dropdown-menu-right"
        title={title}>
        <MenuItem onSelect={this.addNewTeam}>{t('New team')}</MenuItem>
        <MenuItem onSelect={this.addNewProject}>{t('New project')}</MenuItem>

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
