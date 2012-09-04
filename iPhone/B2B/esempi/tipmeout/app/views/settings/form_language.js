App.views.SettingsFormLanguage = Ext.extend(App.views.FormPanelWithErrors, {

    initComponent:function () {

        var instance = this;
        var backButton = Tmo.BackButton.getBackButton();
        var saveButton = {
            xtype: 'button',
            text: I18n.t('action.save_link'),
            ui: 'action',
            id: 'save_button',
            handler: this.onSaveAction,
            scope: this
        };

        var titleBar = {
            dock:'top',
            xtype:'toolbar',
            title:I18n.t('settings.actions.form_language.title'),
            defaults:{
                iconMask:true
            },

            items:[ backButton ]
        };

        var selected = getCurrentLanguage();

        var radio_langs = [];

        Ext.each([
            {value:'en', label:'English'},
            {value:'fr', label:'Fran\u00e7ais'}//,
//            {value: 'ru', label: 'TODO IN FUTURE'}
        ], function (item) {
            item.checked = (item.value === selected);
            radio_langs.push(item)
        });

        Ext.apply(this, {
            id: 'edit_language_card',
            scroll:'vertical',
            dockedItems:[ titleBar ],
            items:[
                {
                    xtype:'fieldset',
                    defaults:{
                        xtype:'radiofield',
                        labelWidth:'30%',
                        name:'locale_code',
                        cls:'x-field-label-white'
                    },
                    items: radio_langs
                },
                saveButton
            ]
        });

        App.views.SettingsForm.superclass.initComponent.call(this);
    },

    onSaveAction:function () {
        Ext.dispatch({
            controller:'Settings',
            action:'update_locale',
            form: Ext.getCmp('edit_language_card'),
            historyUrl: 'Settings/index'
        });
    }


});


Ext.reg('SettingsFormLanguage', App.views.SettingsFormLanguage);