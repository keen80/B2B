App.models.Message = Ext.regModel('Message', {
    belongsTo: 'Sender',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'unread_count',
            type: 'int'
        },
        {
            name: 'body',
            type: 'string'
        },
        {
            name: 'type',
            type: 'string'
        },
        {
            name: 'state',
            type: 'string'
        },
        {
            name: 'humanized_type',
            type: 'string'
        },
        {
            name: 'sender_id',
            type: 'int'
        },
        {
            name: 'attachables',
            type: 'array'
        },
        {
            name: 'created_at',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'first_line',
            type: 'string'
        },
        {
            name: 'second_line',
            type: 'string'
        },
        'message_sender' //cheat
    ],

    proxy: {
        type: 'railsrest',
        url: Server.apiUrl("/notifications/messages"),
        format: 'json',
        reader: {
            type: 'json',
            root: 'records'
        }
    }
});

App.setBadge = function(count){
    if (Ext.is.iPhone) {
        window.plugins.badge.set(parseInt(count))
    }
};