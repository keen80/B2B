Ext.define('B2B.view.View_Whatsnew', {
	extend: 'Ext.Panel',
	xtype: 'viewwhatsnew',
	config: {
		title: i18n.app.PANEL_WHATSNEW,
		iconCls: 'settings6',
		styleHtmlContent: true,
        cls: 'slidableToolbar',

		html: [
			'<h1>Whats New</h1>',
			i18n.app.TEXT_LOREM,
		].join("")
	},
	initialize: function(){
        
        this.callParent(arguments);

        var toolbar = {
            xtype: 'toolbar',
            title: i18n.app.LABEL_WHATSNEW,
            cls: "sub_titlebar, slidableToolbar",
            docked: 'top',
            id: 'WhatsnewTitlebar',
            defaults: {
                iconMask: true
            }
        };

        this.add([toolbar]);
    }
});