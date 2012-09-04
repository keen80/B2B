App.views.SessionNewAccountCheckin = Ext.extend(App.views.FormPanelWithErrors, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */
        
        var titleBar, backButton, doneButton, fields, fields_push;
        var usersListTpl, usersList;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = {
            text: I18n.t('action.cancel_link'),
            handler: this.onCancelAction,
            scope: this
        };

        doneButton = {
            xtype: 'button',
            text: I18n.t('action.done_link'),
            ui: 'action',
            handler: this.onDoneAction,
            scope: this
        };

        titleBar = {
            xtype: 'toolbar',
            title: I18n.t('sessions.connect_header'),
            items: [ backButton, {xtype: 'spacer'}, doneButton ]
        };

        fields = {
            xtype: 'fieldset',
            title: I18n.t('sessions.link_you_checkin_header'),
            defaults: {
                xtype: 'togglefield',
                labelWidth: '75%',
                cls: 'x-field-label-white'
            },
            items: [
                 {
                    name : 'facebook',
                    label: '<span class="x-label-icon icon-facebook"></span>' + I18n.t('sessions.facebook_link')
                }
            ]
        };

        fields_push = {
            xtype: 'fieldset',
            defaults: {
                xtype: 'togglefield',                                
                labelWidth: '75%',
                cls: 'x-field-label-white'
            },
            items: [
                 {
                    name : 'push_notifications',
                    label: I18n.t('sessions.links.push_notifications_link'),
                    value: 1
                },
                {
                    name : 'location_services',
                    label: I18n.t('sessions.links.location_services_link'),
                    value: 1
                }
            ]
        };

        /* --- create ------------------------------------------------------------------------------ */       

        Ext.apply(this, {
            scroll: 'vertical',            
            dockedItems: [ titleBar ],
            items: [fields, fields_push]
        });

        App.views.SessionNewAccountCheckin.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */    

    onCancelAction: function() {
        Ext.dispatchBack({
            controller: 'Session',
            action: 'index',
            historyUrl: 'Session/index'
        });
    },    

    onDoneAction: function() {
        Ext.dispatch({
            controller: 'Dashboard',
            action: 'index',
            historyUrl: 'Dashboard/index'
        });
    }
});

Ext.reg('SessionNewAccountCheckin', App.views.SessionNewAccountCheckin);
