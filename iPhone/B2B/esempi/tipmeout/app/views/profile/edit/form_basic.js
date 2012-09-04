App.views.ProfileEditFormBasic = Ext.extend(App.views.FormPanelWithErrors, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var fields, saveButton, facebookButton;
        var currentUser = Profile.getCurrentUser();

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('profile.actions.edit.basic_information'),
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        fields = {
            xtype: 'fieldset',            
            defaults: {
                xtype: 'textfield',
                autoCapitalize : false,
                labelWidth: '35%'
            },
            items: [
            {
                xtype: 'container',
                tpl: new Ext.XTemplate(
                    '<div class="overview">',
                    '  <div class="overview_head">',
                    '    <tpl if="thumb_url">',
                    '      <div id="profile_picture" class="avatar" style="background-image: url({thumb_url})"></div>',
                    '    </tpl>',
                    '    <tpl if="!thumb_url">',
                    '      <div id="profile_picture" class="avatar"><span>'+I18n.t('profile.actions.edit.add_photo_link')+'</span></div>',
                    '    </tpl>',
                    '  </div>',
                    '</div>'
                    ),
                data: {
                    thumb_url: currentUser.data.thumb_url
                }
            },
                {
                    name : 'gender',
                    xtype: 'tmo_selectfield',
                    options: [
                        {text: I18n.t('select.male'),  value: 'male'},
                        {text: I18n.t('select.female'), value: 'female'}
                    ],
                    required: true
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'gender'
                },
                {
                    name: 'first_name',
                    autoCapitalize: true,
                    required: true
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'first_name'
                },
                {
                    name: 'last_name',
                    autoCapitalize: true,
                    required: true
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'last_name'
                },
                {
                    name: 'email',
                    xtype: 'emailfield',
                    required: true
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'email'
                },
                {
                    id: 'dp',
                    name : 'birthday',
                    xtype: 'datepickerfield',
                    picker: { yearFrom: "1915", yearTo: "2005" }
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'birthday'
                },
                {
                    name: 'city',
                    autoCapitalize: true
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'city'
                },
                {
                    name : 'relationship_status_id',
                    xtype: 'tmo_selectfield',
                    placeHolder: I18n.t('support.select.prompt'),
                    includeBlank: {text: I18n.t('support.none'), value: null},
                    options: _.map(App.stores.relationship_statuses.data.items, function(item) {
                        return {text: item.data.name,  value: item.data.id}
                    })
                }
         ]
        };
        I18n.loadLabels(fields.items, 'User');

        var contactFields = {
            xtype: 'fieldset',            
            defaults: {
                xtype: 'textfield',
                autoCapitalize : false,
                labelWidth: '35%'
            },
            items: [
                {
                    name: 'tel'
                },
                {
                    name: 'twitter_username'
                }
            ]
        };

        I18n.loadLabels(contactFields.items, 'User');

        saveButton = {
            xtype: 'button',
            text: I18n.t('user.actions.edit.save_changes_link'),
            ui: 'action',
            handler: this.onSaveChangesAction,
            scope: this
        };

        facebookButton = {
            id: "facebook_button",
            xtype: 'button',
            cls: 'button-with-facebook',
            text: I18n.t('profile.actions.edit.facebook.connect_button'),
            handler: this.onConnectFacebookAction
        };        

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'edit_profile_card',
            scroll: 'vertical',
            dockedItems: [ titleBar ],
            items: [ fields, contactFields, saveButton, {xtype: 'container', height: '10'}, facebookButton ],
            listeners: {
                show: function() {
                    this.loadRecord(currentUser);
                },
                tap: {
                    element: 'el',
                    fn: this.onUploadAction,
                    scope: this,
                    delegate: '.avatar'
                }
            }
        });

        App.views.ProfileEditFormBasic.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onUploadAction: function() {
      if (!this.actions) {
        var upload = function(source) {
          Tmo.Camera.uploadPicture(source, "/profile/picture", function(r) {
            var response = JSON.parse(r.response);

            Tmo.Camera.updateBackgroundImage("profile_picture", response.url);

            var currentUser = Profile.getCurrentUser();
            currentUser.data.thumb_url = response.url;
            Profile.setCurrentUser(currentUser.data);
          })
        };

        this.actions = Tmo.Camera.uploadActionSheetFor(this, upload);

      }
      this.actions.show();
    },

    onSaveChangesAction: function() {
        Tmo.LoadMask.show();
        Ext.dispatch({
            controller: 'Profile',
            action: 'save',
            form: Ext.getCmp('edit_profile_card')
        });
    },

    onConnectFacebookAction: function() {
        Tmo.Adapters.facebook.ensureIsAuthenticated(function(){
           Tmo.Adapters.facebook.api.getMe(function(response){
               var requestParams = Server.toRailsParams('user', { facebook_id: response.id });
               requestParams['_method'] = 'PUT';

               Server.request('POST', '/profile', {
                   loadMask: true,
                   params: requestParams,
                   success: function(result) {
                       Ext.Msg.alert( I18n.t('profile.actions.edit.facebook.connect_success') );
                   },
                   failure: function(result) {
                       Ext.Msg.alert( I18n.t('profile.actions.edit.facebook.connect_failure') );
                   }
               });
           })
        });

    }
});

Ext.reg('ProfileEditFormBasic', App.views.ProfileEditFormBasic);
