Tmo.Consts.SHARETYPE_NAME_MAPPER = {};
Tmo.Consts.SHARETYPE_NAME_MAPPER[  Tmo.Consts.SHARETYPE_SYSTEM = 1  ] = "system"; //default system share
Tmo.Consts.SHARETYPE_NAME_MAPPER[  Tmo.Consts.SHARETYPE_EMAIL = 2  ] = "email"; //share via email
Tmo.Consts.SHARETYPE_NAME_MAPPER[  Tmo.Consts.SHARETYPE_SMS = 4  ] = "sms"; //share via sms

App.makeAutoSearchableFor = function(view_object, field_name, search_action) {
    field_name = field_name ? field_name : 'search_query';
    search_action = search_action ? search_action : 'onSearchAction';

    view_object.addListener('afterrender', function(c){
        Ext.getCmp(field_name).addListener('keyup', this._onSearchQueryChanged);
    });

    Ext.applyIf(view_object, {
        _onSearchQueryChanged: function()
        {
            var value = Ext.getCmp(field_name).getValue();

            if ( value.length > 2 ) {
                App.placesAutocomplete = true;
            }

            if ( App.placesAutocomplete ) {
                App.placesAutocompleteValue = value;

                Ext.defer(function(){
                    if ( App.placesAutocompleteValue == value ) {
                        view_object[search_action]();
                    }
                }, 2000);
            }
        }
    });
};

App.makeSharableFor = function(object, view_object, share_flags) {
    Ext.applyIf(view_object, {
        initializeActionSheetShare: function() {
            share_flags = share_flags || 0;
            var items = [];

            // add system share
            if ((share_flags & Tmo.Consts.SHARETYPE_SYSTEM) === Tmo.Consts.SHARETYPE_SYSTEM)
            {
                items.push({
                    text: (object.constructor.modelName == 'Event') ? I18n.t('action.invite_via_tipmeout') : I18n.t('action.share_via_tipmeout'),
                    handler: this.onSystemShare,
                    scope: this
                });
            }

            // add share via email
            if ((share_flags & Tmo.Consts.SHARETYPE_EMAIL) === Tmo.Consts.SHARETYPE_EMAIL)
            {
                items.push({
                    text: (object.constructor.modelName == 'Event') ? I18n.t('action.invite_via_email') : I18n.t('action.share_via_email'),
                    handler: this.onEmailShare,
                    scope: this
                });
            }

            // add share via sms
            if ((share_flags & Tmo.Consts.SHARETYPE_SMS) === Tmo.Consts.SHARETYPE_SMS)
            {
                items.push({
                    text: (object.constructor.modelName == 'Event') ? I18n.t('action.invite_via_sms') : I18n.t('action.share_via_sms'),
                    handler: this.onSmsShare,
                    scope: this
                });
            }

            // if no items then do not create popup, default action will be handled later
            if (items.length > 0)
            {
                // add cancel operation
                items.push({
                    text :  I18n.t('action.cancel_link'),
                    scope: this,
                    handler: function() {
                        this.actionSheetShare.hide();
                    }
                });

                return new Ext.ActionSheet({
                    stretchX: true,
                    stretchY: true,

                    layout: {
                        type: 'vbox',
                        pack: 'center',
                        align: 'stretch'
                    },

                    items: items
                });
            }
            else
            {
                return null;
            }
        },

        onSystemShare: function() {
            Tmo.debug("SYSTEM SHARE");
            Tmo.storeFilters.users.clear();
            this._onShare(Tmo.Consts.SHARETYPE_SYSTEM);
        },

        onEmailShare: function() {
            Tmo.debug("EMAIL SHARE");
            Tmo.storeFilters.users.clear();
            Tmo.storeFilters.users.set('search_scope', 'my_with_emails');
            this._onShare(Tmo.Consts.SHARETYPE_EMAIL);
        },

        onSmsShare: function() {
            Tmo.debug("SMS SHARE");
            Tmo.storeFilters.users.clear();
            Tmo.storeFilters.users.set('search_scope', 'my_with_tel');
            this._onShare(Tmo.Consts.SHARETYPE_SMS);
        },

        _onShare: function(share_method) {
            Tmo.debug("_onShare()");
            Tmo.storeFilters.users.dirty = true;
            this.actionSheetShare && this.actionSheetShare.hide();

            Ext.dispatch({
                controller: 'Share',
                action: 'index',
                historyUrl: 'Share/index',
                shareType: object.constructor.modelName,
                shareObj: object,
                shareMethod: share_method
            });
        },

        onShareAction: function() {
            this.actionSheetShare = this.initializeActionSheetShare();

            // if share options popup exists then show options
            if (this.actionSheetShare)
            {
                this.actionSheetShare.show();
            }
            else
            {
                 // call directly default share action
                this.onSystemShare();
            }
        }
    });
};


App.getShareButtonFor = function(object, view_object){
        return {
            text: (object.constructor.modelName == 'Event') ? I18n.t('action.invite_link') : I18n.t('action.share_link'),
            handler: view_object.onShareAction,
            scope: view_object
        };    
};