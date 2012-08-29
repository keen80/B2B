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
			margin: '10 0 10 0',
			text: i18n.app.BTN_PROFILE,
			badgeText: i18n.app.BTN_PROFILE,
			flex: 1,
			html: [
				'<img class="avatar_medium" height="48" width="48" src="'+HH.default_user48+'" />',
				'<div class="profile_right"><p id="profile_username"></p></div>'
			].join(""),
			handler: this.onProfileButtonTap,
			scope: this
		},
		badgesButton = {
			id: 'badges_btn',
			xtype: 'button',
			ui: 'action',
			text: i18n.app.BTN_BADGES,
			flex: 1,
			handler: this.onBadgesButtonTap,
			scope: this
		},
		drinkListButton = {
			id: 'drinklist_btn',
			xtype: 'button',
			ui: 'action',
			text: i18n.app.BTN_DRINKLIST,
			flex: 1,
			handler: this.onDrinkListButtonTap,
			scope: this
		},
		myActivityButton = {
			xtype: 'button',
			id: 'myactivity_btn',
			ui: 'action',
			text: i18n.app.BTN_MYACTIVITY,
			flex: 1,
			handler: this.onMyActivityButtonTap,
			scope: this
		},
		favoritesButton = {
			id: 'favorites_btn',
			xtype: 'button',
			ui: 'action',
			text: i18n.app.BTN_FAVORITES,
			flex: 1,
			handler: this.onFavoritesButtonTap,
			scope: this
		},
/*
		topButtonsContainer = {
			xtype: 'panel',
			flex: 1,
			padding: '20 0 10 0',
			layout: {
				type: 'hbox'
			},
			items: [
				profileButton
			]
		},*/
		middleButtonsContainer = {
			xtype: 'panel',
			flex: 1,
			padding: '0 0 10 0',
			layout: {
				type: 'hbox'
			},
			items: [
				badgesButton,
				favoritesButton
			]
		};
		bottomButtonsContainer = {
			xtype: 'panel',
			flex: 1,
			padding: '0 0 30 0',
			layout: {
				type: 'hbox'
			},
			items: [
				drinkListButton,
				myActivityButton	
			]
		};
		this.add([toolbar, profileButton, middleButtonsContainer, bottomButtonsContainer]);
	},
	onEditProfileButtonTap: function() {
		this.fireEvent("editProfileCommand", this);
	},
	onProfileButtonTap: function() {
		this.fireEvent("editProfileCommand", this);
	},
	onBadgesButtonTap: function() {
		this.fireEvent("badgesProfileCommand", this);
	},
	onDrinkListButtonTap: function() {
		Ext.Msg.alert("To Be Implemented");
	},
	onMyActivityButtonTap: function() {
		Ext.Msg.alert("To Be Implemented");
	},
	onFavoritesButtonTap: function() {
		this.fireEvent("favoritesProfileCommand", this);
	},
	refreshProfileData: function() {
		this.fireEvent("reloadProfileCommand", this);
	}
});