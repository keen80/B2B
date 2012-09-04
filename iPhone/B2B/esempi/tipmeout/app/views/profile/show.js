App.views.ProfileShow = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var titleBar, settingsButton, messagesButton, inviteButton;
        var viewInstance = this;

        /* --- init --------------------------------------------------------------------------------- */

        settingsButton = {
            iconCls: 'settings',
            iconMask: true,
            handler: function(){
                Ext.dispatch({
                    controller: 'Settings',
                    action: 'index',
                    historyUrl: 'Settings/index'
                });
            }
        };

        messagesButton = {
            iconCls: 'messages',
            iconMask: true,
            badgeText: Profile.getCurrentUser().get('unread_count'),
            handler: function(){
                Ext.dispatch({
                    controller: 'Messages',
                    action: 'index',
                    historyUrl: 'Messages/index'
                });
            }
        };

        inviteButton = {
            iconCls: 'team',
            iconMask: true,
            handler: function(){
                Ext.dispatch({
                    controller: 'Session',
                    action: 'connect',
                    historyUrl: 'Session/connect',
                    existingUser: true
                });
            }
        };

        titleBar = {
            dock: 'top',
            title: I18n.t('dashboard.me'),
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ settingsButton, {xtype:'spacer', flex: 1}, messagesButton, inviteButton ]
        };

        var profileDetailsList = App.profileDetailsList(            
            this.user.data.relationship_details,
            {
                listeners: {
                    selectionchange:
                    {
                        fn: viewInstance.onShowAction,
                        scope: this
                    }
                }
            }
        );

        var profileDetailsContainer = new Ext.Container({
            items: [profileDetailsList]
        });

        var profileContent = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            id: "profile_content",
            items: [
                App.headers.render('profile/show/header', this.user.data),
                profileDetailsContainer
            ]
        });


        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            scroll: 'vertical',
            id: 'profile_card',
            dockedItems: [titleBar],
            items: [profileContent]
        });

        App.views.ProfileShow.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowAction: function(sel, records) {
        if (records[0] !== undefined) {
            var row = records[0];
            var action = 'show_' + row.data.type;
            Tmo.debug("DISPATCHING: " + row.data.type);

            if (action == "show_addresses") {
                //exception: we want to see address book
                Ext.dispatch({
                    controller: 'Places',
                    action: 'index',
                    historyUrl: 'Places/index'
                });
            }  else {
                Ext.dispatch({
                    controller: 'Network',
                    action: action,
                    historyUrl: 'Network/' + action + '/' + this.user.getId(),
                    user_id: this.user.getId(),
                    user: this.user
                });
            }
        }
    }
    
});

Ext.reg('ProfileShow', App.views.ProfileShow);