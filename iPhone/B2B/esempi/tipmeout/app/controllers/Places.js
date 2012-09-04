Ext.regController('Places', {

    beforeFilter: function() {
        return Profile.requireUser();
    },

    // index action
    index: function(options)
    {
        if (Ext.getCmp('profile_tab_button'))
            Ext.getCmp('profile_tab_button').setBadge(Profile.getCurrentUser().get('unread_count'));

        App.new_places = null;
        Tmo.storeFilters.places.filter();
        this.renderPage('index', options);
    },

    create: function(params)
    {
        if ( !this.hasCategory(params.form) ) {
            return;
        }

        var goToNewPlace = this.goToNewPlace;
        var uploadPicture = this.uploadPicture;

        Server.request('POST', '/places.json', {
            params: Server.toRailsParams('place', params.form.getValues()),
            success: function(result) {
                Tmo.storeFilters.places.dirty = true;

                uploadPicture(App.new_place.data.imageURI, result, function(r) {});

                Ext.Msg.show({
                    title: I18n.t('place.actions.show.confirmation_title'),
                    msg: I18n.t('place.actions.show.confirmation_msg'),
                    buttons: [
                        {text: I18n.t('place.actions.show.buttons.address_book')},
                        {text: I18n.t('place.actions.show.buttons.wishlist')}
                    ],
                    fn: function(e)
                    {
                        var bookmark = 'createPlaceBookmark';
                        if ( e == 'Wishlist' ) {bookmark = 'createWishBookmark';}

                        Server.request('POST', '/places/' + result.id + '/bookmark.json', {
                            params: {
                                bookmark: bookmark
                            },
                            success: function(result) {
                                goToNewPlace(result);
                            }
                        });
                    }
                });
            },
            failure: function(result) {
                params.form.showErrors(result);
                Ext.Msg.alert(I18n.t('support.create_failed'));
            }
        });
    },

    save: function(params)
    {
        if ( !this.hasCategory(params.form) ) {
            return;
        }

        var goToNewPlace = this.goToNewPlace;
        var requestParams = Server.toRailsParams('place', params.form.getValues());
        requestParams['_method'] = 'PUT';

        Server.request('POST', '/places/' + params.place.getId() + '.json', {
            params: requestParams,
            success: function(result) {
                Tmo.storeFilters.places.dirty = true;
                goToNewPlace(result);
            },
            failure: function(result) {
                params.form.showErrors(result);
                Ext.Msg.alert(I18n.t('support.save_failed'));
            }
        });
    },

    show: function(options)
    {
        var page = this;
        var id = options.id || options.place_id;

        var store = Tmo.storeFilters.pictures;
        store.store.removeAll(true);
        store.dirty = true;

        if (Ext.isEmpty(options.place)) {
            App.models.Place.load(id, {
                success: function(result, operation) {
                    page.renderPage('show', options, {place: Ext.ModelMgr.create(result.raw, "Place")})
                },
                failure: function(result) {Ext.Msg.alert(I18n.t('support.fetch_failed'));}
            });
        }
        else
            page.renderPage('show', options, {place: options.place});        
    },

    show_map: function(options)
    {
        this.renderPage('show_map', options, {place: options.place});
    },

    // filter action
    filter: function(options)
    {
        this.renderPage('filter', options, {storeFilter: options.storeFilter});
    },

    // new place (map) action
    new_map: function(options)
    {
        Tmo.BackButton.isSubPath(options);
        var search_query = options.search_query;
        options.search_query = null;
        this.renderPage('new_map', options, {search_query: search_query});
    },

    // new place (details) action
    new_form: function(options)
    {
        Tmo.BackButton.isSubPath(options);
        this.renderPage('new_form', options);
    },
    
    edit_form: function(options)
    {
        Tmo.BackButton.isSubPath(options);
        this.renderPage('edit_form', options, {place: options.place});
    },

    //tips for place
    show_tips: function(options)
    {
        var tip_for = 'place';
        Tmo.storeFilters.tips.set('user_id', Profile.getCurrentUser().getId());
        Tmo.storeFilters.tips.set('search_scope', 'yours');
        Tmo.storeFilters.tips.set('tip_for', options.tipObjFor);
        if (options.tipObj)
        {
            Tmo.storeFilters.tips.set('id', options.tipObj.getId());
        }
        Tmo.storeFilters.tips.filter();
        this.renderPage('tips_index', options, {
            xtype: 'TipsIndex',
            tipObj: options.tipObj, //tips of object
            tipObjFor: tip_for  //view all tips that belong to place (view context)
        });
    },

    //tips for place
    show_events: function(options)
    {
        var scope_type = 'place';
        Tmo.storeFilters.events.set('scope_type', scope_type);
        Tmo.storeFilters.events.set('user_id', Profile.getCurrentUser().getId());
        Tmo.storeFilters.events.set('search_scope', 'yours');
        Tmo.storeFilters.events.set('place_id', options.eventObj.getId());
        Tmo.storeFilters.events.filter();
        this.renderPage('events_index', options, {
            xtype: 'EventsIndex',
            eventObj: options.eventObj, //tips of object
            eventObjFor: scope_type  //view all tips that belong to place (view context)
        });
    },

    /* --- helpers ------------------------------------------------------------------------------ */

    goToNewPlace: function(place_data)
    {
      var place = Ext.ModelMgr.create( place_data, 'Place' );
      place.redirectToShow();
    },

    uploadPicture: function(imageURI, place_data)
    {
      if ( !Ext.isEmpty(imageURI) ) {
        Tmo.Camera.transferPicture(imageURI, "/places/" + place_data.id + "/picture", function(r) {
          Tmo.storeFilters.places.dirty = true;
        });
      }
    },

    hasCategory: function(form)
    {
        var hasCategory = false;
        var values = form.getValues();
        Ext.each(values, function(values) {
            for (key in values) {
                if ( key.match(/_destroy$/) ) {
                    if ( values[key] == 0 ) {
                        var categoryKey = key.replace(/_destroy$/, "_place_category")
                        var categoryId = values[categoryKey];
                        if ( !Ext.isEmpty(categoryId) && categoryId != 0 ) {
                            hasCategory = true;
                        }
                    }
                }
            }
        });

        if (!hasCategory) {
            Ext.Msg.alert(
                I18n.t('support.save_failed'),
                I18n.t('activerecord.errors.models.place.attributes.cfs.too_short', {count: 1})
            );
        }

        return hasCategory;
    }

});
