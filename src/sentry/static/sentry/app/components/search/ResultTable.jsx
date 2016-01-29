import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Immutable from 'immutable';

import  MessageTableEntry  from 'components/search/MessageTableEntry';
import MessageTablePaginator  from 'components/search/MessageTablePaginator';
import Pagination from 'components/pagination'
const ResultTable = React.createClass({
    EXPAND_ALL_RENDER_ASYNC_DELAY: 10,
    getInitialState() {
        return {
            expandedMessages: Immutable.Set(),
            allStreamsLoaded: false,
            allStreams: Immutable.List(),
            expandAllRenderAsync: false,
        };
    },
    componentDidMount() {
        // only load the streams per page
        if (this.state.allStreamsLoaded) {
            return;
        }
    },
    componentDidUpdate(oldProps, oldState) {
        if (this.state.expandAllRenderAsync) {
            // This may take some time, so we ensure we display a loading indicator in the page
            // while all messages are being expanded
            setTimeout(() => this.setState({expandAllRenderAsync: false}), this.EXPAND_ALL_RENDER_ASYNC_DELAY);
        }
    },
    _onStreamsLoaded(streams) {
        this.setState({allStreamsLoaded: true, allStreams: Immutable.List(streams).sortBy(stream => stream.title)});
    },


    _fieldColumns() {
        return this.props.selectedFields;
    },
    _columnStyle(fieldName) {
        if (fieldName.toLowerCase() === 'source' && this._fieldColumns().size > 1) {
            return {width: 180};
        }
        return {};
    },
    expandAll() {
        // If more than 30% of the messages are being expanded, show a loading indicator
        //const expandedChangeRatio = (this.props.messages.length - this.state.expandedMessages.size) / 100;
        //const renderLoadingIndicator = expandedChangeRatio > 0.3;
        //
        //const newSet = Immutable.Set(this.props.messages.map((message) => message.id));
        //this.setState({expandedMessages: newSet, expandAllRenderAsync: renderLoadingIndicator});
    },
    collapseAll() {
        this.setState({expandedMessages: Immutable.Set()});
    },
    _handleSort(e, field, order) {
        e.preventDefault();
        SearchStore.sort(field, order);
    },
    _sortIcons(fieldName) {
        let sortLinks = null;
        // the classes look funny, but using the default asc/desc icons looks odd.
        // .sort-order-item does the margins
        // .sort-order-desc does the top: offset for the flipped icon
        // .sort-order-active indicates the currently active sort order
        const classesAsc = 'fa fa-sort-amount-asc sort-order-item';
        const classesDesc = 'fa fa-sort-amount-asc fa-flip-vertical sort-order-desc sort-order-item';
        // if the given field name is the one we sorted on
        sortLinks = (
            <span className="sort-order">
          <a href="#" onClick={(e) => this._handleSort(e, fieldName, "asc")}><i className={classesAsc}></i></a>
          <a href="#" onClick={(e) => this._handleSort(e, fieldName, "desc")}><i className={classesDesc}></i></a>
        </span>
        );
        return <span>{sortLinks}</span>;
    },
    expandAll: function () {
        console.log("1");
    },
    collapseAll: function () {
        console.log("2");
    },
    _toggleMessageDetail(id) {
        let newSet;
        if (this.state.expandedMessages.contains(id)) {
            newSet = this.state.expandedMessages.delete(id);
        } else {
            newSet = this.state.expandedMessages.add(id);
        }
        this.setState({expandedMessages: newSet});
    },

    render() {
        var selectedColumns = this._fieldColumns();
        return (
            <div className="content-col">
                <h1 className="pull-left">日志</h1>

                <ButtonGroup bsSize='small' className="pull-right">
                    <Button title="展开所有日志" onClick={this.expandAll}><i
                        className="fa fa-expand"></i></Button>
                    <Button title="收缩全部日志"
                            onClick={this.collapseAll}
                            disabled={this.state.expandedMessages.size === 0}><i
                        className="fa fa-compress"></i></Button>
                </ButtonGroup>

                <MessageTablePaginator position="top" currentPage={Number(this.props.page)}
                                       resultCount={this.props.resultCount}/>
                <div className="table-responsive">
                    <table className="table table-condensed messages">
                        <thead>
                        <tr>
                            <th style={{width: 180}}>Timestamp {this._sortIcons("timestamp")}</th>
                            { selectedColumns.toSeq().map(selectedFieldName => <th key={selectedFieldName}
                                                                                   style={this._columnStyle(selectedFieldName)}>{selectedFieldName} {this._sortIcons(selectedFieldName) }</th>) }
                        </tr>
                        </thead>
                        { this.props.messages.map((message) => <MessageTableEntry key={message.id}
                                                                                  message={message}
                                                                                  showMessageRow={this.props.selectedFields.contains('message')}
                                                                                  selectedFields={selectedColumns}
                                                                                  expanded={this.state.expandedMessages.contains(message.id)}
                                                                                  toggleDetail={this._toggleMessageDetail}
                                                                                  inputs={this.props.inputs}
                                                                                  streams={this.props.streams}
                                                                                  allStreams={this.state.allStreams}
                                                                                  allStreamsLoaded={this.state.allStreamsLoaded}
                                                                                  nodes={this.props.nodes}
                                                                                  highlight={this.props.highlight}
                                                                                  expandAllRenderAsync={this.state.expandAllRenderAsync}
                        />) }
                    </table>
                </div>

                <MessageTablePaginator position="bottom" currentPage={Number(this.props.page)}
                                       resultCount={this.props.resultCount}>
                    <ButtonGroup bsSize='small' className="pull-right"
                                 style={{position: 'absolute', marginTop: 20, right: 10}}>
                        <Button title="Expand all messages" onClick={this.expandAll}><i
                            className="fa fa-expand"></i></Button>
                        <Button title="Collapse all messages"
                                onClick={this.collapseAll}
                                disabled={this.state.expandedMessages.size === 0}><i
                            className="fa fa-compress"></i></Button>
                    </ButtonGroup>
                </MessageTablePaginator>
            </div>
        );
    },
});

export default ResultTable;
