App.views.EventsShow = Ext.extend(Ext.Panel, {        
    initComponent: function() {        

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar, shareButton, editButton, deleteButton, answerButton;
        var event = this.event;
        var page = this;
        
        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton(); 

        App.makeSharableFor(this.event, this, Tmo.Consts.SHARETYPE_SYSTEM | Tmo.Consts.SHARETYPE_EMAIL | Tmo.Consts.SHARETYPE_SMS);
        shareButton = App.getShareButtonFor(this.event, this);

        answerButton = {
            text: this.event.attendingStatusLabelForCurrentUser(),
            ui: 'action',
            event: this.event,
            handler: this.participateEventAction
        };

        editButton = {
            iconCls: 'compose1',
            iconMask: true,
            event: this.event,
            handler: this.onEditAction,
            scope: this
         };

        deleteButton = {
             text: I18n.t('action.delete_link'),
             ui: "decline",
             event: this.event,
             handler: this.onDeleteAction
         };

        var buttons = [];
        if (this.event.isOwnedBy(Profile.getCurrentUser())) {           
            buttons.push(editButton);
        }
        if (this.event.isOwnedBy(Profile.getCurrentUser()) || this.event.get('open_invitations')) {
            buttons.push(shareButton);
        }
        if (buttons.length == 0) {
            buttons.push({xtype: 'spacer'});
        }

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('event.actions.show.title'),
            defaults: {
                iconMask: true
            },

            items: [
                backButton,
                {xtype: 'spacer'},
                buttons ]
        };

//=========================================================================================
                
        var participateDetailsList = App.profileDetailsList(
            event.participate_details_for_view(),{id: 'participate_details_list', listeners: { selectionchange: { fn: page.onShowAction, scope: this }}}
        );

        var availabilitiesDetailsList = App.profileDetailsList(
            event.availabilities_details_for_view(),{id: 'availabilities_details_list', cls: 'single_list no_arrows', disableSelection: true, listeners: { selectionchange: { fn: page.onShowAction, scope: this }}}
        );

        var placeDetailsList = App.profileDetailsList(
            event.place_details_for_view(),{id: 'place_details_list', cls: 'single_list no_arrows', disableSelection: true, listeners: { selectionchange: { fn: page.onShowAction, scope: this }}}
        );

        var creatorDetailsList = App.profileDetailsList(
            event.creator_details_for_view(),{id: 'creator_details_list', listeners: { selectionchange: { fn: page.onShowAction, scope: this }}}
        );

        var guestsDetailsList = App.profileDetailsList(
            event.guests_details_for_view(),{id: 'guests_details_list', listeners: { selectionchange: { fn: page.onShowAction, scope: this }}}
        );

//=========================================================================================

        var eventPlaceTpl = new Ext.XTemplate(
            '<div class="overview">',
            '  <div class="overview_content with_map_button">',
            '    <p>',
            '       <a onclick="Ext.getCmp(\'events_show_card\').redirectToPlace()"><span class="cl_purple">{data.place_raw.name}</span></a><br>',
            '       <span>{[values.formattedAddressWithoutPlaceName()]}</span>',
            '    </p>',
            '    <div id="show_event_on_map_button" class="show_on_map"></div>',
            '  </div>',
            '</div>'
        );

        var eventPlaceContainer = new Ext.Container({
            id: "event_place_container",
            tpl: eventPlaceTpl,
            data: this.event,
            listeners: {
                afterrender:function()
                {
                    new Ext.Button({
                        id: 'show_event_place_on_map_button',
                        renderTo:'show_event_on_map_button',
                        iconMask: true,
                        iconCls: 'maps',
                        handler: page.showPlaceOnMapAction,
                        scope: page
                    });
                },
                beforedestroy:function()
                {
                  Ext.getCmp('show_event_place_on_map_button').destroy();
                }
            }
        });

//=========================================================================================

        var eventDescriptionTpl = new Ext.XTemplate(
            '<div class="overview">',
            '  <tpl if="data.description">',
            '  <div class="overview_content">',
            '    <p>{data.description}</p>',
            '  </div>',
            '  </tpl>',
            '</div>'
        );

        var eventDescriptionContainer = new Ext.Container({
            id: "event_description_container",
            tpl: eventDescriptionTpl,
            data: this.event
        });

//=========================================================================================        

        var likesTpl = new Ext.XTemplate(
            '  <div class="event_likes">',
            '    <span>{[Tmo.Utils.likes(values.data.likes_count)]}</span>',
            '    <div id="like_event" class="event_like_button"></div>',
            '    <div id="comment_object" class="event_like_button"></div>',
            '  </div>'
        );

        var eventLikesContainer = new Ext.Container({
            id: "event_likes_container",
            tpl: likesTpl,
            data: this.event,
            listeners: {
                afterrender:function()
                {
                    if (event.get('can_like')) {
                        //create like button
                        new Ext.Button({
                            iconCls: 'heart',
                            iconMask: true,
                            text:I18n.t('action.like_link'),
                            id: 'like_event_button',
                            renderTo:'like_event',
                            handler: function() {
                                Ext.dispatch({
                                    controller: 'Events',
                                    action: 'like',
                                    event: event,
                                    eventContainer: eventLikesContainer
                                });
                            }
                        });
                    }

                    App.getCommentButton({
                        commentable:event,
                        label_with_couter: false,
                        action: 'new' 
                    });
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

//=========================================================================================

        var deleteTpl = new Ext.XTemplate(
            '  <div class="overview_buttons">',
            '    <div id="remove_event_button"></div>',
            '  </div>'
        );

        var deleteContainer = new Ext.Container({
            id: "delete_container",
            tpl: deleteTpl,
            data: this.event,
            listeners: {
                afterrender:function()
                {
                    var event = page.event;
                    new Ext.Button({
                        text:I18n.t('action.delete_link'),
                        ui: 'decline',
                        handler: page.onDeleteAction,
                        renderTo:'remove_event_button',
                        scope: page,
                        hidden: (!event.isOwnedBy(Profile.getCurrentUser()))
                    });
                },
                beforedestroy:function()
                {
                  if (Ext.isObject(Ext.getCmp('remove_event_button')))
                    Ext.getCmp('remove_event_button').destroy();
                }
            }
        });

//=========================================================================================        
        var eventHeader = App.headers.render('events/shared/header',this.event);
        var eventDetailsContainer = new Ext.Container({
            scroll: 'vertical',
            items: [
                eventHeader,
                participateDetailsList,
                availabilitiesDetailsList,
                App.headingPartial(),
                placeDetailsList,
                eventPlaceContainer,
                creatorDetailsList,
                App.headingPartial(),
                guestsDetailsList,
                this.event.get('description')!="" ? App.headingPartial("Description:") : {},
                eventDescriptionContainer,
                eventLikesContainer,
                deleteContainer
            ]
        });        

        Ext.apply(this, {
            layout: 'card',
            id: 'events_show_card',
            scroll: false,
            dockedItems: [titleBar],
            items: [ eventDetailsContainer ]
        });

        App.views.EventsShow.superclass.initComponent.call(this);
    },
    
//=========================================================================================
    /* --- actions ------------------------------------------------------------------------------ */    

    showPlaceOnMapAction: function() {
        Ext.dispatch({
            controller: 'Events',
            action: 'show_map',
            historyUrl: 'Events/show/map',
            animation: {
                type: 'slide'
            },
            event: this.event            
        });
    },

    onEditAction: function() {
        Ext.dispatch({
            controller: 'Events',
            action: 'edit_form',
            historyUrl: 'Events/edit/form',
            event: this.event
        });
    },

    onDeleteAction: function() {
        var view = this;
        Ext.Msg.confirm(I18n.t('support.message_types.confirmation'), I18n.t('action.destroy_confirmation'), function(e) {
            if (e == "yes") {
                Ext.dispatch({
                    controller: 'Events',
                    action: 'destroy',
                    historyUrl: 'Events/show/' + view.event.getId(),
                    event_id: view.event.getId()
                });
            }
            else {}
        });
    },
    
    participateEventAction: function() {
        Ext.dispatch({
            controller: 'EventGuests',
            action: 'form',
            historyUrl: 'EventGuests/new/form',
            animation: {
                type: 'slide'
            },            
            event: this.event
        });
    },

    showCreatorEventAction: function() {
        Ext.dispatch({
            controller: 'Network',
            action: 'show',
            historyUrl: 'Network/show/'+this.event.get('creator_id'),
            user_id: this.event.get('creator_id')
        });
    },

    showCommentsEventAction: function() {
        Ext.dispatch({
            controller: 'Comments',
            action: 'index',
            historyUrl: 'Comments/index',
            commentable: this.event
        });
    },

    showGuestsEventAction: function(title, tabs) {
        Ext.dispatch({
            controller: 'EventGuests',
            action: 'index',
            historyUrl: 'EventGuests/index',
            animation: {
                type: 'slide'
            },
            event: this.event,
            title: title,
            tabs: tabs
        });
    },

    onShowAction: function(sel, records) {
        if (records[0] !== undefined) {
            var row = records[0];
            var eg_object = new App.models.EventGuest();
            if (row.data.type == "participate")
                this.participateEventAction();
            else if (row.data.type == "creator")
                this.showCreatorEventAction();
            else if (row.data.type == "guests")
                this.showGuestsEventAction(I18n.t('event.actions.show.guests'), (this.event.isOwnedBy(Profile.getCurrentUser())) ? eg_object.tabsGuestsForCreator() : eg_object.tabsGuestsForGuest());
            else if (row.data.type == "pending")
                this.showGuestsEventAction(I18n.t('event.actions.show.pending_users'), eg_object.tabsPendingForCreator());
            else if (row.data.type == "comments")
                this.showCommentsEventAction();
        }
    },

    redirectToPlace: function() {
        Ext.dispatch({
            controller: 'Places',
            action: 'show',
            historyUrl: 'Places/show/'+this.event.get('place_id'),
            place_id: this.event.get('place_id')
        });
    }


});

Ext.reg('EventsShow', App.views.EventsShow);