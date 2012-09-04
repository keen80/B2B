App.models.Event = Ext.regModel('Event', {
    belongsTo: 'Place',
    hasMany  : [
        { model: 'EventCategory', name: 'available_categories'},
        { model: 'Comment', name: 'comments'}
    ],
    fields: [
        { name: 'id', type: 'int'},
        { name: 'name', type: 'string'},
        { name: 'start_date', type: 'date', dateFormat: 'c'},
        { name: 'end_date', type: 'date', dateFormat: 'c'},
        { name: 'start_time', type: 'string'},
        { name: 'end_time', type: 'string'},            
        { name: 'category_name', type: 'string'},
        { name: 'category_id', type: 'int'},
        { name: 'shorten_description', type: 'string'},
        { name: 'description', type: 'string'},
        { name: 'formatted_address', type: 'string'},
        { name: 'formatted_address_without_place_name', type: 'string'},            
        { name: 'notify_level', type: 'int'},
        { name: 'place_name', type: 'string'},
        { name: 'place_id', type: 'int'},
        { name: 'paid_event', type: 'boolean' },
        { name: 'cost', type: 'string' },
        { name: 'has_limit', type: 'boolean' },
        { name: 'attendance_limit', type: 'int' },
        { name: 'thumb_url', type: 'string'},
        { name: 'icon', type: 'string' },
        { name: 'time_tag', type: 'string'},
        { name: 'place_raw', type: 'array'},
        { name: 'creator_id', type: 'int'},
        { name: 'creator_full_name', type: 'string'},
        { name: 'current_user_attending_status', type: 'int'},
        { name: 'attending_guests_count', type: 'int'},
        { name: 'maybe_guests_count', type: 'int'},
        { name: 'not_attending_guests_count', type: 'int'},
        { name: 'willing_guests_count', type: 'int'},
        { name: 'undecided_users_count', type: 'int'},
        { name: 'user_event_role', type: 'string'},
        { name: 'shortened_attending_guests_list', type: 'string'},
        { name: 'created_at', type: 'date', dateFormat: 'c'},
        { name: 'open_invitations', type: 'boolean'},
        { name: 'has_end_date', type: 'boolean'},
        { name: 'likes_count', type: 'int'},
        { name: 'comments_count', type: 'int'},
        { name: 'can_like', type: 'boolean'},
        { name: 'synchronize_calendar', type: 'boolean'}
    ],

    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/events"),
      format: 'json',
      reader: {
        type: 'json',
        root: 'records'
      }
    },

    getPosition: function() {
        var place = this.getPlaceFromRaw();
        return (new google.maps.LatLng(place.get('lat'), place.get('lng')));
    },

    getInfoWindow: function(list, index, map) {
        return "<p>" + Ext.util.Format.ellipsis(this.get('name'), 38) + "<br/>" + this.formattedAddress() + "</p>" +
        "<a onclick=\"Ext.getCmp('" + list.getId() + "').store.getAt(" + index + ").redirectToShow();\">"+ I18n.t("action.view_details_link") +"</a>"
    },

    getPlaceFromRaw: function() {
        return new App.models.Place(this.get('place_raw'));    
    },

    availableNotifyLevels: function(){ return [
        {value: 0, text: I18n.t('event.notify_level.private')},
        {value: 1, text: I18n.t('event.notify_level.my_network')},
        {value: 2, text: I18n.t('event.notify_level.my_network_plus_one')}
    ]},

    availableAttendingStatuses: function(){
        return (new App.models.EventGuest()).availableAttendingStatuses();
    },

    attendingStatusLabelForCurrentUser: function(){
        var label = I18n.t('support.select.prompt');
        Ext.each (this.availableAttendingStatuses(), function(item, index, allItems){if (item.value == this.get('current_user_attending_status')) label = item.text}, this);
        return label.toPurpleBold();
    },

    getAttendingOrMaybeCount: function(){        
        return this.get('attending_guests_count') + this.get('maybe_guests_count');
    },

    getUndecidedOrWillingCount: function(){
        return this.get('undecided_users_count') + this.get('willing_guests_count');
    },

    getLabelForAttendingGuests: function(){
       return I18n.tc('event.guest', {count: this.getAttendingOrMaybeCount()});
    },

    getLabelForPendingGuests: function(){
       return I18n.tc('event.pending_user', {count: this.getUndecidedOrWillingCount()});
    },

    formattedStartDate: function(){
       return this.get('start_date').format("l d/m/Y - H:i");
    },

    formattedStartDateWithoutTime: function(){
       return this.get('start_date').format("l, F j, Y");
    },    

    formattedEndDate: function(){
       return this.get('end_date').format("l d/m/Y - H:i");
    },

    formattedEndDateWithoutTime: function(){
       return this.get('end_date').format("l, F j, Y");
    },    

    formattedDates: function(){
       var res = this.formattedStartDate();
       if (this.get('has_end_date'))
        res += " - " + this.formattedEndDate(); 
       return res;
    },

    formattedDatesWithoutTime: function(){
       var res = I18n.t('event.actions.show.from')+" "+this.formattedStartDateWithoutTime();
       if (this.get('has_end_date'))
        res += " "+I18n.t('event.actions.show.to')+" " + this.formattedEndDateWithoutTime();
       return res;
    },

    formattedTimes: function(){
       var res = this.get('start_date').format("H:i");
       if (this.get('has_end_date'))
        res += " - " + this.get('end_date').format("H:i");
       return res;
    },

    formattedAddress: function(){
       return this.get('formatted_address').nl2br()
    },
    
    formattedAddressWithoutPlaceName: function(){
       return this.get('formatted_address_without_place_name').nl2br()
    },

    formattedCreatorName: function(){
       return (this.isOwnedBy(Profile.getCurrentUser()) ? I18n.t('support.myself') : this.get('creator_full_name'));
    },

    getMapIcon: function(){
       if ( Ext.isEmpty(this.data.icon) ) {
           return "images/icons/places/pin-export.png";
       } else {
           return "images/icons/places/" + this.data.icon;
       }
    },

    costToString: function(){
       return this.get('paid_event') ? this.get('cost') : I18n.t('event.actions.show.free_event');
    },

    availabilitiesToString: function(){
       return this.get('has_limit') ? (this.get('attending_guests_count') + "/" + this.get('attendance_limit')).toPurple() + " " + I18n.t('event.actions.show.availabilities') : I18n.t('event.actions.show.no_limits').toPurple() + " " + I18n.t('event.actions.show.for_this_event');
    },

    labelForTimeTag: function(){
       switch (this.data.time_tag)
       {
           case "today": return I18n.t('datetime.period_in_words.today');
           case "week": return I18n.t('datetime.period_in_words.in_week_time');
           case "month": return I18n.t('datetime.period_in_words.in_month_time');
           default: return I18n.t('datetime.period_in_words.in_future');
       }

    },

    isOwnedBy: function(user){
        return (this.get('creator_id') > 0 && this.get('creator_id') == user.getId());
    },

    attendanceListIsFull: function(){
        return (this.get('has_limit') && this.get('attending_guests_count') >= this.get('attendance_limit')); 
    },

    loadTimes: function(){
        this.set('start_time', double_digit(this.get('start_date').getHours())+":"+double_digit(this.get('start_date').getMinutes()));
        this.set('end_time', double_digit(this.get('end_date').getHours())+":"+double_digit(this.get('end_date').getMinutes()));
    },

    loadPlaceName: function(){
        this.set('place_name', this.get('place_raw').name);
    },

    participate_details_for_view: function(){
        var res = [];
        res.push({icon: "participate", type: "participate", name: I18n.t('event.actions.show.answer')+": "+this.attendingStatusLabelForCurrentUser(), value: "null"});
        return res;
    },

    availabilities_details_for_view: function(){
        var res = [];
        res.push({icon: "limit", type: "availabilities", name: this.availabilitiesToString(), value: "null"});
        return res;
    },

    place_details_for_view: function(){
        var res = [];
        res.push({icon: "events", type: "date", name: I18n.t('event.actions.show.date')+": "+this.formattedDatesWithoutTime(), value: "null"});
        res.push({icon: "time", type: "time", name: I18n.t('event.actions.show.time')+": "+this.formattedTimes(), value: "null"});
        return res;
    },

    creator_details_for_view: function(){
        var res = [];
        res.push({icon: "creator", type: "creator", name: I18n.t('event.actions.show.created_by')+": "+ this.get('creator_full_name').toPurple(), value: "null"});
        return res;
    },

    guests_details_for_view: function(){
        var res = [];
        res.push({icon: "network", type: "guests", name: this.getLabelForAttendingGuests(), value: "null"});
        if (this.isOwnedBy(Profile.getCurrentUser()))
            res.push({icon: "pending", type: "pending", name: this.getLabelForPendingGuests(), value: "null"});
        res.push({icon: "tips", type: "comments", name: App.getLabelForCommentsCount(this.get('comments_count')), value: "null"});
        return res;
    },

    updateStatusCountersByStatusChange: function(old_status,new_status){
        if (old_status != new_status) {
            var counter_name_for_old = (new App.models.EventGuest()).counterNameForStatus(old_status);
            var counter_name_for_new = (new App.models.EventGuest()).counterNameForStatus(new_status);
            this.set(counter_name_for_old, this.get(counter_name_for_old) - 1);
            this.set(counter_name_for_new, this.get(counter_name_for_new) + 1);
        }
    },

    processNotifyingAfterCreation: function(page, params) {
        var event = this;
        if (this.get("notify_level") === 0) {
            Ext.dispatch({
                controller: 'Share',
                action: 'index',
                historyUrl: 'Share/index',
                shareType: 'Event',
                shareObj: event,
                shareMethod: Tmo.Consts.SHARETYPE_SYSTEM
            });
        } else {
            Ext.dispatch({
                controller: 'Share',
                action: 'message',
                historyUrl: 'Events/show/' + event.getId(),
                shareType: 'Event',
                shareObj: event,
                shareMethod: Tmo.Consts.SHARETYPE_SYSTEM
            });
        }
    },

    tabsForEvents: function(){
        return [
            {search_scope: this.yoursEventsStatus(), text: I18n.t('event.tabs.yours')},
            {search_scope: this.networkEventsStatus(), text: I18n.t('event.tabs.network')},
            {search_scope: this.membersEventsStatus(), text: I18n.t('event.tabs.members')}
        ];
    },

    tabsForPlaceEvents: function(){
        return [
            {search_scope: this.yoursEventsStatus(), text: I18n.t('event.tabs.yours')},
            {search_scope: this.networkEventsStatus(), text: I18n.t('event.tabs.network')},
            {search_scope: this.membersEventsStatus(), text: I18n.t('event.tabs.members')}
        ];
    },

    redirectToShow: function() {
        Ext.dispatch({
            controller: 'Events',
            action: 'show',
            historyUrl: 'Events/show/' + this.getId(),
            event: this
        });
    },

    creatorEventsStatus: function(){ return "own"},
    allUserEventsStatus: function(){ return "user"},

    yoursEventsStatus: function(){ return "yours"},
    networkEventsStatus: function(){ return "network"},
    membersEventsStatus: function(){ return "members"},

    shareMessage: function(shareMethod)
    {
        var msg = "<???>";
        var method_key_t = Tmo.Consts.SHARETYPE_NAME_MAPPER[shareMethod];
        if (typeof(method_key_t) === 'string')
        {
            msg = I18n.t('event.long_share_message_' + method_key_t, {
                name: this.get('name'),
                category_name: this.get('category_name'),
                address: this.get('formatted_address'),
                date_of_event: this.formattedDates(),
                creator: this.get('creator_full_name'),
                user: Profile.getCurrentUser().getFullName()
            });
        }

        return msg;
    },

    shareTitle: function(shareMethod)
    {
        var msg = "<???>";
        var method_key_t = Tmo.Consts.SHARETYPE_NAME_MAPPER[shareMethod];
        if (typeof(method_key_t) === 'string')
        {
            msg = I18n.t('event.share_title_' + method_key_t, {
                full_name: Profile.getCurrentUser().getFullName(),
                app_name: Tmo.settings.app_name
            });
        }

        return msg;
    },

    shareName: function() {
      return I18n.t('event.share_title_facebook', {
          event_name: this.get('name')
      })
    },

    sharePicture: function() {
      return (Ext.isEmpty(this.get('thumb_url'))) ? TmoConfig.server+"/assets/thumb_missing.png" : this.get('thumb_url');
    },

    toFacebookMessage: function() {
        return I18n.t('event.long_share_message_facebook', {
            name: this.get('name'),
            category_name: this.get('category_name'),
            description: this.get('description'),
            address: this.get('formatted_address'),
            date_of_event: this.formattedDates(),
            creator: this.get('creator_full_name')
        });
    },

    shareDescription: function() {
        return "";
    },

    toTwitterMessage: function(msg) {
        var text = I18n.t('event.long_share_message_twitter', {
            name: this.get('name'),
            date_of_event: this.formattedDates()
        });
        return text.trunc(140);
    },

    synchronizeWithCalendar: function() {
        if (Ext.is.iOS) {
            window.plugins.calendarPlugin.createEvent(
                this.get('name'),
                this.getPlaceFromRaw().get('name'),
                this.get('description'),
                Tmo.Utils.fDbDate(this.get('start_date')),
                Tmo.Utils.fDbDate(this.get('end_date')),
                I18n.t('event.ios_plugin.confirmation_text'),
                I18n.t('event.ios_plugin.confirmation_button')
            );
        }
    }
});


App.models.EventCategory = Ext.regModel('EventCategory', {
  fields: [
    { name: 'id', type: 'int' },
    { name: 'name', type: 'string' }
  ]
});