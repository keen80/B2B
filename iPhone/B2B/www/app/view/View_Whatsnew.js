Ext.define('B2B.view.View_Whatsnew', {
	extend: 'Ext.form.Panel',
	xtype: 'viewwhatsnew',
	config: {
		title: i18n.app.PANEL_WHATSNEW,
		iconCls: 'settings6',
        cls: 'slidableToolbar',
		styleHtmlContent: true,
		items: [
			{

			}
		],
		html: [
			'<h1>Whats New</h1>',
			'I changed the default <b>HTML Contents</b> to something different!'
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
            },
            items: [
            ]
        };

        this.add([toolbar]);
    }
});