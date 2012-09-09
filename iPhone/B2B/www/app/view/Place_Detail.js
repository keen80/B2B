Ext.define('B2B.view.Place_Detail', {
	extend: 'Ext.form.Panel',
	xtype: 'placedetail',
	requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.field.Select',
        'Ext.ux.starrating.StarRating'
    ],
	config: {
		iconCls: 'add',
		layout: 'vbox',
		scrollable: false,
		padding: 10
	},
	initialize: function(){
		this.callParent(arguments);
    	var jsonData = this.jsonData,
    		that = this,
			getStringHTMLFromValues = function(values){
				var getImageURL = function(values){
                    var str = '<img class="avatar" src="';
                    if (_.isEmpty(values.image)){
                         str += HH.default_place48;
                     }else{
                        str+=values.image;
                     }
                    str += '" width="48" height="48">';
                	return str;
                };
                 var str = [
	                 "<div class='place-detail-item small-list'>",
	                    "<div class='list-header-small'>",
	                        "<span class='info'>",
	                            getImageURL(values),
	                            values.placeName,
	                        "</span>",
	                    "</div>",
	                    "<div class='list-footer'>",
	                        "<span class='location-category'>",
	                            utils.getLocationCategoryFromCode(values.category),
	                        "</span>",
	                       /* "<span class='drinkins'>",
	                            values.drinkedIn,
	                        "</span>",*/
	                    "</div>",
	                    "<div class='clear'></div>",
                    "</div>"
                ].join("");
                return str;
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
				title: i18n.app.PANEL_DRINKIN,
				items: [
					backPlaceDetailButton
				]
			},
			placedetailcontent = {
				xtype: 'container',
				id: 'placedetailcontent',
				html: getStringHTMLFromValues(jsonData)
			},
			submitCheckInButton = {
				xtype: "button",
				text: i18n.app.BTN_CHECKIN,
				ui: 'action',
				id: 'submit_checkin_btn',
				height: 30,
				handler: this.onSubmitCheckInButtonTap,
				scope: this
			},
			rating = {
				xtype: 'starrating',
				id: 'beerrating',
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
			beersearch = {
				xtype: 'beersearch',
				id: 'placebeersearch'
			},
			beerList = {
		    	xtype: "beerlist",
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
					beersearch,
					beerList
				]
			},
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



		var step1 = placedetailcontent;
		var step2 = {
			xtype: 'fieldset',
			id: 'drinkinstep2',
			title: i18n.app.FORM_DRINKIN_STEP2_TODO,
			items: [
				rating
			]
		};
		var step3 = {
				xtype: 'fieldset',
				id: 'drinkinstep3',
				title: i18n.app.FORM_DRINKIN_STEP3_TODO,
				items: [
					{
						xtype: 'tabpanel',
						id: 'beerchoosetab',
						ui: 'neutral',
						items: [
							{
								//xtype: "beer",
								title: "LIPPA",
								id: "drinkinplacebeerlist",
								//store: Ext.getStore("Beers_place_Local"),
								//flex: 1
							},
							{
								//xtype: "favoritesbeer",
								title: "CIPPA",
								id: "drinkinfavoritesbeerlist",
								store: Ext.getStore("FavoriteBeers_Local"),
								//flex: 1
							},
							{
							//	xtype: "beercomponentsearch",
								title: "CUCU",
								id: "drinkinbeersearch",
								//flex: 1
							}
						]
					}
				]
		}


		//this.add([toolbar, submitCheckInButton, content, rating, containerBeerSelected]);
		this.add([toolbar, step1, step2, step3]);
	},
	
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
		var profile = Ext.getStore('Profile_Local').first(),
			rating = Ext.getCmp("beerrating"),
			value = rating.getValue();

		this.fireEvent("checkInCommand", this, profile.data, null, this.jsonData.idPlace, "", value, value, value);
	}
});