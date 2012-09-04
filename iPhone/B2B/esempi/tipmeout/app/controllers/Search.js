Ext.regController('Search', {

    beforeFilter: function() {
        return Profile.requireUser();
    },

    // index action
    index: function(options) {
//        Tmo.storeFilters.explorePlaces.clear();
//        Tmo.storeFilters.exploreUsers.clear();
        Tmo.storeFilters.explorePlaces.filter();
        this.renderPage('index', options);
        if (Tmo.Flags.SEARCH_TAB === Tmo.Consts.SEARCH_TAB_MEMBERS) {
            Ext.getCmp('search_tabs').onActionChange(Tmo.Consts.SEARCH_TAB_MEMBERS)
        }
    }

});