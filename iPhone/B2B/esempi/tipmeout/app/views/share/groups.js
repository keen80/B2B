App.views.ShareGroups = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, selectButton, titleBar;
        var viewInstance = this;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton(null, function(){Tmo.BackButton.last().users = viewInstance.users;});

        selectButton = {
            xtype: 'button',
            text: (I18n.t('action.select_link')),
            handler: this.onSelectAction,
            ui: 'action',
            scope: this
        };

        var selectGroupsContainer = new Ext.Container({
            cls: 'overview_buttons',
            items: [selectButton]
        });

        titleBar = {
            dock: 'top',
            title: (this.shareType === 'Event' ? I18n.t('messages.links.event_share_link') : I18n.t('messages.links.other_share_link') ),
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        var fields = {
            id: "groups_checkboxes",            
            cls: 'groups_fieldset',
            xtype: 'fieldset',
            defaults: {
                labelWidth: 'auto',
                cls: 'x-field-label-white'
            },
            items: []
        };

        Ext.each(App.stores.groups.data.items, function(item, index, allItems) {

            var checkbox = new App.views.Checkbox({
                name : item.data.id + '_group',
                label: item.data.name,
                value: item.data.id,
                checked: _.include(viewInstance.groups_ids, item.data.id)
            });
            
            fields.items.push(checkbox);
        });

        var profileContent = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                fields,
                selectGroupsContainer
            ]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            scroll: 'vertical',
            dockedItems: [titleBar],
            items: [ profileContent ]
        });

        App.views.ShareGroups.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onSelectAction: function() {
        Tmo.LoadMask.show();
        var storeFilter = Tmo.storeFilters.users;
        var selected_groups_ids = [];
        var unselected_groups_ids = [];
        var users = this.users || [];

        Ext.each(Ext.getCmp("groups_checkboxes").items.items, function(checkbox){
            if (checkbox.isChecked())
                selected_groups_ids.push(parseInt(checkbox.value));
            else
                unselected_groups_ids.push(parseInt(checkbox.value));
        });

        storeFilter.clear();
        storeFilter.set('search_scope', 'my');
        storeFilter.set('group_id', (selected_groups_ids.length > 0 ? selected_groups_ids : 0));
        storeFilter.filter(function(){
            users = _.union(users, App.stores.users.data.items);
            storeFilter.set('group_id', (unselected_groups_ids.length > 0 ? unselected_groups_ids : 0));
            storeFilter.filter(function(){
                var res = [];
                var ids = Ext.pluck(App.stores.users.data.items,'internalId');
                Ext.each(users,function(record){
                    if (_.indexOf(ids,record.internalId) == -1) {
                        res.push(record);
                    }
                });
                users = res;
                Tmo.BackButton.last().groups_ids = selected_groups_ids;
                Tmo.BackButton.last().users = users;
                storeFilter.clear();
                Tmo.BackButton.config_callback = function(){};
                Tmo.BackButton._onBackUse();
            });
        });
    }
    
});

Ext.reg('ShareGroups', App.views.ShareGroups);