App.views.CheckInsIndex = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var usersListTpl, usersList;
        var myNetworkButton, exploreButton, networkTypesButtons, networkTypesBar;
        var storeFilter = Tmo.storeFilters.users;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('check_in.actions.index.title'),
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        /* --- network types ------------------------------------------------------------------------- */

        myNetworkButton = {
            text: I18n.t('check_in.tabs.my_network_link'),
            search_scope: 'my',
            pressed: storeFilter.check('search_scope', 'my'),
            handler: this.onScopeChangeAction,
            place: this.place
        };

        exploreButton = {
            text: I18n.t('check_in.tabs.explore_link'),
            search_scope: 'all',
            pressed: storeFilter.check('search_scope', 'all'),
            handler: this.onScopeChangeAction,
            place: this.place
        };

        networkTypesButtons = {
            xtype: 'segmentedbutton',
            id: 'networkScope',
            centered: true,
            defaults: {flex: 1},
            style: 'width: 100%',

            items: [ myNetworkButton, exploreButton ]
        };

        networkTypesBar = {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'light',
            items: [
                {xtype: 'spacer'},
                networkTypesButtons,
                {xtype: 'spacer'}
            ]
        };

        usersListTpl = new Ext.XTemplate.from("network-list-tpl");

        usersList = new Ext.List({
            flex: 1,
            plugins: [
                new Tmo.PaginationListPlugin()
            ],
            id: 'users_list',
            itemTpl: usersListTpl,
            selectedItemCls: '',
            store: App.stores.users,
            listeners: {
                itemtap:
                {
                    fn: this.onShowAction
                },
                itemswipe:
                {
                    fn: this.onSwipeAction
                }
            }
        });

        var usersContent = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            id: "users_content",
            items: [ usersList ]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'users_card',
            layout: "card",
            dockedItems: [titleBar, networkTypesBar ],
            items: [ usersContent ]
        });

        App.views.CheckInsIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowAction: function(dataview, index, item, e)
    {
        var user = dataview.store.getAt(index);
        var bt = Ext.get(item).down('.bt');

        if ( bt.getStyle('display') == 'none' ) {
            Ext.dispatch({
                controller: 'Network',
                action: 'show',
                historyUrl: 'Network/show/' + user.getId(),
                user_id: user.getId()
            });
        }
    },

    onScopeChangeAction: function()
    {
        Ext.getCmp("networkScope").setDisabled(true);        
        var storeFilter = Tmo.storeFilters.users;
        storeFilter.set('search_scope', this.search_scope);
        storeFilter.set('place_id', this.place.getId());
        storeFilter.filter(function() {
            Ext.getCmp("networkScope").setDisabled(false);
            storeFilter.unregisterProperty('place_id');
        });
    }


});

Ext.reg('CheckInsIndex', App.views.CheckInsIndex);