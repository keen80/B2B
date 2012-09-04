Ext.regController('Events', {

    beforeFilter: function() {
        return Profile.requireUser();
    },

    // index action
    index: function(options)
    {
        Tmo.storeFilters.events.filter();
        this.renderPage('index', options, {backLabel: options.backLabel});
    },

    create: function(params)
    {
      var page = this;
      var requestParams = Server.toRailsParams('event', params.form.getValues());

      requestParams['event[start_date]'].setHours(0); requestParams['event[start_date]'].setMinutes(0);
      requestParams['event[end_date]'].setHours(0); requestParams['event[end_date]'].setMinutes(0);

      Server.request('POST', '/events', {
        params: Server.toRailsParams('event', params.form.getValues()),
        success: function(result) {
            var event = new App.models.Event(result.records[0]);
            page.uploadPicture(params.imageURI, event, function(r) {});

            Tmo.storeFilters.events.dirty = true;
            params.event_id = event.getId();
            params.event = event;
            if (requestParams['event[synchronize_calendar]']) {
                event.synchronizeWithCalendar();
            }
            event.processNotifyingAfterCreation(page, params);
        },
        failure: function(result) {
            params.form.showErrors(result);
            Ext.Msg.alert(I18n.t('support.create_failed'));
        }
      });
    },

    update: function(params)
    {
      var page = this;
      var requestParams = Server.toRailsParams('event', params.form.getValues());
      requestParams['_method'] = 'PUT';
      old_start_hours = requestParams['event[start_date]'].getHours(); old_start_minutes = requestParams['event[start_date]'].getMinutes();
      old_end_hours = requestParams['event[end_date]'].getHours(); old_end_minutes = requestParams['event[end_date]'].getMinutes();
      requestParams['event[start_date]'].setHours(0); requestParams['event[start_date]'].setMinutes(0);
      requestParams['event[end_date]'].setHours(0); requestParams['event[end_date]'].setMinutes(0);

      Server.request('POST', '/events/'+params.event.getId(), {
        params: requestParams,
        success: function(result) {
            var event = new App.models.Event(result.records[0]);
            Tmo.storeFilters.events.dirty = true;
            event.redirectToShow();
        },
        failure: function(result) {
            requestParams['event[start_date]'].setHours(old_start_hours); requestParams['event[start_date]'].setMinutes(old_start_minutes);
            requestParams['event[end_date]'].setHours(old_end_hours); requestParams['event[end_date]'].setMinutes(old_end_minutes);
            params.form.showErrors(result);
            Ext.Msg.alert(I18n.t('support.update_failed'));
        }
      });
    },

    show: function(options)
    {
        var page = this;
        var id = options.id || options.event_id;
        if (Ext.isEmpty(options.event))
            App.models.Event.load(id, {
                success: function(result, operation) { page.renderPage('show', options, {event: result}) },
                failure: function(result) {Ext.Msg.alert(I18n.t('support.fetch_failed'));}
            });
        else
            page.renderPage('show', options, {event: options.event})
    },

    show_map: function(options)
    {
        this.renderPage('show_map', options, {event: options.event});
    },    

    filter: function(options)
    {
        this.renderPage('filter', options);
    },

    // new event (place) action
    new_place: function(options)
    {
        Tmo.BackButton.isSubPath(options);
        Tmo.storeFilters.eventPlaces.filter();        
        this.renderPage('new_place', options, {places: App.stores.places});
    },

    // new event (details) action
    new_form: function(options)
    {
        Tmo.BackButton.isSubPath(options);
        var currentTime = new Date();

        var config = {
            confirm_button: I18n.t('action.create_link'),
            title: I18n.t('event.actions.new.title'),
            action_name: "create",
            event: new App.models.Event({
                place_name: options.place.get('name'),
                place_id: options.place.getId(),
                start_date: currentTime,
                end_date: currentTime,
                attendance_limit: 1, 
                start_time: (currentTime.getHours()+1)%24+":00",
                end_time: (currentTime.getHours()+2)%24+":00"
            })};
        this.renderPage('new_form', options, config);
    },

    // edit event (details) action
    edit_form: function(options)
    {
        Tmo.BackButton.isSubPath(options);
        options.event.loadTimes();
        options.event.loadPlaceName();
        var config = {
            confirm_button: I18n.t('action.save_link'),
            title: I18n.t('event.actions.edit.title'),
            action_name: "update",
            event: options.event
            };
        this.renderPage('edit_form', options, config);
    },

    destroy: function(params)
    {
      Tmo.BackButton.clearCurrentConfig();
      var page = this;

      Server.request('POST', '/events/'+params.event_id, {
        params: {'_method': 'DELETE'},
        success: function(result) {
            Tmo.storeFilters.events.dirty = true;
            Ext.Msg.alert(I18n.t('support.message_types.information'), I18n.t('event.actions.destroy.success'));
            Ext.dispatch(Tmo.BackButton.last());                           
        },
        failure: function(result) {
            Ext.Msg.alert(I18n.t('support.destroy_failed'));
        }
      });
    },

    like: function(options) {
        var page = this;
        var event = options.event;
        Server.request('POST', '/likes', {
            params: Server.toRailsParams('like', {id: event.getId(), type: 'Event'}),
            success: function(result) {
                event.set('likes_count', result.likes_count);
                event.set('can_like', false);
                options.eventContainer.event = event;
                options.eventContainer.update(event);
                Ext.getCmp("event_likes_container").fireEvent('beforedestroy');
                Ext.getCmp("event_likes_container").fireEvent('afterrender');
                Tmo.LoadMask.hide();
            },
            failure: function(result) {
                Tmo.LoadMask.hide();
                Ext.Msg.alert(result.error);
            }
        });
    },
    
    uploadPicture: function(imageURI, event)
    {
      var response;
      if ( !Ext.isEmpty(imageURI) ) {
        Tmo.Camera.transferPicture(imageURI, "/events/" + event.getId() + "/picture", function(r) {
            response = JSON.parse(r.response);
        });          
      }
      return response;  
    }

});