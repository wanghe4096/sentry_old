import React from 'react';
import ConfigStore from '../../../stores/configStore';
import {t} from '../../../locale';

const RequestActions = React.createClass({
  render(){
    let org = this.props.organization;
    let project = this.props.project;
    let group = this.props.group;
    let evt = this.props.event;
    let urlPrefix = (
      ConfigStore.get('urlPrefix') + '/' + org.slug + '/events/' +
      project.slug + '/issues/' + group.id
    );

    // TODO: 此处需要做 react 化
    return (
      <a href={urlPrefix + '/events/' + evt.id + '/replay/'}
         className="hide btn btn-sm btn-default">{t('Replay Request')}</a>
    );
  }
});

export default RequestActions;
