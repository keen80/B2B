Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux', './ux');

Ext.application({
    "name": 'B2B',
    requires: [
        'Ext.MessageBox',
    ],

    models: [ 'User', 'Friend', 'Beer', 'Drink', 'Activity'],

    controllers: [
        '_APP', 'Friends', 'Activities', 'Profiles', 'Beers', 'CheckIns', 'Notifications', 'Preferences', 'Privacy'
    ],

    stores: [
        'Activities_Ajax', 'Beers_Ajax', 'Friends_Ajax', 'Profile_Ajax',
        'Profile_Local'
    ],

    views: [ '_App', '_App_Slider', '_App_Container',
        'Activity_List_Container', 'Activity_List',
        'Beer_List_Container', 'Beer_List', 'Beer_List_SearchComponent', 'Beer_Add_Form',
        'Drink_AroundMe',
        'Friend_List_Container', 'Friend_List', 'Friend_List_SearchComponent', 'Friend_Detail',
        'Notification_Container', 'Notification_List',
        'User_Profile_Container', 'User_Profile_About', 'User_Profile_Privacy_Form', 'User_Profile_Form',
        'User_Preferences_Form',
        'View_Terms', 'View_Whatsnew',
        'Component_IOSToggle', 'Component_NotificationBar'
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
        this.CheckWhatsNew();
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        Ext.Viewport.add(Ext.create('B2B.view._App'));
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
    },
    CheckWhatsNew: function(){
        this.SyncProfile();
        this.SyncBeer();
    },
    SyncProfile: function(){
        console.log('TODO Sync Profile');
    },
    SyncBeer: function(){
        console.log('PENDING Sync Beer');
        Ext.getStore('Beers_Ajax').load();
    }
});
