App.views.NetworkShow = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, editButton, titleBar;
        var profileTpl;
        var viewInstance = this;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        editButton = {
            iconCls: 'compose1',
            iconMask: true,
            id: 'edit_user_button',
            hidden: !this.user.data.is_my_friend,
            handler: this.onEditAction,
            scope: this
        };

        titleBar = {
            dock: 'top',
            title: Ext.util.Format.ellipsis(this.user.getFullName(), 18),
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ backButton, {xtype: 'spacer'}, editButton ]
        };

        profileTpl = new Ext.XTemplate(
            '<div class="overview">',
            '  <div class="overview_head">',
            '    <div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.data.thumb_url)]})"></div>',
            '    <h3>{data.first_name} {data.last_name}</h3>',
            '    <tpl if="data.id!=Profile.getCurrentUser().getId()">',
            '       <h4>{[values.primaryGroupNameForCurrentUserText()]}</h4>',
            '    </tpl>',
            '    <div class="buttons" id="add_to_network_bt"></div>',
            '  </div>',
            '</div>'
        );

        var profileContainer = new Ext.Container({
            tpl: profileTpl,
            id: 'profileContainer',
            data: this.user,
            listeners: {
                afterrender: function() {
                    new Ext.Button({
                        renderTo: 'add_to_network_bt',
                        ui: 'confirm',
                        border: 'none',
                        id: 'add_user_button',
                        text: I18n.t('network.actions.show.add_to_network_link'),
                        hidden: viewInstance.user.data.is_my_friend || viewInstance.user.data.is_my_pending_friend || viewInstance.user.itIsMe(),
                        handler: function() {
                            Ext.dispatch({
                                controller: 'Network',
                                action: 'create',
                                params: {id: viewInstance.user.data.id},
                                user: viewInstance.user
                            });
                        }
                    });
                }
            }
        });

        var userDetailsStore = viewInstance.user.createUserDetailsStore();

        var profileDetailsTpl = new Ext.XTemplate(
            '<div class="global_list">',
            '  <span class="avatar" style="background-image: url(images/icons/list/{icon}.png)"></span>',
            '  <p><strong class="cl_purple">{[ !Ext.isNumber(values.value)||values.value<0 ? "" : values.value ]}</strong> {name}</p>',
            '</div>'
        );

        var profileDetailsList = new Ext.List({
            cls: 'single_list',
            id: 'network_user_profile_details',
            scroll: false,
            itemTpl: profileDetailsTpl,
            store: userDetailsStore,
            listeners: {
                selectionchange:
                {
                    fn: this.onShowAction,
                    scope: this
                }
            }
        });

        var profileDetailsContainer = new Ext.Container({
            items: [profileDetailsList]
        });
        
        var buttonsContainer = new Ext.Container({
            cls: 'overview_buttons',
            items: [
                {
                    id: 'invitation_already_sent_container',
                    xtype: 'container',                    
                    html: '<p class="ta_c">'+I18n.t('network.actions.show.invitation_has_already_been_sent')+'</p>',
                    hidden: !viewInstance.user.data.is_my_pending_friend
                },
                {
                    xtype: 'button',
                    id: 'remove_user_button',
                    text: I18n.t('network.actions.show.remove_from_network_link'),
                    ui: 'decline',
                    hidden: !viewInstance.user.data.is_my_friend,
                    handler: function() {
                        Ext.Msg.confirm(I18n.t('network.actions.show.delete_link'), I18n.t('network.actions.show.confirmation_delete'), function(value) {
                            if (value === 'yes') {
                                Ext.dispatch({
                                    controller: 'Network',
                                    action: 'destroy',
                                    params: {id: viewInstance.user.data.id},
                                    viewInstance: viewInstance
                                });
                            }
                        });
                    }
                }
            ]
        });

        /* --- profile bottom bar --- */
        var profileBottomBar = new Ext.DataView({
            cls: 'bottom-bar',
            scroll: false,
            itemSelector: 'div.category_item',            
            store: new Ext.data.Store({
                fields: ['id', 'name', 'icon'],
                data: [
                    {id: 'call', name: I18n.t('network.contact_methods.call'), icon: "profile/phone.png", enabled: this.user.hasPhoneEnabled(), href: this.user.phoneHref()},
                    {id: 'sms', name: I18n.t('network.contact_methods.sms'), icon: "profile/cloud.png", enabled: this.user.hasSmsEnabled(), href: this.user.smsHref()},
                    {id: 'email', name: I18n.t('network.contact_methods.email'), icon: "profile/envelope.png", enabled: this.user.hasEmailEnabled(), href: this.user.emailHref()},
                    {id: 'facebook', name: I18n.t('network.contact_methods.facebook'), icon: "profile/facebook.png", enabled: this.user.hasFacebookEnabled(), href: this.user.facebookHref()},
                    {id: 'twitter', name: I18n.t('network.contact_methods.twitter'), icon: "profile/twitter.png", enabled: this.user.hasTwitterEnabled(), href: this.user.twitterHref()}
                ]
            }),
            tpl: new Ext.XTemplate(
                    '<div class="categories_scroll_wrapper">',
                    '<tpl for=".">',
                    '<div class="category_item" data-id="{id}">',
                    '  <tpl if="enabled === true">',
                    '    <tpl if="values.href === null">',
                    '      <div class="category_thumb" style="background-image: url(images/icons/{icon})"></div>',
                    '      <div class="category_name">{name}</div>',
                    '    </tpl>',
                    '    <tpl if="values.href !== null">',
                    '      <a href="{href}" target="_blank" class="category_thumb" style="background-image: url(images/icons/{icon})"></a>',
                    '      <div class="category_name">{name}</div>',
                    '    </tpl>',
                    '  </tpl>',
                    '  <tpl if="enabled !== true">',
                    '    <div class="category_thumb category_disabled" style="background-image: url(images/icons/{icon})"></div>',
                    '    <div class="category_name category_disabled">{name}</div>',
                    '  </tpl>',
                    '</div>',
                    '</tpl>',
                    '</div>'
            )
        });


        var profileListContent = new Ext.Container({
            flex: 1,
            scroll: 'vertical',
            items: [ profileContainer, profileDetailsContainer, buttonsContainer ]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {            
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            dockedItems: [titleBar],
            items: [profileListContent, profileBottomBar]
        });

        App.views.NetworkShow.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */
    onShowAction: function(sel, records) {
        if (records[0] !== undefined) {
            var row = records[0];
            var action = 'show_' + row.data.type;

            Tmo.debug("DISPATCHING: " + row.data.type);
            Ext.dispatch({
                controller: 'Network',
                action: action,
                historyUrl: 'Network/' + action + '/' + this.user.getId(),
                user_id: this.user.getId(),
                user: this.user,
                tipObjFor: 'user'
            });
        }
    },

    onEditAction: function() {
        Ext.dispatch({
            controller: 'Groups',
            action: 'user',
            historyUrl: 'Groups/user/' + this.user.getId(),
            user_id: this.user.getId(),
            user: this.user
        });
    },

    updateShowTemplate: function() {
        if (this.user.isCurrentUser()) {
                Ext.get("invitation_already_sent_container").hide();
                Ext.get("add_user_button").hide();
                Ext.get("remove_user_button").hide();
                Ext.get("edit_user_button").hide();
        } else {
            if (this.user.data.is_my_friend === true) {
                Ext.get("invitation_already_sent_container").hide();
                Ext.get("add_user_button").hide();
                Ext.get("remove_user_button").show();
                Ext.get("edit_user_button").show();
            } else {
                if (this.user.data.is_my_pending_friend === true) {
                    Ext.get("invitation_already_sent_container").show();
                    Ext.get("add_user_button").hide();
                } else {
                    Ext.get("invitation_already_sent_container").hide();
                    Ext.get("add_user_button").show();
                }
                Ext.get("remove_user_button").hide();
                Ext.get("edit_user_button").hide();
            }
        }

       Ext.getCmp('network_user_profile_details').bindStore( this.user.createUserDetailsStore() );
    }

});

Ext.reg('NetworkShow', App.views.NetworkShow);