Ext.regController('Profile', {

    beforeFilter: function() {
        return Profile.requireUser();
    },

    show: function(options) {
        var page = this;
        Server.request('GET', '/profile', {
            params: {},
            success: function(result) {
                Profile.updateAttributes({unread_count: result.user.unread_count});
                App.setBadge(result.user.unread_count);
                Ext.getCmp('profile_tab_button').setBadge(result.user.unread_count);
                page.renderPage('show', options, {
                    user: Ext.ModelMgr.create(result.user,'User')
                });
            },
            failure: function(result) {
                Ext.Msg.alert(I18n.t('support.fetch_failed'));
            }
        });
    },

    save: function(params)
    {
        var values = params.form.getValues();

        // fix toJSON for date
        if (values && values.birthday) {
            values.birthday.setMinutes(values.birthday.getMinutes() - values.birthday.getTimezoneOffset());
        }
 
        var requestParams = Server.toRailsParams('user', values);
        requestParams['_method'] = 'PUT';

        Server.request('POST', '/profile', {
            params: requestParams,
            success: function(result) {
                Tmo.LoadMask.hide();
                Profile.setCurrentUser(result);
                Ext.Msg.alert(I18n.t('profile.actions.update.success'), null, function(){
                    Ext.dispatch(Tmo.BackButton.last());
                });
            },
            failure: function(result) {
                Tmo.LoadMask.hide();
                params.form.showErrors(result);
                Ext.Msg.alert(I18n.t('support.save_failed'));
            }
        });
    },

    edit: function(options)
    {
        this.renderPage('edit', options, {user: Profile.getCurrentUser()});
    },

    edit_form_basic: function(options)
    {
        Tmo.BackButton.isSubPath(options);
        this.renderPage('edit_form_basic', options);
    },

    edit_form_residences: function(options)
    {
        this.nested_form_page("UserDetail::Residence", 'edit_form_residences', options);
    },

    edit_form_clubs: function(options)
    {
        this.nested_form_page("UserDetail::Club", 'edit_form_clubs', options);
    },

    edit_form_education: function(options)
    {
        this.nested_form_page("UserDetail::School", 'edit_form_education', options);
    },
    
    edit_form_profession: function(options)
    {
        this.nested_form_page("UserDetail::Profession", 'edit_form_profession', options);
    },

    edit_form_interests: function(options)
    {
        this.nested_form_page("UserDetail::Interest", 'edit_form_interests', options);
    },

    nested_form_page: function(class_name, xtype, options)
    {
        var page = this;
        var store = Tmo.storeFilters.user_details;
        store.set("user_id", Profile.getCurrentUser().getId());
        store.set("type", class_name);
        store.filter(function(){
            Tmo.BackButton.isSubPath(options);
            page.renderPage(xtype, options);
        });
    }

});