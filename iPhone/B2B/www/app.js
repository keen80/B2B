Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux', './ux');

Ext.application({
	"name": 'B2B',
	"APP_NAME": "Meet Beer",
	requires: [
		'Ext.MessageBox',
	],

	models: [ 'User', 'Friend', 'Beer', 'Drink', 'Activity', 'Notification', 'Place', 'BeerSingle'],

	controllers: [
		'_App', '_Login', 'Friends', 'Activities', 'Profiles', 'Beers', 'Drinks', 'Notifications', 'Preferences', 'Privacy', 'Places', //'Camera'
	],

	stores: [
		'Activities_Ajax', 'Beers_Ajax', 'Friends_Ajax', 'Profile_Ajax', 'Notifications_Ajax', 'Places_Ajax', 'Drinks_Ajax',
		'Activities_Local', 'Friends_Local', 'Profile_Local', 'Notifications_Local', 'Beers_Single_Ajax', 'Drinks_Local'
	],

	views: [ '_App', '_Login', '_App_Slider', '_App_Container',
		'Activity_List_Container', 'Activity_List', 'Activity_Detail',
		'Beer_List_Container', 'Beer_List', 'Beer_List_SearchComponent', 'Beer_Add_Form', 'Beer_Detail',
		'Drink_AroundMe',
		'Place_List',
		'Friend_Finder',
		'Friend_List_Container', 'Friend_List', 'Friend_List_SearchComponent', 'Friend_Detail',
		'Notification_Container', 'Notification_List',
		'User_Profile_Container', 'User_Profile_About', 'User_Profile_Form',
		'User_Profile_Privacy_Form',
		'User_Preferences_Form',
		'View_Terms', 'View_Whatsnew',
		'Component_IOSToggle', 'Component_NotificationBar',
		'Camera_Container', 'Camera_Picker'
		],

	icon: {
		'57': 'resources/icons/Icon.png',
		'72': 'resources/icons/Icon~ipad.png',
		'114': 'resources/icons/Icon@2x.png',
		'144': 'resources/icons/Icon~ipad@2x.png'
	},

	isIconPrecomposed: true,

	startupImage: {
		'320x460': 'resources/startup/320x460.jpg',
		'640x920': 'resources/startup/640x920.png',
		'768x1004': 'resources/startup/768x1004.png',
		'748x1024': 'resources/startup/748x1024.png',
		'1536x2008': 'resources/startup/1536x2008.png',
		'1496x2048': 'resources/startup/1496x2048.png'
	},

	launch: function() {
		HH.log("---> Step: app.js:launch()");

		goingTo.step1("Loading Store.Profile");

		// Destroy the #appLoadingIndicator element
		Ext.fly('appLoadingIndicator').destroy();

		var profileStore = Ext.getStore("Profile_Local");

		if(profileStore && profileStore.getCount() < 1){
			HH.log("---+ Check: ProfileStore Empty - Show view._login");
			Ext.Viewport.add(Ext.create('B2B.view._Login'));
		}else{
			HH.log("---+ Check: ProfileStore OK, loading view._App");
			goingTo.step2("Loading Store.Profile_Ajax");
			Ext.Viewport.add(Ext.create('B2B.view._App'));
		}
	},
	onUpdated: function() {
		Ext.Msg.confirm(
			"Application Update",
			"This application has just successfully been updated to the latest version. Reload now?",
			function(buttonId) {
				if (buttonId === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
