App.models.EventGuest = Ext.regModel('EventGuest', {

    fields: [
        { name: 'id', type: 'int'},
        { name: 'event_id', type: 'int'},
        { name: 'event_name', type: 'string'},
        { name: 'guest_id', type: 'int'},
        { name: 'status', type: 'int'}
    ],

    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/event_guests"),
      format: 'json',
      reader: {
        type: 'json',
        root: 'records'
      }
    },

    getStatusItems: function(event){
        var selected_value = event.get('current_user_attending_status');
        var available = "public";
        if (event.attendanceListIsFull() && event.get('current_user_attending_status') != (new App.models.EventGuest()).attendingStatus())
            available = "all";
        
        var options = [];
        Ext.each (this.availableAttendingStatuses(), function(item, index, allItems){
            if (available == "all" || available == item.available)
                options[index] = {xtype: 'radiofield', name: 'status', value: item.value, label: item.text, checked: (item.value === selected_value)};
        }, this);
        options[options.length] = { xtype: 'App.views.ErrorField', fieldname: 'status'};
        return options;
    },

    availableAttendingStatuses: function(){ return [
        {value: this.notAttendingStatus(), text: I18n.t('event.attendance.not_attending'), available: "public" },
        {value: this.maybeStatus(), text: I18n.t('event.attendance.maybe_attending'), available: "public"},
        {value: this.attendingStatus(), text: I18n.t('event.attendance.attending'), available: "public"},
        {value: this.willingStatus(), text: I18n.t('event.attendance.would_like'), available: "limit_reached"}
    ]},

    availableCounterNamesForStatuses: function(){ return [
        {value: this.notAttendingStatus(), text: 'not_attending_guests_count'},
        {value: this.maybeStatus(), text: 'maybe_guests_count'},
        {value: this.attendingStatus(), text: 'attending_guests_count'},
        {value: this.willingStatus(), text: 'willing_guests_count'}
    ]},

    counterNameForStatus: function(status){
        var label = "undecided_users_count";
        Ext.each (this.availableCounterNamesForStatuses(), function(item, index, allItems){if (item.value == status) label = item.text}, this);
        return label;
    },

    tabsGuestsForCreator: function(){
        return [
            {search_scope: this.attendingStatus(), text: I18n.t('event.attendance.status.participate')},
            {search_scope: this.notAttendingStatus(), text: I18n.t('event.attendance.status.dont') },
            {search_scope: this.maybeStatus(), text: I18n.t('event.attendance.status.maybe')}
        ];
    },

    tabsGuestsForGuest: function(){
        return [
            {search_scope: this.attendingStatus(), text: I18n.t('event.attendance.status.participate')},
            {search_scope: this.maybeStatus(), text: I18n.t('event.attendance.status.maybe')}
        ];
    },

    tabsPendingForCreator: function(){
        return [
            {search_scope: this.willingStatus(), text: I18n.t('event.attendance.status.would_like')},
            {search_scope: this.undecidedStatus(), text: I18n.t('event.attendance.status.undecided')}
        ];
    },

    undecidedStatus: function(){ return -1},
    notAttendingStatus: function(){ return 1},
    maybeStatus: function(){ return 2},
    attendingStatus: function(){ return 3},
    willingStatus: function(){ return 4}

});