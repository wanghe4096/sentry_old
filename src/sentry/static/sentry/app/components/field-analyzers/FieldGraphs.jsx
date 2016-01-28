import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import LegacyFieldGraph from './LegacyFieldGraph';

const FieldGraphs = React.createClass({
    propTypes: {
        from: PropTypes.any.isRequired,
        to: PropTypes.any.isRequired,
        resolution: PropTypes.any.isRequired,
        searchInStream: PropTypes.bool,
    },
    getInitialState() {
        this.notifyOnNewGraphs = false;
        return null;
    },
    componentDidMount() {
        this.initialFieldGraphs = this.state.fieldGraphs;
        this.notifyOnNewGraphs = true;

    },
    componentWillUnmount() {
    },
    addFieldGraph(field) {
        const streamId = this.props.searchInStream ? this.props.searchInStream.id : undefined;
    },
    deleteFieldGraph(graphId) {
    },
    render() {
        const fieldGraphs = [];



        return (
            <div id="field-graphs">
                {fieldGraphs}
            </div>
        );
    },
});

export default FieldGraphs;
