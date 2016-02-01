import React from 'react';
import MessageDetail from './MessageDetail';
import Immutable from 'immutable';
import momentHelper from '../../legacy/moment-helper';

const MessageTableEntry = React.createClass({

    shouldComponentUpdate(newProps)
    {
        if (this.props.highlight !== newProps.highlight) {
            return true;
        }
        if (!Immutable.is(this.props.selectedFields, newProps.selectedFields)) {
            return true;
        }
        if (this.props.expanded !== newProps.expanded) {
            return true;
        }
        if (this.props.expandAllRenderAsync !== newProps.expandAllRenderAsync) {
            return true;
        }
        if (this.props.allStreamsLoaded !== newProps.allStreamsLoaded) {
            return true;
        }
        if (this.props.showMessageRow !== newProps.showMessageRow) {
            return true;
        }
        return false;
    },
    possiblyHighlight(fieldName){
        debugger;
        const origValue = this.props.message.fields[fieldName];
        if (origValue === undefined) {
            return '';
        }
        if (this.props.highlight && this.props.message.highlight_ranges) {
            if (this.props.message.highlight_ranges.hasOwnProperty(fieldName)) {
                const chunks = [];
                const highlights = Immutable.fromJS(this.props.message.highlight_ranges[fieldName]).sortBy(range => range.get('start'));
                let position = 0;
                let key = 0;
                highlights.forEach((range, idx) => {
                    if (position !== range.get('start')) {
                        chunks.push(<span key={key++}>{origValue.substring(position, range.get('start'))}</span>);
                    }
                    chunks.push(<span key={key++}
                                      className="result-highlight-colored">{origValue.substring(range.get('start'), range.get('start') + range.get('length'))}</span>);
                    if ((idx + 1) < highlights.size) {
                        const nextRange = highlights.get(idx + 1);
                        chunks.push(<span
                            key={key++}>{origValue.substring(range.get('start') + range.get('length'), nextRange.get('start'))}</span>);
                        position = nextRange.get('start');
                    } else {
                        chunks.push(<span
                            key={key++}>{origValue.substring(range.get('start') + range.get('length'))}</span>);
                        position = range.get('start') + range.get('length');
                    }
                });
                return <span>{chunks}</span>;
            } else {
                return String(origValue);
            }
        } else {
            return String(origValue);
        }
    },
    _getFormattedTime(){
        //if (this.formattedTime === undefined) {
        //    this.formattedTime = momentHelper.toUserTimeZone(this.props.message.fields['timestamp']).format('YYYY-MM-DD HH:mm:ss.SSS');
        //}
        this.formattedTime=this.props.message.fields['timestamp'];
        return this.formattedTime;
    },
    _toggleDetail(){
        this.props.toggleDetail(this.props.message.id);
    },
    render(){
        const colSpanFixup = this.props.selectedFields.size + 1;

        let classes = "message-group";
        if (this.props.expanded) {
            classes += " message-group-toggled";
        }

        return (
            <tbody className={classes}>
            <tr className="fields-row" onClick={this._toggleDetail}>
                <td><strong>
                    <time title={this.props.message.fields['timestamp']}
                          dateTime={this.props.message.fields['timestamp']}>{this._getFormattedTime()}</time>
                </strong></td>
                { this.props.selectedFields.toSeq().map(selectedFieldName => <td
                    key={selectedFieldName}>{this.possiblyHighlight(selectedFieldName)}</td>) }
            </tr>

            {this.props.showMessageRow &&
            <tr className="message-row" onClick={this._toggleDetail}>
                <td colSpan={colSpanFixup}>
                    <div className="message-wrapper">{this.possiblyHighlight('message')}</div>
                </td>
            </tr>
            }
            {this.props.expanded &&
            <tr className="message-detail-row" style={{display: "table-row"}}>
                <td colSpan={colSpanFixup}>
                    <MessageDetail message={this.props.message} inputs={this.props.inputs} streams={this.props.streams}
                                   allStreams={this.props.allStreams} allStreamsLoaded={this.props.allStreamsLoaded}
                                   nodes={this.props.nodes} possiblyHighlight={this.possiblyHighlight}
                                   expandAllRenderAsync={this.props.expandAllRenderAsync}/>
                </td>
            </tr>
            }
            </tbody>
        );
    },
});

export default MessageTableEntry;
