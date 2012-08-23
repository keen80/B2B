Ext.define('B2B.view.View_AboutUs', {
	extend: 'Ext.form.Panel',
	xtype: 'viewaboutus',
	config: {
		title: i18n.app.PANEL_TERMS,
		iconCls: 'settings6',
		styleHtmlContent: true,
		cls: 'slidableToolbar',
		html: [
			'<h1>Ab</h1>'outUs,
			'I changed the default <b>HTML Contents</b> to something different!'
		].join("")
	},
	initialize: function(){
        
        this.callParent(arguments);

        var toolbar = {
            xtype: 'toolbar',
            title: i18n.app.LABEL_ABOUTUS,
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