App.views.SessionIndex = Ext.extend(Ext.Panel, {
    initComponent:function () {

        /* --- variables ---------------------------------------------------------------------------- */

        var logoContainer, facebookButton, loginButton, passwordButton, signupButton, buttonsContainer, mainContainer;

        /* --- init --------------------------------------------------------------------------------- */

        logoContainer = new Ext.Container({
            html:'<div class="tmo_logo"><img src="images/session_card/tmo_logo.png" /></div>',
            flex:1
        });

        loginButton = {
            id:"login_button",
            xtype:'button',
            text:I18n.t('sessions.login_link'),
            ui:'action',
            handler:function () {
                Ext.dispatch({
                    controller:'Session',
                    action:'login'
                });
            }
        };

        signupButton = {
            id:"signup_button",
            xtype:'button',
            text:I18n.t('sessions.sign_in_link'),
            handler:function () {
                Ext.dispatch({
                    controller:'Session',
                    action:'new_account'
                });
            }
        };

        facebookButton = {
            id:"facebook_button",
            xtype:'button',
            cls:'button-with-facebook',
            text:I18n.t('sessions.sign_in_with_facebook'),
            handler:this.onLoginViaFacebookAction
        };

        buttonsContainer = new Ext.Container({
            cls:'session_buttons_container',
            items:[
                loginButton,
                {
                    xtype:'container',
                    cls:'container_session'//,
//                    html: 'Don\'t have an account? '
                },
                signupButton,
                {
                    xtype:'container',
                    cls:'container_session'//,
//                    html: 'Already have an account? '
                },
                {
                    xtype:'container',
                    cls:'container_facebook',
                    items:[facebookButton]
                }
            ]
        });


        mainContainer = new Ext.Container({
            layout:{
                type:'vbox',
                align:'stretch'
            },
            cls:'noise_pattern',
            items:[logoContainer, buttonsContainer]
        });

        /* --- create ------------------------------------------------------------------------------- */

        Ext.apply(this, {
            layout:'card',
            id:'session_card',
            items:[ mainContainer ]
        });

        App.views.SessionIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onLoginViaFacebookAction:function () {
        Tmo.Adapters.facebook.ensureIsAuthenticated(function (access_token) {
            Server.request('POST', '/users/auth/facebookjs.json', {
                params:{
                    access_token: access_token
                },
                success:function (result) {
                    if (Ext.isEmpty(result.auth_token)) {

                        Tmo.Adapters.facebook.api.getMe(function (response) {
                            Tmo.LoadMask.hide();
                            Ext.dispatch({
                                controller:'Session',
                                action:'new_account',
                                gender:response.gender,
                                first_name:response.first_name,
                                last_name:response.last_name,
                                email:response.email,
                                facebook_id:response.id
                            });
                        }, function (response) {
                            Tmo.LoadMask.hide();
                        });


                    } else {
                        Profile.setup(result);
                        Tmo.LoadMask.hide();
                        Ext.redirect('Dashboard/index');
                    }
                },
                failure:function (result) {
                    Tmo.LoadMask.hide();
                    Ext.Msg.alert(I18n.t('alert.login_failed'));
                }
            });
        });
    }
});

Ext.reg('SessionIndex', App.views.SessionIndex);
