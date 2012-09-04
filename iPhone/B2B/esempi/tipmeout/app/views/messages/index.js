App.views.MessagesIndex = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var titleBar, searchBar;
        var messagesListTpl, messagesList;

        /* --- init --------------------------------------------------------------------------------- */


        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('messages.header'),
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        messagesListTpl = new Ext.XTemplate.from("messages-list-tpl");

        messagesList = new Ext.List({
            cls: 'tmo-list',
            plugins: [new Tmo.PaginationListPlugin()],
            itemTpl: messagesListTpl,
            store: App.stores.messages,
            listeners: {
                selectionchange:
                {
                    fn: this.onShowAction,
                    scope: this
                },
                update: function() {
                    var unread_msgs = Ext.query('.unread');

                    Ext.each(unread_msgs, function(item)
                    {
                        item.parentNode.parentNode.className += "x-item-unread";
                    })

                }
            }
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            dockedItems: [titleBar],
            items: [messagesList]
        });

        App.views.MessagesIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowAction: function(sel, records) {
        if (records[0] !== undefined) {
            Ext.dispatch({
                controller: 'Messages',
                action: 'show',
                historyUrl: 'Messages/show/'+records[0].getId(),
                message_id: records[0].getId()
            });
        }
    }
});

Ext.reg('MessagesIndex', App.views.MessagesIndex);