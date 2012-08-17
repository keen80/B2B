Ext.define('App.view.LoginPanel', {
    extend: 'Ext.Container',
    config: {
        items: [{
            docked: 'top',
            xtype: 'titlebar',
            title: 'App Title',
        },
        {
            xtype: 'fieldset',
            width: 380,
            margin: 'auto',
            items: [{
                xtype: 'textfield',
                label: 'Username:',
                listeners: {
                    keyup: function(fld, e){
                        //if user hits return button or keyboard-down button
                        if (e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
                            e.stopEvent();
                            fld.element.dom.blur(); //hide keyboard
                            window.scrollTo(0,0); // Scroll to top (for android)

                            App.checkLogin();//declared elseware
                        }
                    }
                }
            },
            {
                xtype: 'passwordfield',
                label: 'Password:',
                listeners: {
                    keyup: function(fld, e){
                        //if user hits return button or keyboard-down button
                        if (e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
                            e.stopEvent();
                            fld.element.dom.blur(); //hide keyboard
                            window.scrollTo(0,0); // Scroll to top (for android)

                            App.checkLogin();//declared elseware
                        }
                    }
                }
            }]//end fieldset items
        },
        {
            xtype: 'button',
            itemId: 'loginButton',
            width: 150,
            text: 'Log In',
            margin: '15px auto',
            ui: 'action',
            handler: function() {
                App.checkLogin();//declared elseware
            }
        }]//end panel items
    }
});