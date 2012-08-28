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
		};

    	var backPlaceDetailButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'placedetail_back_btn',
			handler: this.onPlaceDetailBackButtonTap,
			scope: this
		};
/*
		var reportPlaceButton = {
			xtype: "button",
			text: i18n.app.BTN_PLACEREPORT,
			ui: 'action',
			id: 'place_report_btn',
			handler: this.onPlaceReportButtonTap,
			scope: this
		};
*/

      var mapPanel = {
        xtype: 'map',
        id: 'mapMiniDrink',
        useCurrentLocation: false, 
        cls: 'mapMiniDrink',
        height: 100,
        width: 100,                                    
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
      };

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				backPlaceDetailButton/*,
				{ xtype: 'spacer' },
				reportBeerButton*/
			]
		};

		var content = {
			xtype: 'container',
			id: 'placeDetailContent',
			html: getStringHTMLFromValues(jsonData)
		};

		this.add([toolbar /*, mapPanel*/ , content]);

	},
	/*
	onPlaceReportButtonTap: function(){
		this.fireEvent("reportPlaceCommand", this);
	},*/
	onPlaceDetailBackButtonTap: function(){
		this.fireEvent("backPlaceDetailCommand", this);
	}
});