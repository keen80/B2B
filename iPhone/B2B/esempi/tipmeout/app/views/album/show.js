App.views.AlbumShow = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar, shareButton;
        var storeFilter = Tmo.storeFilters.pictures;
        var back_page_for_links = this.back_page_for_links = {
            controller: 'Album',
            action: 'show',
            historyUrl: 'Album/show/' + this.picture.getId(),
            picture: this.picture,
            albumType: this.albumType,
            albumObj: this.albumObj
        };
        var viewInstance = this;

        /* --- init --------------------------------------------------------------------------------- */
        App.makeSharableFor(this.picture, this);

        
        backButton = Tmo.BackButton.getBackButton();

        shareButton = App.getShareButtonFor(this.picture, this);

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('album.titles.pictures'),
            defaults: {
                iconMask: true
            },
            items: [ backButton, {
                xtype: 'spacer'
            }, shareButton ],
            listeners:
            {
                afterrender: function()
                {
                    App.albumTitleRefresh('album_show_card');
                }
            }
        };

        var albumShowTpl = new Ext.XTemplate(
            '<div class="album_images">',
            '  <div class="album_show"><img src="{data.standard_url}" /></div>',
            '  <div id="remove_picture"></div>',
            '  <div class="album_likes">',
            '    <span>{[Tmo.Utils.likes(values.data.likes_count)]}</span>',
            '    <div id="like_picture" class="picture_like_button"<tpl if="my_likes">style="display: none;"</tpl>></div>',
            '    <div id="comment_object" class="picture_like_button"></div>',                
            '  </div>',
            '</div>',
            '<div id="comments">',
            '</div>'
            );

        var albumShowContainer = new Ext.Container({
            tpl: albumShowTpl,
            id: "albumShowContainer",
            data: viewInstance.picture,
            listeners:
            {
                afterrender: function()
                {
                    if (!viewInstance.picture.get('my_likes')) {
                        new Ext.Button({
                            iconCls: 'heart',
                            iconMask: true,
                            text: I18n.t('action.like_link'),
                            renderTo:'like_picture',
                            handler: viewInstance.onLikeAction,
                            scope: viewInstance
                        });
                    }

                    App.getCommentButton({
                        commentable: viewInstance.picture,
                        label_with_couter: false,
                        action: 'new'
                    });

                    App.getCommentsListForObject(viewInstance.picture, 'comments'),

                    new Ext.Button({
                        text: I18n.t('album.actions.show.remove_picture_link') ,
                        ui: 'decline',
                        renderTo:'remove_picture',
                        hidden: !viewInstance.picture.isOwnedBy(Profile.getCurrentUser()),
                        handler: viewInstance.onRemoveAction,
                        scope: viewInstance
                    });
                },
                beforedestroy:function()
                {
                  if (Ext.isObject(Ext.getCmp('like_picture_button')))
                    Ext.getCmp('like_picture_button').destroy();
                  if (Ext.isObject(Ext.getCmp('comment_object_button')))
                    Ext.getCmp('comment_object_button').destroy();
                }
            }
        });

        var itemsContainer = new Ext.Container({
            scroll: 'vertical',
            items: [
                App.headers.render('pictures/shared/header', this.picture),
                albumShowContainer
            ]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            id: 'album_show_card',
            scroll: 'vertical',
            dockedItems: [ titleBar ],
            items: [ itemsContainer ]
        });

        App.views.AlbumShow.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onLikeAction: function() {
        var card = this;
        var container = Ext.getCmp("albumShowContainer");

        Server.request('POST', '/pictures/' + card.picture.getId() + '/like.json', {
            params: {},
            success: function(result) {
                card.picture.data.likes_count = result.likes_count;
                card.picture.data.my_likes = true;
                container.update(card.picture);
                container.fireEvent("beforedestroy");
                container.fireEvent("afterrender");
            }
        });
    },

    onRemoveAction: function() {
        var view = this;
        Ext.Msg.confirm(I18n.t('support.message_types.confirmation'), I18n.t('action.destroy_confirmation'), function(e) {
            if (e == "yes") {
                Ext.dispatch({
                    controller: 'Album',
                    action: 'destroy',
                    historyUrl: 'Album/show/' + view.picture.getId(),
                    picture: view.picture,
                    albumObj: view.albumObj,
                    albumType: view.albumType
                });
            }
            else {}
        });
    }
    
});

Ext.reg('AlbumShow', App.views.AlbumShow);
