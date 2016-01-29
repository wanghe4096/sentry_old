import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import SearchSidebar from './SearchSidebar';
import SearchBar from './SearchBar';
import FieldStatistics from 'components/field-analyzers/FieldStatistics';
import  LegacyHistogram  from 'components/search/LegacyHistogram';
import FieldQuickValues from 'components/field-analyzers/FieldQuickValues';
//import FieldGraphs from 'components/field-analyzers/FieldGraphs';
import ResultTable from './ResultTable';
import SearchStore from 'stores/search/SearchStore';
require('!script!../../../public/javascripts/jquery-2.1.1.min.js');
require('!script!../../../public/javascripts/bootstrap.min.js');


const SearchResult = React.createClass({
    getInitialState() {
        //const initialFields = SearchStore.fields;
        const initialFields = Immutable.Map({message: 'message'});
        SearchStore.fields = initialFields;
        return {
            selectedFields: this.sortFields(initialFields),
            sortField: SearchStore.sortField,
            sortOrder: SearchStore.sortOrder,
            showAllFields: false,
            currentSidebarWidth: null,
            shouldHighlight: true,
            currentPage: SearchStore.page,
        };
    },

    propTypes: {
        query: PropTypes.string,
        builtQuery: PropTypes.string,
        histogram: PropTypes.object.isRequired,
        formattedHistogram: PropTypes.array,
        searchInStream: PropTypes.object,
        streams: PropTypes.instanceOf(Immutable.Map),
        inputs: PropTypes.instanceOf(Immutable.Map),
        nodes: PropTypes.instanceOf(Immutable.Map),
    },

    _fields() {
        return this.props.result[this.state.showAllFields ? 'all_fields' : 'fields'];
    },

    predefinedFieldSelection: function (setName) {
        if (setName === 'none') {
            this.updateSelectedFields(Immutable.Set());
        } else if (setName === 'all') {
            this.updateSelectedFields(Immutable.Set(this._fields().map(field => field.name)));
        } else if (setName === 'default') {
            this.updateSelectedFields(Immutable.Set(['message']));
        }
    },

    updateSelectedFields(fieldSelection) {
        const selectedFields = this.sortFields(fieldSelection);
        SearchStore.fields = selectedFields;
        this.setState({selectedFields: selectedFields});
    },

    sortFields(fieldSet) {
        let newFieldSet = fieldSet;
        let sortedFields = Immutable.OrderedSet();

        if (newFieldSet.contains('source')) {
            sortedFields = sortedFields.add('source');
        }
        newFieldSet = newFieldSet.delete('source');
        const remainingFieldsSorted = newFieldSet.sort((field1, field2) => field1.toLowerCase().localeCompare(field2.toLowerCase()));
        return sortedFields.concat(remainingFieldsSorted);
    },
    addFieldGraph(field) {
        this.refs.fieldGraphsComponent.addFieldGraph(field);
    },
    addFieldQuickValues(field) {
        this.refs.fieldQuickValuesComponent.addFieldQuickValues(field);
    },
    addFieldStatistics(field) {
        debugger;
        this.refs.fieldStatisticsComponent.addFieldStatistics(field);
    },
    onFieldToggled(fieldName) {
        const currentFields = this.state.selectedFields;
        let newFieldSet;
        if (currentFields.contains(fieldName)) {
            newFieldSet = currentFields.delete(fieldName);
        } else {
            newFieldSet = currentFields.add(fieldName);
        }
        this.updateSelectedFields(newFieldSet);
    },
    render(){
        return (
            <div id="main-content-search" className="">
                <div ref="opa" className="col-md-3 col-sm-12" id="sidebar">
                    <div ref="oma" id="sidebar-affix">
                        <SearchSidebar fields={this._fields()}
                                       selectedFields={this.state.selectedFields}
                                       predefinedFieldSelection={this.predefinedFieldSelection}
                                       onFieldSelectedForQuickValues={this.addFieldQuickValues}
                                       onFieldSelectedForStats={this.addFieldStatistics}
                                       onFieldSelectedForGraph={this.addFieldGraph}
                                       onFieldToggled={this.onFieldToggled}/>
                    </div>
                </div>

                <div className="col-md-9 col-sm-12" id="main-content-sidebar">
                    <FieldStatistics ref="fieldStatisticsComponent"/>
                    <FieldQuickValues ref="fieldQuickValuesComponent"/>

                    <LegacyHistogram formattedHistogram={this.props.formattedHistogram}
                                     histogram={this.props.histogram}
                                     isStreamSearch={this.props.searchInStream !== null}/>
                    <ResultTable messages={this.props.result.messages}
                                 page={this.state.currentPage}
                                 selectedFields={this.state.selectedFields}
                                 sortField={this.state.sortField}
                                 sortOrder={this.state.sortOrder}
                                 resultCount={this.props.result.total_results}
                                 inputs={this.props.inputs}
                                 streams={this.props.streams}
                                 nodes={this.props.nodes}
                                 highlight={this.state.shouldHighlight}
                    />
                </div>
            </div>

        )
    }
});

export default SearchResult;
