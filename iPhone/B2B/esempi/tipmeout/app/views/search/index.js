App.views.SearchIndex = Ext.extend(Ext.TabbedPane, {
    initComponent:function () {

        /* --- variables ---------------------------------------------------------------------------- */
        App.makeAutoSearchableFor(this, 'searchFieldSearch', 'onSearchAction');
        var viewInstance = this;

        /* --- view types --- */

        var listButton = {
            id:'list_button_search',
            text:I18n.t('action.list_link'),
            pressed:true,
            handler:Tmo.Utils.handlerFunc(this, this.onTabButtonAction, 'list'),
            scope:this
        };

        var mapButton = {
            id:'map_button_search',
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

        var createButton = {
            xtype:'button',
            text:I18n.t('place.actions.index.add_place_link'),
            ui:'confirm',
            handler:this.onNewAction,
            hidden: true,
            id:"create_button_search"
        };

        var locationButton = Tmo.MyLocationMarker.aroundMeButton("shared_map_search", Tmo.storeFilters.explorePlaces);

        var titleBar = {
            dock:'top',
            xtype:'toolbar',
            centered:true,
            cls:'centered-buttons',
            layout:{
                pack:'center'
            },
            defaults:{
                iconMask:true
            },

            items:[ locationButton, viewTypesButtons, createButton ]
        };

        /* --- search types ------------------------------------------------------------------------- */
        var exploreAddressesButton = {
            id:'addresses_button_search',
            text:I18n.t('search.actions.index.addresses_tab'),
            pressed: (Tmo.Flags.SEARCH_TAB !== Tmo.Consts.SEARCH_TAB_MEMBERS),
            scope:this,
            handler:Tmo.Utils.handlerFunc(this, this.onTabButtonAction, 'addresses')
        };

        var exploreMembersButton = {
            id:'members_button_search',
            text:I18n.t('search.actions.index.members_tab'),
            pressed: (Tmo.Flags.SEARCH_TAB === Tmo.Consts.SEARCH_TAB_MEMBERS),
            scope:this,
            handler:Tmo.Utils.handlerFunc(this, this.onTabButtonAction, 'members')
        };

        var searchTypesButtons = {
            xtype:'segmentedbutton',
            id:'searchScope',
            centered:true,
            defaults:{flex:1},
            style:'width: 100%',

            items:[ exploreAddressesButton, exploreMembersButton ]
        };

        var searchTypesBar = {
            id: 'search_types_bar',
            xtype:'toolbar',
            dock:'top',
            ui:'light',
            items:[
                {xtype:'spacer'},
                searchTypesButtons,
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
            id: 'search_search_toolbar',
            dock:'top',
            ui:'light',
            items:[
                {
                    xtype:'tmo_searchfield',
                    flex:1,
                    id:'searchFieldSearch',
                    value:viewInstance.getCurrentStore().get('search_query')
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
        var placesListOnLoad = function (store, records, success) {
            if (success && records) {
                var query_exists = (Ext.getCmp('searchFieldSearch').getValue().length > 0);
                var no_results = (records.length === 0);
                var at_least_one_gp_place = (records.length > 0) && (records[records.length - 1].data.is_gp);
                var end_of_pagination = !at_least_one_gp_place && records.length < 25;

                //Tmo.debug("no_results:", no_results, "; at_least_one_gp_place: ", at_least_one_gp_place, "; end_of_pagination: ", end_of_pagination);

                var myCard = Ext.getCmp('search_tabs');
                myCard.togglePlaceButton(query_exists && (no_results || at_least_one_gp_place || end_of_pagination));
            }
        };

        var placesList = new Ext.List({
            flex:1,

            plugins:[
                new Tmo.PaginationListPlugin()
            ],
            id:'places_list_search',
            grouped:true,
            pinHeaders:false,
            selectedItemCls:'',
            itemTpl:new Ext.XTemplate.from("places-list-tpl"),
            store:App.stores.places,
            emptyText:Tmo.Utils.emptyTextForList(I18n.t('search.actions.index.hints.place')),
            listeners:{
                itemtap:{
                    fn:this.onShowPlaceAction
                }
            }
        });

        /* --- categories --- */
        var usersList = new Ext.List({
            flex:1,
            plugins:[
                new Tmo.PaginationListPlugin()
            ],
            id:'users_list_search',
            itemTpl:new Ext.XTemplate.from("network-list-tpl"),
            selectedItemCls:'',
            store:App.stores.users,
            emptyText:Tmo.Utils.emptyTextForList(I18n.t('search.actions.index.hints.contact')),
            listeners:{
                itemtap:{
                    fn:this.onShowUserAction
                }}
        });

        var sharedMap = App.createSharedMapView('shared_map_search', function () {
            return viewInstance.getCurrentStore();
        });

        Tmo.Flags.BIND_PLACES_STORE_EXPLORE = false;

        Ext.apply(this, {
            layout:'card',
            id:"search_tabs",
            dockedItems:[titleBar, searchTypesBar, searchBar],
            items:[
                new Ext.Container({
                    layout:{
                        type:'vbox',
                        align:'stretch',
                        pack:'center'
                    },
                    id:"places_content_search",
                    items:[ placesList ],
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
                new Ext.Container({
                    id:"users_content_search",
                    layout:{
                        type:'vbox',
                        align:'stretch'
                    },
                    items:[ usersList ]
                }),
                sharedMap
            ],

            listeners:{
                activate:function () {
                    if (!Tmo.Flags.BIND_PLACES_STORE_EXPLORE) {
                        Tmo.debug("bind onLoad places");
                        Tmo.Flags.BIND_PLACES_STORE_EXPLORE = true;
                        App.stores.places.on("load", placesListOnLoad);
                    }
                },
                afterrender: function(c){
                    if (c.shouldCreatePlaceButtonBeDisplayed()) {
                        Ext.getCmp('create_button_search').show();
                    }
                    Ext.getCmp('search_search_toolbar').doComponentLayout();
                    App.viewport.doLayout();
                },
                deactivate:function (c) {
                    Tmo.debug("unbind onLoad places");
                    App.stores.places.un("load", placesListOnLoad);
                    Tmo.Flags.BIND_PLACES_STORE_EXPLORE = false;
                    App.mapListObserver = null;

//                    Ext.iterate([Tmo.storeFilters.exploreUsers,
//                        Tmo.storeFilters.explorePlaces], function (storeFilter) {
//                        if (storeFilter.get("search_query") &&
//                            storeFilter.get("search_query").length > 0)
//                            storeFilter.unregisterProperty("search_query");
//                    });
                }
            }
        });

        App.views.SearchIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */
    onShowPlaceAction:function (dataview, index, item, e) {
        var place = dataview.store.getAt(index);

        if (Ext.get(item).down('.google_place')) {

            var map = Ext.getCmp('shared_map_search').map;
            App.addPlaceByReference(map, place.get('gp_reference'));

        } else {

            var bt = Ext.get(item).down('.bt');
            if (bt.getStyle('display') == 'none') {
                place.redirectToShow();
            }

        }
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

    onSearchAction:function () {
        var myCard = Ext.getCmp('search_tabs');
        myCard.togglePlaceButton(false);

        Tmo.LoadMask.show(null, Ext.getCmp('shared_map_search').el);

        Ext.getCmp("searchScope").setDisabled(true);
        var storeFilter = myCard.getCurrentStore();
        var value = Ext.util.Format.trim(Ext.getCmp('searchFieldSearch').getValue());

        storeFilter.set('search_query', value);
        var doneFn = function () {
            Tmo.LoadMask.hide();
            Ext.getCmp("searchScope").setDisabled(false);
            if (!Ext.getCmp('list_button_search').pressed) {
                App.mapListObserver && App.mapListObserver.renderMarkers();
            }
            Ext.getCmp('search_tabs').onPlacesBarUpdateBar();
//            myCard.togglePlaceButton(myCard.shouldCreatePlaceButtonBeDisplayed());
        };
        storeFilter.filter(doneFn, doneFn);
    },

    onNewAction:function () {
        Ext.dispatch({
            controller:'Places',
            action:'new_map',
            historyUrl:'Places/new/map',
            search_query: Tmo.storeFilters.explorePlaces.get('search_query')
        });
    },

    shouldCreatePlaceButtonBeDisplayed:function () {
        if (Ext.getCmp('places_list_search')) {
            var i, group, groups = Ext.getCmp('places_list_search').getStore().getGroups();
            var result = false;
            for (i = 0; i < groups.length; i++) {
                group = groups[i];
                try {
                    if (group.children[0].data.is_gp) {
                        result = true;
                        break;
                    }
                } catch (e) {

                }
            }

            var notEmptyQuery = Ext.getCmp('searchFieldSearch').getValue().length > 0;
            var emptyStore = Ext.getCmp('places_list_search').store.data.length === 0;

            //Tmo.debug("empty:", emptyStore, "; query: ", notEmptyQuery, "; gp: ", result);

            return (result || (notEmptyQuery && emptyStore)) && !Ext.getCmp('members_button_search').pressed;
        }
        return false;
    },

    togglePlaceButton:function (value) {
        if (value) {
            Ext.getCmp('create_button_search').show();
            App.viewport.doLayout();
            Ext.getCmp('places_list_search').hide();
            Ext.getCmp('places_list_search').show();
        } else {
            Ext.getCmp('create_button_search').hide();
            App.viewport.doLayout();
            Ext.getCmp('places_list_search').hide();
            Ext.getCmp('places_list_search').show();
        }
    },

    toggleNetworkTypesBar: function(value) {
        if (value) {
            Ext.getCmp('search_types_bar').show();
            Ext.getCmp('search_tabs').doComponentLayout();
        } else {
            Ext.getCmp('search_types_bar').hide();
            Ext.getCmp('search_tabs').doComponentLayout();
        }
    },

    onPlaceBarUpdateOffset:function () {
        if (App.mapListObserver.navigateToSpotByOffset(this.placeOffset)) {
            Ext.getCmp('search_tabs').onPlacesBarUpdateBar();
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
        var is_map_view = Ext.getCmp('map_button_search').pressed && Ext.getCmp('addresses_button_search').pressed;


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
        Ext.getCmp('search_search_toolbar').doComponentLayout();
    },

    onActionChange:function (choice) {
        var tabs = Ext.getCmp('search_tabs');

        Tmo.Flags.SEARCH_TAB = choice;

        switch (choice) {
            case Tmo.Consts.SEARCH_TAB_ADDRESSES:
                Tmo.MyLocationMarker.getAroundMeButton().show();
                MapListObserver.hideInfoWindows();
                Ext.getCmp('search_tabs').toggleNetworkTypesBar(true);

                var doneFn = function () {
                    Ext.getCmp('search_tabs').onPlacesBarUpdateBar();
                    Ext.getCmp("searchScope").setDisabled(false);
                };

                Tmo.storeFilters.explorePlaces.filter(doneFn, doneFn);

                break;
            case Tmo.Consts.SEARCH_TAB_ADDRESSES_MAP:
                Tmo.MyLocationMarker.getAroundMeButton().show();
                Ext.getCmp('search_tabs').toggleNetworkTypesBar(false);
                Ext.getCmp("searchScope").setDisabled(true);

                if (!App.mapListObserver) {
                    App.mapListObserver = new MapListObserver(null, Ext.getCmp('shared_map_search'), Ext.getCmp('places_list_search'));
                }
                var rebindFn = function () {
                    App.mapListObserver.rebindList(Ext.getCmp('places_list_search'));
                    App.mapListObserver.renderMarkers();
                    Ext.getCmp('search_tabs').onPlacesBarUpdateBar();
                    Ext.getCmp("searchScope").setDisabled(false);
                };
                Tmo.storeFilters.explorePlaces.filter(rebindFn, rebindFn);
                break;
            case Tmo.Consts.SEARCH_TAB_MEMBERS:
                Tmo.MyLocationMarker.getAroundMeButton().hide();
                MapListObserver.hideInfoWindows();
                Ext.getCmp('search_tabs').toggleNetworkTypesBar(true);

                var doneFn = function () {
                    Ext.getCmp('search_tabs').onPlacesBarUpdateBar();
                    Ext.getCmp("searchScope").setDisabled(false);
                };

                Tmo.storeFilters.exploreUsers.filter(doneFn, doneFn);

                break;
            case Tmo.Consts.SEARCH_TAB_MEMBERS_MAP:
                Tmo.MyLocationMarker.getAroundMeButton().hide();
                Ext.getCmp('search_tabs').toggleNetworkTypesBar(false);
                Ext.getCmp("searchScope").setDisabled(true);

                if (!App.mapListObserver) {
                    App.mapListObserver = new MapListObserver(null, Ext.getCmp('shared_map_search'), Ext.getCmp('users_list_search'));
                }
                var rebindFn = function () {
                    App.mapListObserver.rebindList(Ext.getCmp('users_list_search'));
                    App.mapListObserver.renderMarkers();
                    Ext.getCmp('search_tabs').onPlacesBarUpdateBar();
                    Ext.getCmp("searchScope").setDisabled(false);
                };
                Tmo.storeFilters.exploreUsers.filter(rebindFn, rebindFn);
                break;
        }
        Ext.getCmp('searchFieldSearch').setValue(this.getCurrentStore().get('search_query'));
        tabs.changeTab(Tmo.Consts.SEARCH_TAB_MAPPER[choice]);
        this.togglePlaceButton(this.shouldCreatePlaceButtonBeDisplayed());

        Ext.getCmp('search_search_toolbar').doComponentLayout();
        App.viewport.doLayout();

        Ext.getCmp('places_list_search').hide();
        Ext.getCmp('places_list_search').show();

        Ext.getCmp('users_list_search').hide();
        Ext.getCmp('users_list_search').show();


        switch (choice) {
            case Tmo.Consts.SEARCH_TAB_ADDRESSES:
                break;
            case Tmo.Consts.SEARCH_TAB_ADDRESSES_MAP:
                Ext.getCmp('shared_map_search').hide();
                Ext.getCmp('shared_map_search').show();
                break;
            case Tmo.Consts.SEARCH_TAB_MEMBERS:
                break;
            case Tmo.Consts.SEARCH_TAB_MEMBERS_MAP:
                Ext.getCmp('shared_map_search').hide();
                Ext.getCmp('shared_map_search').show();
                break;
        }
    },

    getCurrentStore:function () {
        var button = Ext.getCmp('members_button_search');
        if (button && button.pressed) {
            return Tmo.storeFilters.exploreUsers;
        } else {
            return Tmo.storeFilters.explorePlaces;
        }
    },

    onTabButtonAction:function (button_uuid) {
        switch (button_uuid) {
            case 'map':
                if (Ext.getCmp('addresses_button_search').pressed) {
                    this.onActionChange(Tmo.Consts.SEARCH_TAB_ADDRESSES_MAP);
                } else {
                    this.onActionChange(Tmo.Consts.SEARCH_TAB_MEMBERS_MAP);
                }
                break;
            case 'list':
                if (Ext.getCmp('addresses_button_search').pressed) {
                    this.onActionChange(Tmo.Consts.SEARCH_TAB_ADDRESSES);
                } else {
                    this.onActionChange(Tmo.Consts.SEARCH_TAB_MEMBERS);
                }
                break;
            case 'addresses':
                if (Ext.getCmp('list_button_search').pressed) {
                    this.onActionChange(Tmo.Consts.SEARCH_TAB_ADDRESSES);
                } else {
                    this.onActionChange(Tmo.Consts.SEARCH_TAB_ADDRESSES_MAP);
                }
                break;
            case 'members':
                if (Ext.getCmp('list_button_search').pressed) {
                    this.onActionChange(Tmo.Consts.SEARCH_TAB_MEMBERS);
                } else {
                    this.onActionChange(Tmo.Consts.SEARCH_TAB_MEMBERS_MAP);
                }
                break;
        }
    }

});


Ext.reg('SearchIndex', App.views.SearchIndex);
