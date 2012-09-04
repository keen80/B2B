App.stores.events = new Ext.data.EnhancedStore({
  model: 'Event',
  autoLoad: false,
  autoSync: false,
  remoteFilter: true,
  remoteSort: true,
  pageSize: 25,
  clearOnPageLoad: false,
  getGroupString : function(record) {
          return record.labelForTimeTag();
      },    
  proxy: {
    type: 'railsrest',
    url: Server.apiUrl("/events"),
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

Tmo.storeFilters.events = new StoreFilter(App.stores.events, "events", { search_scope: (new App.models.Event()).yoursEventsStatus(), search_query: '' });

App.stores.events.on('load', function(store,records,successful) {
  if (successful) {
    Tmo.storeFilters.events.dirty = false;
    var events_map = Ext.getCmp('events_map');
    if (events_map && App.mapListObserver) {
      App.mapListObserver.renderMarkers({
        setCenter: !_.include( Tmo.storeFilters.events.properties, "lat" )  //!Tmo.myLocationMarker.hasMarker('events_map')
      });
    }
  }
});
