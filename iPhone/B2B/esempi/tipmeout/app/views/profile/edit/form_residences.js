App.views.ProfileEditFormResidences = Ext.extend(App.views.ProfileEditNestedForm, {

    object_class: "UserDetail::Residence",
    object_translation_scope: "user_detail_residence",
    object_nested_form_scope: "user_detail_residences_attributes",
    window_title: I18n.t('profile.actions.edit.residences'),
    add_button_name: I18n.t('profile.actions.edit.add_residence_link'),
    remove_button_name: I18n.t('profile.actions.edit.remove_residence_link'),

    getFormFields: function(object, object_id){
        return {
            xtype: 'fieldset',
            defaults: {
                xtype: 'textfield',
                autoCapitalize : false,
                labelWidth: '35%'
            },
            items: [
                {
                    name : 'address_1',
                    xtype: 'textfield',
                    value: object.get('address_1')
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'address_1'
                },
                {
                    name : 'address_2',
                    xtype: 'textfield',
                    value: object.get('address_2')
                },
                {
                    name : 'city',
                    xtype: 'textfield',
                    required: true,
                    value: object.get('city')
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'city'
                },
                {
                    name : 'postal_code',
                    xtype: 'textfield',
                    value: object.get('postal_code')
                },
                {
                    name : 'country',
                    xtype: 'textfield',
                    required: true,
                    value: object.get('country')
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'country'
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
    }
});

Ext.reg('ProfileEditFormResidences', App.views.ProfileEditFormResidences);