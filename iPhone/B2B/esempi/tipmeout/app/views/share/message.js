App.views.ShareMessage = Ext.extend(App.views.FormPanelWithErrors, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var usersListTpl, usersList;
        var fields, shareButton;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: (this.shareType === 'Event' ? I18n.t('messages.links.event_share_link') : I18n.t('messages.links.other_share_link')),
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        var recipientsTpl = new Ext.XTemplate(
            '<div class="share_recipients">',            
            '  <div class="share_recipients_list">',
            '    <p><em>{[I18n.t("share.actions.index.to")]}: </em>{recipients}</p>',
            '  </div>',
            '</div>'
        );

        var recipients_list = "";

        if (!this.users && this.shareType == 'Event' && this.shareObj.get("notify_level") === 1) {
            recipients_list = I18n.t('messages.network_levels.my_network');
        } else if (!this.users && this.shareType == 'Event' && this.shareObj.get("notify_level") === 2) {
            recipients_list = I18n.t('messages.network_levels.my_network_plus_one');
        } else {
            recipients_list = _.map(this.users,
                function(u) {
                    return u.data.first_name + " " + u.data.last_name;
                }).join(', ');
        }

        var recipients = new Ext.Container({
            tpl: recipientsTpl,
            data: {
                recipients: recipients_list
            }
        });

        var default_messages = "";
        if (this.shareObj.shareMessage) {
            default_messages += this.shareObj.shareMessage(Tmo.Consts.SHARETYPE_SYSTEM);
        } else {
            default_messages = "???";
        }

        fields = {
            xtype: 'container',
            items: [
                {
                    xtype: 'fieldset',
                    title: I18n.t('messages.add_a_message_title'),
                    defaults: {
                        useClearIcon: true,
                        autoCapitalize : false,
                        labelWidth: '35%'
                    },
                    items: [
                        {
                            id: 'share_message_body',
                            xtype: 'textareafield',
                            name: 'message',
                            maxRows: 7,
                            useClearIcon: true,
                            value: default_messages
                        }
                    ]
                }
            ]
        };

        var post_on_social_media = {
            xtype: 'fieldset',
            defaults: {
                useClearIcon: true,
                autoCapitalize : false,
                labelWidth: '35%'
            },
            items: [
                {
                    xtype: 'togglefield',
                    name: 'post_on_facebook',
                    label: I18n.t('share.via.facebook'),
                    value: Profile.getCurrentUser().get('default_post_on_facebook')
                },
                {
                    xtype: 'togglefield',
                    name: 'post_on_twitter',
                    label: I18n.t('share.via.twitter'),
                    value: Profile.getCurrentUser().get('default_post_on_twitter')
                }
            ]
        };

        if ( _.include(['Event', 'Place', 'Tip'], this.shareType) ) {
            fields.items.push( post_on_social_media );
        }

        shareButton = {
            xtype: 'button',
            text: (this.shareType === 'Event' ? I18n.t('messages.links.event_share_link') : I18n.t('messages.links.other_share_link')),
            ui: 'action',
            handler: this.onShareAction,
            scope: this
        };


        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'share_message_card',
            scroll: 'vertical',
            dockedItems: [titleBar],
            items: [recipients, fields, shareButton]
        });

        App.views.ShareMessage.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShareAction: function() {
        // force users list clear
        var share_users_list = Ext.getCmp('share_users_list');
        if ( share_users_list ) {share_users_list.getSelectionModel().deselectAll()}

        var scope = this,
            shareType = this.shareType,
            shareObj = this.shareObj,
            shareMethod = this.shareMethod,
            params = {
                users: _.map(this.users,
                    function(user) {
                        return user.data.id
                    }).join(','),
                type: this.shareType,
                id: this.shareObj.getId(),
                body: Ext.getCmp('share_message_body').getValue(),
                post_on_facebook: Ext.getCmp('share_message_card').getValues().post_on_facebook,
                post_on_twitter: Ext.getCmp('share_message_card').getValues().post_on_twitter
            };

        if (shareType == 'Event' && (_.include([1, 2], shareObj.get("notify_level")))) {
            params.notify_level = shareObj.get("notify_level");
        }

        Ext.dispatch({
            controller: 'Share',
            action: 'create',
            params: params,
            shareType: shareType,
            shareObj: shareObj,
            shareMethod: shareMethod
        });
    }

});

Ext.reg('ShareMessage', App.views.ShareMessage);