App.models.UserDetailSchool = Ext.regModel('UserDetail::School', {

    extend: 'UserDetail',

    fields: [
        { name: 'academic_level_id', type: 'integer'},
        { name: 'name', type: 'string'},
        { name: 'academic_level_name', type: 'string'},
        { name: 'graduation', type: 'int'}
    ]
});

