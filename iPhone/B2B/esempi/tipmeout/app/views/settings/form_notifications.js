App.views.SettingsFormNotifications = Ext.extend(App.views.SettingsForm, {

    title: 'settings.actions.form_notifications.title',
    object: "user",
    modelName: "User",
    fieldsConfig: [['use_push_notifications'],['use_pn_network', 'use_pn_addresses', 'use_pn_events','use_pn_other']],
    translationDescScope: "settings.actions.form_notifications"
});

Ext.reg('SettingsFormNotifications', App.views.SettingsFormNotifications);