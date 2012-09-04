App.models.RelationshipDetail = Ext.regModel('RelationshipDetail', {
    fields: [
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'base_name',
            type: 'string'
        },
        {
            name: 'value',
            type: 'int'
        },
        {
            name: 'type',
            type: 'string'
        },
        {
            name: 'icon',
            type: 'string'
        }
    ]
});