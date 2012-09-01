Ext.define('B2B.view.Friend', {
	extend: 'Ext.Panel',
	xtype: 'friend',
	config: {
		title: i18n.app.LABEL_FRIENDS,
		iconCls: 'contacts',
        layout: {
        	type: 'fit'
        }
	},
	initialize: function(){
    	this.callParent(arguments);

        var friendHeader = {
            xtype: 'container',
            cls: 'header_img',
            height: 50,
            width: '100%',
            docked: 'top',
            html: '<img src="'+HH.default_user64+'" width="100%" height="50px" >'
        };

		var friendListSearch = {
			xtype: 'friendsearch',
			id: 'friendsearch'
		};

		var friendList = {
		    xtype: 'friendlist',
		    id: 'friendlist',
		    store: Ext.getStore("Friends_Local"),
		    ui: 'round'
		};

		this.add([friendHeader, friendListSearch, friendList]);

    }
});