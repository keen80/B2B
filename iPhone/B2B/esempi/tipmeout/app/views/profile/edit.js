App.views.ProfileEdit = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var viewInstance = this;
        var user = this.user;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            title: I18n.t('profile.actions.edit.edit_profile_header'),
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        var profileList = App.profileDetailsList(
            user.profile_details_for_view(),{id: 'profile_details_list', listeners: { selectionchange: { fn: viewInstance.onShowAction, scope: this }}}
        );

        var profileContainer = new Ext.Container({
            items: [profileList]
        });

        var profileContent = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            id: "profile_content_container",
            items: [
                App.headers.render('profile/show/header', this.user.data),
                profileContainer
            ]
        });


        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            scroll: 'vertical',
            id: 'profile_edit_card',
            dockedItems: [titleBar],
            items: [profileContent]
        });

        App.views.ProfileEdit.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowAction: function(sel, records) {
        if (records[0] !== undefined) {
            var row = records[0];
            var action = 'edit_form_' + row.data.type;
            Ext.dispatch({
                controller: 'Profile',
                action: action,
                historyUrl: 'Profile/' + action
            });
        }
    }
    
});

Ext.reg('ProfileEdit', App.views.ProfileEdit);