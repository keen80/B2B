App.views.AlbumIndex = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, createButton, titleBar;
        var storeFilter = Tmo.storeFilters.pictures;

        /* --- init --------------------------------------------------------------------------------- */
        
        backButton = Tmo.BackButton.getBackButton();

        createButton = {
            text: I18n.t('action.add_link'),
            ui: 'add',
            hidden: _.include(["User", "Profile"], this.albumType),
            handler: this.onCreateAction,
            scope: this
        };

        titleBar = {
            id: 'album_index_title',
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('album.titles.pictures'),
            defaults: {
                iconMask: true
            },
            items: [ backButton, {
                xtype: 'spacer'
            }, createButton ]
        };

        var onScopeChangeAction = function()
        {
            var storeFilter = Tmo.storeFilters.pictures;
            storeFilter.set('network_scope', this.network_scope);
            storeFilter.filter();
        };

        var networkScopeButtons = {
            xtype: 'segmentedbutton',
            centered: true,
            defaults: {
                flex: 1
            },
            style: 'width: 100%',
            items: [
                {
                    text: I18n.t('album.actions.index.your_link'),
                    network_scope: 'your',
                    pressed: storeFilter.check('network_scope', 'your'),
                    handler: onScopeChangeAction
                },
                {
                    text: I18n.t('album.actions.index.network_link'),
                    network_scope: 'network',
                    pressed: storeFilter.check('network_scope', 'network'),
                    handler: onScopeChangeAction
                },
                {
                    text: I18n.t('album.actions.index.members_link'),
                    network_scope: 'members',
                    pressed: storeFilter.check('network_scope', 'members'),
                    handler: onScopeChangeAction
                }
            ]
        };

        var networkScopeBar = {
            xtype: 'toolbar',
            id: 'pictures_network_scope_bar',
            dock: 'top',
            ui: 'light',
            hidden: _.include(["User", "Profile"], this.albumType),
            items: [
                {
                    xtype: 'spacer'
                },
                networkScopeButtons,
                {
                    xtype: 'spacer'
                }
            ]
        };

        var albumListTpl = new Ext.XTemplate(
                '<div class="album_images">',
                '<tpl for=".">',
                '  <div class="album_img" style="background-image:url({[Tmo.Utils.thumb(values.thumb_url)]});" ></div>',
                '</tpl>',
                '</div>'
                );

        var albumList = new Ext.DataView({
            flex: 1,
            id: 'album_pictures_list',
            tpl: albumListTpl,
            store: App.stores.pictures,

            itemSelector: 'div.album_img',
            scroll: 'vertical',
            listeners:
            {
                beforerender:function()
                {
                    var storeFilter = Tmo.storeFilters.pictures;
                    if (storeFilter.dirty) {
                        var card = Ext.getCmp('album_index_card');
                        storeFilter.set('picturable_type', card.albumType);
                        storeFilter.set('picturable_id', card.albumObj.getId());
                        storeFilter.filter();
                    }
                },
                itemtap:
                {
                    fn: this.onShowAction,
                    scope: this
                },
                refresh:function()
                {
                    App.albumTitleRefresh('album_index_card');
                    App.albumTitleRefresh('album_show_card');
                }
            }
        });

        var headerDetailsTpl = new Ext.XTemplate(
            '<div class="overview overview_small">',
            '  <div class="overview_head">',
            '    <div id="place_picture" class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.thumb_url)]})"></div>',
            '    <h3>{name}</h3>',
            '    <h4>{main_category_name}</h4>',
            '  </div>',
            '</div>'
        );

        var headerDetailsData = this.albumObj.data;
        if ( _.include(["User", "Profile"], this.albumType) ) {
            headerDetailsData.name = this.albumObj.getFullName();
        }

        var headerDetails = new Ext.Container({
            data: headerDetailsData,
            tpl: headerDetailsTpl
        });

        var content = [];
        if (this.albumType == "Place")
            content = [App.headers.render('places/shared/header', this.albumObj.data), networkScopeBar, albumList];
        else if (this.albumType == "User")
            content = [App.headers.render('profile/shared/header', this.albumObj), networkScopeBar, albumList];

        var albumContainer = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },            
            items: content
        });


        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            id: 'album_index_card',
            dockedItems: [titleBar ],
            items: [albumContainer],
            listeners:
            {
                show:function()
                {
                    if ( Tmo.BackButton.config_current.albumOnShow == 'add' ) {
                        Tmo.BackButton.config_current.albumOnShow = '';
                        App.albumCreateAction(this);
                    }
                }
            }
        });

        App.views.AlbumIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowAction: function(dataview, index, item, e) {
        var picture = dataview.store.getAt(index);
        App.albumShowAction(picture, this.albumType, this.albumObj);
    },

    onCreateAction: function() {
        App.albumCreateAction(this);
    }
});

Ext.reg('AlbumIndex', App.views.AlbumIndex);

App.albumIndexAction = function(albumType, albumObj) {
    Ext.dispatchBack({
        controller: 'Album',
        action: 'index',
        historyUrl: 'Album/index',
        albumType: albumType,
        albumObj: albumObj
    });
};

App.albumShowAction = function(picture, albumType, albumObj) {
    Ext.dispatch({
        controller: 'Album',
        action: 'show',
        historyUrl: 'Album/show/' + picture.getId(),
        picture: picture,
        albumType: albumType,
        albumObj: albumObj
    });
};

App.albumCreateAction = function(card) {
    if (!card.actions) {
        var upload = function(source) {
            Tmo.Camera.uploadPicture(source, "/pictures?type=" + card.albumType + "&id=" + card.albumObj.getId(), function(r) {
                var result = JSON.parse(r.response);
                var picture = new App.models.Picture(result);

                Tmo.Utils.inc(card.albumObj, 'pictures_count');

                var store = Tmo.storeFilters.pictures;
                store.dirty = true;
                store.filter(function(){
                    App.albumShowAction(picture, card.albumType, card.albumObj);
                });
            })
        };
        card.actions = Tmo.Camera.uploadActionSheetFor(card, upload);
    }
    card.actions.show();
};

App.albumTitleRefresh = function(card_id) {
    var card = Ext.get(card_id);
    if (card) {
        var pictureScount = Tmo.storeFilters.pictures.store.data.length;
        var title = I18n.t('album.titles.pictures');
        if (pictureScount > 0) {title = title + ' (' + pictureScount + ')'}
        card.down('.x-toolbar-title').update(title);
    }
};
