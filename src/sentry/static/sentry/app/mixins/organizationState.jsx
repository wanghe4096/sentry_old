import PropTypes from '../proptypes';

let OrganizationState = {
  contextTypes: {
    organization: PropTypes.Organization,
  },

  getOrganization() {
    return this.context.organization;
  },

  getAccess() {
    console.log('this.context:',this.context);
    return new Set(this.context.organization.access);
  },

  getFeatures() {
    return new Set(this.context.organization.features);
  }
};

export default OrganizationState;

