App.views.ProfileEditFormClubs = Ext.extend(App.views.ProfileEditNestedForm, {

    object_class: "UserDetail::Club",
    object_translation_scope: "user_detail_club",
    object_nested_form_scope: "user_detail_clubs_attributes",
    window_title: I18n.t('profile.actions.edit.clubs'),
    add_button_name: I18n.t('profile.actions.edit.add_club_link'),
    remove_button_name: I18n.t('profile.actions.edit.remove_club_link'),

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
                    name : 'club_type_id',
                    xtype: 'tmo_selectfield',
                    placeHolder: I18n.t('support.select.prompt'),
                    required: true,
                    options: _.sortBy(_.map(App.stores.club_types.data.items, function(item) {
                        return {text: item.data.name,  value: item.data.id}
                    }), function(data){return data.text}),
                    value: object.get('club_type_id')
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'club_type_id'
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

Ext.reg('ProfileEditFormClubs', App.views.ProfileEditFormClubs);