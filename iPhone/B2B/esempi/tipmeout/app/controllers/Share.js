Ext.regController('Share', {

    beforeFilter: function() {
        return Profile.requireUser();
    },

    // index action
    index: function(options) {
        Tmo.BackButton.isSubPath(options);
        var storeFilter = Tmo.storeFilters.users;
        storeFilter.set('apply_notification_settings', "true");
        storeFilter.set('share_obj', [options.shareType,options.shareObj.getId()]);
        storeFilter.filter(function(){
            storeFilter.unregisterProperty('apply_notification_settings');
            storeFilter.unregisterProperty('share_obj');
        });
        this.renderPage('index', options, {
                shareType: options.shareType,
                shareObj: options.shareObj,
                shareMethod: options.shareMethod,
                users: options.users,
                groups_ids: options.groups_ids });
    },

    groups: function(options){
        Tmo.BackButton.isSubPath(options);
        this.renderPage('groups', options, {
                shareType: options.shareType,
                shareObj: options.shareObj,
                shareMethod: options.shareMethod,
                users: options.users,
                groups_ids: options.groups_ids });
    },

    // index action
    message: function(options) {
        Tmo.BackButton.isSubPath(options);
        this.renderPage('message', options, {
                shareType: options.shareType,
                shareObj: options.shareObj,
                shareMethod: options.shareMethod,
                users: options.users                        
        });
    },

    //create share - event or place
    create: function(options) {
        var page = this;

        var tmoShareFn = function() {
            Server.request('POST', '/notifications/shares', {
                loadMask: true,
                params: Server.toRailsParams('share', options.params),
                success: function(record, operation) {
                    var typeNameFn = function(type) {
                        switch (options.params.type)
                        {
                           case "Event": return "event";
                           case "Place": return "place";
                           case "Tip": return "tip";
                           case "Picture": return "picture";
                           default: return "object";
                        }
                    };
                    Ext.Msg.alert(I18n.t('support.success'), I18n.t('support.just_shared_'+typeNameFn( options.params.type )), function() {
                        Tmo.BackButton.clearSubPaths();
                        if (Profile.getCurrentUser().get('show_connect')) {
                            Ext.dispatchBack({
                                controller: 'Session',
                                action: 'connect',
                                historyUrl: 'Session/connect',
                                showRecallCheckbox: true,
                                existingUser: true
                            })
                        }
                        else if (typeNameFn( options.params.type ) == "event") {
                            Ext.dispatchBack({
                                controller: 'Events',
                                action: 'index',
                                historyUrl: 'Events/index',
                                backLabel: true
                            })
                        } else {
                            Ext.dispatch(Tmo.BackButton.last());
                        }
                    });
                },
                failure: function(record, operation) {
                }
            });
        };

        var twitterShareConditionFn = function() {
            if (options.params.post_on_twitter == 1) {
                var twitterCallback = function() {
                    tmoShareFn();
                };

                Tmo.Adapters.twitter.tweet(options.shareObj.toTwitterMessage(options.params.body), twitterCallback, twitterCallback);
            } else {
                tmoShareFn();
            }
        };
        var twitterShareCallback = function() {
            twitterShareConditionFn();
        };

        if ( options.params.post_on_facebook == 1 ) {
            Tmo.Adapters.facebook.postObjectToWall(options.params.body, options.shareObj, twitterShareCallback, twitterShareCallback);
        } else {
            twitterShareConditionFn();
        }
    }
});