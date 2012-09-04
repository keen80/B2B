Ext.regController('Messages', {

    // index action
    index: function(options) {
        App.stores.messages.removeAll();
        App.stores.messages.loadPage(1);
        this.renderPage('index', options);
    },


    // show action
    show: function(options) {
        var page = this;
        var id = options.id || options.message_id;

        App.models.Message.load(id, {
            failure: function(record) {Ext.Msg.alert(I18n.t('support.fetch_failed'));},
            success: function(record, operation) {
                Profile.updateAttributes({unread_count: record.data.unread_count});
                App.setBadge(record.data.unread_count);
                Ext.getCmp('profile_tab_button').setBadge(record.data.unread_count);
                page.renderPage('show', options, {message: record});
            }
        });
    },

    // destroy action
    destroy: function(options) {
        Tmo.BackButton.clearCurrentConfig();
        var page = this;
        if (options.params.action_id === 3) {
            Server.request('POST', '/notifications/invitations/' + options.params.id, {
                params: {"_method": "put"},
                success: function(record, operation) {
                    Ext.dispatch({
                        controller: 'Messages',
                        action: 'index',
                        historyUrl: 'Messages/index'
                    });

                },
                failure: function(record, operation) {
                    Ext.Msg.alert( I18n.t('support.failure'), I18n.t('support.something_went_wrong'));
                }
            });
        } else if (options.params.action_id === 10) {
          Server.request('POST', '/places/' + options.params.place_id + '/bookmark.json', {
            loadMask: true,
            params: {bookmark: 'createPlaceBookmark', msg_id: options.params.id},
              success: function(record, operation) {
                  Ext.dispatch({
                      controller: 'Messages',
                      action: 'index',
                      historyUrl: 'Messages/index'
                  });
              },
              failure: function(record, operation) {
                  Ext.Msg.alert( I18n.t('support.failure'), I18n.t('support.something_went_wrong'));
              }
          });

        } else {
            Server.request('POST', '/notifications/messages/' + options.params.id, {
                params: {"_method": "delete"},
                success: function(record, operation) {
                    Ext.dispatch({
                        controller: 'Messages',
                        action: 'index',
                        historyUrl: 'Messages/index'
                    });
                },
                failure: function(record, operation) {
                    Ext.Msg.alert(I18n.t('support.failure'), I18n.t('support.something_went_wrong'));
                }
            });
        }

    }
});
