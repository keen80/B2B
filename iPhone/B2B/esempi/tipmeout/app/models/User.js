App.models.User = Ext.regModel('User', {
    
    hasMany: {
        model: 'RelationshipDetail',
        name: 'relationship_details'
    },

    fields: [
        { name: 'id', type: 'int' },
        { name: 'email', type: 'string' },
        { name: 'facebook_id', type: 'int' },
        { name: 'twitter_id', type: 'int' },
        { name: 'first_name', type: 'string' },
        { name: 'last_name', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'tel', type: 'string' },
        { name: 'birthday', type: 'date', dateFormat: 'c' },
        { name: 'twitter_username', type: 'string' },
        { name: 'facebook_username', type: 'string' },
        { name: 'current_user_group_ids', type: 'string' },
        { name: 'primary_group_name_for_current_user', type: 'string' },
        { name: 'thumb_url', type: 'string' },
        { name: 'marker_url', type: 'string' },
        { name: 'is_my_friend', type: 'boolean' },
        { name: 'is_my_pending_friend', type: 'boolean' },
        { name: 'addresses_count', type: 'int' },
        { name: 'mutual_addresses_count', type: 'int' },
        { name: 'contact_type', type: 'string' },
        { name: 'locale_code', type: 'string' },
        { name: 'show_my_place_of_living', type: 'boolean' },
        { name: 'show_my_interests', type: 'boolean' },
        { name: 'show_my_job', type: 'boolean' },
        { name: 'show_connect', type: 'boolean' },
        { name: 'show_my_network', type: 'boolean' },
        { name: 'show_my_addresses', type: 'boolean' },
        { name: 'show_my_position_on_map', type: 'boolean' },
        { name: 'receive_notifications_via_explore', type: 'boolean' },
        { name: 'default_post_on_facebook', type: 'boolean' },
        { name: 'default_post_on_twitter', type: 'boolean' },
        { name: 'has_shared_obj_text', type: 'string' },
        { name: 'employment_status_id', type: 'int' },

        { name: 'check_in_id', type: 'int' },
        { name: 'check_in_date', type: 'date', dateFormat: 'c' },
        { name: 'check_in_place_id', type: 'int' },
        { name: 'check_in_creator_id', type: 'int' },
        { name: 'check_in_name', type: 'string' },
        { name: 'check_in_address', type: 'string' },
        { name: 'check_in_number', type: 'string' },
        { name: 'check_in_locality', type: 'string' },
        { name: 'check_in_lng', type: 'float' },
        { name: 'check_in_lat', type: 'float' },

        { name: 'relationship_status_name', type: 'string' },
        { name: 'relationship_employment_name', type: 'string' },
        { name: 'user_detail_profession_company', type: 'string' },
        { name: 'user_detail_profession_industry', type: 'string' },
        { name: 'user_detail_school_label', type: 'string' },
        { name: 'user_detail_club_label', type: 'string' },
        { name: 'user_detail_interest_label', type: 'string' },
        { name: 'user_detail_residences_list', type: 'string' },
        { name: 'unread_count', type: 'int' }
    ],

    proxy: {
        type: 'railsrest',
        url: Server.apiUrl("/networks"),
        format: 'json',
        reader: {
            type: 'json',
            root: 'records'
        }
    },

    getPosition: function() {
        return (new google.maps.LatLng(this.get('check_in_lat'), this.get('check_in_lng')));
    },

    getInfoWindow: function(list, index, map) {
        return "<p>" + this.getFullName() + "<br/>" + this.formattedAddressForInfoWindow(list, index) + "</p>" +
        "<a onclick=\"Ext.getCmp('" + list.getId() + "').store.getAt(" + index + ").redirectToShow();\">"+ I18n.t("network.actions.index.show_profile") +"</a>" +
        "<p>" + this.relativeLastCheckInDate() + "</p>"
    },

    formattedAddressForInfoWindow: function(list, index){
       return "<a onclick=\"Ext.getCmp('" + list.getId() + "').store.getAt(" + index + ").redirectCheckInPlace();\">" + "@" + this.get('check_in_name') + "</a>" + "<br/>" + formatAddress(this.get('check_in_address'), this.get('check_in_number')) + ", " + this.get('check_in_locality');
    },

    formattedAddress: function(){
       return "@" + this.get('check_in_name') + "<br/>" + formatAddress(this.get('check_in_address'), this.get('check_in_number')) + ", " + this.get('check_in_locality');
    },

    relativeLastCheckInDate: function() {
        return Tmo.Utils.toRelativeTime( this.get('check_in_date'));
    },
    
    getMapIcon: function(){
       if ( Ext.isEmpty(this.get('marker_url')) ) {
           return "images/system/marker_missing.png";
       } else {
           return this.get('marker_url');
       }
    },

    redirectToShow: function() {
        Ext.dispatch({
            controller: 'Network',
            action: 'show',
            historyUrl: 'Network/show/' + this.getId(),
            user_id: this.getId()
        });
    },

    redirectCheckInPlace: function() {
        Ext.dispatch({
            controller: 'Places',
            action: 'show',
            historyUrl: 'Places/show/' + this.get('check_in_place_id'),
            place_id: this.get('check_in_place_id')
        });
    },

    getFullName: function()
    {
        return this.get("first_name") + " " + this.get("last_name");
    },

    getFullNameWithTel: function()
    {
        return this.getFullName() + ' ('+ this.get('tel') +')';
    },

    isCurrentUser: function()
    {
        return Profile.getCurrentUser().getId() == this.getId();
    },

    formatedBirthday: function(){
       return (this.get('birthday') ? I18n.strftime(this.get('birthday'), "%d/%m/%Y") : '');
    },

    getConnectUserAsText: function(){
       return this.getFullName() + ' ' + this.get('email');
    },

    createUserDetailsStore: function()
    {
        return new Ext.data.Store({
            model: "RelationshipDetail",
            id: 'user_details_store',
            data: this.data.relationship_details,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: false
        });
    },

    hasPhoneEnabled: function()
    {
        return !Ext.isEmpty(this.get('tel'));
    },
    hasSmsEnabled: function()
    {
        return this.hasPhoneEnabled();
    },
    hasEmailEnabled: function()
    {
        return !Ext.isEmpty(this.get('email'));
    },
    hasFacebookEnabled: function()
    {
        return this.get('facebook_id') != 0;
    },
    hasTwitterEnabled: function()
    {
        return !Ext.isEmpty(this.get('twitter_username'));
    },
    phoneHref: function()
    {
        return !this.hasPhoneEnabled() ? null : ( "tel:" + this.get('tel') );
    },
    smsHref: function()
    {
        return !this.hasSmsEnabled() ? null : ( "sms:" + this.get('tel') );
    },
    emailHref: function()
    {
        return !this.hasEmailEnabled() ? null : ( "mailto:" + this.get('email') );
    },
    facebookHref: function()
    {
        return !this.hasFacebookEnabled() ? null : ( "http://m.facebook.com/profile.php?id=" + this.get('facebook_id') );
    },
    twitterHref: function()
    {
        return !this.hasEmailEnabled() ? null : ( "http://mobile.twitter.com/" + this.get('twitter_username') );
    },
    getOptionsForGender: function() {
        return [ {text: I18n.t('select.male'),  value: 'male'}, {text: I18n.t('select.female'), value: 'female'} ]
    },
    mutualStatus: function(){ return "mutual" },
    othersStatus: function(){ return "others" },
    tabsForMutualOthers: function(){
        return [
            {search_scope: this.mutualStatus(), text: I18n.t('select.mutual')},
            {search_scope: this.othersStatus(), text: I18n.t('select.others')}
        ];
    },
    settings_details_for_view: function(){
        var res = [];
        res.push({icon: "network", type: "connect", name: I18n.t('settings.actions.index.connect_link'), value: "null"});
        res.push({icon: "notifications", type: "notifications", name: I18n.t('settings.actions.index.notifications_link'), value: "null"});
        res.push({icon: "confidentiality", type: "confidentiality", name: I18n.t('settings.actions.index.confidentiality_link'), value: "null"});
        res.push({icon: "checkin", type: "checkin", name: I18n.t('settings.actions.index.checkin_link'), value: "null"});
        res.push({icon: "language", type: "language", name: I18n.t('settings.actions.index.language_link'), value: "null"});
        return res;
    },
    profile_details_for_view: function(){
        var res = [];
        res.push({icon: "profile", type: "basic", name: I18n.t('user.relationship_details.live_in'), value: "null"});
        res.push({icon: "residences", type: "residences", name: I18n.t('profile.actions.edit.residences'), value: "null"});
        res.push({icon: "clubs", type: "clubs", name: I18n.t('profile.actions.edit.clubs'), value: "null"});
        res.push({icon: "education", type: "education", name: I18n.t('profile.actions.edit.education'), value: "null"});
        res.push({icon: "profession", type: "profession", name: I18n.t('profile.actions.edit.profession'), value: "null"});
        res.push({icon: "interests", type: "interests", name: I18n.t('profile.actions.edit.interests'), value: "null"});
        return res;
    },        
    hasSharedObject: function(){
        return (this.get('has_shared_obj_text').length > 0);
    },

    itIsMe: function()
    {
        return this.getId() == Profile.getCurrentUser().getId();
    },

    primaryGroupNameForCurrentUserText: function()
    {
        if (this.get('is_my_friend'))
            return this.get('primary_group_name_for_current_user') || I18n.t('network.actions.show.no_group_message');
        else
            return null
    }
});


Ext.regModel('Sender', {
    extend: 'User'
});