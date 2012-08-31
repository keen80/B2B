Ext.define('B2B.view.Place_Detail', {
	extend: 'Ext.form.Panel',
	id: 'PlaceDetail',
	xtype: 'placedetailpanel',
	requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.field.Select',
        'Ext.ux.starrating.StarRating'
    ],
	config: {
		title: i18n.app.PANEL_PLACE,
		iconCls: 'add',
		layout: 'vbox'
	},
	initialize: function(){
		this.callParent(arguments);
    	var jsonData = this.jsonData,
	    	getStringHTMLFromValues = function(){
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
				html: getStringHTMLFromValues(jsonData),
				flex: 1
			},
			rating = {
				xtype: 'starrating',
				itemsCount : 10,
				label : '',
				value: 5,
				valueCls: 'x-starrating-value',
				itemCls : 'x-starrating',
				itemHoverCls : 'x-starrating-hover',
				height: 40
			};

		this.add([toolbar, content, rating, { xtype: 'spacer' }]);

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