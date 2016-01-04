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
import AddTeamModal from '../addTeamModal';

const AddBtn = React.createClass({
  getInitialState() {
    return {
      showAddTeamModal:false
    };
  },

  addNewTeam() {
    this.setState({
      showAddTeamModal:true
    });
  },

  addNewProject() {
    console.log('project');
  },

  closeTeamModal() {
    this.setState({
      showAddTeamModal:false
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

        <AddTeamModal
          show={this.state.showAddTeamModal}
          keyboard={true}
          onHide={this.closeTeamModal}
        />
      </DropdownLink>
    )
  }
});

export default AddBtn;
