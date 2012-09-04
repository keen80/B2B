App.views.GroupsUser = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar, manageGroupsButton;
        var profileTpl;
        var viewInstance = this;

        this.changed = !!this.force_user_reload; //true or false -> false by default

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            title: I18n.t('user.groups.header'),
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        manageGroupsButton = {
            xtype: 'button',
            text: I18n.t('user.groups.manage_groups_link'),
            handler: this.onManageGroupsAction,
            scope: this
        };

        var manageGroupsContainer = new Ext.Container({
            cls: 'overview_buttons',
            items: [manageGroupsButton]
        });

        var fields = {
            cls: 'groups_fieldset',
            xtype: 'fieldset',
            defaults: {
                cls: 'x-field-label-white'
            },
            items: []
        };

        Ext.each(App.stores.groups.data.items, function(item, index, allItems) {

            var current_user_group_ids = _.map(viewInstance.user.data.current_user_group_ids.split(','), function(item) { return parseInt(item) });
            
            var checkbox = {
                xtype: 'tmo_checkbox',
                name : item.data.id + '_group',
                label: item.data.name,
                value: item.data.id,
                checked: _.include(current_user_group_ids, item.data.id),
                onChange: function() {
                    viewInstance.changed = true;
                    Server.request('POST', '/groups/' + item.data.id + '/switch', {
                        params: { user_id: viewInstance.user.getId(), value: this.isChecked() },
                        success: function(result) {
                            Tmo.storeFilters.users.dirty = true;
                        }
                    });
                }
            };
            
            fields.items.push(checkbox);
        });

        var profileContent = new Ext.Container({

            items: [
                App.headers.render('groups/user/header', this.user.data),
                fields,
                manageGroupsContainer
            ]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {

            scroll: 'vertical',
            dockedItems: [titleBar],
            items: [ profileContent ]
        });

        App.views.GroupsUser.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onManageGroupsAction: function() {
        Ext.dispatch({
            controller: 'Groups',
            action: 'manage',
            historyUrl: 'Groups/manage/' + this.user.getId(),
            user_id: this.user.getId(),
            user: this.user
        });
    }
    
});

Ext.reg('GroupsUser', App.views.GroupsUser);