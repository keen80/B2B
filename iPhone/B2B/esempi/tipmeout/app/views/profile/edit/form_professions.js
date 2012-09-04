App.views.ProfileEditFormProfession = Ext.extend(App.views.ProfileEditNestedForm, {

    object_class: "UserDetail::Profession",
    object_translation_scope: "user_detail_profession",
    object_nested_form_scope: "user_detail_professions_attributes",
    window_title: I18n.t('profile.actions.edit.profession'),
    add_button_name: I18n.t('profile.actions.edit.add_company_link'),
    remove_button_name: I18n.t('profile.actions.edit.remove_company_link'),

    getFormFields: function(object, object_id){
        var currentTime = new Date();
        return {
            xtype: 'fieldset',
            defaults: {
                xtype: 'textfield',
                autoCapitalize : false,
                labelWidth: '35%'
            },
            items: [
                {
                    name : 'industry_id',
                    xtype: 'tmo_selectfield',
                    placeHolder: I18n.t('support.select.prompt'),
                    required: true,
                    options: _.sortBy(_.map(App.stores.industry_types.data.items, function(item) {
                        return {text: item.data.name,  value: item.data.id}
                    }), function(data){return data.text}),
                    value: object.get('industry_id')
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'industry'
                },
                {
                    name : 'company',
                    xtype: 'textfield',
                    required: true,
                    value: object.get('company')
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'company'
                },
                {
                    name : 'title',
                    xtype: 'textfield',
                    value: object.get('title')
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'city'
                },
                {
                    name : 'from_date',
                    xtype: 'numberpickerfield',
                    numberFrom: 1970,
                    numberTo: currentTime.getFullYear()+5,
                    value: object.get('from_date')
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'from_date'
                },
                {
                    name : 'to_date',
                    xtype: 'numberpickerfield',
                    numberFrom: 1970,
                    numberTo: currentTime.getFullYear()+5,
                    value: object.get('to_date')
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'to_date'
                },
                {
                    name : 'tmp_id',
                    xtype: 'hiddenfield',
                    value: object_id
                },
                {
                    name : 'id',
                    xtype: 'hiddenfield',
                    value: object.get('id')
                },
                {
                    name : '_destroy',
                    xtype: 'hiddenfield',
                    value: false
                }
         ]
        };
    },


    getAdditionalFields: function() {
        return [
            {
                xtype: 'fieldset',
                defaults: {
                    xtype: 'textfield',
                    autoCapitalize : false,
                    labelWidth: '35%'
                },
                items: [
                    {
                        name : 'employment_status_id',
                        xtype: 'tmo_selectfield',
                        label: I18n.t('activerecord.attributes.user.employment_status_id'),
                        includeBlank: {text: I18n.t('support.none'), value: null},
                        placeHolder: I18n.t('support.select.prompt'),
                        options: _.map(App.stores.employment_statuses.data.items, function(item) {
                            return {text: item.data.name,  value: item.data.id}
                        }),
                        value: Profile.getCurrentUser().get('employment_status_id')
                    }
             ]
            }
        ]
    }
});

Ext.reg('ProfileEditFormProfession', App.views.ProfileEditFormProfession);