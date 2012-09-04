// Share in place = Invite in Event
// at the moment we can have one view
// We need to:
// - change title + other texts
// - change historyURL? config in action section?
// - perhaps refactoring

App.views.EventsShowMap = Ext.extend(Ext.Panel, {
    initComponent: function() {        

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar, shareButton;

        /* --- init --------------------------------------------------------------------------------- */

        App.makeSharableFor(this.event, this, Tmo.Consts.SHARETYPE_SYSTEM | Tmo.Consts.SHARETYPE_EMAIL | Tmo.Consts.SHARETYPE_SMS);

        backButton = Tmo.BackButton.getBackButton();

        shareButton = App.getShareButtonFor(this.event, this);

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: Ext.util.Format.ellipsis(this.event.get('name'), 18),
            defaults: {
                iconMask: true
            },
            items: [ backButton, {xtype: 'spacer'}, (this.event.isOwnedBy(Profile.getCurrentUser()) || this.event.get('open_invitations')) ? shareButton : {xtype: 'spacer'} ]
        };

        /* --- content map tpl --- */

        var placePosition = new google.maps.LatLng(this.event.getPlaceFromRaw().get('lat'), this.event.getPlaceFromRaw().get('lng'));
        var placesMap = new Ext.Map({
            id: 'events_show_map',
            mapOptions : {
                zoom: 13,
                streetViewControl: false,
                mapTypeControl: false,
                center: placePosition
            },
            place: this.place,
            event: this.event,
            listeners: {
                afterrender:function()
                {
                  new google.maps.Marker({
                      map: this.map,
                      position: placePosition,
                      icon: new google.maps.MarkerImage( this.event.getMapIcon() )
                  });
                }
            }
        });

        /* --- bottom bar --- */

        var locationButton = {
            iconCls: 'locate',
            handler: this.onLocationAction,
            hidden: true
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
            id: 'events_show_map_card',
            dockedItems: [titleBar, bottomBar],
            items: [placesMap]
        });

        App.views.EventsShowMap.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onLocationAction: function() {
      Tmo.myLocationMarker.renderOnMap('events_show_map');
    }

});

Ext.reg('EventsShowMap', App.views.EventsShowMap);
