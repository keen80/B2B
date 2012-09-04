App.views.PlacesShow = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar, editButton, shareButton, createTipButton;
        var placeTpl;
        var viewInstance = this;

        /* --- init --------------------------------------------------------------------------------- */
        App.makeSharableFor(this.place, this, Tmo.Consts.SHARETYPE_SYSTEM | Tmo.Consts.SHARETYPE_EMAIL | Tmo.Consts.SHARETYPE_SMS);

        backButton = Tmo.BackButton.getBackButton();

        shareButton = App.getShareButtonFor(this.place, this);

        editButton = {
            iconCls: 'compose1',
            iconMask: true,
            handler: this.onEditAction,
            scope: this
        };

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: Ext.util.Format.ellipsis(this.place.name, 18),
            defaults: {
                iconMask: true
            },

            items: [ backButton, {xtype: 'spacer'}, editButton, shareButton ]
        };

        var embedded_buttons = new Ext.DataView({
            id: 'embedded_buttons',
            tpl: new Ext.XTemplate(
                '<div class="embedded_buttons">',
                '<tpl for=".">',
                '<tpl if="hidden != true">',
                '<div class="item {state}">',
                    '<span class="item_icon" style="background-image: url(images/embedded_buttons/{action}.png)"></span>',
                    '<span class="item_label">{text}</span>',
                '</div>',
                '</tpl>',
                '</tpl>',
                '</div>'
            ),
            scroll: false,
            itemSelector: '.item',
            store: viewInstance.embeddedButtonsStore(),
            listeners: {
                itemtap: function(dataview, index, item, e)
                {
                  var callback = dataview.store.getAt(index).get('itemtap');
                  if ( Ext.isFunction(callback) ) {
                      callback( dataview, index, item, e);
                  }
                }
            }
        });

        placeTpl = new Ext.XTemplate(
            '<div class="overview overview_with_mutual">',
            '  <div class="overview_head purple">',
            '      <div id="place_picture" class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.data.thumb_url)]})"></div>',
            '    <h3>{data.name}</h3>',
            '    <h4>{[values.categoriesLabel()]}</h4>',
            '    <tpl for="data.sub_cfs"><p class="small">{category_name} ({budget_name})</p></tpl>',
                '<div class="mutual">',
                    '<p class="network_addressbook"><img src="images/icons/friends.png" alt="network addressbook" /> x {data.count_in_network_addressbooks}</p>',
                    '<p class="system_addressbook"><img src="images/icons/world.png" alt="network addressbook" /> x {data.count_in_system_addressbooks}</p>',
                '</div>',
            '  </div>',
            '</div>'
          );

        var placeDetailsTpl = new Ext.XTemplate(
            '<div class="overview overview_with_mutual">',
            '  <div class="overview_content with_map_button">',
            '    <p><strong>{data.name}</strong></p>',
            '    <p>{[values.formattedAddress()]}</p>',
            '    <tpl if="!Ext.isEmpty(data.tel)">',
            '       <p><strong>{[I18n.t("activerecord.attributes.place.tel")]}: <a href="tel:{data.tel}">{data.tel}</a></strong></p>',
            '    </tpl>',
            '    <div id="show_on_map_button" class="show_on_map"></div>',
            '  </div>',
            '</div>'
          );

        var placeContainer = new Ext.Container({
            tpl: placeTpl,
            data: this.place
        });

        var placeDetailsContainer = new Ext.Container({
            tpl: placeDetailsTpl,
            data: this.place,
            listeners: {
                afterrender:function()
                {
                    new Ext.Button({
                        id: 'show_place_on_map_button',
                        renderTo:'show_on_map_button',
                        iconMask: true,
                        iconCls: 'maps',
                        handler: viewInstance.showPlaceOnMapAction,
                        scope: viewInstance
                    })
                },
                beforedestroy:function()
                {
                  Ext.getCmp('show_place_on_map_button').destroy();
                }
            }
        });

        var relationshipDetailsList = App.profileDetailsList(
            this.place.relationship_details(),
            {
                listeners: {
                    selectionchange:
                    {
                        fn: this.onShowRelationshipAction,
                        scope: this
                    }
                }
            }
        );

        var checkInButton = {
            xtype: 'button',
            text: I18n.t('check_in.button'),
            handler: this.onCheckInAction,
            scope: this
        };

        var checkInContainer = new Ext.Container({
            cls: 'overview_buttons',
            items: [checkInButton]
        });

        var placeInformationList = App.profileDetailsList(
            this.place.place_information_for_view(),{id: 'place_information_list', cls: 'single_list no_arrows', disableSelection: true}
        );

        var placeInformationContainer = {
            xtype: "container",
            items: Ext.isEmpty(placeInformationList.store.data.items) ? [] : [App.headingPartial(I18n.t('place.titles.information')), placeInformationList]
        };

        var profileDetailsContainer = new Ext.Container({
            scroll: 'vertical',
            items: [
                placeContainer,
                embedded_buttons,
                checkInContainer,
                placeDetailsContainer,
                relationshipDetailsList,
                placeInformationContainer ]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            id: 'places_show_card',
            scroll: false,
            dockedItems: [titleBar],
            items: [profileDetailsContainer],
            listeners: {
                show: function() {
                    this.refreshEmbeddedButtons();
                }
            }
        });

        App.views.PlacesShow.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowRelationshipAction: function(sel, records) {
        if (records[0] !== undefined) {
            var row = records[0];
            
            switch(row.data.type)
            {
                case 'events':
                    Ext.dispatch({
                        controller: 'Places',
                        action: 'show_events',
                        historyUrl: 'Places/show_events/' + this.place.getId(),
                        eventObjFor: 'place',
                        eventObj: this.place,
                        back_page: {
                            controller: 'Places',
                            action: 'show',
                            historyUrl: 'Places/show/' + this.place.getId(),
                            place: this.place,
                            animation: {type: 'slide', reverse: true}
                        }
                    });
                    break;
                case 'visitors':
                    Tmo.storeFilters.users.clear();
                    Ext.dispatch({
                        controller: 'CheckIns',
                        action: 'index',
                        historyUrl: 'CheckIns/index',
                        place: this.place
                    });
                    break;
                case 'tips':
                    Ext.dispatch({
                        controller: 'Places',
                        action: 'show_tips',
                        historyUrl: 'Places/show_tips/' + this.place.getId(),
                        tipObjFor: 'place',
                        tipObj: this.place
                    });
                    break;
                case 'images':
                    Ext.dispatch({
                        controller: 'Album',
                        action: 'index',
                        historyUrl: 'Album/index',
                        albumType: 'Place',
                        albumObj: this.place
                    });
                    break;
            }
        }
    },

    makeReservationAction: function() {
        if (Ext.is.Phone) {
            window.plugins.childBrowser.showWebPage(this.place.get('tf_link'))
        }
    },

    showPlaceOnMapAction: function() {
        Ext.dispatch({
            controller: 'Places',
            action: 'show_map',
            historyUrl: 'Places/show/map',
            animation: {
                type: 'slide'
            },
            place: this.place
        });
    },

    onCreateTipAction: function() {
        Ext.dispatch({
            controller: 'Tips',
            action: 'form',
            historyUrl: 'Tips/form',
            place: this.place
        });
    },

    onEditAction: function() {
        Ext.dispatch({
            controller: 'Places',
            action: 'edit_form',
            historyUrl: 'Places/edit/form',
            place: this.place
        });
    },

    onCheckInAction: function() {
        Ext.dispatch({
            controller: 'CheckIns',
            action: 'new_form',
            historyUrl: 'CheckIns/new/form',
            place: this.place
        });
    },

    embeddedButtonsStore: function() {
        var viewInstance = this;

        return new Ext.data.Store({
            fields: ['text', 'action', 'state', 'itemtap', 'hidden'],
            data: [
                {
                    text: I18n.t('place.actions.show.add_addressbook'),
                    action: 'add_addressbook',
                    state: viewInstance.place.data.addressbook ? 'active' : '',
                    itemtap: function(dataview, index, item, e)
                    {
                        if ( viewInstance.place.data.addressbook ) {
                            viewInstance.bookmarkAction('removePlaceBookmark');
                        } else {
                            viewInstance.bookmarkAction('createPlaceBookmark');
                        }
                    }
                },
                {
                    text: I18n.t('place.actions.show.add_wishlist'),
                    action: 'add_wishlist',
                    state: viewInstance.place.data.addressbook ? 'disabled' : ( viewInstance.place.data.wishlist ? 'active' : '' ),
                    itemtap: function(dataview, index, item, e)
                    {
                        if ( !viewInstance.place.data.addressbook ) {
                            if ( viewInstance.place.data.wishlist ) {
                                viewInstance.bookmarkAction('removeWishBookmark');
                            } else {
                                viewInstance.bookmarkAction('createWishBookmark');
                            }
                        }
                    }
                },
                (viewInstance.place.get('tf_id') ?
                    {
                        text: I18n.t('place.actions.show.book_place'),
                        action: 'book_place',
                        state: '',
                        hidden: !viewInstance.place.get('tf_id'),
                        itemtap: function(dataview, index, item, e) {
                            if (Ext.is.Phone) {
                                window.plugins.childBrowser.showWebPage(viewInstance.place.get('tf_link'))
                            }
                        }
                    }
                    :
                    {
                        text: I18n.t('place.actions.show.add_photo'),
                        action: 'add_photo',
                        state: '',
                        hidden: viewInstance.place.get('tf_id'),
                        itemtap: function(dataview, index, item, e) {
                            Ext.defer(function(){
                                Ext.dispatch({
                                    controller: 'Album',
                                    action: 'index',
                                    historyUrl: 'Album/index',
                                    albumType: 'Place',
                                    albumObj: viewInstance.place,
                                    albumOnShow: 'add'
                                });
                            }, 100);
                        }
                    }
                ),
                {
                    text: I18n.t('place.actions.show.add_tip'),
                    action: 'add_tip',
                    state: '',
                    itemtap: function(dataview, index, item, e) {
                        Ext.defer(function(){
                            Ext.dispatch({
                                controller: 'Tips',
                                action: 'form',
                                historyUrl: 'Tips/form',
                                place: viewInstance.place
                            });
                        }, 100);
                    }
                },
                {
                    text: I18n.t('place.actions.show.add_event'),
                    action: 'add_event',
                    state: '',
                    itemtap: function(dataview, index, item, e) {
                        Ext.defer(function(){                    
                        Ext.dispatch({
                            controller: 'Events',
                            action: 'new_form',
                            historyUrl: 'Events/new/form',
                            place: viewInstance.place
                            });
                        }, 100);
                    }
                }
            ]
        });
    },

    refreshEmbeddedButtons: function() {
      var embedded_buttons = Ext.getCmp('embedded_buttons');
      embedded_buttons.store.removeAll();
      embedded_buttons.store = this.embeddedButtonsStore();
      embedded_buttons.refresh();
    },

    bookmarkAction: function(bookmark) {
      var panel = this;
      panel.place.bookmark(bookmark, function(result) {
          panel.place.data.addressbook = result.addressbook;
          panel.place.data.wishlist = result.wishlist;
          panel.refreshEmbeddedButtons();
          Tmo.storeFilters.places.dirty = true;
      });
    }
});

Ext.reg('PlacesShow', App.views.PlacesShow);