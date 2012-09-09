Ext.define('B2B.view.Notification_List', {
    extend: 'Ext.dataview.List',
    requires: [
        'Ext.plugin.PullRefresh'
    ],
    xtype: 'notificationlist',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullRefreshText: 'Pull down for more!'
            }
        ],
        emptyText: [
            '<div class="notification-list-empty-text list-empty-text">',
                '<p>'+utils.__(i18n.app.TEXT_NONOTIFICATIONFOUND)+'</p>',
                '<p>'+utils.__(i18n.app.TEXT_WHYADDFRIEND)+'</p>',
            '</div>',
        ].join(""),
        itemTpl: new Ext.XTemplate([
                "<div class='{[this.getClass(values)]}'>",
                    "{[this.getTextString(values)]}",
                "</div>",
            ].join(""),
            {
                getClass: function(values){
                    var str = "notification-list-item small-list";
                    if (values.status == 1||values.status == "1"){
                        str += " to_read";
                    }
                    return str;
                },
                getImageURL: function(values){
                    var str = '<img class="avatar" src="';
                    if (_.isEmpty(values.image)){
                         str += HH.default_user32;
                     }else{
                        str+=values.image;
                     }
                    str += '" width="32" height="32">';
                    return str;
                },
                getTextString: function(values){

                     var str = [
                        "<div class='list-header-small'>",
                         /*   "<small class='time'>",
                                utils.getDate(values),
                            "</small>",*/
                            "<span class='info'>",
                                this.getImageURL(values),
                                values.displayName,
                            "</span>",
                        "</div>",
                        "<p class='list-text'>",
                            utils.getNotificationString(values),
                        "</p>",
                        "<div class='clear'></div>"
                    ].join("");
                    return str;
                }
            }
        )
	}
}); 
