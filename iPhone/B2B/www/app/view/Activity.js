Ext.define('B2B.view.Activity', {
	extend: 'Ext.Panel',
	xtype: 'activity',
	config: {
		title: i18n.app.PANEL_ACTIVITY,
		iconCls: 'smiley_friends',
		styleHtmlContent: true,
		layout: {
        	type: 'fit'
        }
	},
	initialize: function(){

    	this.callParent(arguments);
        var storeProfile = Ext.getStore("Profile_Local");
        var storeJSONP=Ext.getStore('Activities_Ajax');
        var user=storeProfile.first().data;
        HH.log("LOAD PROFILE FOR ACTIVITY "+user.idUser);
        storeJSONP.getProxy().setExtraParam('idUser', user.idUser);
        storeJSONP.getProxy().setExtraParam('btUsername',user.idUser);
        storeJSONP.getProxy().setExtraParam('btSid','puppa');//user.token
        storeJSONP.load();
        var activityheader = {
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
            //data: (myDrinks.first()).data,
            //html: '<div class="loading_div"></div>'
            tpl: new Ext.XTemplate([
                "<div class='{[this.getClass(values)]}'>",
                    "{[this.getTextString(values)]}",
                "</div>"
            ].join(""),
            {
                getClass: function(values){
                    return "small-list";
                },
                getImageURL: function(values){
                    var str = '<img class="avatar" src="';
                    if (_.isEmpty(values.avatar)){
                         str += HH.default_user32;
                     }else{
                        str+=values.avatar;
                     }
                    str += '" width="32" height="32">';
                    return str;
                },
                getTextString: function(values){
                    var str = [
                        "<div class='list-header-small'>",
                            "<small class='time'>",
                                utils.getDate(values),
                            "</small>",
                            "<span class='info'>",
                                this.getImageURL(values),
                            "</span>",
                        "</div>",
                        "<p class='list-text'>",
                          utils.getDrinkString(values),
                        "</p>",
                        "<div class='clear'></div>"
                    ].join("");

                    return str;
                }
            })
        };



        /*

            { name: 'idDrink', type: 'string' },
            { name: 'displayName', type: 'string' },
            { name: 'idUser', type: 'string' },
            { name: 'idBeer', type: 'string' },
            { name: 'beerName', type: 'string' },
            { name: 'idPlace', type: 'string' },
            { name: 'placeName', type: 'string' },
            { name: 'image', type: 'string' },
            { name: 'rate', type: 'int' },
            { name: 'insertedOn', type: 'date', dateformat: 'c' }


        */
        activitylist = {
            xtype: "activitylist",
            id: 'activitylist',
            store: Ext.getStore("Activities_Local"),
        }

		this.add([ /*activityheader,*/ mylatestdrink, activitylist ]);
    }
});