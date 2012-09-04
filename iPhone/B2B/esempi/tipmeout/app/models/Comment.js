App.models.Comment = Ext.regModel('Comment', {
    belongsTo: 'User',
    fields: [
        { name: 'id', type: 'int'},
        { name: 'title', type: 'string'},
        { name: 'comment', type: 'string'},
        { name: 'created_at', type: 'date', dateFormat: 'c'},
        { name: 'creator_full_name', type: 'string' },
        { name: 'creator_thumb_url', type: 'string' },
        { name: 'user_id', type: 'int'}
    ],

    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/comments"),
      format: 'json',
      reader: {
        type: 'json',
        root: 'records'
      }
    },

    formattedCreationDate: function(){
       return I18n.strftime(this.get('created_at'), "%A %d/%m/%Y - %H:%M");
    },

    formattedCreatorName: function(){
       return (this.isOwnedBy(Profile.getCurrentUser()) ? I18n.t('support.myself') : this.get('creator_full_name'));
    },

    labelForCreationDate: function(){
       var datetime = Tmo.Utils.toRelativeTime( this.get('created_at') );
       return I18n.t("comment.actions.index.added_the", {datetime: datetime});
    },

    isOwnedBy: function(user){
        return (this.get('user_id') > 0 && this.get('user_id') == user.getId());
    }

});