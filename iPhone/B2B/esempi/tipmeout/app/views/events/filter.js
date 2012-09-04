App.views.EventsFilter = Ext.extend(App.views.FormPanelWithErrors, {
    initComponent: function() {                

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;        
        var fields;        

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('event.titles.filter'),
            defaults: {
                iconMask: true
            },
            items: [ backButton ]
        };

        fields = {
            xtype: 'fieldset',
            defaults: {
                cls: 'x-field-label-white'
            },
            items: []
        };       

        var storeFilter = Tmo.storeFilters.events;
        var event_category_options = App.stores.event_categories.data.items;

        Ext.each(event_category_options, function(item, index, allItems) {
          var checkbox = {
              xtype: "tmo_checkbox",
              name : item.data.id + '_event_category',
              label: item.data.name,
              value: item.data.id,
              checked: storeFilter.checkArrayIncludes('event_category_ids', String(item.data.id)),
              listeners: {
                  check: function(c){
                    var categories_array = storeFilter.getAsArray('event_category_ids');
                    categories_array.push(this.value);
                    storeFilter.set( 'event_category_ids', categories_array.join(',') )
                  },
                  uncheck: function(c){
                    var categories_array = storeFilter.getAsArray('event_category_ids');
                    categories_array.remove(this.value);
                    storeFilter.set( 'event_category_ids', categories_array.join(',') )
                  }
              }
          };
          fields.items.push(checkbox);
        });


        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'filter_events_form',
            scroll: 'vertical',
            dockedItems: [titleBar],
            items: [fields]
        });

        App.views.EventsFilter.superclass.initComponent.call(this);
    }
});

Ext.reg('EventsFilter', App.views.EventsFilter);