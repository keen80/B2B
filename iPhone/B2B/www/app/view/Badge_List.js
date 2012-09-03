Ext.define('B2B.view.Badge_List', {
	extend: 'Ext.dataview.List',
	xtype: 'badgelistcomponent',
	config: {
		loadingText: i18n.app.HINT_LOADING,
		emptyText: '</pre><div class="badge-list-empty-text">'+utils.__(i18n.app.TEXT_NOBADGEFOUND)+'</div><pre>',
		itemTpl: new Ext.XTemplate([
				"<div class='{[this.getClass(values)]}'>",
					"{[this.getImageURL(values)]}",
					"{[this.getString(values)]}",
				"</div>"
			].join(""),
		{
			getClass: function(values) {
				return "badge-list-item-title small-list";
			},
			getImageURL: function(values) {
					var str = "",
					className = (values.active === true ? " active" : "");
					str = "<img class='" + className + "' src='";
					if (_.isEmpty(values.imageUlr)) {
						str += HH.default_badge64;
					}else{
						str += values.imageUrl;
					}
					str += "' width='64' height='64'>";
					return str;
			},
			getString: function(values) {
				var tpl = "",
					className = "badge-list-text";

				if (values.title) {
					className += (values.active === true ? " active" : "");
					tpl = "<div class='" + className + "'>" + values.title + "</div>";
					tpl += "</div>";
				}

				return tpl;
			}
		})
	}
});
