Ext.define('B2B.view.Friend_Invite_Panel', {
	extend: 'Ext.Panel',
	xtype: 'friendinvitepanel',
	config: {
		title: i18n.app.LABEL_FRIENDS,
		iconCls: 'smiley_friends',
        layout: {
        	type: 'fit'
        }
	},
	initialize: function(){
    	this.callParent(arguments);

    	var storeAjaxFriend = Ext.getStore('Friends_Facebook_Ajax'),
    			friendHeader = {
	            xtype: 'container',
	            cls: 'header_img',
	            height: 50,
	            width: '100%',
	            docked: 'top',
	            html: '<img src="'+HH.default_user64+'" width="100%" height="50px" >'
	        },
	        friendListSearch = {
				xtype: 'friendinvitesearch',
				id: 'friendinvitesearch'
			},
			friendList = {
			    xtype: 'friendinvitelist',
			    id: 'friendinvitelist',
			    //store: Ext.getStore("Friends_Facebook_Local"),
			    ui: 'round'
			};
			if (true ) {
    	/* impostazione parametri request facebook
    		HH.log("LOAD PROFILE FOR FRIENDS " + user.idUser);
			storeAjaxFriend.getProxy().setExtraParam('idUser', user.idUser);
			storeAjaxFriend.getProxy().setExtraParam('btUsername',user.idUser);
			storeAjaxFriend.getProxy().setExtraParam('btSid', user.token);//user.token
			/Ext.apply(storeAjaxFriend.getProxy().headers, {'btUsername':user.idUser});*/
    	}

		storeAjaxFriend.load();
		this.add([/*friendHeader,*/ friendListSearch, friendList]);

    }
});