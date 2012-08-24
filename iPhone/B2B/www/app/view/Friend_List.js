Ext.define('B2B.view.Friend_List', {
    extend: 'Ext.dataview.List',
    xtype: 'friendlistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        emptyText: '</pre><div class="friend-list-empty-text">'+utils.__(i18n.app.TEXT_NOFRIENDFOUND)+'</div><pre>',
		itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getString(values)]}</div>",
        {
        	getClass: function(values){
        		return "friend-list-item-title";
        	},
            getString: function(values){
            	var tpl = 	"<img class='avatar_small' src='"+values.avatar+"'>"+
            				"<span class='title'>"+utils.getDisplayName(values)+"</span>";
            	if(values.firstName){
            		tpl += "<span class='subtitle'>"+values.firstName;
            		if(values.lastName) tpl += " "+values.lastName; 
            		tpl += "</span>";
            	}
            	return tpl;
            }
        })
	}
});
