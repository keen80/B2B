Ext.regController('Session', {

    index: function(options)
    {
        Profile.clear();
        this.renderPage('index', options);
    },

    login: function()
    {
        this.renderPage('login');
    },

    sign_in: function(params)
    {
      Server.request('POST', '/users/sign_in.json', {
        loadMask: true,
        params: Server.toRailsParams('user', params.form.getValues()),
        success: function(result) {
          Profile.setup(result);
          Ext.redirect('Dashboard/index');
        },
        failure: function(result) {
          Ext.Msg.alert(I18n.t('support.login_failed'), null, function(){Ext.getCmp('sign_in_form').enable()});
        }
      });      
    },

    // new account action
    new_account: function(params)
    {
        this.renderPage('new_account', params, {
                user: Ext.ModelMgr.create({ gender: params.gender,
                                            first_name: params.first_name,
                                            last_name: params.last_name,
                                            email: params.email,
                                            facebook_id: params.facebook_id,
                                            locale_code: TmoConfig.locale_code }, 'User')
            });
    },

    sign_up: function(params)
    {
      Server.request('POST', '/users.json', {
        loadMask: true,
        params: Server.toRailsParams('user', params.form.getValues()),
        success: function(result) {
          Profile.setup(result);
          Ext.redirect('Session/new/connect');
        },
        failure: function(result) {
          params.form.showErrors(result);
          Ext.Msg.alert(I18n.t('support.login_failed'), null, function(){Ext.getCmp('sign_up_form').enable()});
        }
      });
    },

    // new account > connect action
    connect: function(options)
    {
        Tmo.BackButton.isSubPath(options);
        App.stores.users.removeAll();
        App.stores.users.loadPage(1);
        this.renderPage('new_account_connect', options, {existingUser: options.existingUser, showRecallCheckbox: (options.showRecallCheckbox || false)});
    },

    // new account > checkin action
    checkin: function()
    {
        this.renderPage('new_account_checkin', options);
    },

    no_connection: function(options) {
        this.renderPage('no_connection');
    }
});