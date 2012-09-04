App.views.NetworkIndex = Ext.extend(Ext.TabbedPane, {
    initComponent:function () {

        /* --- variables ---------------------------------------------------------------------------- */
        App.makeAutoSearchableFor(this, 'searchFieldNetwork', 'onSearchAction');

        var viewInstance = this;

        /* --- view types --- */

        var listButton = {
            id:'list_button_network',
            text:I18n.t('action.list_link'),
            pressed:true,
            handler:Tmo.Utils.handlerFunc(this, this.onTabButtonAction, 'list'),
            scope:this
        };

        var mapButton = {
            id:'map_button_network',
            text:I18n.t('action.map_link'),
            handler:Tmo.Utils.handlerFunc(this, this.onTabButtonAction, 'map'),
            scope:this
        };

        var viewTypesButtons = {
            xtype:'segmentedbutton',
            centered:true,
            items:[listButton, mapButton],
            listeners:{
                toggle:function (container, button, pressed) {
                    Tmo.Adapters.keyboard.hide();
                }
            }
        };

        var locationButton = Tmo.MyLocationMarker.aroundMeButton("shared_map", Tmo.storeFilters.users);

        var filterButton = new Ext.Button({
            text: I18n.t('action.filter_link'),
            id: 'filter_network_places_bt',
            hidden: Ext.isEmpty( Tmo.storeFilters.networkPlaces.get('category_id') ),
            handler: function(){
                Ext.dispatch({
                    controller: 'Places',
                    action: 'filter',
                    historyUrl: 'Places/filter',
                    storeFilter: Tmo.storeFilters.networkPlaces
                });
            },
            ui: 'action',
            scope: this
        });

        var inviteButton = new Ext.Button({
            iconCls: 'team',
            iconMask: true,
            id: 'invite_button',
            handler: function(){
                Ext.dispatch({
                    controller: 'Session',
                    action: 'connect',
                    historyUrl: 'Session/connect',
                    existingUser: true
                });
            }
        });

        var titleBarConfig = {
            dock:'top',
            centered:true,
            cls:'centered-buttons',
            layout:{ pack:'center' },
            defaults:{ iconMask:true }
        };

        var titleBarUsers = new Ext.Toolbar(Ext.merge(titleBarConfig, {
            id: 'network_title_bar',
            items:[ locationButton, viewTypesButtons, inviteButton ],
            hidden: (Tmo.Flags.NETWORK_TAB && Tmo.Flags.NETWORK_TAB !== Tmo.Consts.NETWORK_TAB_ADDRESSES)
        }));
        var titleBarPlaces = new Ext.Toolbar(Ext.merge(titleBarConfig, {
            id: 'places_title_bar',
            items:[ locationButton, viewTypesButtons, filterButton ],
            hidden: (!Tmo.Flags.NETWORK_TAB || Tmo.Flags.NETWORK_TAB === Tmo.Consts.NETWORK_TAB_ADDRESSES)
        }));

        /* --- network types ------------------------------------------------------------------------- */
        var myContactsButton = {
            id:'contacts_button_network',
            text:I18n.t('network.actions.index.my_contacts_link'),
            pressed: (Tmo.Flags.NETWORK_TAB !== Tmo.Consts.NETWORK_TAB_ADDRESSES),
            scope:this,
            handler:Tmo.Utils.handlerFunc(this, this.onTabButtonAction, 'contacts')
        };

        var theirAddressesButton = {
            id:'addresses_button_network',
            text:I18n.t('network.actions.index.their_addresses_link'),
            pressed: (Tmo.Flags.NETWORK_TAB === Tmo.Consts.NETWORK_TAB_ADDRESSES),
            scope:this,
            handler:Tmo.Utils.handlerFunc(this, this.onTabButtonAction, 'addresses')
        };

        var networkTypesButtons = {
            xtype:'segmentedbutton',
            id:'networkScope',
            centered:true,
            defaults:{flex:1},
            style:'width: 100%',

            items:[ myContactsButton, theirAddressesButton ]
        };

        var networkTypesBar = {
            id: 'network_types_bar',
            xtype:'toolbar',
            dock:'top',
            ui:'light',
            items:[
                {xtype:'spacer'},
                networkTypesButtons,
                {xtype:'spacer'}
            ]
        };

        this.placesBar = {
            first: new Ext.Button({ hidden: true, iconMask: true, iconCls: 'arrow_left', handler: this.onPlaceBarUpdateOffset, placeOffset: -1 }),
            last: new Ext.Button({ hidden: true, iconMask: true, iconCls: 'arrow_right', handler: this.onPlaceBarUpdateOffset, placeOffset: 1 })
        };

        /* --- search bar --------------------------------------------------------------------------- */

        var searchBar = {
            xtype:'toolbar',
            id: 'network_search_toolbar',
            dock:'top',
            ui:'light',
            items:[
                {
                    xtype:'tmo_searchfield',
                    flex:1,
                    id:'searchFieldNetwork',
                    value: ''
                },
                {
                    text:I18n.t('action.search_link'),
                    ui:'action',
                    handler:this.onSearchAction,
                    hidden:true
                },
                this.placesBar.first,
                this.placesBar.last
            ]
        };

        /* --- content list tpl --- */

        var placesList = new Ext.List({
            flex:1,

            plugins:[
                new Tmo.PaginationListPlugin()
            ],
            id:'network_places_list',
            grouped:true,
            pinHeaders:false,
            selectedItemCls:'',
            itemTpl:new Ext.XTemplate.from("places-list-tpl"),
            store:App.stores.places,
            listeners:{
                itemtap:{
                    fn:this.onShowPlaceAction
                },
                itemswipe:{
                    fn:this.onSwipePlaceAction
                }
            }
        });

        /* --- categories --- */
        var placesCategories = App.createPlaceCategoriesView('categories_scroll_places', Tmo.storeFilters.networkPlaces, 'filter_network_places_bt');


        var usersList = new Ext.List({
            flex:1,
            plugins:[
                new Tmo.PaginationListPlugin()
            ],
            id:'users_list',
            itemTpl:new Ext.XTemplate.from("network-list-tpl"),
            selectedItemCls:'',
            store:App.stores.users,
            listeners:{
                itemtap:{
                    fn:this.onShowUserAction
                },
                itemswipe:{
                    fn:this.onSwipeUserAction
                }
            }
        });

        var sharedMap = App.createSharedMapView('shared_map', function () {
            return viewInstance.getCurrentStore();
        });

        var userGroups = App.createUserGroupsView('categories_scroll_users', Tmo.storeFilters.users, function(group_id) {
            Tmo.storeFilters.networkPlaces.set('user_group_id', group_id);
        });


        /* --- create ------------------------------------------------------------------------------ */
        Ext.apply(this, {
            id:'users_card',
            layout:"card",
            dockedItems:[titleBarUsers, titleBarPlaces, networkTypesBar, searchBar],
            items:[
                new Ext.Container({
                    id:"users_content_network",
                    layout:{
                        type:'vbox',
                        align:'stretch'
                    },
                    items:[ usersList, userGroups ]
                }),
                new Ext.Container({
                    layout:{
                        type:'vbox',
                        align:'stretch',
                        pack:'center'
                    },
                    id:"places_content_network",
                    items:[ placesList, placesCategories ],
                    listeners:{
                        show:function () {
                            this.doComponentLayout();
                        },
                        hide:function () {
                            this.doComponentLayout();
                        }
                    }
                })
                ,
                sharedMap
            ],
            listeners:{
                afterrender: function(c){
                    var search_query = Ext.getCmp("users_card").getCurrentStore().get('search_query');
                    Ext.getCmp("searchFieldNetwork").setValue(search_query);
                }
            }
        });

        App.views.NetworkIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */
    onShowPlaceAction:function (dataview, index, item, e) {
        var place = dataview.store.getAt(index);
        place.redirectToShow();
    },

    onShowUserAction:function (dataview, index, item, e) {
        var user = dataview.store.getAt(index);
        var bt = Ext.get(item).down('.bt');

        if (bt.getStyle('display') == 'none') {
            Ext.dispatch({
                controller:'Network',
                action:'show',
                historyUrl:'Network/show/' + user.getId(),
                user_id:user.getId()
            });
        }
    },

    onSwipeUserAction:function (dataview, index, item, e) {
        if (Tmo.storeFilters.users.check('search_scope', 'my')) {
            var user = dataview.store.getAt(index);
            var bt = Ext.get(item).down('.bt');

            Tmo.Utils.onSwipe(e, bt, function (b, e) {
                Server.request('POST', '/networks/' + user.getId(), {
                    params:{"_method":"delete"},
                    success:function (resultsf, operation) {
                        Tmo.storeFilters.users.store.load();
                    }
                });
            });
        }
    },

    onSearchAction:function () {
        Ext.getCmp("networkScope").setDisabled(true);
        var storeFilter = Ext.getCmp("users_card").getCurrentStore();
        var value = Ext.util.Format.trim(Ext.getCmp('searchFieldNetwork').getValue());

        Tmo.LoadMask.show(null, Ext.getCmp('shared_map').el);

        storeFilter.set('search_query', value);
        var doneFn = function () {
            Tmo.LoadMask.hide();
            if (App.mapListObserver)
                App.mapListObserver.renderMarkers();
            Ext.getCmp("networkScope").setDisabled(false);
            Ext.getCmp('users_card').renderPlacesOnMap();
            Ext.getCmp('users_card').onPlacesBarUpdateBar();
        };
        storeFilter.filter(doneFn, doneFn);
    },

    renderPlacesOnMap: function(){
        var network_card = Ext.getCmp('users_card');
        var network_map = Ext.getCmp('shared_map');
        var users_list = Ext.getCmp('users_list');

        if (!App.mapListObserver) {
            App.mapListObserver = new MapListObserver( network_card, network_map, users_list );
        }

        App.mapListObserver.renderMarkers();
    },

    onPlaceBarUpdateOffset:function () {
        if (App.mapListObserver.navigateToSpotByOffset(this.placeOffset)) {
            Ext.getCmp('users_card').onPlacesBarUpdateBar();
        }
    },

    onPlacesBarUpdateBar:function () {
        if (!this.showPlacesBar())
            return false;

        var bar = this.placesBar;
        var place = App.mapListObserver.getCurrentSpot();
        if (place) {
            var list = App.mapListObserver.list;

            var last = list.store.data.length - 1;

            var index = null;

            for (var i = 0; i < list.store.data.length; i++) {
                var item = list.store.data.items[i].data;
                var match = false;
                if (item.is_gp) {
                    match = (item.gp_id === place.data.gp_id);
                } else {
                    match = (item.id === place.data.id);
                }

                if (match) {
                    index = i;
                    break;
                }
            }
//                list.indexOf(place); NOT SAFE

            if (index == 0) {
                bar.first.disable();
            } else {
                bar.first.enable();
            }

            if (index == last) {
                bar.last.disable();
            } else {
                bar.last.enable();
            }
        }

        if (!Ext.isEmpty(App.mapListObserver.markers) && index != null) {
            google.maps.event.trigger(App.mapListObserver.markers[index], 'click');
        } else {
            bar.first.hide();
            bar.last.hide();
        }
        return true;
    },

    showPlacesBar:function () {
        var bar = this.placesBar;
        var is_empty = App.mapListObserver ? App.mapListObserver.isEmpty() : true;
        var visible = (bar.first.isVisible() || bar.last.isVisible());
        var is_map_view = Ext.getCmp('map_button_network').pressed && !Ext.getCmp('contacts_button_network').pressed;


        if (!visible && is_map_view && !is_empty) {
            this.togglePlaceBar(true);
        }
        else if (visible && !is_map_view) {
            this.togglePlaceBar(false);
        }

        return (bar.first.isVisible() || bar.last.isVisible());
    },

    togglePlaceBar:function (visible) {
        var bar = this.placesBar;
        if( visible) {
            bar.first.setVisible(true);
            bar.last.setVisible(true);
        } else {
            bar.first.setVisible(false);
            bar.last.setVisible(false);
        }
        Ext.getCmp('network_search_toolbar').doComponentLayout();
    },

    toggleNetworkTypesBar: function(value) {
        if (value) {
            Ext.getCmp('network_types_bar').show();
            Ext.getCmp('users_card').doComponentLayout();
        } else {
            Ext.getCmp('network_types_bar').hide();
            Ext.getCmp('users_card').doComponentLayout();
        }
    },

    changeTitleRightButton: function(choice) {
        if (choice == Tmo.Consts.NETWORK_TAB_CONTACTS || choice == Tmo.Consts.NETWORK_TAB_CONTACTS_MAP) {
            //show users invite
            Ext.getCmp("network_title_bar").show();
            Ext.getCmp("places_title_bar").hide();
        } else {
            //show places filter
            Ext.getCmp("network_title_bar").hide();
            Ext.getCmp("places_title_bar").show();
        }
        this.doLayout();
    },

    onActionChange:function (choice) {
        var tabs = Ext.getCmp('users_card');

        Tmo.Flags.NETWORK_TAB = choice;

        switch (choice) {
            case Tmo.Consts.NETWORK_TAB_CONTACTS:
                MapListObserver.hideInfoWindows();
                Ext.getCmp('users_card').toggleNetworkTypesBar(true);

                Tmo.myLocationMarker.rebindStore(Tmo.storeFilters.users);
                if (Tmo.MyLocationMarker.aroundMeButtonIsActive()) {
                    Tmo.storeFilters.users.setDirty();
                }

                Ext.getCmp("networkScope").setDisabled(true);

                var doneFn = function () {
                    Ext.getCmp('users_card').onPlacesBarUpdateBar();
                    Ext.getCmp("networkScope").setDisabled(false);
                };

                Tmo.storeFilters.users.filter(doneFn, doneFn);
                break;
            case Tmo.Consts.NETWORK_TAB_ADDRESSES:
                MapListObserver.hideInfoWindows();
                Ext.getCmp('users_card').toggleNetworkTypesBar(true);

                Tmo.myLocationMarker.rebindStore(Tmo.storeFilters.networkPlaces);
                if (Tmo.MyLocationMarker.aroundMeButtonIsActive()) {
                    Tmo.storeFilters.networkPlaces.setDirty();
                }
//                Tmo.storeFilters.networkPlaces.set('category_id', Tmo.storeFilters.networkPlaces.get('category_id'));
                var doneFn = function () {
                    Ext.getCmp('users_card').onPlacesBarUpdateBar();
                    Ext.getCmp("networkScope").setDisabled(false);
                };

                Tmo.storeFilters.networkPlaces.filter(doneFn, doneFn);
                break;
            case Tmo.Consts.NETWORK_TAB_CONTACTS_MAP:
                Ext.getCmp('users_card').toggleNetworkTypesBar(false);
                Tmo.myLocationMarker.rebindStore(Tmo.storeFilters.users);
                if (Tmo.MyLocationMarker.aroundMeButtonIsActive()) {
                    Tmo.storeFilters.users.setDirty();
                }

                Ext.getCmp("networkScope").setDisabled(true);
                if (!App.mapListObserver) {
                    App.mapListObserver = new MapListObserver(null, Ext.getCmp('shared_map'), Ext.getCmp('users_list'));
                }
                var rebindFn = function () {
                    App.mapListObserver.rebindList(Ext.getCmp('users_list'));
                    App.mapListObserver.renderMarkers();
                    Ext.getCmp('users_card').onPlacesBarUpdateBar();
                    Ext.getCmp("networkScope").setDisabled(false);
                };
                Tmo.storeFilters.users.filter(rebindFn, rebindFn);

                break;
            case Tmo.Consts.NETWORK_TAB_ADDRESSES_MAP:
                Ext.getCmp('users_card').toggleNetworkTypesBar(false);
                Tmo.myLocationMarker.rebindStore(Tmo.storeFilters.networkPlaces);
                if (Tmo.MyLocationMarker.aroundMeButtonIsActive()) {
                    Tmo.storeFilters.networkPlaces.setDirty();
                }

                Ext.getCmp("networkScope").setDisabled(true);
                if (!App.mapListObserver) {
                    App.mapListObserver = new MapListObserver(null, Ext.getCmp('shared_map'), Ext.getCmp('network_places_list'));
                }
                var rebindFn = function () {
                    App.mapListObserver.rebindList(Ext.getCmp('network_places_list'));
                    App.mapListObserver.renderMarkers();
                    Ext.getCmp('users_card').onPlacesBarUpdateBar();
                    Ext.getCmp("networkScope").setDisabled(false);
                };
                Tmo.storeFilters.networkPlaces.filter(rebindFn, rebindFn);
                break;
        }

        tabs.changeTitleRightButton(choice);

        Ext.getCmp('searchFieldNetwork').setValue(this.getCurrentStore().get('search_query'));
        tabs.changeTab(Tmo.Consts.NETWORK_TAB_MAPPER[choice]);

        Ext.getCmp('network_search_toolbar').doComponentLayout();
        App.viewport.doLayout();
        Ext.getCmp('network_places_list').hide();
        Ext.getCmp('network_places_list').show();
        Ext.getCmp('categories_scroll_places').hide();
        Ext.getCmp('categories_scroll_places').show();
        Ext.getCmp('users_list').hide();
        Ext.getCmp('users_list').show();
        Ext.getCmp('categories_scroll_users').hide();
        Ext.getCmp('categories_scroll_users').show();

    },

    getCurrentStore:function () {
        if (Ext.getCmp('contacts_button_network').pressed) {
            return Tmo.storeFilters.users;
        } else {
            return Tmo.storeFilters.networkPlaces;
        }
    },

    onTabButtonAction:function (button_uuid) {
        switch (button_uuid) {
            case 'map':
                if (Ext.getCmp('contacts_button_network').pressed) {
                    this.onActionChange(Tmo.Consts.NETWORK_TAB_CONTACTS_MAP);
                } else {
                    this.onActionChange(Tmo.Consts.NETWORK_TAB_ADDRESSES_MAP);
                }
                break;
            case 'list':
                if (Ext.getCmp('contacts_button_network').pressed) {
                    this.onActionChange(Tmo.Consts.NETWORK_TAB_CONTACTS);
                } else {
                    this.onActionChange(Tmo.Consts.NETWORK_TAB_ADDRESSES);
                }
                break;
            case 'contacts':
                if (Ext.getCmp('list_button_network').pressed) {
                    this.onActionChange(Tmo.Consts.NETWORK_TAB_CONTACTS);
                } else {
                    this.onActionChange(Tmo.Consts.NETWORK_TAB_CONTACTS_MAP);
                }
                break;
            case 'addresses':
                if (Ext.getCmp('list_button_network').pressed) {
                    this.onActionChange(Tmo.Consts.NETWORK_TAB_ADDRESSES);
                } else {
                    this.onActionChange(Tmo.Consts.NETWORK_TAB_ADDRESSES_MAP);
                }
                break;
        }
    }

});

Ext.reg('NetworkIndex', App.views.NetworkIndex);
