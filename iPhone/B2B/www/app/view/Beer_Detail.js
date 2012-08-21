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
		]
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
    },
	onBeerReportButtonTap: function(){
		this.fireEvent("reportBeerCommand", this);
	},
	onBeerDetailBackButtonTap: function(){
		this.fireEvent("backBeerDetailCommand", this);
	}
});