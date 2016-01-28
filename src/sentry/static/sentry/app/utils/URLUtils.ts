/// <reference path="../../declarations/node/node.d.ts" />

'use strict';

var Qs = require('qs');

var URLUtils = {
    qualifyUrl(url) {
        return "http://localhost:9000/sentry/";
    },
    appPrefixed(url) {
        return this.concatURLPath("http://localhost:9000/sentry/", url);
    },
    openLink(url, newWindow) {
        if (newWindow) {
            window.open(url);
        } else {
            window.location = url;
        }
    },
    getParsedSearch(location) {
        var search = {};
        var query = location.search;
        if (query) {
            if (query.indexOf("?") === 0 && query.length > 1) {
                query = query.substr(1, query.length - 1);
                search = Qs.parse(query);
            }
        }

        return search;
    },
    getParsedHash(location) {
        var result = {};
        var hash = location.hash;
        if (hash) {
            if (hash.indexOf("#") === 0 && hash.length > 1) {
                hash = hash.substr(1, hash.length - 1);
                result = Qs.parse(hash);
            }
        }
        return result;
    },
    replaceHashParam(name, newValue) {
        var origHash = URLUtils.getParsedHash(window.location);
        origHash[name] = newValue;
        window.location.replace(`#${Qs.stringify(origHash)}`);
    },
    concatURLPath() {
        const args = Array(arguments.length);
        for (let i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
        }

        const joinedPath = '/' + args.join('/');
        return joinedPath.replace(/[\/]+/g, '/');
    },
};

export = URLUtils;