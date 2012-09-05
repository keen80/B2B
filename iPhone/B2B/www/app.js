Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux', './app/components');
Ext.Loader.setPath('Ext', './sdk/src');

Ext.application({
	"name": 'B2B',

	models: [ 'User', 'Friend', 'Beer', 'Drink', 'Activity', 'Notification', 'Place', 'BeerSingle', 'Feedback', 'Badge', 'FavoriteBeer' ],

	controllers: [
		'_App', '_Login',
		'Friends', 'Activities', 'Profiles', 'Beers', 'Drinks', 'Notifications',
		'Preferences', 'Privacy', 'Places', 'Feedbacks', 'Camera', 'Badges',
		'Favorites'
	],

	stores: [
		'Activities_Ajax', 'Beers_Ajax', 'Friends_Ajax', 'Profile_Ajax', 'Notifications_Ajax', 'Places_Ajax', 'Drinks_Ajax', 'Activities_User_Ajax',
		'Activities_Local', 'Friends_Local', 'Profile_Local', 'Notifications_Local', 'Drinks_Local', 'Feedback_Ajax',
		'Badges_Ajax',
		'DrinkInCheckIn_Ajax',
		'FavoriteBeers_Local'
	],

	views: [
		'_App', '_Login', '_App_Slider', '_App_Container',
		'_SplashBeerSearch', '_Register',
		'Activity', 'Activity_List', 'Activity_List_Detail',
		'Beer', 'Beer_List', 'Beer_Search', 'Beer_Add_Form', 'Beer_Detail',
		'Beer_List_SelectContainer', 'Beer_List_SelectSearchComponent', 'Beer_List_Select',
		'Place',
		'DrinkInCheckIn_List',
		'Place_List', 'Place_Detail',
		'Favorites_List', 'Favorites_List_Container',
		'Feedback_Container', 'Feedback_Form', 'Feedback_List',
		'Friend_Finder',
		'Friend', 'Friend_List', 'Friend_Search', 'Friend_List_Detail',
		'Notification', 'Notification_List',
		'User', 'User_Form',
		'User_Privacy_Form', 'User_Preferences_Form',
		'View_Terms', 'View_Whatsnew', 'View_AboutUs',
		'Component_IOSToggle', 'Component_NotificationBar',
		'Camera_Container', 'Camera_Picker',
		'Badge_List', 'Badge_List_Container', 'Badge_Detail',
		'Place_Beer_List', 'Place_Beer_Search',
		'View_BottleSpinner'
		],

	icon: {
		'57': 'resources/icons/Icon.png',
		'72': 'resources/icons/Icon~ipad.png',
		'114': 'resources/icons/Icon@2x.png',
		'144': 'resources/icons/Icon~ipad@2x.png'
	},

	isIconPrecomposed: true,

	startupImage: {
		'320x460': 'resources/startup/320x460.png',
		'640x920': 'resources/startup/640x920.png',
		'768x1004': 'resources/startup/768x1004.png',
		'748x1024': 'resources/startup/748x1024.png',
		'1536x2008': 'resources/startup/1536x2008.png',
		'1496x2048': 'resources/startup/1496x2048.png'
	},

	launch: function() {
		HH.log("---> Step: app.js:launch()");

		goingTo.step1("Loading Store.Profile");

		Ext.fly('appLoadingIndicator').destroy();

		var profileStore = Ext.getStore("Profile_Local");
		
		Ext.Viewport.add(Ext.create('B2B.view._App'));
		/*
		if (profileStore && profileStore.getCount() < 1) {
			HH.log("---+ Check: ProfileStore Empty - Show view._login");
			Ext.Viewport.add(Ext.create('B2B.view._Login'));
		} else {
			// HH.log("---+ Check: ProfileStore OK, loading view._App");
			// goingTo.step2("Loading Store.Profile_Ajax");
			// Ext.Viewport.add(Ext.create('B2B.view._App'));
			var data = profileStore.first().data;
			utils.generateToken(data, profileStore, Ext.Viewport);
		}
//				    loginOnFBCompleted("email", "displayName", "gender", "nationality", "birthDay");*/
	},
	onUpdated: function() {
		if(window.confirm(i18n.app.HINT_APPLICATIONRELOADED)){
			window.location.reload();
		}
	}
});
