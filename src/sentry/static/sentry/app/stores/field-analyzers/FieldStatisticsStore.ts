/// <reference path="../../../declarations/bluebird/bluebird.d.ts" />
/// <reference path='../../../../node_modules/immutable/dist/immutable.d.ts'/>
/// <reference path="../../../declarations/node/node.d.ts" />

import Immutable = require('immutable');
import URLUtils = require('../../utils/URLUtils');
import SearchStore = require('stores/search/SearchStore');
const Qs = require('qs');

const FieldStatisticsStore = {
    FUNCTIONS: Immutable.OrderedMap({
        count: 'Total',
        mean: 'Mean',
        min: 'Minimum',
        max: 'Maximum',
        std_deviation: 'Std. deviation',
        variance: 'Variance',
        sum: 'Sum',
        cardinality: 'Cardinality',
    }),
    getFieldStatistics(field:string): Promise<string[]> {
        var originalSearchURLParams = SearchStore.getOriginalSearchURLParams();
        var streamId = SearchStore.searchInStream ? SearchStore.searchInStream.id : null;
        var rangeType = originalSearchURLParams.get('rangetype');
        var timerange = {};
        switch (rangeType) {
            case 'relative':
                timerange['range'] = originalSearchURLParams.get('relative');
                break;
            case 'absolute':
                timerange['from'] = originalSearchURLParams.get('from');
                timerange['to'] = originalSearchURLParams.get('to');
                break;
            case 'keyword':
                timerange['keyword'] = originalSearchURLParams.get('keyword');
                break;
        }

        var url = "";

        url = URLUtils.qualifyUrl(url);

        return null;
    }
};

export default FieldStatisticsStore;
