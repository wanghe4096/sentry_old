import React from 'react';
import Reflux from 'reflux';
import {History} from 'react-router';
import {t} from '../locale';
import ApiMixin from 'mixins/apiMixin';
import DocumentTitle from 'react-document-title';
import AlertActions from '../actions/alertActions.jsx';
import OrganizationStore from 'stores/organizationStore';

const AddOrganization = React.createClass({
  mixins: [
    ApiMixin,
    History
  ],
  getInitialState() {
    return {
      error: null
    }
  },
  onSubmitHandler(e) {
    e.preventDefault();
    let that = this;
    let name = this.refs.name.value;
    let slug = this.refs.slug.value

    this.api.request(`/organizations/`, {
      method: 'POST',
      data: {
        name: name,
        slug: slug
      },
      success: (data) => {
        let orgList = OrganizationStore.getAll().concat(data);
        OrganizationStore.load(orgList);

        that.history.pushState(null, `/${data.slug}/`);
        AlertActions.addAlert(t('Creating Organization Success'), 'success', 3000);
      },
      error: () => {
        that.setState({
          error: true
        });
      }
    })
  },
  render() {
    return (
      <DocumentTitle title={t('New Organization')}>
        <div className="add-org body" style={{width: 400, margin: '50px auto 0'}}>
          <div className="page-header">
            <h2>{t('Create a New Organization')}</h2>
          </div>
          <p>{t('Organizations represent the top level in your hierarchy. You\'ll be able to bundle a collection of teams within an organization as well as give organization-wide permissions to users.')}</p>
          {
            this.state.error && (
              <div className="alert alert-danger">{t('Created Faild')}</div>
            )
          }
          <form className="form-stacked" onSubmit={this.onSubmitHandler}>
            <fieldset>
              <div className="form-group">
                <label htmlFor="id_name" className="control-label requiredField">
                  <span>{t('Organization Name')}</span>
                  <span className="asteriskField">*</span>
                </label>
                <div className="controls ">
                  <input className="textinput textInput form-control"
                    ref="name"
                    id="id_name"
                    maxLength="200"
                    placeholder={t('My Company')}
                    type="text" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="id_slug" className="control-label requiredField">
                  <span>{t('Organization Slug')}</span>
                  <span className="asteriskField">*</span>
                </label>
                <div className="controls ">
                  <input className="textinput textInput form-control"
                    ref="slug"
                    id="id_slug"
                    maxLength="200"
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
