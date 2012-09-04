App.views.TipsNewForm = Ext.extend(App.views.FormPanelWithErrors, {
    initComponent: function() {
        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var fields, createButton;
        var viewInstance = this;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('tip.actions.new.new_tip_header'),
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        fields = [
                {
                    xtype: 'fieldset',
                    defaults: {
                        xtype: 'textfield',
                        useClearIcon: true,
                        autoCapitalize : false,
                        labelWidth: '35%'
                    },
                    items: [
                        {
                            xtype: 'textareafield',
                            name: 'review',
                            label: I18n.t('tip.actions.edit.add_a_tip_label'),
                            required: true
                        },
                        {
                            xtype: 'App.views.ErrorField',
                            fieldname: 'review'
                        },
                        {
                            name: 'place_id',
                            xtype: 'hiddenfield',
                            value: viewInstance.place.getId()
                        },
                        editableStarsField(I18n.t('tip.actions.edit.rating'), 'real_value', 0 - 1)
                    ]
                }
        ];

        createButton = {
            xtype: 'button',
            text: I18n.t('tip.actions.new.create_a_tip_link'),
            ui: 'action',
            id: 'create_button',
            scope: this,
            handler: this.onCreateAction
        };

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: "new_tip_form",
            scroll: 'vertical',             
            dockedItems: [ titleBar ],
            items: [ fields, createButton ]
        });
        App.views.TipsNewForm.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onBackAction: function() {
        Ext.dispatchBack({
            controller: 'Places',
            action: 'show',
            historyUrl: 'Places/show/' + this.place.getId(),
            place: this.place
        });
    },

    onCreateAction: function() {
        Ext.dispatch({
            controller: 'Tips',
            action: 'create',
            form: Ext.getCmp('new_tip_form'),
            place: this.place
        });
    }
});

Ext.reg('TipsNewForm', App.views.TipsNewForm );