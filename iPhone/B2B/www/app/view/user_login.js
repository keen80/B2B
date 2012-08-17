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



////

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen : 'phone_startup.png',
    
    icon       : 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        Ext.regModel('Contact', {
            fields: ['firstName', 'lastName']
        });


        var store = new Ext.data.JsonStore({
            model  : 'Contact',
            sorters: 'lastName',


            getGroupString : function(record) {
                return record.get('lastName')[0];
            },


            data: [
                {firstName: 'Tommy',   lastName: 'Maintz'},
                {firstName: 'Rob',     lastName: 'Dougan'},
                {firstName: 'Ed',      lastName: 'Spencer'},
                {firstName: 'Jamie',   lastName: 'Avins'},
                {firstName: 'Aaron',   lastName: 'Conran'},
                {firstName: 'Dave',    lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay',     lastName: 'Robinson'},
                {firstName: 'Tommy',   lastName: 'Maintz'},
                {firstName: 'Rob',     lastName: 'Dougan'},
                {firstName: 'Ed',      lastName: 'Spencer'},
                {firstName: 'Jamie',   lastName: 'Avins'},
                {firstName: 'Aaron',   lastName: 'Conran'},
                {firstName: 'Dave',    lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay',     lastName: 'Robinson'}
            ]
        });


        var listConfig = {
            itemTpl: '<tpl for="."><div class="contact">{firstName} <strong>{lastName}</strong></div></tpl>',


            itemSelector: 'div.contact',
            singleSelect: true,
            grouped     : true,


            store: store
        };
        
        if (!Ext.is.Phone) {
          var listSearch = new Ext.List(Ext.apply(listConfig, {
//floating     : true,
                                                  width        : 380,
                                                  height       : 420
//centered     : true,
// modal        : true,
//hideOnMaskTap: false
                                                  }));
          new Ext.Panel({
                        floating     : true,
                        width        : 380,
                        height       : 420,
                        centered     : true,
                        modal        : true,
                        hideOnMaskTap: false,
                        layout:'fit',
                        items:[listSearch],
                        dockedItems:[
                                     {
                                     xtype: 'toolbar',
                                     dock : 'top',
                                     
                                     items: [
                                             {xtype: 'spacer'},
                                             {
                                             xtype      : 'searchfield',
                                             placeHolder: 'Search...',
                                             listeners  : {
                                             scope: this,
                                             
                                             keyup: function(field) {
                                             var value = field.getValue();
                                             
                                             if (!value) {
                                             store.filterBy(function() {
                                                            return true;
                                                            });
                                             } else {
                                             var searches = value.split(' '),
                                             regexps  = [],
                                             i;
                                             
                                             for (i = 0; i < searches.length; i++) {
                                             if (!searches[i]) return;
                                             regexps.push(new RegExp(searches[i], 'i'));
                                             };
                                             
                                             store.filterBy(function(record) {
                                                            var matched = [];
                                                            
                                                            for (i = 0; i < regexps.length; i++) {
                                                            var search = regexps[i];
                                                            
                                                            if (record.get('firstName').match(search) || record.get('lastName').match(search)) matched.push(true);
                                                            else matched.push(false);
                                                            };
                                                            
                                                            if (regexps.length > 1 && matched.indexOf(false) != -1) {
                                                            return false;
                                                            } else {
                                                            return matched[0];
                                                            }
                                                            });
                                             }
                                             }
                                             }
                                             },
                                             {xtype: 'spacer'}
                                             ]
                                     }
                                     ]
                        }).show();
          
            
        } else {
            var listSearch = new Ext.List(Ext.apply(listConfig, {
                                                  fullscreen: true
                                                  }));
          
          
            new Ext.Panel({
                          fullscreen:true,
                          layout:'fit',
                          items:[listSearch],
                          dockedItems:[
                                       {
                                       xtype: 'toolbar',
                                       dock : 'top',
                                       
                                       items: [
                                               {xtype: 'spacer'},
                                               {
                                               xtype      : 'searchfield',
                                               placeHolder: 'Search...',
                                               listeners  : {
                                               scope: this,
                                               
                                               keyup: function(field) {
                                               var value = field.getValue();
                                               
                                               if (!value) {
                                               store.filterBy(function() {
                                                              return true;
                                                              });
                                               } else {
                                               var searches = value.split(' '),
                                               regexps  = [],
                                               i;
                                               
                                               for (i = 0; i < searches.length; i++) {
                                               if (!searches[i]) return;
                                               regexps.push(new RegExp(searches[i], 'i'));
                                               };
                                               
                                               store.filterBy(function(record) {
                                                              var matched = [];
                                                              
                                                              for (i = 0; i < regexps.length; i++) {
                                                              var search = regexps[i];
                                                              
                                                              if (record.get('firstName').match(search) || record.get('lastName').match(search)) matched.push(true);
                                                              else matched.push(false);
                                                              };
                                                              
                                                              if (regexps.length > 1 && matched.indexOf(false) != -1) {
                                                              return false;
                                                              } else {
                                                              return matched[0];
                                                              }
                                                              });
                                               }
                                               }
                                               }
                                               },
                                               {xtype: 'spacer'}
                                               ]
                                       }
                                       ]
                          });
                    }
    }
});