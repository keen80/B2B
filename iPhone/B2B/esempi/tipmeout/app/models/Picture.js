App.models.Picture = Ext.regModel('Picture', {
    fields: [
        { name: 'id', type: 'int' },
        { name: 'creator_id', type: 'int'},
        { name: 'created_at', type: 'date', dateFormat: 'c'},
        { name: 'creator_full_name', type: 'string'},
        { name: 'creator_thumb_url', type: 'string'},
        { name: 'thumb_url', type: 'string' },
        { name: 'standard_url', type: 'string' },
        { name: 'my_likes', type: 'boolean' },
        { name: 'picturable_type', type: 'string' },
        { name: 'picturable_id', type: 'int' },            
        { name: 'likes_count', type: 'int' }
    ],
    
    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/pictures"),
      format: 'json',
      reader: {
        type: 'json',
        root: 'records'
      }
    },

    getPicturable: function(callback){
        if (this.get('picturable_type') == 'Place') {
            App.models.Place.load(this.get('picturable_id'),{
               scope:this,
               success: function(record, operation) {
                var place = Ext.ModelMgr.create(record.raw, "Place");
                this.set('picturable', place);
                if (Ext.isFunction(callback)) {
                    callback.call();
                }
               },
               failure: function(record, operation) {
                Tmo.debug('FAILED to fetch picturable!');              
               }
            });
        }
    },

    isOwnedBy: function(user){
        return (this.get('creator_id') > 0 && this.get('creator_id') == user.getId());
    },

    relativeCreatedAt: function() {
        return Tmo.Utils.toRelativeTime( this.get('created_at') );
    },

    formattedCreatedAt: function() {
        return Tmo.Utils.formatDate( this.get('created_at') );
    },

    shareMessage: function(shareMethod)
    {
        var msg = "<???>";
        var method_key_t = Tmo.Consts.SHARETYPE_NAME_MAPPER[shareMethod];
        if (typeof(method_key_t) === 'string')
        {
            msg = I18n.t('picture.long_share_message_' + method_key_t);
        }

        return msg;
    },

    shareTitle: function(shareMethod)
    {
        var msg = "<???>";
        var method_key_t = Tmo.Consts.SHARETYPE_NAME_MAPPER[shareMethod];
        if (typeof(method_key_t) === 'string')
        {
            msg = I18n.t('picture.share_title_' + method_key_t, {app_name: Tmo.settings.app_name});
        }

        return msg;
    }
    
});