Ext.regController('Dashboard', {

    beforeFilter: function() { return Profile.requireUser(); },

    // index action
    index: function(options) {
        var self = this;
        var render_view = function(action, result) {
            self.renderPage(action,options, {resources_count: result});
        };

        var redirect_to_default = function(){
            Ext.dispatch({
                controller:'Places',
                action:'index',
                historyUrl:'Places/index'
            });
        };

        Server.request('GET', '/dashboard.json', {
            loadMask: true,
            params:{},
            success: function(result) {
                if (Tmo.isVersionOutOfDate(result.version)) {
                    redirect_to_default();
                    Tmo.showAppOutOfDatePopup();
                } else if (result.show_intro) {
                    Profile.hideTabBar();
                    render_view('intro', result);
                } else {
                    redirect_to_default();
                    Tmo.Adapters.PushNotification.init(function(device_info) {
                        Tmo.Adapters.PushNotification.register(device_info, function() {});
                    });

                    if (result.show_push_notification_policy) {
                        Ext.Msg.show({
                            title: I18n.t("push_notification.policy_title"),
                            msg: I18n.t("push_notification.policy"),
                            defaultTextHeight: 140,
                            buttons: [
                                {text: I18n.t('push_notification.policy_yes')},
                                {text: I18n.t('push_notification.policy_no')}
                            ],
                            fn: function(e)
                            {
                                var policy_choice = 0;
                                if ( e === I18n.t('push_notification.policy_yes') ) {
                                    policy_choice = 1;
                                }

                                Server.request('POST', '/api/push_notifications/policy', {
                                    params: {
                                        policy: policy_choice
                                    },
                                    success: function() {
                                        var current_user = Profile.getCurrentUser();
                                        current_user.data.use_pn_addresses = true;
                                        current_user.data.use_pn_events = true;
                                        current_user.data.use_pn_network = true;
                                        current_user.data.use_pn_other = true;
                                        current_user.data.use_push_notifications = true;
                                        Profile.setCurrentUser(current_user.data);
                                    },
                                    failure: Ext.emptyFn
                                });
                            }
                        });
                    } else {
                        if (window.delayedOnMessage) {
                            window.delayedOnMessage();
                        }
                    }
                }
            },
            failure: function(result) {}
        });
    }

});