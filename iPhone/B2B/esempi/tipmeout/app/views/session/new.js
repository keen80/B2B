App.views.SessionNewAccount = Ext.extend(App.views.FormPanelWithErrors, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var user = this.user;
        var titleBar, backButton, fields, createButton, debugButton;

        /* --- init --------------------------------------------------------------------------------- */
        
        backButton = {
            text: I18n.t('action.cancel_link'),
            ui: 'back',
            handler: this.onBackAction,
            scope: this
        };

        titleBar = {
            xtype: 'toolbar',
            title: I18n.t('sessions.create_an_account_header'),
            items: [ backButton ]
        };

        fields = {
            xtype: 'fieldset',
            id: 'sign_up_fieldset',
            defaults: {
                xtype: 'textfield',
                required: true,
                useClearIcon: true,
                autoCapitalize : false,
                labelWidth: '35%'
            },
            items: [
                {
                    name : 'gender',
                    xtype: 'tmo_selectfield',
                    options: user.getOptionsForGender()
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'gender'
                },
                {
                    name: 'first_name',
                    autoCapitalize: true,
                    placeHolder: 'First name'
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'first_name'
                },
                {
                    name: 'last_name',
                    autoCapitalize: true,
                    placeHolder: 'Last name'
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'last_name'
                },
                {
                    name: 'email',
                    xtype: 'emailfield',
                    placeHolder: 'Valid email address'
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'email'
                },
                {
                    name: 'facebook_id',
                    xtype: 'hiddenfield'
                },
                {
                    name: 'password',
                    xtype: 'passwordfield',
                    placeHolder: '********'
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'password'
                },
                {
                    name: 'password_confirmation',
                    xtype: 'passwordfield',
                    placeHolder: '********'
                },
                {
                    name: 'locale_code',
                    xtype: 'hiddenfield'
                }
            ]
        };

        I18n.loadLabels(fields.items, 'User');

        createButton = {
            xtype: 'button',
            text: I18n.t('sessions.register'),
            ui: 'action',
            handler: this.onRegisterAction,
            scope: this
        };

        debugButton = {
            xtype: 'button',
            text: 'Generate random account',
            ui: 'action',
            handler: this.createRandomAccount,
            scope: this
        };

        var termsContainer = new Ext.Container({
            html: '<div class="terms_of_use">'+I18n.t('sessions.by_continuing')+'<strong>'+I18n.t('sessions.terms_of_use')+'</strong>'+'</div>'
        });

        /* --- create ------------------------------------------------------------------------------- */

        Ext.apply(this, {
            id: 'sign_up_form',
            scroll: 'vertical',
            dockedItems: [ titleBar ],
            items: [fields, createButton, termsContainer],
            listeners: {
                show: function() {
                    this.loadRecord(this.user);
                }
            }
        });

        App.views.SessionNewAccount.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onBackAction: function() {
        Ext.dispatchBack({
            controller: 'Session',
            action: 'index',
            historyUrl: 'Session/index'
        });
    },    

    onRegisterAction: function() {
        this.disable();
        Ext.dispatch({
          controller: 'Session',
          action: 'sign_up',
          form: Ext.getCmp('sign_up_form')
        });
    },

    createRandomAccount: function() {
        var fn, ln, em, pa, t;
        t = new Date().getTime();
        fn = "User " + t;
        ln = "Xyz";
        em = t +  "@aa.aa";
        pa = "secret";

        Ext.query("*[name=first_name]")[0].value = fn;
        Ext.query("*[name=last_name]")[0].value = ln;
        Ext.query("*[name=email]")[0].value = em;
        Ext.query("*[name=password]")[0].value = pa;
        Ext.query("*[name=password_confirmation]")[0].value = pa;
    }
    
});

Ext.reg('SessionNewAccount', App.views.SessionNewAccount);

