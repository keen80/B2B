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
		layout: 'vbox',
		scrollable: false,
		padding: 10
	},
	initialize: function(){
		this.callParent(arguments);
    	var jsonData = this.jsonData,
	    	getStringHTMLFromValues = function(){
				var value = '<div class="place-detail-info">';

				if (!_.isEmpty(jsonData.image)) {
				   value += '<img class="avatar_medium" src="' + jsonData.image +'" />';
				}else{
					value += '<img class="avatar_medium" src="' + HH.default_user64 +'" />';
				}

				value += "<h1>"+jsonData.placeName+"</p>";
				value += "<p>"+jsonData.url+"</p>";
				value += "<p>"+jsonData.category+"</p></div>";
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
			submitCheckInButton = {
				xtype: "button",
				text: i18n.app.BTN_CHECKIN,
				ui: 'action',
				id: 'submit_checkin_btn',
				height: 30,
				handler: this.onSubmitCheckInButtonTap,
				scope: this
			}
			content = {
				xtype: 'container',
				id: 'placeDetailContent',
				html: getStringHTMLFromValues(jsonData),
				margin: '10 0 10 0'
			},
			rating = {
				xtype: 'starrating',
				itemsCount : 5,
				label : '',
				value: 3,
				valueCls: 'x-starrating-value',
				itemCls : 'x-starrating',
				itemHoverCls : 'x-starrating-hover',
				height: 40,
				startValue: true,
				endValue: true,
				margin: '0 0 10 0'
			},
			beerlistsearchcomponent = {
				xtype: 'placebeerlistsearchcomponent'
			},
			beerList = {
		    	xtype: "placebeerlistcomponent",
		    	id: "placebeerlist",
		   		store: null,
		    	singleSelect: true,
		    	flex: 1
			},
			contentSearch = {
				xtype: 'container',
				id: 'searchBeerContent',
				layout: 'vbox',
				flex: 1,
				items: [
					beerlistsearchcomponent,
					beerList
				]
			},
			that = this,
			beerSelected = {
				xtype: 'container',
				id: 'beerSelectedContent',
				html: '',
				margin: '10 0 10 0',
				listeners: {
					tap: {
						fn: function() {
							that.fireEvent("searchNewBeerCommand", that);
						},
        				element: 'element'
					}
				}
			},
			containerBeerSelected = {
				xtype: 'panel',
				id: 'containerbeerselected',
				flex: 1,
				layout: 'card',
				items: [
					contentSearch,
					beerSelected
				]
			};

		this.add([toolbar, submitCheckInButton, content, rating, containerBeerSelected]);
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
	},
	onSubmitCheckInButtonTap: function(){
		this.fireEvent("submitCheckInCommand", this);
	}
});