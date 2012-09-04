App.views.SessionNewAccountConnect = Ext.extend(App.views.FormPanelWithErrors, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var titleBar, finishButton, backButton, fields;
        var usersListTpl, phoneList;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton(null, function(){Tmo.BackButton.clearSubPaths()});

        finishButton = {
            text: I18n.t('sessions.finish_link'),
            ui: 'action',
            handler: this.onFinishAction,
            scope: this
        };

        titleBar = {
            xtype: 'toolbar',
            title: I18n.t('sessions.connect_header'),
            items: [
                this.existingUser ? backButton : {xtype: 'spacer'},
                {xtype: 'spacer'},
                finishButton
            ]
        };

        fields = {
            xtype: 'fieldset',
            title: I18n.t('sessions.connect_with_you_network_header'),
            defaults: {
                xtype: 'togglefield',
                labelWidth: '75%',
                cls: 'x-field-label-white'
            },
            items: [
                {
                    name : 'address_book',
                    id: 'address_book_togglefield',
                    label:  '<span class="x-label-icon icon-address-book"></span>'+I18n.t('sessions.phone_address_book')+ '<p class="xmedium fw_n">' +
                            '<span id="info"></span>' +
                            '<span id="count"></span>' +
                            '</p>',
                    value: Tmo.storeFilters.connectUsers.get('address_book_scope'),
                    listeners: {
                        change:
                        {
                            fn: this.onToggleAddressBookAction,
                            scope: this
                        }
                    }
                },
                {
                    name : 'facebook',
                    id: 'facebook_togglefield',
                    label: '<span class="x-label-icon icon-facebook"></span>'+I18n.t('sessions.facebook_link')+'<p class="xmedium fw_n">' +
                            '<span id="info"></span>' +
                            '<span id="count"></span>' +
                            '</p>',
                    value: Tmo.storeFilters.connectUsers.get('facebook_scope'),
                    disabled: false,
                    listeners: {
                        change:
                        {
                            fn: this.onToggleFacebookAction,
                            scope: this
                        }
                    }
                },
                {
                    name : 'twitter',
                    id: 'twitter_togglefield',
                    label: '<span class="x-label-icon icon-twitter"></span>'+I18n.t('sessions.twitter_link')+'<p class="xmedium fw_n">' +
                            '<span id="info"></span>' +
                            '<span id="count"></span>' +
                            '</p>',
                    value: Tmo.storeFilters.connectUsers.get('twitter_scope'),
                    disabled: false,
                    listeners: {
                        change:
                        {
                            fn: this.onToggleTwitterAction,
                            scope: this
                        }
                    }
                }
            ]
        };

        usersListTpl = new Ext.XTemplate(
                '<div class="global_list {[this.check_type(values.contact_type)]}">',
                '   <div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.thumb_url)]})"></div>',
                '   <div class="name">{first_name} {last_name}</div>',
                '   <div class="grey"><img src="images/icons/{contact_type}.png" alt="{contact_type}" class="contact_type" /> {email}</div>',
                '</div>',
            {
                check_type:function (type) {
                    if(type.toString() === "tipmeout")
                    {
                        return "add_bt_"+I18n.locale
                    }
                    else
                    {
                        return "invite_bt_"+I18n.locale
                    }
                }
            });

        var renderPagination = function()
        {
            var hasMore = Tmo.storeFilters.connectUsers.store.data.length > Tmo.storeFilters.displayUsers.limit;
            if ( Ext.isEmpty(Ext.get('connect_list_paginate')) && hasMore ) {
                var list = Ext.getCmp('phone_list');
                var targetEl = list.getTargetEl();
                var html = '<div id="connect_list_paginate" class="x-list-paging-msg" id="load_next_page_button">' + 'More ...' + '</div>';
                var el = targetEl.createChild({
                    cls: 'x-list-paging',
                    html: html
                });
                var onTap = function() {
                    Tmo.storeFilters.displayUsers.limit += Tmo.storeFilters.displayUsers.perPage;
                    Tmo.storeFilters.connectUsers.filter();
                };
                list.mon(el, 'tap', onTap, list);
            }
        };

        phoneList = new App.views.TmoList({
            id: 'phone_list',
            scroll: false,
            itemTpl: usersListTpl,
            store: App.stores.displayUsers,
            cls: 'selectable selectable_connect',
            simpleSelect: true,
            multiSelect: true,
            grouped: true,
            listeners: {
                update: function(list) {
                    Ext.defer(function(){
                        renderPagination();
                    }, 500);

                    var connect_list_total = Ext.get("connect_list_total");
                    if ( connect_list_total ) {
                        App.stores.connectUsers.clearFilter(true);
                        connect_list_total.dom.innerText = App.stores.connectUsers.data.length;
                    }
                }
            }
        });

        phoneList.addListener('update', function(list){
            list.enable();
            list.selectRecords();
        });

        phoneList.addListener('selectionchange', function(){
            var connect_list_selected = Ext.get("connect_list_selected");
            if ( connect_list_selected ) {
                connect_list_selected.dom.innerText = phoneList.getSelectedRecords().length;
            }
        });

        var searchBar = {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'light',
            items: [
                {
                    xtype: 'searchfield',
                    useClearIcon: true,
                    flex: 1,
                    id: 'search_query',
                    value: Tmo.storeFilters.displayUsers.get('search_query'),
                    listeners: {
                        change:
                        {
                            fn: this.onSearchAction,
                            scope: this
                        }
                    }
                },
                {
                    text: I18n.t('action.search_link'),
                    ui: 'action',
                    handler: this.onSearchAction
                }
            ]
        };

        var phoneListContainer = {
            xtype: 'container',
            items: [
                {xtype: 'container', html: I18n.t('connect.selected_count_html', {count: 0, total:0})},
                searchBar,
                phoneList
            ]
        };

        var updateUserShowConnect = function(state){
            var requestParams = Server.toRailsParams('user', {show_connect: state});
            requestParams['_method'] = 'PUT';

            Server.request('POST', '/profile', {
                params: requestParams,
                success: function(result) { Profile.setCurrentUser(result); },
                failure: function(result) { Tmo.debug('update_error') }
            });
        };

        var toggleFieldset = {
            style: {
                marginTop: '1em'
            },
            xtype: 'fieldset',
            defaults: {
                xtype: 'checkboxfield',
                labelWidth: '75%',
                cls: 'x-field-label-white'
            },
            items: [
                {
                    name: 'show_connect',
                    value: !Profile.getCurrentUser().get('show_connect'),
                    listeners: {
                        check: function(c){ updateUserShowConnect(false); },
                        uncheck: function(c){ updateUserShowConnect(true); }
                    }
                }
            ]
        };

        I18n.loadLabels(toggleFieldset.items, 'User');

        /* --- create ------------------------------------------------------------------------------ */        

        Ext.apply(this, {
            scroll: 'vertical',
            id: "connect_card",
            dockedItems: [ titleBar ],
            items: [
                fields,
                phoneListContainer,
                ((this.showRecallCheckbox && Profile.getCurrentUser().get('show_connect')) ? toggleFieldset : {xtype: 'spacer'})
            ],
            listeners: {
                afterrender: function() {
                    Tmo.storeFilters.connectUsers.filter();
                }
            }
        });

        App.views.SessionNewAccountConnect.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onFinishAction: function() {
        var viewInstance = this;

        var phone_list_cmp = Ext.getCmp('phone_list');
        var selectedUsers = phone_list_cmp.getSelectedRecords();

        var tipmeoutUsers = [];
        var twitterUsers = [];
        var facebookUsers = [];
        var mailUsers = [];
        var tipmeoutUsersNotSelected = [];

        var phone_list_nodes = phone_list_cmp.getNodes();
        var phone_list_store = phone_list_cmp.getStore();
        for (var i = 0; i < phone_list_nodes.length; i++) {
            if (!phone_list_cmp.isSelected(phone_list_nodes[i])) {
                var record = phone_list_store.getAt(phone_list_nodes[i].viewIndex);
                if (record && record.data && record.data.contact_type == 'tipmeout') {
                    tipmeoutUsersNotSelected[tipmeoutUsersNotSelected.length] = record.data.email;
                }
            }
        }

        _.each(selectedUsers, function(user) {
            switch(user.data.contact_type)
            {
                case 'tipmeout':
                    tipmeoutUsers.push(user.data.email);
                    break;
                case 'twitter':
                    twitterUsers.push(user.data.twitter_id);
                    break;
                case 'facebook':
                    facebookUsers.push(user.data.facebook_id);
                    break;
                default:
                    mailUsers.push(user.data.email);
            }
        });

        var redirectOnSuccess = function() {
            if (viewInstance.existingUser) {
                Tmo.BackButton.clearSubPaths();
                Ext.dispatchBack(Tmo.BackButton.last());
            } else {
                Ext.dispatchBack({
                    controller: 'Dashboard',
                    action: 'index',
                    historyUrl: 'Dashboard/index'
                });
            }
        };

        var anyUsersWhereSelected = (!Ext.isEmpty(tipmeoutUsers) || !Ext.isEmpty(twitterUsers) || !Ext.isEmpty(mailUsers) || !Ext.isEmpty(facebookUsers));

        if ( !anyUsersWhereSelected && Ext.isEmpty(tipmeoutUsersNotSelected) )
        {
            redirectOnSuccess();
        }
        else
        {
            var notified_emails = Server.toRailsParams('notified_emails', (viewInstance.existingUser ? [] : tipmeoutUsersNotSelected));
            var params = Ext.merge(notified_emails, Server.toRailsParams('emails', tipmeoutUsers));
            params['_method'] = 'PUT';


            Server.request('POST', '/connect_users', {
                loadMask: true,
                params: params,
                success: function(result) {
                    var queueFn = [], queueIter = null;

                    queueIter = function() {
                        if (typeof queueFn[0] === 'function') {
                            queueFn.shift()(); //call magic tits
                        }
                    };

                    if ( !Ext.isEmpty(twitterUsers) )
                    {
                        Tmo.Adapters.twitter.ensureIsAuthenticated(function() {
                            Ext.each(twitterUsers, function(twitter_id) {
                                queueFn.push(function() {
                                    var msg = I18n.t("social.twitter.join_me", {app_name: Tmo.settings.app_name}).trunc(140 - Tmo.settings.site_url.length - 2) + " " + Tmo.settings.site_url;
                                    Tmo.Adapters.twitter.api.sendDirectMessage(twitter_id, msg, queueIter, queueIter);
                                });
                            });
                        }, function(){queueIter();});
                    }

                    if ( !Ext.isEmpty(facebookUsers) ) {
                        queueFn.push(function() {
                            Tmo.Adapters.facebook.sendInvitationToAppDialog(facebookUsers, queueIter, queueIter);
                        });
                    }

                    if ( !Ext.isEmpty(mailUsers) )
                    {
                        queueFn.push(function(){
                            Tmo.Adapters.email.send( mailUsers.join(','),  I18n.t("social.connect.join_me_title", {app_name: Tmo.settings.app_name}), I18n.t("social.connect.join_me", {app_name: Tmo.settings.app_name}), queueIter, queueIter);
                        });
                    }

                    queueFn.push(function(){
                        if (anyUsersWhereSelected && Ext.isEmpty(mailUsers) && Ext.isEmpty(facebookUsers)) {
                            var msg = new Ext.MessageBox({ listeners: { hide: function (c) { redirectOnSuccess() } } });
                            msg.alert(I18n.t('support.success'), I18n.t('network.notifications.sent'));
                        } else {
                            redirectOnSuccess();
                        }
                        queueIter();
                    });

                    queueIter();
                },
                failure: function(result) {
                    Ext.Msg.alert(I18n.t('support.failure'), I18n.t('network.notifications.not_sent'));
                }
            });
        }
    },

    updateConnectListTotal: function() {
        var connect_list_total = Ext.get("connect_list_total");
        if ( connect_list_total ) {
            App.stores.connectUsers.clearFilter(true);
            connect_list_total.dom.innerText = App.stores.connectUsers.data.length;
        }
    },

    commonToggleAction: function() {
        Ext.getCmp('search_query').setValue('');
        Tmo.storeFilters.displayUsers.setDefaults();
        Tmo.storeFilters.connectUsers.filter();
        this.updateConnectListTotal();
    },

    onToggleAddressBookAction: function(slider, thumb, newValue, oldValue) {
        if (oldValue != newValue) {
            Tmo.storeFilters.connectUsers.set("address_book_scope", newValue);
            this.commonToggleAction();
        }
    },

    onToggleFacebookAction: function(slider, thumb, newValue, oldValue) {
        if (oldValue != newValue) {
            Tmo.storeFilters.connectUsers.set("facebook_scope", newValue);
            this.commonToggleAction();
        }
    },

    onToggleTwitterAction: function(slider, thumb, newValue, oldValue) {
        if (oldValue != newValue) {
            Ext.getCmp('search_query').setValue('');
            Tmo.storeFilters.connectUsers.set("twitter_scope", newValue);
            this.commonToggleAction();
        }
    },

    onSearchAction: function()
    {
      Tmo.Adapters.keyboard.hide();
      var value = Ext.getCmp('search_query').getValue();

      Tmo.storeFilters.displayUsers.setDefaults();
      Tmo.storeFilters.displayUsers.set('search_query', value);
      
      Tmo.storeFilters.connectUsers.filter();
    }
});

Ext.reg('SessionNewAccountConnect', App.views.SessionNewAccountConnect);
