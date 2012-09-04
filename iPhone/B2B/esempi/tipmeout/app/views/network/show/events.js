App.views.NetworkShowEvents = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */
        var backButton, titleBar;
        var eventsListTpl, eventsList;
        var viewInstance = this;
        var storeFilter = Tmo.storeFilters.events;

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

        eventsListTpl = new Ext.XTemplate(
            '<div class="global_list no_avatar">',
            '<div class="name">@ {place_raw.name}</div>',
            '<div class="grey">{user_event_role}</div>',
            '<div class="name">{name}</div>',
            '<div class="name">{[Tmo.Utils.fDateWithDayName(values.start_date)]}</div>',
            '<div class="grey">{created_at:get_date}</div>',
            '<div class="name">{shortened_attending_guests_list}</div>',
            '</div>',
            {
                get_date: function(date) {
                    I18n.t("comment.actions.index.added_the", {datetime: Tmo.Utils.fDate(date)})
                }
            }
        );

        eventsList = new Ext.List({
            flex: 1,
            plugins: [
                new Tmo.PaginationListPlugin()
            ],
            id: 'events_list',
            itemTpl: eventsListTpl,
            store: App.stores.events,
            grouped: true,
            listeners: {
                selectionchange:
                {
                    fn: this.onShowAction
                }
            }
        });

        /* --- content map tpl --- */

        var eventsContent = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            id: "events_content",
            items: [ eventsList ]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'events_card',
            layout: 'card',
            dockedItems: [titleBar, App.headers.render('profile/shared/header', this.user)],
            items: [eventsList]
        });

        App.views.NetworkShowEvents.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */


    onShowAction: function(sel, records) {
//        var id = records[0].getId();
//        Ext.dispatch({
//            controller: 'Events',
//            action: 'show',
//            historyUrl: 'Events/show/' + id,
//            event: records[0]
//        });
    }
});

Ext.reg('NetworkShowEvents', App.views.NetworkShowEvents);