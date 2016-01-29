import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {t} from 'app/locale';
import SearchStore from 'stores/search/SearchStore';
import SearchResult from 'components/search/SearchResult';
import SearchBar from 'components/search/SearchBar';
import Immutable from 'immutable';
var json = require('./searchresult.json');
var historramJson = require('./historram.json');
var formattedHistogramJson = require('./formattedHistogram.json');
const SearchIndex = React.createClass({
    render() {
        var style = {
            'marginTop': '20px'
        };

        var query = "";
        var builtQuery = "";

        var searchResult = json;
        //if (searchResult) {
        //    searchResult = JSON.parse(searchResult);
        //}

        var histogram = historramJson;
        //if (histogram) {
        //    histogram = JSON.parse(histogram);
        //}

        var formattedHistogram = formattedHistogramJson;
        //if (formattedHistogram) {
        //    formattedHistogram = JSON.parse(formattedHistogram);
        //}

        var streams = "[]";
        if (streams) {
            streams = JSON.parse(streams);
        }

        var inputs = "[]";
        if (inputs) {
            inputs = JSON.parse(inputs);
        }

        var nodes = "[]";
        if (nodes) {
            nodes = JSON.parse(nodes);
        }

        var searchInStream = "[]";
        if (searchInStream) {
            searchInStream = JSON.parse(searchInStream);
            SearchStore.searchInStream = searchInStream;
        }
        return (
            <div id="main-content-search" style={style} className="row">
                <SearchBar/>
                <SearchResult query={query}
                              builtQuery={builtQuery}
                              result={searchResult}
                              histogram={histogram}
                              formattedHistogram={formattedHistogram}
                              streams={Immutable.Map(streams)}
                              inputs={Immutable.Map(inputs)}
                              nodes={Immutable.Map(nodes)}
                              searchInStream={searchInStream}
                />
            </div>
        );
    }
});

export default SearchIndex;