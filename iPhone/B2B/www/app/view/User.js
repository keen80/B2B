Ext.define('B2B.view.User', {
	extend: 'Ext.Container',
	xtype: 'userprofile',
	config: {
		title: i18n.app.PANEL_ABOUTME,
		iconCls: 'smiley_happy',
		scrollable: false,
		layout: 'card'
	},
	initialize: function(){
		this.callParent(arguments);

		var privacyButton = {
			text: i18n.app.BTN_PRIVACY,
			ui: 'action',
			id: 'privacy_profile_btn',
			handler: this.onPrivacyProfileButtonTap,
			scope: this
		},
		settingsButton = {
			text: i18n.app.BTN_SETTINGS,
			ui: 'action',
			id: 'settings_profile_btn',
			handler: this.onSettingsProfileButtonTap,
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
				privacyButton,
				{ xtype: 'spacer' },
				settingsButton
			]
		},
		profileButton = {
			id: 'profile_btn',
			xtype: 'button',
			ui: 'plain',
			icon: 'image.png',
			margin: '10 2 10 0',
			text: i18n.app.BTN_PROFILE,
			badgeText: i18n.app.BTN_PROFILE,
			flex: 2,
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
			margin: '4px 2px',
			text: i18n.app.BTN_BADGES,
			flex: 1,
			handler: this.onBadgesButtonTap,
			scope: this
		},
		drinkListButton = {
			id: 'drinklist_btn',
			xtype: 'button',
			ui: 'action',
			margin: '4px 2px',
			text: i18n.app.BTN_DRINKLIST,
			flex: 1,
			handler: this.onDrinkListButtonTap,
			scope: this
		},
		myActivityButton = {
			xtype: 'button',
			id: 'myactivity_btn',
			ui: 'action',
			margin: '4px 2px',
			text: i18n.app.BTN_MYACTIVITY,
			flex: 1,
			handler: this.onMyActivityButtonTap,
			scope: this
		},
		favoritesButton = {
			id: 'favorites_btn',
			xtype: 'button',
			ui: 'action',
			margin: '4px 2px',
			text: i18n.app.BTN_FAVORITES,
			flex: 1,
			handler: this.onFavoritesButtonTap,
			scope: this
		},
		friendsButton = {
			id: 'friends_btn',
			xtype: 'button',
			ui: 'plain',
			xtype: 'button',
			ui: 'action',
			margin: '0 8 10',
			text: i18n.app.BTN_FRIENDS,
			flex: 1,
			handler: this.onFriendsButtonTap,
			scope: this
		},
		secondRowButtonsContainer = {
			xtype: 'panel',
			flex: 1,
			padding: '0 4 10 4',
			layout: {
				type: 'hbox'
			},
			items: [
				badgesButton,
				favoritesButton
			]
		},
		thirdButtonsContainer = {
			xtype: 'panel',
			flex: 1,
			padding: '0 4 10 4',
			layout: {
				type: 'hbox'
			},
			items: [
				drinkListButton,
				myActivityButton
			]
		},
		item0 = {
			xtype: 'panel',
			flex: 1,
			layout: {
				type: 'vbox'
			},
			items: [
				toolbar, profileButton, secondRowButtonsContainer, thirdButtonsContainer, friendsButton
			]
		};

		this.add([item0]);
		this.setActiveItem(0);
	},
	onEditProfileButtonTap: function() {
		this.fireEvent("editProfileCommand", this);
	},
	onPrivacyProfileButtonTap: function() {
		this.fireEvent("privacyProfileCommand", this);
	},
	onSettingsProfileButtonTap: function() {
		this.fireEvent("settingsProfileCommand", this);
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
	onFriendsButtonTap: function() {
		this.fireEvent("friendsProfileCommand", this);
	},
	refreshProfileData: function() {
		this.fireEvent("reloadProfileCommand", this);
	}
});