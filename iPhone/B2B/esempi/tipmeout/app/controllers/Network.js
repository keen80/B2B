Ext.regController('Network', {

    beforeFilter: function() {
        return Profile.requireUser();
    },

    // index action
    index: function(options) {
        Tmo.storeFilters.users.filter();
        this.renderPage('index', options);
        if (Tmo.Flags.NETWORK_TAB === Tmo.Consts.NETWORK_TAB_ADDRESSES) {
            Ext.getCmp('users_card').onActionChange(Tmo.Consts.NETWORK_TAB_ADDRESSES)
        }
    },

    // show action
    show: function(options) {
        var page = this;
        var id = options.id || options.user_id;

        if (Ext.isEmpty(options.user))
            App.models.User.load(id, {
                success: function(result) {
                    page.renderPage('show', options, { user: Ext.ModelMgr.create(result.raw,'User') });
                },
                failure: function(result) {
                    Ext.Msg.alert(I18n.t('support.fetch_failed'));
                }
            });
        else
            page.renderPage('show', options, {user: options.user})
    },

    // create action
    create: function(options) {
        var page = this;
        Server.request('POST', '/notifications/invitations', {
            params: Server.toRailsParams('user_relationship', options.params),
            success: function(result) {
                if (options.user) {
                    Ext.dispatch({
                        controller: 'Groups',
                        action: 'user',
                        historyUrl: 'Groups/user/' + options.user.getId(),
                        user_id: options.user.getId(),
                        user: options.user,
                        force_user_reload: true
                    });
                }
                Ext.Msg.alert(I18n.t('support.success'), I18n.t('support.sent_invitation') );
            },
            failure: function(result) {
                Ext.Msg.alert(I18n.t('support.failure'), I18n.t('support.not_added_to_network'));
            }
        });
    },

    // destroy action
    destroy: function(options) {
        Tmo.BackButton.clearCurrentConfig();
        var page = this;
        Server.request('POST', '/networks/' + options.params.id, {
            params: {"_method": "delete"},
            success: function(result) {
//                options.viewInstance.user = Ext.ModelMgr.create(result,'User');
//                options.viewInstance.updateShowTemplate();

                //when user is removed from network, we should redirect to network index | ticket #8124
                Tmo.storeFilters.users.clear();
                Ext.dispatch(Tmo.BackButton.last());
                Ext.Msg.alert(I18n.t('support.success'), I18n.t('support.deleted_from_network'));
            },
            failure: function(result) {
                Ext.Msg.alert(I18n.t('support.failure'), I18n.t('support.not_deleted_from_network'));
            }
        });
    },

    show_profile: function(options) {
        if (options.user.getId() == Profile.getCurrentUser().getId())
            options.user = Profile.getCurrentUser();
        this.renderPage('network_show_profile', options, {xtype: 'NetworkShowProfile', user: options.user});
    },

    show_tips: function(options) {
        Tmo.storeFilters.tips.set('user_id', options.user.getId());
        Tmo.storeFilters.tips.filter();
        this.renderPage('tips_index', options, {
            xtype: 'TipsIndex',
            user: options.user,
            tipObjFor: 'user'
        });
    },

    show_addresses: function(options) {
        Tmo.storeFilters.places.setIfNotIn('search_scope', 'mutual', ['mutual', 'others']);
        Tmo.storeFilters.places.set('user_id', options.user.getId());
        Tmo.storeFilters.places.filter();
        this.renderPage('network_show_addresses', options, {xtype: 'NetworkShowAddresses', user: options.user});
    },

    show_people: function(options) {
        Tmo.storeFilters.peopleNetwork.set('search_scope', 'mutual');
        Tmo.storeFilters.peopleNetwork.set('user_id', options.user.getId());
        Tmo.storeFilters.peopleNetwork.filter();
        this.renderPage('network_show_people', options, {xtype: 'NetworkShowPeople', user: options.user});
    },

    show_events: function(options) {
        var scope_type = 'user';
        var scope_name = (options.user.getId() == Profile.getCurrentUser().getId()) ? 'yours' : 'user';
        Tmo.storeFilters.events.set('scope_type', scope_type);
        Tmo.storeFilters.events.set('search_scope', scope_name);
        Tmo.storeFilters.events.set('user_id', options.user.getId());
        Tmo.storeFilters.events.filter();
        this.renderPage('events_index', options, {
            xtype: 'EventsIndex',
            eventObj: options.user, //tips of object
            eventObjFor: scope_type  //view all tips that belong to place (view context)
        });        
    },

    show_images: function(options) {
        Ext.dispatch({
            controller: 'Album',
            action: 'index',
            historyUrl: 'Album/index',
            albumType: 'User',
            albumObj: options.user
        });
    },

    show_interests: function(options) {
        var page = this;
        Tmo.storeFilters.user_details.set('type', 'UserDetail::Interest');
        Tmo.storeFilters.user_details.set('user_id', options.user.getId());
        Tmo.storeFilters.user_details.filter(function(){
            page.renderPage('show_interests', options, {user: options.user});
        });
    }


});