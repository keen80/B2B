Ext.define('B2B.view.User_Profile_About', {
	extend: 'Ext.Container',
	xtype: 'userprofileaboutpanel',
	id: "userprofileaboutpanel",
	config: {
		title: i18n.app.PANEL_ABOUTME,
		iconCls: 'user',
		scrollable: false,
		layout: 'vbox'
	},
	initialize: function(){

		this.callParent(arguments);

		var editProfileButton = {
			text: i18n.app.BTN_EDIT,
			ui: 'action',
			id: 'edit_profile_btn',
			handler: this.onEditProfileButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			cls: "sub_titlebar",
			docked: 'top',
			id: 'AboutTitlebar',
			ui: 'neutral',
			defaults: {
				iconMask: true
			},
			items: [
				{ xtype: 'spacer' },
				editProfileButton
			]
		},
		profileButton = {
			id: 'profile_btn',
			xtype: 'button',
			ui: 'action',
			icon: 'image.png',
			text: i18n.app.BTN_PROFILE,
			badgeText: i18n.app.BTN_PROFILE,
			flex: 1,
			margin: '20 20 10 20',
			html: [
				'<img class="avatar_medium" height="48" width="48" src="'+HH.default_user48+'" /><div class="profile_right"><p id="profile_username"></p></div>'
			],
			handler: this.onProfileButtonTap,
			scope: this
		},
		badgesButton = {
			id: 'badges_btn',
			xtype: 'button',
			ui: 'action',
			text: i18n.app.BTN_BADGES,
			flex: 1,
			margin: '20 20 10 20',
			handler: this.onBadgesButtonTap,
			scope: this
		},
		drinkListButton = {
			id: 'drinklist_btn',
			xtype: 'button',
			ui: 'action',
			text: i18n.app.BTN_DRINKLIST,
			flex: 1,
			margin: '10 20 40 20',
			handler: this.onDrinkListButtonTap,
			scope: this
		},
		myActivityButton = {
			xtype: 'button',
			id: 'myactivity_btn',
			ui: 'action',
			text: i18n.app.BTN_MYACTIVITY,
			flex: 1,
			margin: '10 20 40 20',
			handler: this.onMyActivityButtonTap,
			scope: this
		},
		topButtonsContainer = {
			xtype: 'panel',
			flex: 1,
			layout: {
				type: 'hbox'
			},
			items: [
				profileButton,
				badgesButton
			]
		},
		bottomButtonsContainer = {
			xtype: 'panel',
			flex: 1,
			layout: {
				type: 'hbox'
			},
			items: [
				drinkListButton,
				myActivityButton
			]
		};
		this.add([toolbar, topButtonsContainer, bottomButtonsContainer]);
	},
	onEditProfileButtonTap: function() {
		this.fireEvent("editProfileCommand", this);
	},
	onProfileButtonTap: function() {

	},
	onBadgesButtonTap: function() {

	},
	onDrinkListButtonTap: function() {

	},
	onMyActivityButtonTap: function() {

	},
	refreshProfileData: function() {
		this.fireEvent("reloadProfileCommand", this);
	}
});