import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonGroup, DropdownButton, Input, MenuItem, Modal } from 'react-bootstrap';
import numeral from 'numeral';
import SavedSearchControls  from 'components/search/SavedSearchControls';
import ShowQueryModal  from 'components/search/ShowQueryModal';
import BootstrapModalWrapper from 'components/bootstrap/BootstrapModalWrapper';
import AddToDashboardMenu from 'components/dashboard/AddToDashboardMenu';

const SearchSidebar = React.createClass({
    propTypes: {
        field: React.PropTypes.object,
        onFieldSelectedForGraph: React.PropTypes.func.isRequired,
        onFieldSelectedForQuickValues: React.PropTypes.func.isRequired,
        onFieldSelectedForStats: React.PropTypes.func.isRequired,
        onFieldToggled: React.PropTypes.func,
        selected: React.PropTypes.bool,
        predefinedFieldSelection: React.PropTypes.func,
    },
    getInitialState() {
        return {
            fieldFilter: '',
            maxFieldsHeight: 1000,
        };
    },
    _showIndicesModal: function () {

    },
    _updateFieldSelection(setName) {
        this.props.predefinedFieldSelection(setName);
    },
    getInitialState() {
        return {
            fieldFilter: '',
            maxFieldsHeight: 1000,
        };
    },
    render()
    {
        const MessageField = React.createClass({
            propTypes: {
                field: React.PropTypes.object,
                onFieldSelectedForGraph: React.PropTypes.func.isRequired,
                onFieldSelectedForQuickValues: React.PropTypes.func.isRequired,
                onFieldSelectedForStats: React.PropTypes.func.isRequired,
                onToggled: React.PropTypes.func,
                selected: React.PropTypes.bool,
            },
            getInitialState() {
                return {
                    showActions: false,
                };
            },
            _toggleShowActions() {
                this.setState({showActions: !this.state.showActions});
            },
            render() {
                let toggleClassName = 'fa open-analyze-field ';
                toggleClassName += this.state.showActions ? 'open-analyze-field-active fa-caret-down' : 'fa-caret-right';

                return (
                    <li>
                        <div className="pull-left">
                            <i className={toggleClassName}
                               onClick={this._toggleShowActions}></i>
                        </div>
                        <div style={{marginLeft: 20}}>
                            <Input type="checkbox"
                                   label={this.props.field.name}
                                   checked={this.props.selected}
                                   onChange={() => this.props.onToggled(this.props.field.name)}/>

                            {this.state.showActions &&
                            <div className="analyze-field">
                                <ButtonGroup bsSize="xsmall">
                                    <Button onClick={() => this.props.onFieldSelectedForStats(this.props.field.name)}>
                                        Statistics
                                    </Button>
                                    <Button
                                        onClick={() => this.props.onFieldSelectedForQuickValues(this.props.field.name)}>
                                        Quick values
                                    </Button>
                                    <Button onClick={() => this.props.onFieldSelectedForGraph(this.props.field.name)}>
                                        Generate chart
                                    </Button>
                                </ButtonGroup>
                            </div>}
                        </div>
                    </li>
                );
            },
        });

        const messageFields = this.props.fields
            .filter((field) => field.name.indexOf(this.state.fieldFilter) !== -1)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((field) => {
                return (
                    <MessageField key={field.name}
                                  field={field}
                                  onToggled={this.props.onFieldToggled}
                                  onFieldSelectedForGraph={this.props.onFieldSelectedForGraph}
                                  onFieldSelectedForQuickValues={this.props.onFieldSelectedForQuickValues}
                                  onFieldSelectedForStats={this.props.onFieldSelectedForStats}
                                  selected={this.props.selectedFields.contains(field.name)}/>
                );
            });

        return (
            <div className="content-col search-sidebar" ref="sidebar">
                <div ref="header">
                    <div className="content-col clearfix" ref="sidebar">

                        <h4>字段</h4>

                        <div className="input-group input-group-sm clearfix" style={{marginTop: 5, marginBottom: 5}}>
                                <span className="input-group-btn  col-md-4 no-p-l-r">
                                    <button type="button" className="btn btn-default btn-sm"
                                            onClick={() => this._updateFieldSelection('default')}>默认
                                    </button>
                                    <button type="button" className="btn btn-default btn-sm"
                                            onClick={() => this._updateFieldSelection('all')}>全选
                                    </button>
                                </span>
                            <input type="text" className="form-control col-md-7 input-sm" placeholder="过滤条件"
                                   onChange={(event) => this.setState({fieldFilter: event.target.value})}
                                   value={this.state.fieldFilter}/>
                        </div>
                    </div>
                    <div ref="fields" className="search-sidebar-filter">
                        <ul className="search-result-fields">
                            {messageFields}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});

export default SearchSidebar;
