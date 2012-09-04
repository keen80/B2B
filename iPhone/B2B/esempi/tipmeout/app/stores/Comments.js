App.stores.comments = new Ext.data.EnhancedStore({
  model: 'Comment',
  autoLoad: false,
  autoSync: false,
  remoteFilter: true,
  remoteSort: true,
  proxy: {
    type: 'railsrest',
    url: Server.apiUrl("/comments"),
    format: 'json',
    reader: {
      type: 'json',
      root: 'records',
      totalProperty: 'count'
    },
    writer: {
      type: 'json'
    }
  }
});

Tmo.storeFilters.comments = new StoreFilter(App.stores.comments, "comments", { commentable_type: "", commentable_id: 0 });

App.stores.comments.on('load', function(store,records,successful) {
  if (successful) { Tmo.storeFilters.comments.dirty = false; }
});
