// Share in place = Invite in Event
// at the moment we can have one view
// We need to:
// - change title + other texts
// - change historyURL? config in action section?
// - perhaps refactoring

App.views.PlacesShowMap = Ext.extend(Ext.Panel, {
    initComponent: function() {        

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar, shareButton;

        /* --- init --------------------------------------------------------------------------------- */

        App.makeSharableFor(this.place, this, Tmo.Consts.SHARETYPE_SYSTEM | Tmo.Consts.SHARETYPE_EMAIL | Tmo.Consts.SHARETYPE_SMS);

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: Ext.util.Format.ellipsis(this.place.data.name, 18),
            defaults: {
                iconMask: true
            },

            items: [ backButton, {xtype: 'spacer'}, App.getShareButtonFor(this.place, this) ]
        };

        /* --- content map tpl --- */

        var placePosition = new google.maps.LatLng(this.place.data.lat, this.place.data.lng);
        var placesMap = new Ext.Map({
            id: 'places_show_map',
            mapOptions : {
                zoom: 13,
                streetViewControl: false,
                mapTypeControl: false,
                center: placePosition
            },
            place: this.place,
            listeners: {
                afterrender:function()
                {
                  new google.maps.Marker({
                      map: this.map,
                      position: placePosition,
                      icon: new google.maps.MarkerImage( this.place.getMapIcon() )
                  });
                }
            }
        });

        /* --- bottom bar --- */

        var locationButton = {
            iconCls: 'locate',
            handler: this.onLocationAction
        };

        var bottomBar = {
            dock: 'bottom',
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ locationButton ]
        };

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            id: 'places_show_map_card',
            dockedItems: [titleBar, bottomBar],
            items: [placesMap]
        });

        App.views.PlacesShowMap.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */
    onLocationAction: function() {
      Tmo.myLocationMarker.renderOnMap('places_show_map');
    }

});

Ext.reg('PlacesShowMap', App.views.PlacesShowMap);
