App.stores.check_ins = new Ext.data.EnhancedStore({
  model: 'CheckIn',
  autoLoad: false,
  autoSync: false,
  remoteFilter: true,
  remoteSort: true,
  clearOnPageLoad: false,
  proxy: {
    type: 'railsrest',
    url: Server.apiUrl("/check_ins"),
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

Tmo.storeFilters.check_ins = new StoreFilter(App.stores.check_ins, "check_ins", {});

App.stores.check_ins.on('load', function(store,records,successful) {
  if (successful) {
    Tmo.storeFilters.check_ins.dirty = false;
  }
});
