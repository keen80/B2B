App.views.SettingsIndex = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var viewInstance = this;
        var user = this.user;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            title: I18n.t('settings.actions.index.title'),
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        var logoutButton = {
            xtype: 'button',
            text: I18n.t('action.logout_link'),
            handler: this.onLogoutAction,
            scope: this
        };

        var logoutContainer = new Ext.Container({
            cls: 'overview_buttons',
            items: [logoutButton]
        });

        var settingsList = App.profileDetailsList(
            user.settings_details_for_view(),{id: 'settings_details_list', listeners: { selectionchange: { fn: viewInstance.onShowAction, scope: this }}}
        );

        var settingsContainer = new Ext.Container({
            items: [settingsList]
        });

        var settingsContent = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            id: "settings_content",
            items: [
                App.headers.render('profile/show/header', this.user.data),
                settingsContainer,
                logoutContainer
            ]
        });


        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            scroll: 'vertical',
            id: 'settings_card',
            dockedItems: [titleBar],
            items: [settingsContent]
        });

        App.views.SettingsIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowAction: function(sel, records) {
        if (records[0] !== undefined) {
            var row = records[0];
            Tmo.debug(row);
            if (row.data.type == 'connect')
            {
                Ext.dispatch({
                    controller: 'Session',
                    action: 'connect',
                    historyUrl: 'Session/connect',
                    existingUser: true
                });
            } else {
                var action = 'form_' + row.data.type;
                Ext.dispatch({
                    controller: 'Settings',
                    action: action,
                    historyUrl: 'Settings/' + action
                });
            }
        }
    },

    onLogoutAction: function()
    {
        Ext.dispatchBack({
            controller: 'Session',
            action: 'index',
            historyUrl: 'Session/index'
        });
    }
    
});

Ext.reg('SettingsIndex', App.views.SettingsIndex);