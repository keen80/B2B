App.views.TipsEdit = Ext.extend(App.views.FormPanelWithErrors, {
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
            title: I18n.t('tip.actions.edit.edit_tip_header'),
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
                            required: true,
                            value: viewInstance.tip.get('review')
                        },
                        {
                            xtype: 'App.views.ErrorField',
                            fieldname: 'review'
                        },
                        editableStarsField(I18n.t('tip.actions.edit.rating'), 'real_value', viewInstance.tip.get('real_value'))
                    ]
                }
        ];

        createButton = {
            xtype: 'button',
            text:  I18n.t('tip.actions.edit.update_link'),
            ui: 'action',
            scope: this,
            handler: this.onUpdateAction
        };

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: "edit_tip_form",
            scroll: 'vertical',             
            dockedItems: [ titleBar ],
            items: [ fields, createButton ]
        });
        App.views.TipsEdit.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onUpdateAction: function() {
        Ext.dispatch({
            controller: 'Tips',
            action: 'update',
            form: Ext.getCmp('edit_tip_form'),
            tip: this.tip,
            user: this.user,
            tipObj: this.tipObj,
            tipObjFor: this.tipObjFor
        });
    }
});

Ext.reg('TipsEdit', App.views.TipsEdit);