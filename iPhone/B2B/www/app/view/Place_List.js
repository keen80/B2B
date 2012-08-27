Ext.define('B2B.view.Place_List', {
    extend: 'Ext.dataview.List',
    xtype: 'placelistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        emptyText: '</pre><div class="beer-list-empty-text">'+utils.__(i18n.app.TEXT_NOBEERFOUND)+'</div><pre>',
        //itemTpl: '</pre><div class="beer-list-item-title">{placeName}</div><pre>',
        itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImageURL(values)]}{[this.getTextString(values)]}</div>",
            {
            	getClass: function(values){
            		return "activity-list-item small-list activity-type"+values.type;
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
                getTextString: function(values){
                    var str = '<div class="small-list-text">';
            		str += values.placeName;
                	str += '</div>';
                	str += '<div class="small-list-drinkedin">';
            		if(parseInt(values.drinkedIn) >0) str += values.drinkedIn;
                	str += "</div>";
                    return str;
                }
            }
   		)
	}
});
