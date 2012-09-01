Ext.define('B2B.view.Friend_List', {
	extend: 'Ext.dataview.List',
	xtype: 'friendlist',
	config: {
		loadingText: i18n.app.HINT_LOADING,
		emptyText: '</pre><div class="friend-list-empty-text">'+utils.__(i18n.app.TEXT_NOFRIENDFOUND)+'</div><pre>',
		itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImageURL(values)]}{[this.getString(values)]}</div>",
		{
			getClass: function(values){
				return "friend-list-item-title small-list";
			},
			getImageURL: function(values){
					//resources/beer/style"+values.beerstyle+".png'
					var str = '<img class="avatar_small" src="';
					if (_.isEmpty(values.image)){
						str += HH.default_user32;
					}else{
						str += value.image;
					}
					str += '" width="32" height="32">';
					return str;
			},
			getString: function(values){
				var tpl = "<div class='small-list-text'>"+utils.getDisplayName(values)+"</div>";
				if(values.firstName){
					tpl += "<div class='small-list-subtext'>"+values.firstName;
					if(values.lastName) tpl += " "+values.lastName;
					tpl += "</div>";
				}
				return tpl;
			}
		})
	}
});
