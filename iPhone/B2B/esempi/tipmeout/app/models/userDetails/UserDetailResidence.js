App.models.UserDetailResidence = Ext.regModel('UserDetail::Residence', {

    extend: 'UserDetail',

    fields: [
        { name: 'address_1', type: 'string'},
        { name: 'address_2', type: 'string'},
        { name: 'city', type: 'string'},
        { name: 'postal_code', type: 'string'},
        { name: 'country', type: 'string'}
    ]
});

