App.models.UserDetailProfession = Ext.regModel('UserDetail::Profession', {

    extend: 'UserDetail',

    fields: [
        { name: 'industry_id', type: 'integer'},
        { name: 'industry_type_name', type: 'string'},
        { name: 'company', type: 'string'},
        { name: 'title', type: 'string'},
        { name: 'from_date', type: 'int'},
        { name: 'to_date', type: 'int'}
    ]
});

