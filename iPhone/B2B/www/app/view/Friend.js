Ext.define('B2B.view.Friend', {
	extend: 'Ext.Panel',
	xtype: 'friend',
	config: {
		title: i18n.app.LABEL_FRIENDS,
		iconCls: 'smiley_friends',
        layout: {
        	type: 'fit'
        }
	},
	initialize: function(){
    	this.callParent(arguments);
    	var storeProfile = Ext.getStore("Profile_Local");
    	var storeAjaxFriend=Ext.getStore('Friends_Ajax');
    	var user=storeProfile.first().data;
		HH.log("LOAD PROFILE FOR FRIENDS "+user.idUser);
		storeAjaxFriend.getProxy().setExtraParam('idUser', user.idUser);
		storeAjaxFriend.getProxy().setExtraParam('btUsername',user.idUser);
		storeAjaxFriend.getProxy().setExtraParam('btSid','puppa');//user.token
		//Ext.apply(storeAjaxFriend.getProxy().headers, {'btUsername':user.idUser});
		storeAjaxFriend.load();
		
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

		this.add([/*friendHeader,*/ friendListSearch, friendList]);

    }
});