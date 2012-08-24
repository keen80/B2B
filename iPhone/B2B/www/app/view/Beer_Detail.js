Ext.define('B2B.view.Beer_Detail', {
	extend: 'Ext.form.Panel',
	id: 'BeerDetail',
	xtype: 'beerdetailpanel',
	requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.field.Select'
    ],
	config: {
		title: i18n.app.PANEL_BEERDETAIL,
		iconCls: 'add',
		items: [
		],
		html: [
			'<h1>Beer Detail: '+'</h1>',
			'I changed the default <b>HTML Contents</b> to something different!'
		].join("")
	},
	initialize: function(){

    	this.callParent(arguments);

    	var backBeerDetailButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'beerdetail_back_btn',
			handler: this.onBeerDetailBackButtonTap,
			scope: this
		};

		var reportBeerButton = {
			xtype: "button",
			text: i18n.app.BTN_BEERREPORT,
			ui: 'action',
			id: 'beer_report_btn',
			handler: this.onBeerReportButtonTap,
			scope: this
		};

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				backBeerDetailButton,
				{ xtype: 'spacer' },
				reportBeerButton
			]
		};
		this.add([toolbar]);
		
		var html = this.getStringHTMLFromValues(this.jsonData.data);
		this.setHtml([html].join(""));
	},
	getStringHTMLFromValues: function(info){
		var value = '';
		   
		if (info.image !== null && info.image !== '') {
		   value += '<img id="beer_thumbnail" src="' + info.image +'" /><hr />';
		}
		
		value += '<p>' + i18n.app.HTML_NAME + ': <b>' + info.name + '</b></p>'+
				 '<p>' + i18n.app.HTML_DESCRIPTION + ': <b>' + info.brewery + '</b></p>';
		   
		return value;
	},
	onBeerReportButtonTap: function(){
		this.fireEvent("reportBeerCommand", this);
	},
	onBeerDetailBackButtonTap: function(){
		this.fireEvent("backBeerDetailCommand", this);
	}
});