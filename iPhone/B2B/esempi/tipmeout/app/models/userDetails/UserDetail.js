App.models.UserDetail = Ext.regModel('UserDetail', {
    fields: [
        { name: 'id', type: 'int'},
        { name: 'type', type: 'string'}
    ],

    toObject: function(){
        return Ext.ModelMgr.create(this.raw, this.data.type);
    }
});