Ext.regController('Groups', {

    beforeFilter: function() {
        return Profile.requireUser();
    },

    manage: function(options) {
        var page = this;
        var id = options.id || options.user_id;

        if (Ext.isEmpty(options.user))
            App.models.User.load(id, {
                success: function(result, operation) { page.renderPage('manage', options, {user: result}) },
                failure: function(result) {Ext.Msg.alert(I18n.t('support.failed_to_fetch_an_object'));}
            });
        else
            page.renderPage('manage', options, {user: options.user})
    },

    user: function(options) {
        var page = this;
        var id = options.id || options.user_id;

        if (Ext.isEmpty(options.user))
            App.models.User.load(id, {
                success: function(result, operation) { page.renderPage('user', options, {user: result, force_user_reload: options.force_user_reload}) },
                failure: function(result) {Ext.Msg.alert(I18n.t('support.failed_to_fetch_an_object'));}
            });
        else
            page.renderPage('user', options, {user: options.user, force_user_reload: options.force_user_reload})
    }

});