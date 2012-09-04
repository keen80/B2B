App.views.SessionNoConnection = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var logoContainer = new Ext.Container({
            html:'<div class="tmo_logo"><img src="images/session_card/no_connection.png" />' +
                '   <p>' + I18n.t('no_connection.message') + '</p>' +
                '</div>',
            flex:1
        });

        var reconnectButton = {
            xtype:'button',
            text:I18n.t('no_connection.reconnect_button'),
            ui:'action',
            handler:function () {
                Tmo.LoadMask.show();
                Profile.showTabBar();
                Ext.dispatch(Tmo.BackButton.last() || Tmo.BackButton.config_root);
            }
        };

        var logoutButton = {
            xtype:'button',
            text:I18n.t('no_connection.logout_button'),
            ui:'action',
            handler:function () {
                Profile.logout();
            }
        };

        var buttonsContainer = new Ext.Container({
            cls:'session_buttons_container',
            items:[
                reconnectButton,
                {
                    xtype:'container',
                    cls:'container_session',
                    html: I18n.t('no_connection.tip')
                },
                {
                    xtype:'container',
                    cls:'container_session'
                },
                logoutButton
            ]
        });

        var mainContainer = new Ext.Container({
            layout:{
                type:'vbox',
                align:'stretch'
            },
            cls:'noise_pattern',
            items:[logoContainer, buttonsContainer]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            items: [mainContainer]
        });

        App.views.SessionNoConnection.superclass.initComponent.call(this);
    }

    /* --- actions ------------------------------------------------------------------------------ */
});

Ext.reg('SessionNoConnection', App.views.SessionNoConnection);
