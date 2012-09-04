App.models.UserDetailClub = Ext.regModel('UserDetail::Club', {

    extend: 'UserDetail',

    fields: [
        { name: 'club_type_id', type: 'integer'},
        { name: 'name', type: 'string'},
        { name: 'club_type_name', type: 'string'}
    ]
});

