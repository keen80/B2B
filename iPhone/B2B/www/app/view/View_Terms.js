Ext.define('B2B.view.View_Terms', {
	extend: 'Ext.form.Panel',
	xtype: 'viewterms',
	config: {
		title: i18n.app.PANEL_TERMS,
		iconCls: 'settings6',
		styleHtmlContent: true,
		cls: 'slidableToolbar',
		html: [
			'<h1>Terms of Service</h1>',
			i18n.app.TEXT_LOREM,
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
            }
        };

        this.add([toolbar]);
    }
});