Ext.regController('Album', {

    beforeFilter: function() {
        return Profile.requireUser();
    },

    index: function(options) {
        Tmo.storeFilters.pictures.dirty = true;
        Tmo.storeFilters.pictures.filter();
        this.renderPage('index', options, {albumType: options.albumType, albumObj: options.albumObj, albumOnShow: options.albumOnShow });
    },

    destroy: function(options) {
        Tmo.BackButton.clearCurrentConfig();
        var page = this;

        Server.request('POST', '/pictures/' + options.picture.getId(), {
            loadMask: true,
            params: {
                _method: 'DELETE'
            },
            success: function(result) {
                Tmo.Utils.dec(options.albumObj, 'pictures_count');

                var store = Tmo.storeFilters.pictures;
                store.dirty = true;
                store.filter(function(){
                    Ext.dispatch(Tmo.BackButton.last()); 
                });
            }
        });
    },

    show: function(options) {
        options.picture.set('picturable', options.albumObj);
        this.renderPage('show', options, {albumType: options.albumType, albumObj: options.albumObj, picture: options.picture});
    }
});