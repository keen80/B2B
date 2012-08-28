Ext.define("B2B.controller.Badges", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			profile: "userprofileaboutpanel",
			badgeListContainer: "badgelistcontainerpanel",
			badgeList: "badgelistcomponent",
			badgeDetail: "badgedetailpanel",
			app: "_app"
		},
		control: {
			profile: {
				badgesProfileCommand: "onShowBadgesList"
			},
			badgeListContainer: {
				backToProfileCommand: "popCurrentView"
			},
			badgeList: {
				itemtap: "onViewBadgeDetail",
				select: "onSelectItem"
			},
			badgeDetail: {
				backBadgesCommand: "popCurrentView"
			}
		}
	},
	onShowBadgesList: function() {
		this.getApp().push({
			xtype: "badgelistcontainerpanel"
		});
	},
	popCurrentView: function() {
		this.getApp().pop();
	},
	onViewBadgeDetail: function(that, index, item, model, eventObject) {
		setTimeout(function() {
			that.deselect(index);
		}, 500);

		if (model.data.active) {
			this.getApp().push({
				xtype: "badgedetailpanel",
				jsonData: model.data
			});
		}
	},
	onSelectItem: function(that, item, eventObject) {
		return item.data.active;
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});