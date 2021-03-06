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
            activityheader = {
                xtype: 'container',
                cls: 'header_img',
                height: 50,
                width: '100%',
                docked: 'top',
                html: '<img src="'+HH.default_user64+'" width="100%" height="50px" >'
            },
            mylatestdrink = {
                xtype: "panel",
                id: "mylatestdrink",
                draggable: false,
                height: 80,
                docked: 'top',
                store: Ext.getStore("Drinks_Local"),
                //html: '<div class="loading_div"></div>'
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
                             str += HH.default_user64;
                         }else{
                            str+=a.avatar;
                         }
                        str += '" width="64" height="64">';
                        return str;
                    },
                    getTextString: function(values){
                        var str = [
                            "<div class='list-header-mylastdrink'>",
                                "<small class='time'>",
                                    utils.getDate(values),
                                "</small>",
                                "<span class='info'>",
                                    this.getImageURL(values),
                                "</span>",
                            "</div>",
                            "<p class='list-text'>",
                                "<strong>",
                                    utils.getDrinkString(values),
                                "</strong>",
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

		this.add([ /*activityheader,*/ mylatestdrink, activitylist ]);
    }
});