import Reflux from 'reflux';
import $ from 'jquery';
import Qs from 'qs';
//import fetch from 'logic/rest/FetchProvider';

//import jsRoutes from 'routing/jsRoutes';
//import Routes from 'routing/Routes';

import SavedSearchesActions from 'actions/search/SavedSearchesActions';

import SearchStore from 'stores/search/SearchStore';

//import URLUtils from 'util/URLUtils';
//import UserNotification from 'util/UserNotification';

const SavedSearchesStore = Reflux.createStore({
    listenables: [SavedSearchesActions],
    sourceUrl: '/search/saved',
    savedSearches: undefined,

    init() {
        this.trigger({savedSearches: this.savedSearches});
    },

    list() {
        const promise = fetch('GET', "")
            .then(response => {
                this.savedSearches = response.searches;
                this.trigger({savedSearches: this.savedSearches});
            })
            .catch(error => {
                UserNotification.error('Fetching saved searches failed with status: ' + error,
                    'Could not get saved searches');
            });

        SavedSearchesActions.list.promise(promise);
    },

    getSavedSearch(searchId) {
        let currentSavedSearch;
        for (let i = 0; i < this.savedSearches.length && !currentSavedSearch; i++) {
            if (this.savedSearches[i].id === searchId) {
                currentSavedSearch = this.savedSearches[i];
            }
        }

        return currentSavedSearch;
    },

    isValidTitle(searchId, title) {
        for (let i = 0; i < this.savedSearches.length; i++) {
            const savedSearch = this.savedSearches[i];
            if (savedSearch.id !== searchId && savedSearch.title === title) {
                return false;
            }
        }

        return true;
    },

    execute(searchId, streamId, width) {
        const savedSearch = this.getSavedSearch(searchId);
        if (!savedSearch) {
            // show notification
            SavedSearchesActions.load.triggerPromise();
            return;
        }

        const searchQuery = {
            saved: searchId,
            width: width,
        };
        for (const paramName in savedSearch.query) {
            if (Object.hasOwnProperty.call(savedSearch.query, paramName)) {
                searchQuery[paramName.toLowerCase()] = savedSearch.query[paramName];
            }
        }

        const url = `${Routes.SEARCH}?${Qs.stringify(searchQuery)}`;
       // URLUtils.openLink(url, false);
    },

    _createOrUpdate(title, searchId) {
        const originalSearchParams = SearchStore.getOriginalSearchParamsWithFields();
        const queryParams = originalSearchParams.set('rangeType', originalSearchParams.get('range_type')).delete('range_type');
        const params = {title: title, query: queryParams.toJS()};

        let url;
        let verb;

        if (!searchId) {
            url = jsRoutes.controllers.api.SavedSearchesApiController.create().url;
            verb = 'POST';
        } else {
            url = jsRoutes.controllers.api.SavedSearchesApiController.update(searchId).url;
            verb = 'PUT';
        }

        return fetch(verb, "", JSON.stringify(params));
    },

    create(title) {
        const promise = this._createOrUpdate(title);
        promise
            .then(() => {
                UserNotification.success(`Search criteria saved as "${title}".`);
                SavedSearchesActions.list.triggerPromise();
            })
            .catch(error => {
                UserNotification.error('Saving search criteria failed with status: ' + error,
                    'Could not save search criteria');
            });

        SavedSearchesActions.create.promise(promise);
    },

    update(searchId, title) {
        const promise = this._createOrUpdate(title, searchId);
        promise
            .then(() => {
                UserNotification.success(`Saved search "${title}" was updated.`);
                SavedSearchesActions.list.triggerPromise();
            })
            .catch(error => {
                UserNotification.error(`Updating saved search "${title}" failed with status: ${error}`,
                    'Could not update saved search');
            });

        SavedSearchesActions.update.promise(promise);
    },

    delete(searchId) {
        const url = jsRoutes.controllers.api.SavedSearchesApiController.delete(searchId).url;
        const promise = fetch('DELETE', "");
        promise
            .then(() => {
                UserNotification.success(`Saved search "${this.savedSearches[searchId]}" was deleted successfully.`);
                $(document).trigger('deleted.graylog.saved-search', {savedSearchId: searchId});
            })
            .catch(error => {
                UserNotification.error(`Deleting saved search "${this.savedSearches[searchId]}" failed with status: ${error}`,
                    'Could not delete saved search');
            });

        SavedSearchesActions.delete.promise(promise);
    },
});

export default SavedSearchesStore;
