App.models.Group = Ext.regModel('Group', {

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'thumb_url', type: 'string' }
    ],
    
    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/groups"),
      format: 'json',
      reader: {
        type: 'json',
        root: 'records'
      }
    }
    
});