import React from 'react';
import { ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import Immutable from 'immutable';
import $ from 'jquery';


const AddToDashboardMenu = React.createClass({
    getInitialState() {
        return {
            selectedDashboard: '',
        };
    },
    componentDidMount() {
        $(document).trigger('get-original-search.graylog.search', {callback: this._setOriginalSearchParams});
    },
    _setOriginalSearchParams(originalSearchParams) {
        this.searchParams = originalSearchParams;
    },
    _selectDashboard(event, dashboardId) {
        this.setState({selectedDashboard: dashboardId});
        this.refs.widgetModal.open();
    },
    _saveWidget(title, configuration) {
        let widgetConfig = Immutable.Map(this.props.configuration);
        const searchParams = Immutable.Map(this.searchParams);
        widgetConfig = searchParams.merge(widgetConfig).merge(configuration);

        const promise = WidgetStore.addWidget(this.state.selectedDashboard, this.props.widgetType, title, widgetConfig.toJS());
        promise.done(() => this.refs.widgetModal.saved());
    },
    _createNewDashboard() {
        this.refs.createDashboardModal.open();
    },
    _renderDashboardMenu() {
        let dashboards = Immutable.List();

        this.state.dashboards
            .sortBy(dashboard => dashboard.title)
            .forEach((dashboard, id) => {
                dashboards = dashboards.push(
                    <MenuItem eventKey={id} key={dashboard.id} style={{textTransform: 'capitalize'}}>
                        {dashboard.title}
                    </MenuItem>
                );
            });

        return (
            <DropdownButton bsStyle={this.props.bsStyle || 'info'}
                            bsSize="small"
                            title={this.props.title}
                            pullRight={this.props.pullRight}
                            onSelect={this._selectDashboard}
                            id="dashboard-selector-dropdown">
                {dashboards}
            </DropdownButton>
        );
    },
    _renderNoDashboardsMenu() {
        const canCreateDashboard = true;
        let option;
        if (canCreateDashboard) {
            option = <MenuItem key="createDashboard">No dashboards, create one?</MenuItem>;
        } else {
            option = <MenuItem key="noDashboards">No dashboards available</MenuItem>;
        }

        return (
            <div style={{display: 'inline'}}>
                <DropdownButton bsStyle={this.props.bsStyle || 'info'}
                                bsSize="small"
                                title={this.props.title}
                                pullRight={this.props.pullRight}
                                onSelect={canCreateDashboard ? this._createNewDashboard : () => {}}
                                id="no-dashboards-available-dropdown">
                    {option}
                </DropdownButton>
            </div>
        );
    },
    render() {
        return (
            <div style={{display: 'inline-block'}}>
                <ButtonGroup>
                    {this.props.children}

                    { this._renderNoDashboardsMenu()}
                </ButtonGroup>

            </div>
        );
    },
});

export default AddToDashboardMenu;
