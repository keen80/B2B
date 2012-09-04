var VIEWPORT = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    dockedItems: [ ]
});


Ext.regApplication({
    name: 'App',
//    phoneStartupScreen: 'images/ios/splash-screen.png',
//    icon: 'images/ios/57x57/apple-touch-icon.png',
//    glossOnIcon: false,
    defaultUrl: 'Dashboard/index',

    launch: function() {

        //preparing viewport
        this.viewport = new VIEWPORT();
        App.tabBar = new TabBarMvc({
            listeners: {
                change: function(){
                    Tmo.Adapters.memstat.get();
                    Tmo.storeFiltersClear();
                    Tmo.storesClear();
                }
            },
            items: [
                {
                    id: 'search_tab_button',
                    type: 'search',
                    iconCls: 'search',
                    route: 'Search/index'
                },
                {
                    id: 'network_tab_button',
                    type: 'network',
                    iconCls: 'team',
                    route: 'Network/index'
                },
                {
                    id: 'places_tab_button',
                    type: 'places',
                    iconCls: 'places',
                    cls: 'x-tab-center',
                    route: 'Dashboard/index'
                },
                {
                    id: 'events_tab_button',
                    type: 'events',
                    iconCls: 'events',
                    route: 'Events/index'
                },
                {
                    id: 'profile_tab_button',
                    type: 'me',
                    iconCls: 'user',
                    route: 'Profile/show'
                }
            ]
        });
        App.tabBarReloadTranslations();
        App.views.Viewport = VIEWPORT;

        this.viewport.on('cardswitch', function(parent, newCard, oldCard) {
            Tmo.Adapters.keyboard.hide();
            if (!oldCard) return;

            var removeCard = true;

            switch (newCard.id) {
                case "share_message_card":
                    if (oldCard.id == "share_index_card") {
                        removeCard = false;
                    }
                    break;
            }

            if (removeCard) {
                parent.remove(oldCard, true);
            }
        });
    }
});