Ext.define('B2B.view.Activity', {
	extend: 'Ext.Panel',
	xtype: 'activity',
	config: {
		title: i18n.app.PANEL_ACTIVITY,
		iconCls: 'home2',
		styleHtmlContent: true,
		layout: {
        	type: 'fit'
        }
	},
	initialize: function() {
        this.callParent(arguments);

        var storeProfile = Ext.getStore('Profile_Local'),
            storeJSONP = Ext.getStore('Activities_Ajax'),
            user = null,
            mylatestdrink = {
                xtype: "panel",
                id: "mylatestdrink",
                draggable: false,
                height: 80,
                docked: 'top',
                tpl: new Ext.XTemplate([
                    "<div class='{[this.getClass()]}'>",
                        "{[this.getTextString(values)]}",
                    "</div>"
                ].join(""),
                {
                    getClass: function(){
                        return "small-list";
                    },
                    getImageURL: function(a){
                        var str = '<img class="avatar" src="';
                        if (_.isEmpty(a.avatar)){
                             str += HH.default_user32;
                         }else{
                            str+=a.avatar;
                         }
                        str += '" width="32" height="32">';
                        return str;
                    },
                    getTextString: function(v){
                        var str = [
                            "<div class='list-header-small'>",
                                "<small class='time'>",
                                    utils.getDate(v),
                                "</small>",
                                "<span class='info'>",
                                    this.getImageURL(v),
                                "</span>",
                            "</div>",
                            "<p class='list-text'>",
                              utils.getDrinkString(v),
                            "</p>",
                            "<div class='clear'></div>"
                        ].join("");

                        return str;
                    }
                })
            },
            activitylist = {
                xtype: "activitylist",
                id: 'activitylist',
                store: Ext.getStore("Activities_Local"),
            };

        if (storeProfile && storeProfile.getCount() > 0) {
            user = storeProfile.first().data;
            HH.log("LOAD PROFILE FOR ACTIVITY " + user.idUser);
            storeJSONP.getProxy().setExtraParam('idUser', user.idUser);
            storeJSONP.getProxy().setExtraParam('btUsername',user.idUser);
            storeJSONP.getProxy().setExtraParam('btSid','puppa');//user.token
        }

        storeJSONP.load();

		this.add([ mylatestdrink, activitylist ]);
    }
});