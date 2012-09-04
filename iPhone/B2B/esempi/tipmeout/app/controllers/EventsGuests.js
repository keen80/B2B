Ext.regController('EventGuests', {

    beforeFilter: function() { return Profile.requireUser(); },

    // index action
    index: function(options)
    {
        var storeFilter = Tmo.storeFilters.eventGuests;
        var avaialble_scopes = _.pluck(options.tabs, "search_scope");
        if (!_.include(avaialble_scopes, storeFilter.get('search_scope')))
            storeFilter.set('search_scope', _.first(avaialble_scopes)); 

        storeFilter.set('event_id', options.event.getId());        
        storeFilter.filter();
        this.renderPage('index', options, {event: options.event, tabs: (options.tabs), title: options.title});
    },

    create: function(params)
    {
      var page = this;
      Server.request('POST', '/event_guests', {
        params: Server.toRailsParams('event_guest', params.form.getValues()),
        success: function(result) {
            var event_guest = new App.models.EventGuest(result.records[0]);
            var current_status = params.event.get('current_user_attending_status');
            params.event.updateStatusCountersByStatusChange(current_status, event_guest.get('status'));
            params.event.set('current_user_attending_status', event_guest.get('status'));

            if ((Ext.is.iOS || Ext.is.Desktop) && event_guest.get('status') == event_guest.attendingStatus()) {
                Ext.Msg.confirm(I18n.t('event.actions.new.title'), I18n.t('event.actions.new.add_to_calendar') , function(value) {
                    if (value === 'yes') {
                        params.event.synchronizeWithCalendar();
                    }
                });
            }

            Ext.dispatchBack({
                controller: 'Events',
                action: 'show',
                historyUrl: 'Events/show/' + params.event.getId(),
                event: params.event
            });
        },
        failure: function(result) {
            params.form.showErrors(result);
            Ext.Msg.alert(I18n.t('support.problem_occurred'), I18n.t('support.couldnt_confirm_your_attendance'));
        }
      });
    },

    form: function(options)
    {
        Tmo.BackButton.isSubPath(options);
        this.renderPage('form_new', options, {xtype: 'EventGuestsNewForm', event: options.event, event_guest: new App.models.EventGuest()});
    }

});