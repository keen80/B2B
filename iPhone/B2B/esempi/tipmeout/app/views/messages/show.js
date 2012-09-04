App.views.MessagesShow = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var profileTpl;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            title:  I18n.t('user.me'),
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        profileTpl = new Ext.XTemplate(
                '<div class="overview overview_small">',
                '  <div class="overview_head">',
                '    <div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.message_sender.thumb_url)]})"></div>',
                '    <h3>{message_sender.first_name} {message_sender.last_name}</h3>',
                '    <h4>{humanized_type}</h4>',
                '  </div>',
                '  <div class="overview_content">',
                '    <p>{body}</p>',
                '  </div>',
                '</div>'
                );

        var messageContainer = new Ext.Container({
            tpl: profileTpl,
            data: this.message.data
        });

        var storeModel = null;
        switch (this.message.data.type)
        {
            case 'place_notification': storeModel = 'Place'; break;
            case 'picture_notification': storeModel = 'Picture'; break;
            case 'tip_notification': storeModel = 'Tip'; break;
            case 'event_attendance_confirmation': storeModel = 'Event'; break;
            case 'event_attendance_limit': storeModel = 'Event'; break;
            case 'event_notification': storeModel = 'Event'; break;
            case 'event_removed': storeModel = 'Event'; break;
            case 'event_vacancy': storeModel = 'Event'; break;
            case 'new_user_joined': storeModel = 'User'; break;

        }

        var tmpStoreAttachable;

        if (storeModel)
        {
            tmpStoreAttachable = new Ext.data.Store({
                model: storeModel,
                data: {records: this.message.data.attachables},
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json',
                        root: 'records'
                    }
                },
                autoLoad: false
            });
        }

        var tplContainer = null;
        var tplExtraContainer = null;
        var message = this.message;
        var destroy_message_fn = function(action_id, hash_params) {
          var hash_params = hash_params || {};
            Ext.dispatch({
                controller: 'Messages',
                action: 'destroy',
                params: Ext.merge(hash_params, {
                  id: message.data.id,
                  action_id: action_id
                })
            });
        };

        //todo refactor
        if ((this.message.data.type === 'place_notification') ||
            (this.message.data.type === 'event_attendance_confirmation') ||
            (this.message.data.type === 'event_attendance_limit') ||
            (this.message.data.type === 'event_notification') ||
            (this.message.data.type === 'event_removed') ||
            (this.message.data.type === 'event_vacancy') ||
            (this.message.data.type === 'new_user_joined') ||
            (this.message.data.type === 'tip_notification') ||
            (this.message.data.type === 'picture_notification'))
        {

            var msg_attachable_list_tpl;

            if ((this.message.data.type === 'event_attendance_confirmation') ||
                (this.message.data.type === 'event_attendance_limit') ||
                (this.message.data.type === 'event_notification') ||
                (this.message.data.type === 'event_removed') ||
                (this.message.data.type === 'event_vacancy'))
            {
                msg_attachable_list_tpl = new Ext.XTemplate(
                    '<div class="global_list">',
                        '<div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.thumb_url)]})"></div>',
                        '<div class="name">{name} ({[I18n.t("event.actions.show.created_by").toLowerCase()]} {creator_full_name})</div>',
                        '<div class="grey">{place_raw.name}, {[Tmo.Utils.formatDate(values.start_date)]}</div>',
                    '</div>',
                    {

                    }
                );
            }

            switch(this.message.data.type)
            {
                case 'place_notification':
                    msg_attachable_list_tpl = new Ext.XTemplate(
                        '<div class="global_list">',
                            '<div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.thumb_url)]})"></div>',
                            '<div class="name">{name}</div>',
                            '<div class="grey">{main_category_name}</div>',
                        '</div>'
                    );
                break;

                case 'tip_notification':
                    msg_attachable_list_tpl = new Ext.XTemplate(
                        '<div class="global_list">',
                            '<div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.rateable_thumb_url)]})"></div>',
                            '<div class="name">{rateable_name}</div>',
                            '<div class="rating">',
                                '<em>',
                                    '{[Tmo.Utils.stars(values.value, true)]}',
                                '</em>',
                            '</div>',
                        '</div>'
                    );
                break;

                case 'picture_notification':
                    msg_attachable_list_tpl = new Ext.XTemplate(
                        '<div class="global_list">',
                            '<div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.thumb_url)]})"></div>',
                            '<div class="name">Picture</div>',
                            '<div class="grey">{creator_full_name}</div>',
                        '</div>'
                    );
                break;

                case 'new_user_joined':
                    msg_attachable_list_tpl = new Ext.XTemplate(
                        '<div class="global_list">',
                            '<div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.thumb_url)]})"></div>',
                            '<div class="name">{first_name} {last_name}</div>',
                            '<div class="grey"></div>',
                        '</div>'
                    );
                break;

            }


            tplContainer = new Ext.Container({
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                flex: 1,
                items: [
                    new Ext.List({
                        //                        flex: 1,
                        scroll: false,
                        itemTpl: msg_attachable_list_tpl,
                        store: tmpStoreAttachable,
                        listeners: {
                            selectionchange:
                            {
                                fn: this.onShowAction,
                                scope: this
                            }
                        }
                    })
                ]
            });

            if (this.message.data.type === 'place_notification') {
              tplContainer.add(
                {
                  xtype: 'container',
                  cls: 'overview_buttons',
                  layout: 'hbox',
                  html: Tmo.Utils.h(I18n.t('messages.places.do_you_want_to_add_place')),
                  items: [
                    {
                      xtype: 'button',
                      text: I18n.t('messages.links.o_yes'),
                      ui: 'confirm',
                      flex: 1,
                      handler: function() {
                          destroy_message_fn(10 /* add place */, {place_id: message.data.attachables[0].id});
                      }
                    },
                    {
                      xtype: 'spacer',
                      width: '10',
                      style: {
                          width: '10px'
                      }
                    },
                    {
                      xtype: 'button',
                      text: I18n.t('messages.links.o_no'),
                      flex: 1,
                      handler: function() {
                          Ext.Msg.confirm(I18n.t('action.delete_link'), I18n.t('action.delete_confirmation'), function(value) {
                              if (value === 'yes') {
                                  destroy_message_fn(1 /* delete */);
                              }
                          });
                      }
                    }
                  ]
                }
              );
            } else {
              tplContainer.add(
                {
                    xtype: 'container',
                    cls: 'overview_buttons',
                    items: [
                        {
                            xtype: 'button',
                            text: I18n.t('messages.links.delete_the_notification_link'),
                            ui: 'decline',
                            handler: function() {
                                Ext.Msg.confirm(I18n.t('action.delete_link'), I18n.t('action.delete_confirmation') , function(value) {
                                    if (value === 'yes') {
                                        destroy_message_fn(1 /* normal delete */);
                                    }
                                });
                            }
                        }
                    ]
                }
              );
            }

        } else if (this.message.data.type === 'invitation') {
            tplContainer = new Ext.Container({
                cls: 'overview_buttons',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        text: I18n.t('messages.links.accept_invitation_link'),
                        ui: 'confirm',
                        flex: 1,
                        handler: function() {
                            destroy_message_fn(3 /* confirmed */);
                        }
                    },
                    {
                        xtype: 'spacer',
                        width: '10',
                        style: {
                            width: '10px'
                        }
                    },
                    {
                        xtype: 'button',
                        text:  I18n.t('messages.links.ignore_invitation_link'),
                        flex: 1,
                        handler: function() {
                            Ext.Msg.confirm(I18n.t('action.delete_link'), I18n.t('action.delete_confirmation'), function(value) {
                                if (value === 'yes') {
                                    destroy_message_fn(2 /* ignored */);
                                }
                            });
                        }
                    }
                ]
            });
        } else {
            tplContainer = new Ext.Container({
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        cls: 'overview_buttons',
                        items: [
                            {
                                xtype: 'button',
                                text: I18n.t('messages.links.delete_the_notification_link'),
                                ui: 'decline',
                                handler: function() {
                                    Ext.Msg.confirm(I18n.t('action.delete_link'), I18n.t('action.delete_confirmation') , function(value) {
                                        if (value === 'yes') {
                                            destroy_message_fn(1 /* normal delete */);
                                        }
                                    });
                                }
                            }
                        ]
                    }
                ]
            });
        }




        var mainContainer = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [messageContainer, tplContainer]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            scroll: 'vertical',
            dockedItems: [titleBar],
            items: [ mainContainer ]
        });

        App.views.MessagesShow.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowAction: function(sel, records) {
        if (records[0] !== undefined) {
            if (this.message.data.type === 'place_notification') {
                Tmo.debug(Ext.ModelMgr.create(records[0].data, 'Place'), "<- place");
                Ext.dispatch({
                    controller: 'Places',
                    action: 'show',
                    historyUrl: 'Places/show/' + records[0].data.id,
                    place: Ext.ModelMgr.create(records[0].data, 'Place')
                });
            } else if ((this.message.data.type === 'event_attendance_confirmation') ||
                        (this.message.data.type === 'event_attendance_limit') ||
                        (this.message.data.type === 'event_notification') ||
                        (this.message.data.type === 'event_removed') ||
                        (this.message.data.type === 'event_vacancy'))
            {

                Ext.dispatch({
                    controller: 'Events',
                    action: 'show',
                    historyUrl: 'Events/show/' + records[0].data.id,
                    event: Ext.ModelMgr.create(records[0].data, 'Event')
                });
            } else if (this.message.data.type === 'tip_notification') {
                Tmo.debug("records[0]", records[0]);
                Ext.dispatch({
                    controller: 'Tips',
                    action: 'show',
                    historyUrl: 'Tips/show/' + records[0].data.id,
                    tip: Ext.ModelMgr.create(records[0].data, 'Tip'),
                    tipObjFor: 'user',
                    user_id: records[0].data.rater_id,
                    id: records[0].data.id
                });
            }
            else if (this.message.data.type === 'picture_notification') {
                Tmo.debug("records[0]", records[0]);
                var message = this.message;
                var picture = Ext.ModelMgr.create(records[0].data, 'Picture');
                picture.getPicturable(function(){
                    Ext.dispatch({
                        controller: 'Album',
                        action: 'show',
                        historyUrl: 'Album/show/' + picture.getId(),
                        picture: picture,
                        albumObj: picture.get('picturable'),
                        albumType: picture.get('picturable').constructor.modelName
                    });
                });

            } else if (this.message.data.type === 'new_user_joined') {
                Tmo.debug("records[0]", records[0]);
                var user = records[0];
                Ext.dispatch({
                    controller: 'Network',
                    action: 'show',
                    historyUrl: 'Network/show/' + user.getId(),
                    id: user.getId()
                });
            }
        }
    }

});

Ext.reg('MessagesShow', App.views.MessagesShow);
