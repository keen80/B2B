App.addPlaceByReference = function(map, reference) {

    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
        reference: reference
    }, function(place, status) {
        var place_details = place;
        
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          Server.request('GET', '/places/exists.json', {
            params: {gp_id: place_details.id},
            success: function(result) {
              if ( !result.exists ) {
                App.new_place = Ext.ModelMgr.create({},'Place');

                Tmo.tryCatch(function(){
                    App.new_place.fillWithGooglePlace(place_details);
                }, { gp: place_details, place: App.new_place, reference: reference })

                Ext.redirect('Places/new_form');
              } else {
                var place = Ext.ModelMgr.create(result.records[0], 'Place');
                Ext.dispatch({
                    controller: 'Places',
                    action: 'show',
                    historyUrl: 'Places/show/' + place.getId(),
                    place: place
                });
              }
            }
          });
        }
        
    });
};


// view_id must be uniq per all partial usages
App.createPlaceCategoriesView = function (view_id, store_filter, filter_button_id) {
    var filter_places_button_id = filter_button_id || 'filter_places_bt';

    return new Ext.DataView({
        cls:'categories_scroll',
        id:view_id,
        itemSelector:'div.category_item',
        scroll:'horizontal',
        store:App.stores.place_categories,
        tpl:new Ext.XTemplate(
            '<div class="categories_scroll_wrapper">',
            '<tpl for=".">',
            '<div class="category_item" data-id="{id}" id="category_{id}_item">',
            '  <div class="category_thumb" style="background-image: url(images/icons/places_categories/{icon})"></div>',
            '  <div class="category_name">{shortcut}</div>',
            '</div>',
            '</tpl>',
            '</div>'
        ),
        listeners:{
            itemtap:{
                fn:function (dataview, index, item, e) {
                    var element = Ext.get(item);
                    var storeFilter = store_filter;
                    var category_id = dataview.store.getAt(index).data.id;
                    var filterPlaceButton = Ext.get(filter_places_button_id);

                    if (element.hasCls("x-item-selected")) {
                        storeFilter.set('category_id', '');
                        if (filterPlaceButton) {
                            filterPlaceButton.hide();
                        }
                    } else {
                        storeFilter.set('category_id', category_id);
                        if (filterPlaceButton) {
                            filterPlaceButton.show();
                        }
                    }

                    Ext.each(['budget_id', 'type_id', 'theme_id', 'delay_id', 'cuisine_id', 'occasions_ids', 'targets_ids'], function (filterParam) {
                        storeFilter.set(filterParam, '');
                    });

                    storeFilter.filter();
                }
            },
            afterrender:function () {
                var category_id = store_filter.get('category_id');
                if (Ext.get('category_' + category_id + '_item')) {
                    var categories_ids = _.map(Ext.getCmp(view_id).store.data.items, function (item) {
                        return String(item.data.id)
                    });
                    var position = _.indexOf(categories_ids, category_id);
                    Ext.getCmp(view_id).select(position, false, true)
                }
            },
            beforedestroy:function () {
                if (App.mapListObserver) {
                    App.mapListObserver.clearMarkers();
                }
                App.mapListObserver = null;
            }
        }
    });
};