import React from 'react';
import Reflux from 'reflux';
import {t} from '../locale';
import DocumentTitle from 'react-document-title';

const AddOrganization = React.createClass({
  render() {
    return (
      <DocumentTitle title={t('New Organization')}>
        <div className="add-org body" style={{width: 600, margin: '50px auto 0'}}>
          <div className="page-header">
            <h2>{t('Create a New Organization')}</h2>
          </div>
          <p>{t('Organizations represent the top level in your hierarchy. You\'ll be able to bundle a collection of teams within an organization as well as give organization-wide permissions to users.')}</p>
          <form className="form-stacked">
            <fieldset>
              <div className="form-group">
                <label htmlFor="id_name" className="control-label requiredField">
                  <span>{t('Organization Name')}</span>
                  <span className="asteriskField">*</span>
                </label>
                <div className="controls ">
                  <input className="textinput textInput form-control"
                  id="id_name"
                  maxlength="200"
                  placeholder={t('My Company')}
                  type="text" />
                </div>
              </div>
            </fieldset>
            <div className="actions">
              <button type="submit" className="btn btn-primary">{t('Create Organization')}</button>
            </div>
          </form>
        </div>
      </DocumentTitle>
    )
  }
});

export default AddOrganization;
