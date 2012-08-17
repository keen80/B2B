Ext.define('B2B.view.User_Profile_Container', {
	extend: 'Ext.Container',
	xtype: 'userprofilecontainerpanel',
	requires: [
		'Ext.carousel.Carousel'
	],

	config: {
		title : i18n.app.LABEL_ABOUT,
		iconCls : 'user',
		cls: 'cards',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		defaults: {
			flex: 1
		},
        items: [
        	{
			    xtype: 'carousel',
			    items: [
			    	{
			    		xtype: 'userprofileaboutpanel',
			    		cls: 'card'
			    	},
			    	{
			    		xtype: 'userpreferencesform',
			    		cls: 'card'
			    	},
			    	{
			    		xtype: 'userprofileprivacyform',
			    		cls: 'card'
			    	}
			    ]
			}
        ]
    }
});