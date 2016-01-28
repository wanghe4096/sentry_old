import $ from 'jquery';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { Input, Button, ButtonToolbar, DropdownButton, MenuItem, Alert } from 'react-bootstrap';
import moment from 'moment';
import ChosenSelectInput from 'components/common/ChosenSelectInput';
//import DatePicker from 'components/common/DatePicker';
import SearchStore from 'stores/search/SearchStore';
import UIUtils from '../../utils/UIUtils';
import momentHelper from '../../legacy/moment-helper.js';
import SavedSearchesActions from 'actions/search/SavedSearchesActions';

const SearchBar = React.createClass({
    _queryChanged: function () {
        SearchStore.query = this.refs.query.getValue();
        this.setState({query: SearchStore.query});
    },
    getInitialState() {
        this.initialSearchParams = SearchStore.getParams();
        return {
            query: this.initialSearchParams.query,
        };
    },
    render() {
        return (
            <div className="row no-bm">
                <div className="col-md-12" id="universalsearch-container">
                    <form ref="searchForm"
                          className="universalsearch-form"
                          action=""
                          method="GET"
                          onSubmit={this._prepareSearch}>
                        <div id="search-container">
                            <Button type="submit" bsStyle="success" className="pull-left">
                                <i className="fa fa-search"></i>
                            </Button>

                            <div className="col-md-11">
                                <Input type="text"
                                       ref="query"
                                       name="q"
                                       value={this.state.query}
                                       onChange={this._queryChanged}
                                       placeholder=""/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    },
});

export default SearchBar;
