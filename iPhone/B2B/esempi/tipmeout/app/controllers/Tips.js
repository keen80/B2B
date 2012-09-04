Ext.regController('Tips', {

    beforeFilter: function() {
        return Profile.requireUser();
    },

    show: function(options) {
        var page = this;
        Server.request('GET', '/tips/' + options.id, {
            params: { user_id: options.user_id || options.user.getId() },
            success: function(result) {
                page.renderPage('show', options, {                    
                    user: options.user,
                    tip: Ext.ModelMgr.create(result.tip, "Tip"),
                    tipObj: options.tipObj,
                    tipObjFor: options.tipObjFor
                });
            },
            failure: function(result) {Ext.Msg.alert(I18n.t('support.fetch_failed'));}
        });
    },

    edit: function(options) {
        Tmo.BackButton.isSubPath(options);
        this.renderPage('edit', options, {
            user: options.user,
            tip: options.tip,
            tipObj: options.tipObj,
            tipObjFor: options.tipObjFor
        });
    },

    create: function(params) {
        var page = this;

        Server.request('POST', '/tips', {
            params: Server.toRailsParams('tip', params.form.getValues()),
            success: function(result) {
                Tmo.storeFilters.places.dirty = true;
                Tmo.Utils.inc(params.place, 'tips_count');
                params.place.redirectToShow();
            },
            failure: function(result) {
                params.form.showErrors(result);
                Ext.Msg.alert(I18n.t('support.create_failed'));
            }
        });
    },

    update: function(params) {
        var page = this;

        Server.request('POST', '/tips/' + params.tip.getId(), {
            params: Ext.Object.merge(
                Server.toRailsParams('tip', params.form.getValues()),
                {_method: "put"}
            ),
            success: function(result) {
                Ext.dispatchBack({
                    controller: 'Tips',
                    action: 'show',
                    historyUrl: 'Tips/show/' + params.tip.getId(),
                    id: params.tip.getId(),
                    user: params.user,
                    user_id: params.tip.get('rater_id'),
                    tipObj: params.tipObj,
                    tipObjFor: params.tipObjFor
                });
            },
            failure: function(result) {
                params.form.showErrors(result);
                Ext.Msg.alert(I18n.t('support.update_failed'));
            }
        });
    },

    like: function(options) {
        var tip = options.params.tip;
        Server.request('POST', '/likes', {
            params: Server.toRailsParams('like', {id: tip.getId(), type: 'Tip'}),
            success: function(result) {
                tip.set('likes_count', result.likes_count);
                tip.set('can_like', false);
                options.params.views.tipContainer.tip = tip;
                options.params.views.tipContainer.update(tip);
                Ext.getCmp("tip_container").fireEvent('beforedestroy');
                Ext.getCmp("tip_container").fireEvent('afterrender');
                Tmo.LoadMask.hide();
            },
            failure: function(result) {
                Tmo.LoadMask.hide();
                Ext.Msg.alert(result.error);
            }
        });
    },

    destroy: function(options) {
        Tmo.BackButton.clearCurrentConfig();
        var tip = options.params.tip;
        var user = options.params.user;

        Server.request('POST', '/tips/' + tip.getId(), {
            params: {_method: 'delete'},
            success: function(result) {

                if (options.params.tipObjFor === 'place')
                {
                    Tmo.storeFilters.places.dirty = true;
                    Tmo.Utils.dec(options.params.tipObj, 'tips_count');
                    Ext.dispatch(Tmo.BackButton.last()); 
                }
                else
                {
                    Ext.dispatch(Tmo.BackButton.last()); 
                }
            },
            failure: function(result) {
            }
        });
    },

    filter: function() {
        this.renderPage('filter');
    },

    // new event (details) action
    form: function(options) {
        Tmo.BackButton.isSubPath(options);
        this.renderPage('form_new', options, {xtype: 'TipsNewForm', tip: new App.models.Tip(), place: options.place});
    }
});