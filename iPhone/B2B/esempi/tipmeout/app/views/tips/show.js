App.views.TipsShow = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var viewInstance = this;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        var titleBarButtons = [backButton];
        var titleBarSpacer = {xtype: 'spacer'};

        if (this.tip.get('rater_id') === Profile.getCurrentUser().getId())
        {
            if (titleBarSpacer) {
                titleBarButtons.push(titleBarSpacer);
                titleBarSpacer = null;
            }
            titleBarButtons.push({
                iconCls: 'compose1',
                handler: this.onEditAction,
                scope: this
            });
        }

        if (titleBarSpacer) {
            titleBarButtons.push(titleBarSpacer);
            titleBarSpacer = null;
        }

        App.makeSharableFor(this.tip, this, Tmo.Consts.SHARETYPE_SYSTEM | Tmo.Consts.SHARETYPE_EMAIL | Tmo.Consts.SHARETYPE_SMS);
        titleBarButtons.push(App.getShareButtonFor(this.tip, this));

        titleBar = {
            dock: 'top',
            title: I18n.t('tip.actions.show.header'),
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: titleBarButtons
        };


        var placeStore = new Ext.data.Store({
            model: 'Place',
            data : {
                records: [this.tip.get('rateable')]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'records'
                }
            },
            autoLoad: false
        });


        var tipPlaceTpl = new Ext.XTemplate(
            '<div class="global_list">',
                '<div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.thumb_url)]})"></div>',
                '<div class="name">{name}</div>',
                '<div class="grey">{[_.compact([this.formatted_address(values.address, values.number),_.compact([values.postal_code, values.locality]).join(" - ")]).join(" - ")]}</div>',
            '</div>',
            {
                formatted_address: function(address,number) {
                    return formatAddress(address, number)
                }
            }
        );

        var tipPlace = new Ext.List({
            itemTpl: tipPlaceTpl,
            scroll: false,
            store: placeStore,
            listeners: {
                selectionchange:
                {
                    fn: this.onShowRateableAction,
                    scope: this
                }
            }
        });

        var tipPlaceContainer = new Ext.Container({            
            items: [tipPlace]
        });

        var tipTpl = new Ext.XTemplate(
            '<div class="overview tip_show">',
            '  <div class="overview_content">',
            '    <p class="rating">',
            '      <em>{[Tmo.Utils.stars(values.data.value, true)]}</em>',
            '      {data.rateable.name}',
            '    </p>',
            '    <p>{data.review}</p>',
            '    <p class="created_at">{[this.get_add_date(values.data.created_at, values.data.rater.first_name, values.data.rater.last_name)]}</p>',
            '    <div class="tip_likes">',
            '      <div id="like_tip_button" class="tip_like_button"></div>',
            '      <div id="comment_object" class="tip_like_button"></div>',
            '      <p>{[Tmo.Utils.likes(values.data.likes_count)]}</p>',
            '    </div>',
            '  </div>',
            '  <div class="overview_buttons">',
            '    <div id="delete_tip_button"></div>',
            '  </div>',
            '</div>',
            '<div id="comments">',
            '</div>',
            {
                get_add_date: function(date, first_name, last_name) {
                    return I18n.t('tip.actions.show.added_date', {date: Tmo.Utils.formatDate(date), first_name: first_name, last_name: last_name})
                }
            }
        );
       

        var tipContainer = new Ext.Container({
            id: 'tip_container',
            tpl: tipTpl,
            data: this.tip,
            listeners: {
                afterRender: function(param) {
                    var tip = viewInstance.tip;

                    if (tip.data.can_delete) {
                        //create delete button
                        new Ext.Button({
                            text:  I18n.t('tip.actions.show.delete_link'),
                            ui: 'decline',
                            renderTo:'delete_tip_button',
                            handler: function() {
                                Ext.Msg.confirm(I18n.t('tip.actions.show.delete'), I18n.t('tip.actions.show.confirm_delete_tip'), function(value) {
                                    if (value === 'yes') {
                                        Ext.dispatch({
                                            controller: 'Tips',
                                            action: 'destroy',
                                            params: {
                                                tip: tip,
                                                user: viewInstance.user,
                                                tipObjFor: viewInstance.tipObjFor,
                                                tipObj: viewInstance.tipObj

                                            }
                                        });
                                    }
                                });
                            }

                        });
                    }

                    App.getCommentButton({
                        commentable:tip,
                        label_with_couter: false,
                        action: 'new'
                    });

                    App.getCommentsListForObject(tip, 'comments');

                    if (tip.data.can_like) {
                        //create like button
                        new Ext.Button({
                            iconCls: 'heart',
                            iconMask: true,                            
                            text: I18n.t('tip.actions.show.like_link'),
                            renderTo:'like_tip_button',
                            handler: function() {
                                Ext.dispatch({
                                    controller: 'Tips',
                                    action: 'like',
                                    params: {
                                        tip: tip,
                                        views: {
                                            tipContainer: tipContainer
                                        }
                                    }
                                });
                            }
                        });
                    }
                },
                beforedestroy:function()
                {
                  if (Ext.isObject(Ext.getCmp('like_event_button')))
                    Ext.getCmp('like_event_button').destroy();
                  if (Ext.isObject(Ext.getCmp('comment_object_button')))
                    Ext.getCmp('comment_object_button').destroy();
                }                
            }
        });

        var mainContainer = new Ext.Container({
            scroll: 'vertical',
            items: [tipPlaceContainer, tipContainer]
        });

        Tmo.c = tipContainer;

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            scroll: false,
            dockedItems: [titleBar],
            items: [ mainContainer ]
        });

        App.views.TipsShow.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */
    onShowRateableAction: function(sel, records)
    {
        if (records[0] !== undefined) {
            Ext.dispatch({
                controller: 'Places',
                action: 'show',
                historyUrl: 'Places/show/'+records[0].getId(),
                id: records[0].getId()
            });
        }
    },

//    onShareAction: function() {
//        Ext.dispatch({
//            controller: 'Share',
//            action: 'index',
//            historyUrl: 'Share/index',
//            shareType: 'Tip',
//            shareObj: this.tip,
//            shareMethod: Tmo.Consts.SHARETYPE_SYSTEM,
//            user: this.user,
//            tipObj: this.tipObj,
//            tipObjFor: this.tipObjFor
//        });
//    },

    onEditAction: function() {
        Ext.dispatch({
            controller: 'Tips',
            action: 'edit',
            historyUrl: 'Tips/edit/' + this.tip.getId(),
            tip: this.tip,
            user: this.user,
            tipObj: this.tipObj,
            tipObjFor: this.tipObjFor
        });
    }


});

Ext.reg('TipsShow', App.views.TipsShow);