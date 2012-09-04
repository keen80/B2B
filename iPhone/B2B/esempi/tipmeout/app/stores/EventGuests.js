App.stores.event_guests = new Ext.data.EnhancedStore({
  model: 'User',
  autoLoad: false,
  autoSync: false,
  remoteFilter: true,
  remoteSort: true,
  pageSize: 25,
  clearOnPageLoad: false,
  proxy: {
    type: 'railsrest',
    url: Server.apiUrl("/event_guests"),
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

Tmo.storeFilters.eventGuests = new StoreFilter(App.stores.event_guests, "eventGuests", { search_scope: (new App.models.EventGuest()).attendingStatus(), search_query: '', event_id: 0 });

App.stores.event_guests.on('load', function(store,records,successful) {
  if (successful) {
    Tmo.storeFilters.eventGuests.dirty = false;
  }
});
