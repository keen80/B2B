Ext.define('B2B.view.Badge_List', {
	extend: 'Ext.dataview.List',
	xtype: 'badgelistcomponent',
	config: {
		loadingText: i18n.app.HINT_LOADING,
		emptyText: '</pre><div class="badge-list-empty-text">'+utils.__(i18n.app.TEXT_NOBADGEFOUND)+'</div><pre>',
		itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImageURL(values)]}{[this.getString(values)]}</div>",
		{
			getClass: function(values){
				return "badge-list-item-title small-list";
			},
			getImageURL: function(values){
					//resources/beer/style"+values.beerstyle+".png'
					var str = '<img class="badge_image_small" src="';
					if (_.isEmpty(values.imageUlr)){
						str += HH.default_badge32;
					}else{
						str += value.image;
					}
					str += '" width="32" height="32">';
					return str;
			},
			getString: function(values){
				var tpl = "<div class='small-list-text'>"+utils.getDisplayName(values)+"</div>";
				if(values.title){
					tpl += "<div class='small-list-subtext'>"+values.title;
					tpl += "</div>";
				}
				return tpl;
			}
		})
	}
});
