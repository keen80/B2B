Ext.define('B2B.view.Activity_List', {
    extend: 'Ext.dataview.List',
    xtype: 'activitylistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        emptyText: '</pre><div class="activity-list-empty-text">'+utils.__(i18n.app.TEXT_NOACTIVITYFOUND)+'</div><pre>',
        itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'><img class='drinkAvatar' src=\"{[this.getImageURL()]}\" width=\"20\" height=\"20\"></img><span>{[this.getBadgeString(values)]}</span></div>",
            {
            	getClass: function(values){
            		return "activity-list-item_"+values.type;
            	},
            	getImageURL: function(values){
            		console.log("Passiamo");
                // I have to return either of two images
                // if  uId = 0, return 'resources/images/Image0.png'
                // if uId = 1, return 'resources/images/Image1.png'
                	return 'resources/images/Image0.png';
                },
                getBadgeString: function(values){
            		var str = utils.__(i18n.app.BADGES_TEXT1, values.displayName, values.beerName, values.placeName);
                	return str;
                }
            }
   		),
	}
});
