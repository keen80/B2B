App.models.UserDetailInterest = Ext.regModel('UserDetail::Interest', {

    extend: 'UserDetail',

    fields: [
        { name: 'interest_type_id', type: 'integer'},
        { name: 'name', type: 'string'},
        { name: 'interest_type_name', type: 'string'},
        { name: 'get_name', type: 'string'}
    ],

    fillGetName: function(){
        this.set('get_name',this.get('interest_type_id') > 0 ? this.get('interest_type_name') : this.get('name'));
    }
});

