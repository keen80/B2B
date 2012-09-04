App.views.ShareIndex = Ext.extend(Ext.Panel, {
    initComponent: function() {

        App.makeAutoSearchableFor(this, 'searchNetwork');

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, nextButton, groupsButton, titleBar, searchBar, networkTypesBar;
        var usersListTpl, usersList;
        var storeFilter = Tmo.storeFilters.users;
        var viewInstance = this;
        var users = this.users || [];

        /* --- init --------------------------------------------------------------------------------- */
        if (this.shareType == "Event") {
            backButton = {
                text: I18n.t('action.cancel_link'),
                ui: 'back',
                handler: function(){
                return Ext.dispatchBack({
                    controller: 'Events',
                    action: 'index',
                    historyUrl: 'Events/index'
                })},
                scope: this
            };
        } else {
            backButton = Tmo.BackButton.getBackButton(I18n.t('action.cancel_link'));
        }

        nextButton = {
            text: I18n.t('action.next_link'),
            ui: 'action',
            handler: this.onNextAction,
            scope: this
        };

        groupsButton = {
            text: I18n.t('share.actions.index.groups_link'),
            handler: this.onGroupsAction,
            scope: this
        };

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ backButton, {xtype: 'spacer'}, groupsButton, nextButton ]
        };

        /* --- network types ------------------------------------------------------------------------- */
        if (_.include([Tmo.Consts.SHARETYPE_EMAIL, Tmo.Consts.SHARETYPE_SMS], this.shareMethod))
        {

        }
        else // if SYSTEM SHARE
        {
            var myNetworkButton = {
                text: I18n.t('action.my_network_link'),
                search_scope: 'my',
                shareType: this.shareType,
                shareObj: this.shareObj,
                pressed: storeFilter.check('search_scope', 'my'),
                handler: this.onScopeChangeAction
            };

            var exploreButton = {
                text: I18n.t('action.explore_link'),
                search_scope: 'all',
                shareType: this.shareType,
                shareObj: this.shareObj,
                pressed: storeFilter.check('search_scope', 'all'),
                handler: this.onScopeChangeAction
            };

            var networkTypesButtons = {
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
        }

        /* --- search ------------------------------------------------------------------------- */
        searchBar = {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'light',
            id: 'search_toolbar',
            items: [
                {
                    xtype: 'tmo_searchfield',
                    flex: 1,
                    id: 'searchNetwork'
                },
                {
                    text: I18n.t('action.search_link'),
                    ui: 'action',
                    shareType: this.shareType,
                    shareObj: this.shareObj,
                    hidden: true,
                    handler: this.onSearchAction
                }
            ]
        };

        usersListTpl = new Ext.XTemplate.from("network-list-tpl");

        usersList = new App.views.TmoList({
            plugins: [ new Tmo.PaginationListPlugin() ],
            id: 'share_users_list',
            cls: 'selectable',
            itemTpl: usersListTpl,
            store: App.stores.users,
            simpleSelect: true,
            multiSelect: true,
            flex: 1,
            lockingFunction: function(user){ return user.hasSharedObject() },
            listeners:
            {
                afterrender: function(c){
                    this.recordsSelected = users;
                    this.uniqSelection();
                }
            }
        });

        var shareNotice = new Ext.Container({
            xtype: 'container',
            cls: 'alert-notice',
            html: Tmo.Consts.SHARETYPE_EMAIL == parseInt(this.shareMethod) ? I18n.t('share.actions.index.enter_email_manually_by_clicking_next') : I18n.t('share.actions.index.enter_mobile_number_manually_by_clicking_next')
        });

        var shareContainerItems = [];
        if (Tmo.Consts.SHARETYPE_SYSTEM != parseInt(this.shareMethod))
            shareContainerItems.push(shareNotice);
        shareContainerItems.push(usersList);
        
        var shareContainer = new Ext.Container({
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: shareContainerItems
        });


        /* --- create ------------------------------------------------------------------------------ */
        var dockedItemsArr = [];
        if (networkTypesBar) {
            dockedItemsArr = [titleBar, networkTypesBar, searchBar];
        } else {
            dockedItemsArr = [titleBar, searchBar];
        }

        Ext.apply(this, {
            layout: 'card',
            id: 'share_index_card',
            dockedItems: dockedItemsArr,
            items: [shareContainer],
            listeners:{
                afterrender: function(c)
                {
                    Ext.getCmp('search_toolbar').doComponentLayout();
                    App.viewport.doLayout();
                }
            }
        });

        App.views.ShareIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */


    onNextAction: function() {
        var self = this;

        if (this.shareMethod == Tmo.Consts.SHARETYPE_SYSTEM)
        {
            Ext.dispatch({
                controller: 'Share',
                action: 'message',
                historyUrl: 'Share/message',
                shareType: this.shareType,
                shareObj: this.shareObj,
                shareMethod: this.shareMethod,
                users: Ext.getCmp('share_users_list').getSelectedRecords()
            });
        }
        else if (this.shareMethod == Tmo.Consts.SHARETYPE_EMAIL)
        {
            var email = App.models.Email.initFromUsersList(Ext.getCmp('share_users_list').getSelectedRecords(), this.shareObj.shareTitle(this.shareMethod), this.shareObj.shareMessage(this.shareMethod));
            email.send(
                function() {
                    Tmo.debug("email OK");
//                    App.shareRedirect(self);
                    Tmo.BackButton.clearSubPaths();
                    Ext.dispatch(Tmo.BackButton.last());
                },
                function() {
                    Tmo.debug("email Failed");
//                    App.shareRedirect(self);
                    Tmo.BackButton.clearSubPaths();
                    Ext.dispatch(Tmo.BackButton.last());
                }
            );
        }
        else if (this.shareMethod == Tmo.Consts.SHARETYPE_SMS)
        {
            var sms = App.models.Sms.initFromUsersList(Ext.getCmp('share_users_list').getSelectedRecords(), this.shareObj.shareMessage(this.shareMethod));
            sms.send(
                function() {
                    Tmo.debug("sms OK");
//                    App.shareRedirect(self);
                    Tmo.BackButton.clearSubPaths();
                    Ext.dispatch(Tmo.BackButton.last());
                },
                function() {
                    Tmo.debug("sms ERROR");
//                    App.shareRedirect(self);
                    Tmo.BackButton.clearSubPaths();
                    Ext.dispatch(Tmo.BackButton.last());
                }
            );
        }
    },

    onGroupsAction: function() {
        Ext.dispatch({
            controller: 'Share',
            action: 'groups',
            historyUrl: 'Share/groups',
            shareType: this.shareType,
            shareObj: this.shareObj,
            shareMethod: this.shareMethod,
            groups_ids: this.groups_ids,
            users: Ext.getCmp('share_users_list').getSelectedRecords()
        });
    },

    onSearchAction: function() {
        var storeFilter = Tmo.storeFilters.users;
        var value = Ext.util.Format.trim(Ext.getCmp('searchNetwork').getValue());

        Ext.getCmp("networkScope").setDisabled(true);
        storeFilter.set('search_query', value);
        storeFilter.set('apply_notification_settings', "true");
        storeFilter.set('share_obj', [this.shareType,this.shareObj.getId()]);
        storeFilter.filter(function(){
            Ext.getCmp("networkScope").setDisabled(false);
            storeFilter.unregisterProperty('apply_notification_settings');
            storeFilter.unregisterProperty('share_obj');
        });
    },

    onScopeChangeAction: function() {
        Ext.getCmp("networkScope").setDisabled(true);
        var storeFilter = Tmo.storeFilters.users;
        storeFilter.unregisterProperty('group_id');
        storeFilter.set('search_scope', this.search_scope);
        storeFilter.set('apply_notification_settings', "true");
        storeFilter.set('share_obj', [this.shareType,this.shareObj.getId()]);
        storeFilter.filter(function(){
            Ext.getCmp("networkScope").setDisabled(false);
            storeFilter.unregisterProperty('apply_notification_settings');
            storeFilter.unregisterProperty('share_obj');
        });
    }

});

Ext.reg('ShareIndex', App.views.ShareIndex);
