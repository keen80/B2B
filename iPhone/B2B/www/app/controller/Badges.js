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
				itemtap: "onViewBadgeDetail"
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
	onViewBadgeDetail: function(that, item, index, model, eventObject) {
		this.getApp().push({
			xtype: "badgedetailpanel"
		});
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});