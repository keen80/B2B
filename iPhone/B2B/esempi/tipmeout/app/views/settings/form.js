App.views.SettingsForm = Ext.extend(App.views.FormPanelWithErrors, {

    title: "",
    object: "",
    modelName: "",
    fieldsConfig: [[]],
    translationDescScope: "",

    initComponent: function() {

        var backButton, titleBar, saveButton;
        var fields;
        var instance = this;

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t(this.title),
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        fields = this.getFormFields();

        Ext.each(fields, function(fieldset){ I18n.loadLabels(fieldset.items, instance.modelName); });

        saveButton = {
            xtype: 'button',
            text: I18n.t('action.save_link'),
            ui: 'action',
            id: 'save_button',
            handler: this.onSaveAction,
            scope: this
        };

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'edit_settings_card',
            scroll: 'vertical',
            dockedItems: [ titleBar ],
            items: [ fields, saveButton ],
            listeners: {
                show: function() {
                    instance.loadRecord(this[this.object]);
                }
            }
        });

        App.views.SettingsForm.superclass.initComponent.call(this);
    },

    getFormFields: function() {
        var instance = this;
        var fieldset = [];
        Ext.each(instance.fieldsConfig, function(fieldsetFields){
            var _fields = [];
            Ext.each(fieldsetFields, function(field_name) {
                _fields.push(App.formHint(field_name+'_desc'));
                _fields.push({
                    name: field_name,
                    id: field_name,
                    listeners: {
                        change: App.formHintChange(field_name+'_desc', instance.translationDescScope+'.'+field_name+'_desc')
                    }
                });
            });
            fieldset.push({
                xtype: 'fieldset',
                defaults: { xtype: 'togglefield', autoCapitalize : false, labelWidth: '70%' },
                items: _fields
            });
        });
        return fieldset;
    },

    onSaveAction: function() {
        Ext.dispatch({
            controller: 'Settings',
            action: 'update',
            form: Ext.getCmp('edit_settings_card'),
            historyUrl: 'Settings/index'
        });
    }

});

Ext.reg('SettingsForm', App.views.SettingsForm);