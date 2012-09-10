Ext.define('B2B.view.User', {
	extend: 'Ext.Container',
	xtype: 'userprofile',
	config: {
		title: i18n.app.PANEL_ABOUTME,
		iconCls: 'smiley_happy',
		scrollable: false,
		layout: 'vbox'
	},
	initialize: function(){
		this.callParent(arguments);
		var profileStore = Ext.getStore('Profile_Local');
		var profile = (profileStore.first()).data;
		var profileButton = {
			id: 'profile_btn',
			xtype: 'button',
			ui: 'beerwhite',
			margin: '4px 10px',
			text: i18n.app.BTN_PROFILE,
			badgeText: i18n.app.BTN_PROFILE,
			flex: 2,
			html: [
				'<div class="profile_right_panel">',
					'<img id="profile_image" class="avatar" height="56" width="56" src="'+utils.getUserAvatar()+'" />',
					'<p class="profile_displayname">',
						profile.displayName,
					'</p>',
					'<p class="profile_description">',
						profile.description,
					'</p>',
				'</div>',
					'<hr>',
					'<p class="profile_points">',
						utils.getPointLabel(profile),
					'</p>',
					'<div class="progress-bar">',
					    '<span class="bar" style="width: '+utils.getProgressPoints(profile)+'%"></span>',
						'<span class="points">'+((utils.getMaxPoints(profile) > 0)?utils.getMaxPoints(profile)+' pt.': '')+'</span>',

					'</div>',
					'<div class="callout">',
						'<div class="calloutTip1"><div class="calloutTip2"></div></div><div class="calloutContent">',
							utils.getPointClaim(profile),
    					'</div>',
    				'</div>',
					"<div class='clear'></div>"
			].join(""),
			handler: this.onEditProfileButtonTap,
			scope: this
		},
		badgesButton = {
			id: 'badges_btn',
			xtype: 'button',
			ui: 'beergreen',
			cls: 'profile_square',
			width: "100px",
			height: "80px",
			margin: '4px 2px',
			//text: i18n.app.BTN_BADGES,
			html: [
				'<img class="badge" height="56" width="56" src="resources/icons/badge.png" >',
				'<span class="profile_squarebutton">',
					profile.counterBadges + " "+i18n.app.BTN_BADGES,
				'</span>',
			].join(""),
			flex: 1,
			handler: this.onBadgesButtonTap,
			scope: this
		},
		drinkListButton = {
			id: 'drinklist_btn',
			xtype: 'button',
			ui: 'beerblue',
			cls: 'profile_square',
			width: "100px",
			height: "80px",
			margin: '4px 2px',
			//text: i18n.app.BTN_DRINKLIST,
			html: [
				'<img class="badge" height="56" width="56" src="resources/icons/drinks.png" >',
				'<span class="profile_squarebutton">',
					profile.counterCheckIns + " "+i18n.app.BTN_DRINKLIST,
				'</span>',
			].join(""),
			flex: 1,
			handler: this.onDrinkListButtonTap,
			scope: this
		},
		myActivityButton = {
			xtype: 'button',
			id: 'myactivity_btn',
			cls: 'profile_square',
			ui: 'beerred',
			width: "100px",
			height: "80px",
			margin: '4px 2px',
			//text: i18n.app.BTN_MYACTIVITY,
			html: [
				'<img class="badge" height="56" width="56" src="resources/icons/time_clock.png" >',
				'<span class="profile_squarebutton">',
					i18n.app.BTN_MYACTIVITY,
				'</span>',
			].join(""),
			flex: 1,
			handler: this.onMyActivityButtonTap,
			scope: this
		},
		favoritesButton = {
			id: 'favorites_btn',
			xtype: 'button',
			ui: 'beercyan',
			cls: 'profile_square',
			width: "100px",
			height: "80px",
			margin: '4px 2px',
			//text: i18n.app.BTN_FAVORITES,
			html: [
				'<img class="badge" height="56" width="56" src="resources/icons/star.png" >',
				'<span class="profile_squarebutton">',
					i18n.app.BTN_FAVORITES,
				'</span>',
			].join(""),
			flex: 1,
			handler: this.onFavoritesButtonTap,
			scope: this
		},
		friendsButton = {
			id: 'friends_btn',
			xtype: 'button',
			ui: 'beeryellow',
			cls: 'profile_square',
			width: "100px",
			height: "80px",
			margin: '4px 2px',
			//text: i18n.app.BTN_FRIENDS,
			html: [
					'<img class="badge" height="56" width="56" src="resources/icons/friends.png" >',
					'<span class="profile_squarebutton">',
						i18n.app.BTN_FRIENDS,
					'</span>',
			].join(""),
			flex: 1,
			handler: this.onFriendsButtonTap,
			scope: this
		},

		settingsButton = {
			id: 'settings_btn',
			xtype: 'button',
			ui: 'beerviolet',
			cls: 'profile_square',
			width: "100px",
			height: "80px",
			margin: '4px 2px',
			//text: i18n.app.BTN_STATS,
			html: [
					'<img class="badge" height="56" width="56" src="resources/icons/settings.png" >',
					'<span class="profile_squarebutton">',
						i18n.app.BTN_SETTINGS,
					'</span>',
			].join(""),
			flex: 1,
			handler: this.onSettingsButtonTap,
			scope: this
		},
		secondRowButtonsContainer = {
			xtype: 'panel',
			//flex: 1,
			padding: '0px 4px',
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			items: [
				badgesButton,
				favoritesButton,
				friendsButton
			]
		},
		thirdButtonsContainer = {
			xtype: 'panel',
			//flex: 1,
			padding: '0 4 4 4',
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			items: [
				drinkListButton,
				myActivityButton,
				settingsButton
			]
		};

		this.add([profileButton, secondRowButtonsContainer, thirdButtonsContainer]);
	},
	onEditProfileButtonTap: function() {
		this.fireEvent("editProfileCommand", this);
	},
	onSettingsButtonTap: function() {
		this.fireEvent("settingsCommand", this);
	},
	onBadgesButtonTap: function() {
		this.fireEvent("badgesProfileCommand", this);
	},
	onDrinkListButtonTap: function() {
		this.fireEvent("drinkListProfileCommand", this);
	},
	onMyActivityButtonTap: function() {
		this.fireEvent("activityListProfileCommand", this);
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