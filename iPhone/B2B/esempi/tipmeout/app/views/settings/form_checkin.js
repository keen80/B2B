App.views.SettingsFormCheckin = Ext.extend(App.views.SettingsForm, {

    title: 'settings.actions.form_checkin.title',
    object: "user",
    modelName: "User",
    fieldsConfig: ['default_post_on_facebook', 'default_post_on_twitter'],
    translationDescScope: "settings.actions.form_checkin"
});

Ext.reg('SettingsFormCheckin', App.views.SettingsFormCheckin);