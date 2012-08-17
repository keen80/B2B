Ext.define('B2B.view.View_Terms', {
	extend: 'Ext.form.Panel',
	xtype: 'viewterms',
	config: {
		title: i18n.app.PANEL_TERMS,
		iconCls: 'settings6',
		styleHtmlContent: true,
		cls: 'slidableToolbar',
		html: [
			'<h1>Disclaimer</h1>',
			'I changed the default <b>HTML Contents</b> to something different!'
		].join("")
	},
	initialize: function(){
        
        this.callParent(arguments);

        var toolbar = {
            xtype: 'toolbar',
            title: i18n.app.LABEL_TERMS,
            cls: "sub_titlebar, slidableToolbar",
            docked: 'top',
            id: 'DisclaimerTitlebar',
            defaults: {
                iconMask: true
            },
            items: [
            ]
        };

        this.add([toolbar]);
    }
});