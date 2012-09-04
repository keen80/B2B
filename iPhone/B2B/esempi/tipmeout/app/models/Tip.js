App.models.Tip = Ext.regModel('Tip', {

    fields: [
        { name: 'id', type: 'int'},
        { name: 'review', type: 'string'},
        { name: 'rater_id', type: 'int'},
        { name: 'rateable_id', type: 'int'},
        { name: 'rateable_type', type: 'string'},
        { name: 'value', type: 'float'},
        { name: 'real_value', type: 'float'},
        { name: 'created_at', type: 'date', dateFormat: 'c'},
        { name: 'likes_count', type: 'int'},
        { name: 'can_delete', type: 'boolean'},
        { name: 'can_like', type: 'boolean'},
        { name: 'attachables', type: 'array'},
        { name: 'rateable_name', type: 'string'},
        { name: 'rateable_thumb_url', type: 'string'},
        { name: 'comments_count', type: 'int'},
        'rateable',
        'rater'
    ],

    proxy: {
        type: 'railsrest',
        url: Server.apiUrl("/tips"),
        format: 'json',
        reader: {
            type: 'json',
            root: 'records'
        }
    },

    shareMessage: function(shareMethod)
    {
        var msg = "<???>";
        var method_key_t = Tmo.Consts.SHARETYPE_NAME_MAPPER[shareMethod];
        if (typeof(method_key_t) === 'string')
        {
            msg = I18n.t('tip.long_share_message_' + method_key_t, {user: Profile.getCurrentUser().getFullName()});
        }

        return msg;
    },

    shareTitle: function(shareMethod)
    {
        var msg = "<???>";
        var method_key_t = Tmo.Consts.SHARETYPE_NAME_MAPPER[shareMethod];
        if (typeof(method_key_t) === 'string')
        {
            msg = I18n.t('tip.share_title_' + method_key_t, {app_name: Tmo.settings.app_name});
        }

        return msg;
    },

    shareName: function() {
      return this.get('rateable').name;
    },

    sharePicture: function() {
      return (Ext.isEmpty(this.get('rateable').thumb_url)) ? TmoConfig.server+"/assets/thumb_missing.png" : this.get('rateable').thumb_url;
    },

    shareDescription: function() {
      return null;
    },

    toTwitterMessage: function(msg) {
        var s = "" + (msg || "");
        s += " " + I18n.t('share.name_appendinx', {app: Tmo.settings.app_name + " " + this.shareName()});
        return s.trunc(139 - Tmo.settings.site_url.length - 2) + ", " + Tmo.settings.site_url;
    },
    
    yoursStatus: function(){ return "yours" },
    networkStatus: function(){ return "network" },
    membersStatus: function(){ return "members" },
    popularStatus: function(){ return "popular" },
    recentStatus: function(){ return "recent" },
    tabsForTipsOwnership: function(){
        return [
            {search_scope: this.yoursStatus(), text: I18n.t('tip.ownership_tabs.yours')},
            {search_scope: this.networkStatus(), text: I18n.t('tip.ownership_tabs.network')},
            {search_scope: this.membersStatus(), text: I18n.t('tip.ownership_tabs.members')}
        ];
    },
    tabsForTipsPopularity: function(){
        return [
            {search_scope: this.recentStatus(), text: I18n.t('tip.pupular_tabs.recent')},
            {search_scope: this.popularStatus(), text: I18n.t('tip.pupular_tabs.popular')}
        ];
    }

});