import React, {PropTypes} from 'react';
import Immutable from 'immutable';
import {Button} from 'react-bootstrap';
import FieldStatisticsStore from 'stores/field-analyzers/FieldStatisticsStore';
import NumberUtils from '../../utils/NumberUtils';
var statisticsJson = require('./statics.json');
const FieldStatistics = React.createClass({
    getInitialState() {
        return {
            statsLoadPending: Immutable.Map(),
            fieldStatistics: Immutable.Map(),
            sortBy: 'field',
            sortDescending: false,
            autoReload: false,
        };
    },
    componentDidMount() {
        this.updateIntervalId = window.setInterval(() => this._reloadAllStatistics(), 3000);
    },
    componentWillUnmount() {
        if (this.updateIntervalId) {
            window.clearInterval(this.updateIntervalId);
        }
    },
    addFieldStatistics(field) {
        this._reloadFieldStatistics(field);
    },
    _reloadAllStatistics() {
        if (this.state.autoReload) {
            this.state.fieldStatistics.keySeq().forEach((field) => this._reloadFieldStatistics(field));
        }
    },
    _reloadFieldStatistics(field) {
        if (this.isMounted) {
            //this.setState({statsLoadPending: this.state.statsLoadPending.set(field, true)});
            //const promise = FieldStatisticsStore.getFieldStatistics(field);

            this.setState({
                fieldStatistics: this.state.fieldStatistics.set(field, statisticsJson),
                statsLoadPending: this.state.statsLoadPending.set(field, false),
            });
        }
    },
    _changeSortOrder(column) {
        if (this.state.sortBy === column) {
            this.setState({sortDescending: !this.state.sortDescending});
        } else {
            this.setState({sortBy: column, sortDescending: false});
        }
    },
    _toggleAutoReload() {
        const shouldAutoReload = !this.state.autoReload;
        this.setState({autoReload: shouldAutoReload});
    },

    _resetStatus() {
        this.setState(this.getInitialState());
    },
    _renderStatistics() {
        const statistics = [];
        this.state.fieldStatistics.keySeq()
            .sort((key1, key2) => {
                const a = this.state.sortDescending ? key2 : key1;
                const b = this.state.sortDescending ? key1 : key2;

                if (this.state.sortBy === 'field') {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                }
                const statA = this.state.fieldStatistics.get(a)[this.state.sortBy];
                const statB = this.state.fieldStatistics.get(b)[this.state.sortBy];
                return NumberUtils.normalizeNumber(statA) - NumberUtils.normalizeNumber(statB);
            })
            .forEach((field) => {
                const stats = this.state.fieldStatistics.get(field);
                let maybeSpinner = null;
                if (this.state.statsLoadPending.get(field)) {
                    maybeSpinner = <i className="fa fa-spin fa-spinner"></i>;
                }
                statistics.push(
                    <tr key={field}>
                        <td>{maybeSpinner}</td>
                        <td>{field}</td>
                        {FieldStatisticsStore.FUNCTIONS.keySeq().map((statFunction) => {
                            const formatNumber = NumberUtils.isNumber(stats[statFunction]) ? NumberUtils.formatNumber(stats[statFunction]) : stats[statFunction];
                            const numberStyle = {};
                            if (formatNumber === 'NaN' || formatNumber === '-Infinity' || formatNumber === 'Infinity' || formatNumber === 'N/A') {
                                numberStyle.color = 'lightgray';
                            }
                            return <td key={statFunction + '-td'}><span style={numberStyle}>{formatNumber}</span></td>;
                        })}
                    </tr>
                );
            });


        return statistics;
    },
    _renderStatisticalFunctionsHeaders() {
        return FieldStatisticsStore.FUNCTIONS.keySeq().map((statFunction) => {
            return (
                <th key={statFunction + '-th'} onClick={() => this._changeSortOrder(statFunction)}>
                    {FieldStatisticsStore.FUNCTIONS.get(statFunction)} {this._getHeaderCaret(statFunction)}
                </th>
            );
        });
    },
    _getHeaderCaret(column) {
        if (this.state.sortBy !== column) {
            return null;
        }
        return this.state.sortDescending ? <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-up"></i>;
    },
    render() {
        let content;
        if (!this.state.fieldStatistics.isEmpty()) {
            content = (
                <div className="content-col">
                    <div className="pull-right">
                        <Button bsSize="small" onClick={() => this._resetStatus()}>Dismiss</Button>
                        <Button bsSize="small" onClick={() => this._toggleAutoReload()}>
                            {this.state.autoReload ? "Stop reloading" : "Reload automatically"}
                        </Button>
                    </div>
                    <h1>Field Statistics</h1>

                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                            <tr>
                                <th style={{width: 24}}></th>
                                <th onClick={() => this._changeSortOrder('field')}>
                                    Field {this._getHeaderCaret('field')}
                                </th>
                                {this._renderStatisticalFunctionsHeaders()}
                            </tr>
                            </thead>
                            <tbody>
                            {this._renderStatistics()}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else if (!this.state.statsLoadPending.isEmpty()) {
            content = (<div className="content-col">
                <h1>Field Statistics <i className="fa fa-spin fa-spinner"></i></h1>
            </div>);
        }

        return (
            <div id="field-statistics">
                {content}
            </div>
        );
    }
});

export default FieldStatistics;
