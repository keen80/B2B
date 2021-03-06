Ext.define('B2B.view.Feedback_List', {
    extend: 'Ext.dataview.List',
    requires: [
        'Ext.plugin.PullRefresh'
    ],
    xtype: 'feedbacklistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullRefreshText: 'Pull down for more!'
            }
        ],
        emptyText: '</pre><div class="feedback-list-empty-text">'+utils.__(i18n.app.TEXT_NOFEEDBACKFOUND)+'</div><pre>',
        itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImageURL(values)]}{[this.getTextString(values)]}{[this.getWhenString()]}</div>",
            {
            	getClass: function(values){
            		return "feedback-list-item small-list feedback-type"+values.type;
            	},
            	getImageURL: function(values){
                    var str = '<img class="avatar_small" src="';
                    if (_.isEmpty(values.image)){
                         str += 'resources/img/default/blank_avatar_32.png';
                     }else{
                        str+=values.image;
                     }
                    str += '" width="32" height="32">';
                	return str;
                },
                getWhenString: function(values){
                    var str = "<div class='small-list-when'>";
                    str += "5 minuti fa";
                    str += "</div>";
                    return str;
                },
                getTextString: function(values){
                    var str = "<div class='small-list-text'>";
            		str += 
                	str += "</div>";
                    return str;
                }
            }
   		)
	}
});
