Ext.define('B2B.view.View_AboutUs', {
	extend: 'Ext.form.Panel',
	xtype: 'viewaboutus',
	config: {
		title: i18n.app.PANEL_TERMS,
		iconCls: 'settings6',
		styleHtmlContent: true,
		cls: 'slidableToolbar',
		html: [
			'<h1>About Us</h1>',
			i18n.app.TEXT_LOREM
		].join("")
	},
	initialize: function(){
        
        this.callParent(arguments);

        var toolbar = {
            xtype: 'toolbar',
            title: i18n.app.LABEL_ABOUTUS,
            cls: "sub_titlebar, slidableToolbar",
            docked: 'top',
            id: 'AboutusTitlebar',
            defaults: {
                iconMask: true
            }
        };

        this.add([toolbar]);
    }
});