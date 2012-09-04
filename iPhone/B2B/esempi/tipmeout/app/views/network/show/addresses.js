App.views.NetworkShowAddresses = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */
        var backButton, titleBar, filterButton;
        var placesListTpl, placesList;
        var viewInstance = this;
        var storeFilter = Tmo.storeFilters.places;
        var filterBar = FilterBar(this, storeFilter, this.onScopeChanged, {}, (new App.models.User()).tabsForMutualOthers());

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        filterButton = {
            text: I18n.t('action.filter_link'),
            id: 'filter_places_bt',
            hidden: Ext.isEmpty( storeFilter.get('category_id') ),
            handler: this.onFilterAction,
            ui: 'action',
            scope: this
        };

        /* --- view types --- */

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            centered: true,
            cls: 'centered-buttons',
            layout: {
                pack: 'center'
            },
            defaults: {
                iconMask: true
            },
            items: [ backButton, filterButton ]
        };

        /* --- content tpl --- */

        placesListTpl = new Ext.XTemplate(
            '<div class="global_list">',
                '<div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.thumb_url)]})"></div>',
                '<div class="name">{name}</div>',
                '<div class="grey">{postal_code} {locality} - {main_category_name}</div>',
            '</div>'
        );

        placesList = new Ext.List({
            flex: 1,
            plugins: [
                new Tmo.PaginationListPlugin()
            ],
            itemTpl: placesListTpl,
            store: App.stores.places,
            listeners: {
                selectionchange:
                {
                    fn: this.onShowAction,
                    scope: this
                }
            }
        });

        /* --- content map tpl --- */

        var placesCategories = App.createPlaceCategoriesView('categories_scroll_network_addresses', storeFilter);

        var placesContent = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [ placesList, placesCategories ]
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
            items: [placesContent]
        });

        App.views.NetworkShowAddresses.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowAction: function(sel, records) {
        if (records[0] !== undefined) {
            Ext.dispatch({
                controller: 'Places',
                action: 'show',
                historyUrl: 'Places/show/'+records[0].getId(),
                id: records[0].getId()
            });
        }
    },

    onScopeChanged: function(view, filter, scope) {
        filter.set('user_id', view.user.getId());
        filter.set('search_scope', scope);
        filter.filter();
    },

    onFilterAction: function()
    {
        Ext.dispatch({
            controller: 'Places',
            action: 'filter',
            historyUrl: 'Places/filter'
        });
    }

});

Ext.reg('NetworkShowAddresses', App.views.NetworkShowAddresses);