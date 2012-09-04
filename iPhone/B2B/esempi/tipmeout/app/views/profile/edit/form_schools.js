App.views.ProfileEditFormEducation = Ext.extend(App.views.ProfileEditNestedForm, {

    object_class: "UserDetail::School",
    object_translation_scope: "user_detail_school",
    object_nested_form_scope: "user_detail_schools_attributes",
    window_title: I18n.t('profile.actions.edit.education'),
    add_button_name: I18n.t('profile.actions.edit.add_school_link'),
    remove_button_name: I18n.t('profile.actions.edit.remove_school_link'),

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
                    name : 'academic_level_id',
                    xtype: 'tmo_selectfield',
                    placeHolder: I18n.t('support.select.prompt'),
                    required: true,
                    options: _.map(App.stores.school_types.data.items, function(item) {
                        return {text: item.data.name,  value: item.data.id}
                    }),
                    value: object.get('academic_level_id')
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'academic_level_id'
                },
                {
                    name : 'name',
                    xtype: 'textfield',
                    required: true,
                    value: object.get('name')
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'name'
                },
                {
                    name : 'graduation',
                    xtype: 'numberpickerfield',
                    numberFrom: 1970,
                    numberTo: currentTime.getFullYear()+5,
                    value: object.get('graduation')
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

Ext.reg('ProfileEditFormEducation', App.views.ProfileEditFormEducation);