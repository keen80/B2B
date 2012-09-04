Ext.regController('Settings', {

    beforeFilter: function() {
        return Profile.requireUser();
    },

    index: function(options) {
        this.renderPage('index', options, {user: Profile.getCurrentUser()});
    },

    update: function(params) {
      var requestParams = Server.toRailsParams('user', params.form.getValues());
      requestParams['_method'] = 'PUT';

      Server.request('POST', '/profile', {
        params: requestParams,
        success: function(result) {
            Profile.setCurrentUser(result);
            Ext.Msg.alert(I18n.t('settings.saved'));
        },
        failure: function(result) {
            Ext.Msg.alert(I18n.t('support.save_failed'));
        }
      });
    },

    update_locale: function(params) {
      var requestParams = Server.toRailsParams('user', params.form.getValues());
      requestParams['_method'] = 'PUT';

      Server.request('POST', '/profile', {
        params: requestParams,
        success: function(result) {
            setCurrentLanguage(result.locale_code);
            Profile.setCurrentUser(result);
            setTmoLocales();
            Profile.unloadStores();
            Profile.loadStores();
            Tmo.LoadMask.hide();
            App.tabBarReloadTranslations();
            Ext.dispatch({
                controller: 'Dashboard',
                action: 'index',
                historyUrl: 'Dashboard/index'
            });

        },
        failure: function(result) {
            Ext.Msg.alert(I18n.t('support.save_failed'));
        }
      });
    },

    form_notifications: function(options) {
        this.renderPage('form_notifications', options, {user: Profile.getCurrentUser()});
    },

    form_confidentiality: function(options) {
        this.renderPage('form_confidentiality', options, {user: Profile.getCurrentUser()});
    },

    form_checkin: function(options) {
        this.renderPage('form_checkin', options, {user: Profile.getCurrentUser()});
    },

    form_language: function(options) {
        this.renderPage('form_language', options, {user: Profile.getCurrentUser()});
    }

});