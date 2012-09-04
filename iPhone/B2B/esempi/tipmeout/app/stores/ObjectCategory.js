App.stores.object_categories = new Ext.data.EnhancedStore({
    model: 'ObjectCategory',
    modelName: 'ObjectCategory',
    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/object_categories"),
      format: 'json',
      reader: {
        type: 'json',
        root: 'records',
        totalProperty: 'count'
      },
      writer: {
        type: 'json'
      }
    },
    groupField: 'type',
    listeners: {
        load: function(el, records) {
            var groups = {};
            Ext.each(el.getGroups(), function(group){groups[group.name] = group.children});
            for(var key in App.stores) {
                items = groups[App.stores[key].model.modelName];
                if (items && items.length > 0)
                    App.stores[key].loadData(items);
            }
        }
    },
    remoteFilter: false,
    requireUser: true,
    preventCleaning: true,
    autoLoad: false
});