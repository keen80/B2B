App.stores.club_types = new Ext.data.EnhancedStore({
    model: 'UserDetail::ClubType',
    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/object_categories"),
      format: 'json',
      extraParams: { type: 'UserDetail::ClubType' },
      reader: {
        type: 'json',
        root: 'records',
        totalProperty: 'count'
      },
      writer: {
        type: 'json'
      }
    },
    remoteFilter: false,
    preventCleaning: true,
    autoLoad: false
});
