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
                    position: new google.maps.LatLng(this._geo.getLatitude(), this._geo.getLongitude()),
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
		this.add([toolbar, mapPanel]);
		
		var html = this.getStringHTMLFromValues(this.jsonData);
		this.setHtml([html].join(""));
	},
	getStringHTMLFromValues: function(info){
		if (_.isEmpty(info.image)) {
		   value += '<img class="avatar_medium" src="' + info.image +'" />';
		}else{
			value += '<img class="avatar_medium" src="' + HH.default_place32 +'" />';
		}
		/*
		value += '<p>' + i18n.app.LABEL_BEERNAME + ': <span>' + _.titleize(info.name) + '</span></p>';
		if(info.brewery) value+= '<p>' + i18n.app.LABEL_BEERBREWERY + ': <span>' + _.titleize(info.brewery) + '</span></p>';
		if(info.beerstyle) value += '<p>' + i18n.app.LABEL_BEERSTYLE + ': <span>' + utils.getBeerStyleFromCode(parseInt(info.beerstyle)) + '</span></p>';
		if(info.beertype) value += '<p>' + i18n.app.LABEL_BEERTYPE + ': <span>' + utils.getBeerTypeFromCode(parseInt(info.beertype)) + '</span></p>';
		if(info.grad) value += '<p>' + i18n.app.LABEL_BEERGRAD + ': <span>' + info.grad + '</span></p>';
		if(info.nationality) value += '<p>' + i18n.app.LABEL_BEERNATIONALITY + ': <span>' + utils.getCountryFromCode(info.nationality) + '</span></p>';
		if(info.description) value += '<p>' + i18n.app.LABEL_BEERDESCRIPTION + ': <span>' + info.description + '</span></p>';
		*/
		return value;
	},/*
	onPlaceReportButtonTap: function(){
		this.fireEvent("reportPlaceCommand", this);
	},*/
	onPlaceDetailBackButtonTap: function(){
		this.fireEvent("backPlaceDetailCommand", this);
	}
});