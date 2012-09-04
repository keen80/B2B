App.models.CheckIn = Ext.regModel('CheckIn', {
    belongsTo: 'Place',
    fields: [
        { name: 'id', type: 'int'},
        { name: 'note', type: 'string'},
        { name: 'place_id', type: 'integer'},
        { name: 'creator_id', type: 'integer'},
        { name: 'lat', type: 'float' },
        { name: 'lng', type: 'float' },
        { name: 'post_on_facebook', type: 'boolean' },
        { name: 'post_on_twitter', type: 'boolean' },
        { name: 'created_at', type: 'date', dateFormat: 'c'}
    ],

    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/check_ins"),
      format: 'json',
      reader: {
        type: 'json',
        root: 'records'
      }
    },

    getPosition: function() {
        return (new google.maps.LatLng(this.get('lat'), this.get('lng')));
    },

    formattedDate: function(){
       return I18n.strftime(this.get('created_at'), "%A %d/%m/%Y - %H:%M");
    },
    getMapIcon: function(){
       if ( Ext.isEmpty(this.get('icon')) ) {
           return "images/icons/places/pin-export.png";
       } else {
           return "images/icons/places/" + this.get('icon');
       }
    },
    toTwitterMessage: function() {
        var msg = this.get('note');
        var s = "" + (msg || "");
        s += " " + I18n.t('check_in.name_appendinx', {app: Tmo.settings.app_name });
        return s.trunc(139 - Tmo.settings.site_url.length - 2) + ", " + Tmo.settings.site_url;
    },
    publishOnSocialsNetworks: function() {
        var self = this;
        var dispatchFn = function() {
            Ext.Msg.alert(I18n.t('check_in.actions.new.title'), I18n.t('check_in.actions.create.success'), function(){
                if (Profile.getCurrentUser().get('show_connect')) {
                    Ext.dispatchBack({
                        controller: 'Session',
                        action: 'connect',
                        historyUrl: 'Session/connect',
                        existingUser: true
                    })
                } else {
                    Ext.dispatch(Tmo.BackButton.last());
                }
            });
        };
        var tweetFn = function() {
            if (self.get('post_on_twitter'))
                Tmo.Adapters.twitter.tweet(self.toTwitterMessage(), function(){dispatchFn();});
            else
                dispatchFn();
        };
        if (this.get('post_on_facebook')) {
            Tmo.Adapters.facebook.postToWall(
                I18n.t('check_in.fb_name',{first_name: Profile.getCurrentUser().get('first_name'), place_name: this.get('place').shareName()}),
                this.get('note'),
                this.get('place').shareDescription(),
                Tmo.settings.site_url,
                this.get('place').sharePicture(),
                function(){
                    tweetFn();
                },
                function(){
                    tweetFn();
                }
            );
        } else {
            tweetFn();
        }                
    }
});