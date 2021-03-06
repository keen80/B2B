Ext.define('B2B.view.Badge_List', {
	extend: 'Ext.dataview.List',
	xtype: 'badgelistcomponent',
	config: {
		loadingText: i18n.app.HINT_LOADING,
        emptyText: [
            '<div class="badge-list-empty-text list-empty-text">',
                '<p>'+utils.__(i18n.app.TEXT_NOBADGEFOUND)+'</p>',
            '</div>'
        ].join(""),
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
					if (_.isEmpty(values.image)) {
						str += HH.default_badge64;
					}else{
						str += values.image;
					}
					str += "' width='64' height='64'>";
					return str;
			},
			getString: function(values) {
				var tpl = "",
					className = "badge-list-text";

				if (values.name) {
					className += (values.active === true ? " active" : "");
					tpl = "<div class='" + className + "'>" + values.name + "</div>";
					tpl += "</div>";
				}

				return tpl;
			}
		})
	}
});
