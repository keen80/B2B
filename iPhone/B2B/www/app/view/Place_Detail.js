Ext.define('B2B.view.Place_Detail', {
	extend: 'Ext.form.Panel',
	id: 'PlaceDetail',
	xtype: 'placedetailpanel',
	requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.field.Select'
    ],
	config: {
		title: i18n.app.PANEL_PLACE,
		iconCls: 'add'
	},
	initialize: function(){

    	this.callParent(arguments);
    	var jsonData = this.jsonData;

    	var getStringHTMLFromValues = function(){
			var value = "";

			if (!_.isEmpty(jsonData.image)) {
			   value += '<img class="avatar_medium" src="' + jsonData.image +'" />';
			}else{
				value += '<img class="avatar_medium" src="' + HH.default_user64 +'" />';
			}

			value += "<h1>"+jsonData.placeName+"</p>";
			value += "<p>"+jsonData.url+"</p>";
			value += "<p>"+jsonData.category+"</p>";
			return value;
		},
		backPlaceDetailButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'placedetail_back_btn',
			handler: this.onPlaceDetailBackButtonTap,
			scope: this
		},
		mapPanel = {
	        xtype: 'map',
	        id: 'mapMiniDrink',
	        useCurrentLocation: false,
	        cls: 'mapMiniDrink',
	        height: 100,
	        mapOptions: {
	            zoom: HH.map.zoomLevel2,
	            mapTypeId : google.maps.MapTypeId.ROADMAP,
	            navigationControl: false,
	            zoomControl: false,
	            mapTypeControl: false,
	            scaleControl: false,
	            streetViewControl: false,
	            panControl: false,
	            draggable: false
	        },
	        listeners: {
	            maprender: function(me, map){
	                map.markers = [];
	                var position = new google.maps.LatLng(5.978132,116.072617);
	                setTimeout(function() {
	                    map.panTo(position);
	                }, 1000);
	            },
	            centerchange: function(me, map){
	              map.clearMarkers();
	              map.markers.push(new google.maps.Marker({
	                    position: new google.maps.LatLng(5.978132, 116.072617),
	                    map: map,
	                    icon: HH.map.marker
	              }));
	            }
	        }
	    },
	    friendCheckInList = {
		    xtype: "drinkincheckinlistcomponent",
		    store: Ext.getStore("DrinkInCheckIn_Ajax")
		},
		toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				backPlaceDetailButton/*,
				{ xtype: 'spacer' },
				reportBeerButton*/
			]
		},
		content = {
			xtype: 'container',
			id: 'placeDetailContent',
			html: getStringHTMLFromValues(jsonData)
		},
		drinkInButton = {
			xtype: "button",
			text: i18n.app.BTN_DRINKIN,
			ui: 'action',
			id: 'favorites_add_btn',
			handler: this.onDrinkInButtonTap,
			scope: this
			//docked: 'bottom'
		},
		beerButton = {
			xtype: "button",
			text: i18n.app.BTN_ADDBEERDRINK,
			ui: 'action',
			id: 'add_beerdrink_btn',
			handler: this.onSelectBeerButtonTap,
			scope: this
		},
		actionButton = beerButton;
		//TODO CHECK
		if(false){
			actionButton = drinkInButton;
		}

		this.add([toolbar, mapPanel, content, actionButton, friendCheckInList]);

	},
	/*
	onPlaceReportButtonTap: function(){
		this.fireEvent("reportPlaceCommand", this);
	},*/
	onPlaceDetailBackButtonTap: function(){
		this.fireEvent("backPlaceDetailCommand", this);
	},
	onSelectBeerButtonTap: function(){
		this.fireEvent("selectBeerDrinkCommand", this);
	},
	onDrinkInButtonTap: function(){
		this.fireEvent("onDrinkInCommand", this);
	}
});