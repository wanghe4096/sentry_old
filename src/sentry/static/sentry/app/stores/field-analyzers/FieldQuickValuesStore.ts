/// <reference path="../../../declarations/bluebird/bluebird.d.ts" />

import SearchStore = require('stores/search/SearchStore');
const Qs = require('qs');

const FieldQuickValuesStore = {
    getQuickValues(field:string): Promise<string[]> {
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

        return null;
    },
};

export default FieldQuickValuesStore;
