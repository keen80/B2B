App.views.SettingsFormConfidentiality = Ext.extend(App.views.SettingsForm, {

    title: 'settings.actions.form_confidentiality.title',
    object: "user",
    modelName: "User",
    fieldsConfig: [['receive_notifications_via_explore'],['show_my_position_on_map', 'show_my_addresses', 'show_my_network','show_my_job','show_my_interests','show_my_place_of_living']],
    translationDescScope: "settings.actions.form_confidentiality"
});

Ext.reg('SettingsFormConfidentiality', App.views.SettingsFormConfidentiality);