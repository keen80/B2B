App.views.EventGuestsNewForm = Ext.extend(App.views.FormPanelWithErrors, {
    initComponent: function() {
        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var createButton;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('event.titles.participate'),
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        var fields_name = {
            xtype: 'fieldset',
            defaults: {
                xtype: 'textfield',
                cls: 'x-field-label-white',
                useClearIcon: true,
                autoCapitalize : false,
                labelWidth: '35%'
            },
            items: [
                {
                    name: 'event_name',
                    label: I18n.t('event.label'),
                    value: this.event.get('name'),
                    disabled: true
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'event_name'
                },
                {
                    name: 'event_id',
                    xtype: 'hiddenfield',
                    value: this.event.getId()
                },
                {
                    name: 'guest_id',
                    xtype: 'hiddenfield',
                    value: Profile.getCurrentUser().getId()
                }
            ]
        };

        var fields_status = [
                {
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: 'auto',
                        cls: 'x-field-label-white'
                    },
                    items: [
                        this.event_guest.getStatusItems(this.event)
                    ]
                }
        ];

        createButton = {
            xtype: 'button',
            text: I18n.t('button.confirm'),
            ui: 'action',
            id: 'confirm_button',
            handler: this.onCreateAction,
            scope: this
        };

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: "new_event_guest_form",
            scroll: 'vertical',             
            dockedItems: [ titleBar ],
            items: [ fields_name, fields_status, createButton ]
        });
        App.views.EventGuestsNewForm.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onCreateAction: function() {
        Ext.dispatch({
            controller: 'EventGuests',
            action: 'create',
            form: Ext.getCmp('new_event_guest_form'),
            event: this.event,
            historyUrl: 'EventGuests/index'
        });
    }
});

Ext.reg('EventGuestsNewForm', App.views.EventGuestsNewForm );