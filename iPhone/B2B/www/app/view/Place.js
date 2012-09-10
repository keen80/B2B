Ext.define('B2B.view.Place', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.Map',
		'Ext.util.DelayedTask',
		'Ext.util.Geolocation'
	],
	xtype: 'place',
	config: {
		title: i18n.app.LABEL_CHECKIN,
		iconCls: 'locate',
		layout: 'card',
		scrollable: false,
		listeners : {
			show : function() {
				if (this.task) {
					this.task.delay(500);
				}
			}
		},
	},
	initialize: function() {
		this.callParent(arguments);
		var me = this;
			me.setMasked({
				xtype: 'loadmask',
				message: i18n.app.HINT_GEOLOAD
			});

		me.task = Ext.create('Ext.util.DelayedTask', function() {
			me.task.cancel();
			me.geolocation.updateLocation();
		});

		var mapplace = {
			xtype: 'map',
			id: 'mapplace',
			flex: 1,
			useCurrentLocation: true,
			height: 140,
			mapOptions: {
				zoom: HH.map.zoomLevel,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				navigationControl: false,
				zoomControl: false,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				panControl: false,
				draggable: false,
				scrollwheel: false,
                disableDoubleClickZoom: true
			},
			listeners: {
				maprender: function(me, map){
				map.markers = [];
				},
				centerchange: function(me, map){
				if (map.clearMarkers) map.clearMarkers();
				map.markers.push(new google.maps.Marker({
						position: new google.maps.LatLng(this._geo.getLatitude(), this._geo.getLongitude()),
						map: map,
						icon: HH.map.marker
				}));
				}
			}
		},
		refreshAroundButton = {
			text: i18n.app.BTN_REFRESH,
			ui: 'action',
			id: 'refresh_around_btn',
			iconCls: 'refresh',
			handler: this.onRefreshAroundButtonTap,
			scope: this
		},
		backCheckButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'back_Check_btn',
			handler: this.onBackCheckButtonTap,
			scope: this
		},
		toolbar = {
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

		this.geolocation = Ext.create('Ext.util.Geolocation', {
			autoUpdate: false,
			listeners: {
				locationupdate: function(geo) {
					//Ext Call To server with call back
					/*
					if (map.clearMarkers) map.clearMarkers();
						map.markers.push(new google.maps.Marker({
							position: new google.maps.LatLng(this._geo.getLatitude(), this._geo.getLongitude()),
							map: map,
							icon: HH.map.marker
						}));
	*/
					var infobar = Ext.getCmp('placesearchinfobar'),
						geoStore = Ext.getStore("Places_Ajax");
					//geoStore.getProxy().extraParams.lat = geo.getLatitude();
					//geoStore.getProxy().extraParams.long = geo.getLongititude();
					geoStore.getProxy().setExtraParam('lat', geo.getLatitude());
					geoStore.getProxy().setExtraParam('lon', geo.getLongitude());
								HH.log('lat: '+ geo.getLatitude()+' , '+'lon:'+geo.getLongitude());
					utils.getReverseGeo(geo.getLatitude(), geo.getLongitude(), infobar);
					geoStore.load();
					me.setMasked(false);
				},
				locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
					console.error("[Geolocation] ERROR: " + message);
					me.setMasked(false);
					Ext.getStore("Places_Ajax").load();
					var callback = function(button) {
						if (button === 2) {
							this.geolocation.updateLocation();
							// me.fireEvent("backCheckCommand", me);
						}
					}
					utils.alert(i18n.app.HINT_GEOERROR, i18n.app.COMMON_ATTENTION, true, callback);
				}
			}
		});

		var placelist = {
			xtype: 'placelist',
			id: 'placelist',
			store: Ext.getStore("Places_Ajax"),
			flex: 1
		},
		squarelogo ={
			xtype: 'container',
			docked: 'bottom',
			id: 'foursquare_logo',
			html: '<img src="resources/img/poweredByFoursquare_footer.png" width="200px">'
		},
		placesearchinfobar = {
			xtype: 'container',
			id: "placesearchinfobar",
		 // docked: 'top',
			styleHtmlContent: true,
			html: i18n.app.TEXT_NOPLACEFOUND
		},
		verticalbox = {
			xtype: "container",
			id: 'placevbox',
			layout: 'vbox',
			align: 'stretch',
			items: [
				mapplace,
					placesearchinfobar,
					placelist
			]
		};

	this.add([toolbar, verticalbox, squarelogo ]);

	/* Done adding comps, start updating loc */

	},
	onRefreshAroundButtonTap: function() {
		this.geolocation.updateLocation();
		this.fireEvent("refreshAroundCommand", this);
	},
	onBackCheckButtonTap: function() {
		this.geolocation.setAutoUpdate(false);
		this.fireEvent("backCheckCommand", this);
	}
});

