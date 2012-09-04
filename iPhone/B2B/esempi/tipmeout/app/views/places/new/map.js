App.views.PlacesNewMap = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var searchBar;
        var gmap;
        var locationButton, pointOnMapButton, cancelPointingButton, createButton, bottomBar;
        var viewInstance = this;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('place.actions.new.new_place_header'),
            defaults: {
                iconMask: true
            },
            items: [ backButton ]
        };

        /* --- search bar --- */

        searchBar = {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'light',
            items: [
                {
                    xtype: 'searchfield',
                    useClearIcon: true,
                    flex: 1,
                    value: this.search_query,
                    id: 'new_place_search',
                    listeners: {
                        change:
                        {
                            fn: this.pressSearch,
                            scope: this
                        }
                    }
                },
                {
                    text: I18n.t('action.search_link'),
                    id: 'search_link_new_place',
                    ui: 'action',
                    handler: function() {
                        Tmo.Adapters.keyboard.hide();
                        Tmo.LoadMask.show();

                        var center = gmap.map.getCenter();
                        viewInstance.onSearchAction(center.lat(), center.lng(), 10000, function(){
                            viewInstance.onClearLocationAction();
                            if (App.new_places[0]) {
                                viewInstance.centerOnPosition(App.new_places[0].marker.position);
                                google.maps.event.trigger(App.new_places[0].marker, 'click');
                            }
                            Tmo.LoadMask.hide();
                        });
                    }
                }
            ]
        };

        /* --- bottom bar --- */

        locationButton = {
            id: 'locate',
            iconCls: 'locate',
            handler: this.onLocationAction
        };

        pointOnMapButton = {
            text: I18n.t('place.actions.point_on_map_link'),
            id: 'point_on_map',
            handler: this.onPointOnMapAction
        };

        cancelPointingButton = {
            text: I18n.t('place.actions.cancel_point_on_map'),
            id: 'pointing_on_map',
            ui: 'action',
            hidden: true,
            handler: this.onCancelPointingAction
        };

        createButton = {
            text: I18n.t('place.actions.new.add_new_place'),
            id: 'add_current_location_place',
            ui: 'confirm',
            hidden: true,
            handler: this.onAddCurrentLocationAction
        };

        bottomBar = {
            dock: 'bottom',
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },
            items: [ locationButton, pointOnMapButton, cancelPointingButton, {xtype: 'spacer'}, createButton ]
        };

        /* --- map --- */
        gmap = new Ext.Map({

            id: 'new_place_map',
            plugins: [ Tmo.mapLoader.plugin ],
            //useCurrentLocation: true,
            mapOptions : {
                center: Tmo.geo.position,
                zoom: 13,
                //disableDoubleClickZoom: true,
                streetViewControl: false,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },

            listeners: {
                maprender : function(comp, map) {
                    google.maps.event.addListener(map, 'click', function(event) {
                        if (!Ext.getCmp('pointing_on_map').hidden) {
                            Ext.getCmp('new_place_map_panel').resetPointingButton();
                            Ext.getCmp('add_current_location_place').show();
                            Tmo.myLocationMarker.renderMarkerAtPositionOnMap('new_place_map', event.latLng, { setCenter: true });
                            Tmo.geo.position = event.latLng;
                        }
                    });
                },
                afterrender: function() {
                    if (App.new_places && App.new_places[0]) {
                        viewInstance.centerOnPosition(App.new_places[0].marker.position);
                    } else {
                        Ext.getCmp('new_place_map_panel').onSearchAction(Tmo.geo.lat, Tmo.geo.lng, 10000);
                        if (!App.new_place.positionIsUndefined()) {
                            Tmo.myLocationMarker.renderMarkerAtPositionOnMap('new_place_map', App.new_place.getPosition(), { setCenter: true });
                            Tmo.geo.position = App.new_place.getPosition();
                            Ext.getCmp('add_current_location_place').show();
                        } else {
                            Tmo.myLocationMarker.renderOnMap('new_place_map', function() {
                                Ext.getCmp('add_current_location_place').show();
                            });
                        }
                    }
                    App.new_place.unsetPosition();
                }
            }
        });


        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'new_place_map_panel',
            layout: 'card',
            dockedItems: [titleBar, searchBar, bottomBar],
            items: [gmap],
            listeners: {
                show: function(c) {
                    Ext.getCmp('search_link_new_place').handler()
                }
            }
        });

        App.views.PlacesNewMap.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onLocationAction: function()
    {
      Tmo.myLocationMarker.renderOnMap('new_place_map', function(){
        Ext.getCmp('add_current_location_place').show();
      });
    },

    onClearLocationAction: function()
    {
      Ext.getCmp('add_current_location_place').hide();
      Tmo.myLocationMarker.clearMarker('new_place_map');
    },

    onPointOnMapAction: function()
    {
        Ext.getCmp('point_on_map').hide();
        Ext.getCmp('pointing_on_map').show();
        Ext.getCmp('new_place_map').map.setOptions({disableDoubleClickZoom: true});
    },

    onCancelPointingAction: function()
    {
        this.resetPointingButton();
        Ext.getCmp('add_current_location_place').hide();
        Tmo.myLocationMarker.clearMarker('new_place_map');
    },

    resetPointingButton: function()
    {
        Ext.getCmp('pointing_on_map').hide();
        Ext.getCmp('point_on_map').show();
        Ext.getCmp('new_place_map').map.setOptions({disableDoubleClickZoom: false});
    },

    pressSearch: function()
    {
        Ext.getCmp('search_link_new_place').handler();
    },

    onSearchAction: function(lat, lng, radius, successCallback)
    {
        var map = Ext.getCmp('new_place_map').map;
        var service = new google.maps.places.PlacesService(map);

        var infowindowOptions = {
            alignBottom: true,
            boxClass: 'gm_info_window',
            closeBoxMargin: "2px 2px 2px 2px",
            closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false
        };

        var infowindow = new InfoBox(infowindowOptions);

        window.localStorage.new_place_search = Ext.getCmp('new_place_search').getValue();

        if (App.new_places) {
            Ext.each(App.new_places, function() {
                this.marker.setMap(null);
            })
        }

        if (Ext.isEmpty(window.localStorage.new_place_search)) {
            successCallback && successCallback.call();
            App.new_places = null;
            return false;
        }
        
        var request = {
            name: window.localStorage.new_place_search,
            location: (new google.maps.LatLng(lat, lng)),
            radius: radius
        };

        App.new_places = [];

        var createMarker = function(options) {
            var marker = new google.maps.Marker({
                map: map,
                position: options.position
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(options.popup);
                infowindow.open(map, this);
            });
            App.new_places.push({
                marker: marker,
                object: options.object
            });
        };

        service.search(request, function(results, status) {
            if ( status == google.maps.places.PlacesServiceStatus.OK ) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    createMarker({
                        position: place.geometry.location,
                        popup: "<p>" + place.name + "<br/>" + place.vicinity + "<p>" +
                            "<a onclick=\"Ext.getCmp('new_place_map_panel').onAddPlaceAction('" + place.reference + "');\">"+I18n.t('place.actions.new.add_new_place')+"</a>"
                    });
                }
            } else if ( status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS ) {
                var geocoder = new google.maps.Geocoder();

                geocoder.geocode({address: window.localStorage.new_place_search}, function(results, status) {
                    if ( status == google.maps.GeocoderStatus.OK ) {
                        if (results[0]) {
                            var address = results[0];
                            createMarker({
                                object: address,
                                position: address.geometry.location,
                                popup: "<p>" + address.formatted_address + "<p>" +
                                    "<a onclick=\"Ext.getCmp('new_place_map_panel').onAddAddressAction(App.new_places['" + App.new_places.length + "'].object);\">"+I18n.t('place.actions.new.add_address')+"</a>"
                            });
                            successCallback && successCallback.call();
                        }
                    } else if ( status == google.maps.GeocoderStatus.ZERO_RESULTS ) {}
                    else {
                        Ext.Msg.alert('Geocoder Status', status);
                    }
                });
            } else {
                Ext.Msg.alert('Places Service Status', status);
            }

            successCallback && successCallback.call();
        });

        return true;
    },

    onAddPlaceAction: function(reference) {
        Tmo.LoadMask.show();
        var map = Ext.getCmp('new_place_map').map;
        App.addPlaceByReference(map, reference);
    },

    onAddAddressAction: function(address) {
        Tmo.LoadMask.show();
        App.new_place = Ext.ModelMgr.create({},'Place');
        App.new_place.fillWithGoogleAddress(address);
        Ext.redirect('Places/new_form');
    },

    centerOnPosition: function(position) {
        if (position)
            Ext.getCmp('new_place_map').map.setCenter(position);
    },

    onAddCurrentLocationAction: function() {
      App.new_place = Ext.ModelMgr.create({},'Place');

      var service = new google.maps.Geocoder();
      var request = {
          location: Tmo.geo.position
      };

      service.geocode(request, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              var result = results[0];
              App.new_place.fillWithGoogleAddressComponents(result.address_components);
              App.new_place.data.lat = result.geometry.location.lat();
              App.new_place.data.lng = result.geometry.location.lng();

              Ext.redirect('Places/new_form');
          }
      });
    }
});

Ext.reg('PlacesNewMap', App.views.PlacesNewMap);
