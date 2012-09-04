Ext.regController('CheckIns', {

    beforeFilter: function() {
        return Profile.requireUser();
    },
    
    index: function(options)
    {
        var storeFilter = Tmo.storeFilters.users;
        storeFilter.set('place_id', options.place.getId());
        storeFilter.filter(function(){
            storeFilter.unregisterProperty('place_id');
        });
        this.renderPage('index', options, {place: options.place});
    },

    create: function(params)
    {
      Server.request('POST', '/check_ins', {
        params: Server.toRailsParams('check_in', params.form.getValues()),
        success: function(result) {
            Tmo.LoadMask.hide();
            var check_in = Ext.ModelMgr.create(result.records[0], 'CheckIn');
            params.place.set('friends_at_place_count', params.place.get('friends_at_place_count')+1);
            check_in.set('place', params.place);
            check_in.publishOnSocialsNetworks();
        },
        failure: function(result) {
            Tmo.LoadMask.hide();
            params.form.showErrors(result);
            Ext.Msg.alert(I18n.t('support.create_failed'));
        }
      });
    },

    new_form: function(options)
    {
        Tmo.BackButton.isSubPath(options);

        var config = {
            place: options.place,
            check_in: Ext.ModelMgr.create({
                note: I18n.t("check_in.default_note", {place_name: options.place.shareName()}),
                place_id: options.place.getId(),
                post_on_facebook: Profile.getCurrentUser().get('default_post_on_facebook'),
                post_on_twitter: Profile.getCurrentUser().get('default_post_on_twitter')
            }, "CheckIn")
        };
        this.renderPage('new_form', options, config);
    }

});