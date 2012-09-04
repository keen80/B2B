App.views.NetworkShowPeople = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */
        var backButton, titleBar;
        var usersListTpl, usersList;
        var viewInstance = this;
        var filterBar = FilterBar(this, Tmo.storeFilters.peopleNetwork, this.onScopeChanged, {}, (new App.models.User()).tabsForMutualOthers());

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        /* --- view types --- */

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },
            items: [ backButton ]
        };

        /* --- content tpl --- */

        usersListTpl = new Ext.XTemplate(
            '<div class="global_list">',
            '<div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.thumb_url)]})"></div>',
            '<div class="name">{first_name} {last_name}</div>',
            '  <div class="grey">',
            '    {addresses_count:this.get_addresses_count} {mutual_addresses_count:this.get_mutual_count}',
            '  </div>',
            '</div>',
            {
                get_addresses_count: function(count) {
                    return I18n.t('user.relationship_details.addresses_with_count', {count: count}).toLowerCase();
                },
                get_mutual_count: function(count) {
                    return (count > 0) ? '('+I18n.t('network.mutual', {count: count}).toLowerCase()+')' : '';
                }
            }
        );

        usersList = new Ext.List({
            flex: 1,
            plugins: [
                new Tmo.PaginationListPlugin()
            ],
            itemTpl: usersListTpl,
            store: App.stores.peopleNetwork,
            listeners: {
                selectionchange:
                {
                    fn: this.onShowAction
                }
            }
        });

        /* --- content map tpl --- */

        var usersContent = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [ usersList ]
        });

        /* --- create ------------------------------------------------------------------------------ */

        var dockedItems = [titleBar, App.headers.render('profile/shared/header', this.user)];

        //if not current user then it can display filter bar
        if (!this.user.isCurrentUser()) {
            dockedItems.push( filterBar.getBar() );
        }

        Ext.apply(this, {
            layout: 'card',
            dockedItems: dockedItems,
            items: [usersContent]
        });

        App.views.NetworkShowPeople.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowAction: function(sel, records) {
        if (records[0] !== undefined) {
            var row = records[0];
            Ext.dispatch({
                controller: 'Network',
                action: 'show',
                historyUrl: 'Network/show/' + row.getId(),
                id: row.getId()
            });
        }
    },

    onScopeChanged: function(view, filter, scope) {
        filter.set('user_id', view.user.getId());
        filter.set('search_scope', scope);
        filter.filter();
    }
});

Ext.reg('NetworkShowPeople', App.views.NetworkShowPeople);