App.views.SessionLogin = Ext.extend(App.views.FormPanelWithErrors, {
    initComponent: function() {       

        /* --- variables ---------------------------------------------------------------------------- */
        
        var titleBar, backButton, passwordButton, fields, loginButton;

        /* --- init --------------------------------------------------------------------------------- */
        
        backButton = {
            text: I18n.t('action.cancel_link'),
            ui: 'back',
            handler: this.onBackAction,
            scope: this
        };

        titleBar = {
            xtype: 'toolbar',
            title: I18n.t('sessions.sign_in_header'),
            items: [ backButton ]
        };

        fields = {
            xtype: 'fieldset',
            title: I18n.t('sessions.enter_your_login_and_pass_header'),
            defaults: {
                xtype: 'textfield',
                useClearIcon: true,
                autoCapitalize : false,
                labelWidth: '35%'
            },
            items: [
                {
                    name: 'email',
                    xtype: 'emailfield',
                    placeHolder: 'example@name.com'
                },
                {
                    name: 'password',
                    xtype: 'passwordfield',
                    placeHolder: '********'
                },
                {
                    name: 'locale_code',
                    xtype: 'hiddenfield',
                    value: TmoConfig.locale_code
                }
            ]
        };
        I18n.loadLabels(fields.items, 'User');

        loginButton = {
            xtype: 'button',
            text: I18n.t('sessions.login'),
            ui: 'action',
            handler: this.onLoginAction,
            scope: this
        };

        passwordButton = {
            xtype: 'container',
            html: '<p class="forgot_password"><a href="' + Server.apiUrl('/users/password/new?locale='+I18n.locale) + '" target="_blank">' + I18n.t('sessions.password_link') + '</a></p>'
        };

        /* --- create ------------------------------------------------------------------------------- */

        Ext.apply(this, {
            id: 'sign_in_form',
            scroll: 'vertical',
            dockedItems: [ titleBar ],
            items: [fields, loginButton, passwordButton]
        });

        App.views.SessionLogin.superclass.initComponent.call(this);
    },

    onBackAction: function() {
        Ext.dispatchBack({
            controller: 'Session',
            action: 'index',
            historyUrl: 'Session/index'
        });
    },

    onLoginAction: function() {
      this.disable();
      Ext.dispatch({
        controller: 'Session',
        action: 'sign_in',
        form: Ext.getCmp('sign_in_form')
      });
    }
});

Ext.reg('SessionLogin', App.views.SessionLogin);
