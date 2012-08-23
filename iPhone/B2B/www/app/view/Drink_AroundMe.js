Ext.define('B2B.view.Drink_AroundMe', {
	extend: 'Ext.Panel',
    requires: [
        'Ext.Map'
    ],
  id: 'drinkaroundmepanel',
	xtype: 'drinkaroundmepanel',
	config: {
		title: i18n.app.LABEL_CHECKIN,
		iconCls: 'locate',
    layout: 'card',
    scrollable: false
	},
  initialize: function(){
      this.callParent(arguments);

      var mapPanel = {
        xtype: 'map',
        id: 'mapDrink',
        useCurrentLocation: true, 
        height: 180,
        flex: 1,                                    
        mapOptions: {
            zoom: HH.map.zoomLevel,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            navigationControl: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            panControl: false,
            draggable: true
        },
        listeners: {
            maprender: function(comp, map){
                new google.maps.Marker({
                    position: new google.maps.LatLng(this._geo.getLatitude(), this._geo.getLongitude()),
                    map: map,
                    icon: HH.map.marker
                });
            }
        }
      };

      var refreshAroundButton = {
          text: i18n.app.BTN_REFRESH,
          ui: 'action',
          id: 'refresh_around_btn',
          handler: this.onRefreshAroundButtonTap,
          scope: this
      };

      var backCheckButton = {
          text: i18n.app.BTN_BACK,
          ui: 'back',
          id: 'back_Check_btn',
          handler: this.onBackCheckButtonTap,
          scope: this
      };

      var toolbar = {
          xtype: 'toolbar',
          docked: 'top',
          cls: 'sub_titlebar',
          title: i18n.app.PANEL_CHECKIN,
          id: 'AroundFormTitlebar',
          defaults: {
              iconMask: true
          },
          items: [
            backCheckButton,
            { xtype: 'spacer' },
            refreshAroundButton
          ]
      };

      var geo = Ext.create('Ext.util.Geolocation', {
    autoUpdate: false,
    listeners: {
        locationupdate: function(geo) {
            //Ext Call To server with call back
            var geoStore = Ext.getStore("Places_Ajax");
            //geoStore.getProxy().extraParams.lat = geo.getLatitude();
            //geoStore.getProxy().extraParams.long = geo.getLongititude();
            geoStore.getProxy().setExtraParam('lat', geo.getLatitude());
            geoStore.getProxy().setExtraParam('lon', geo.getLongitude());
            geoStore.load();
            /*geoStore.load({
              params: {
                lat: geo.getLatitude(),
                lon: geo.getLongititude()
              }
            }); */
        },
        locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
            console.error(message);
        }
    }
});
geo.updateLocation();

      var placeList = {
        xtype: "placelistcomponent",
        store: Ext.getStore("Places_Ajax"),
        flex: 1
      };

      var verticalBox = {
        xtype: "panel",
        layout: 'vbox',
        align: 'stretch',
        items: [
            mapPanel,
            placeList
        ]
      };

      this.add([toolbar, verticalBox ]);
  },
  onRefreshAroundButtonTap: function(){
        this.fireEvent("refreshAroundCommand", this);
  },
  onBackCheckButtonTap: function(){
        this.fireEvent("backCheckCommand", this);
  }

});

