App.models.Place = Ext.regModel('Place', {

    hasMany: [        
        {model: 'PlaceCf', name: 'cfs'}
    ],

    fields: [
        {name: 'id', type: 'int'},
        {name: 'tf_id', type: 'int'},
        {name: 'creator_id', type: 'int'},
        {name: 'updated_at', type: 'date', dateFormat: 'c'},
        {name: 'name', type: 'string'},
        {name: 'is_private', type: 'boolean'},
        {name: 'is_gp', type: 'boolean'},
        {name: 'rating', type: 'float'},

        {name: 'address', type: 'string'},
        {name: 'number', type: 'string'},
        {name: 'formatted_address', type: 'string'},
        {name: 'locality', type: 'string'},
        {name: 'postal_code', type: 'string'},
        {name: 'country', type: 'string'},
        {name: 'lat', type: 'float'},
        {name: 'lng', type: 'float'},
        {name: 'distance', type: 'string'}, //must be string
        {name: 'tel', type: 'string'},
        {name: 'opening_hours', type: 'string'},
        {name: 'transport', type: 'string'},
        {name: 'parking', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'tag_list', type: 'string'},
        {name: 'tf_link', type: 'string'},

        {name: 'gp_id', type: 'string'},
        {name: 'gp_reference', type: 'string'},
        {name: 'gp_icon', type: 'string'},

        {name: 'addressbook', type: 'boolean'},
        {name: 'wishlist', type: 'boolean'},

        {name: 'thumb_url', type: 'string'},
        {name: 'icon', type: 'string'},
        {name: 'pictures_count', type: 'int'},
        {name: 'tips_count', type: 'int'},
        {name: 'events_count', type: 'int'},
        {name: 'main_category_name', type: 'string'},

        {name: 'mutual_tag', type: 'string'},
        {name: 'avg_result', type: 'float'},
        {name: 'tips_results_count', type: 'int'},
        {name: 'count_in_network_addressbooks', type: 'int'},
        {name: 'count_in_system_addressbooks', type: 'int'},

        {name: 'friends_at_place_count', type: 'int'},
        {name: 'strangers_at_place_count', type: 'int'},
        {name: 'cfs'}
    ],

    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/places"),
      format: 'json',
      reader: {
        type: 'json',
        root: 'records'
      }
    },

    short_address: function() {
      return "short address, city";
    },

    getMutualTag: function() {
        return this.get("mutual_tag");
    },

    bookmark: function(bookmark, success) {
      Server.request('POST', '/places/' + this.getId() + '/bookmark.json', {
        loadMask: true,
        params: {bookmark: bookmark},
        success: success
      });
    },

    removeBookmark:function (success) {
        var bookmark_action = null;
        if (this.get('addressbook')) bookmark_action = 'removePlaceBookmark';
        if (this.get('wishlist')) bookmark_action = 'removeWishBookmark';

        if (bookmark_action) {
            this.bookmark(bookmark_action, success);
        } else {
            success && success();
        }
    },

    fillWithGoogleAddressComponents: function(address_components) {
      var data = this.data;
      var street, street_number;

      Ext.each(address_components, function(item, index, allItems) {
        if ( item.types.indexOf("country") >= 0 ) {
          data.country = item.long_name;
        } else if ( item.types.indexOf("postal_code") >= 0 ) {
          if ( item.long_name.length > data.postal_code.length ) {
            data.postal_code = item.long_name;
          }
        } else if ( item.types.indexOf("locality") >= 0 ) {
          data.locality = item.long_name;
        } else if ( item.types.indexOf("route") >= 0 ) {
          street = item.long_name;
        } else if ( item.types.indexOf("street_number") >= 0 ) {
          street_number = item.long_name;
        }
      });

      data.address = street;
      data.number = street_number;
    },

    fillWithGooglePlace: function(gp) {
      var data = this.data;
      data.name = gp.name;
      
      data.lat = gp.geometry.location.lat();
      data.lng = gp.geometry.location.lng();
      data.tel = gp.formatted_phone_number;

      data.gp_id = gp.id;
      data.gp_reference = gp.reference;

      this.fillWithTypes(gp.types);
      this.fillWithGoogleAddressComponents(gp.address_components);
    },

    fillWithTypes: function(types) {
        var me = this;
        var results = [];

        function findCategoryFor(gpType) {
          return _.find(App.stores.place_categories.data.items, function(item) {
            return _.include(item.get('gp_types').split(','), gpType)
          });
        }

        function findTypeFor(gpType) {
          return _.find(App.stores.object_categories.data.items, function(item) {
            return item.get('type') == 'Place::Type' && _.include(item.get('gp_types').split(','), gpType)
          });
        }

        function asId(obj) {
            if (Ext.isEmpty(obj)) {
                return null;
            } else {
                return obj.get('id');
            }
        }

        function hasBeenUsed(r) {
            var resultsWithoutR = _.reject(results, function(x){return x == r;});

            _.each(resultsWithoutR, function(u) {
                if (u.category_id == r.category_id && u.type_id == r.type_id) {
                    return true;
                }
            });

            return false;
        }

        function clearDuplicates(a) {
            var n = a.length;
            var i,j, found;
            r = [];

            for (i=0; i<n; i++) {
                found = false;
                for (j=0; j<r.length; j++) {
                    if (r[j].category_id === a[i].category_id) {
                        if (a[i].type_id !== null) {
                            r[j] = a[i];
                        }
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    r.push(a[i]);
                }

                return r;
            }
        }

        _.each(types, function(type) {
            var result = {
                category_id: asId( findCategoryFor(type) ),
                type_id: asId( findTypeFor(type))
            };

            if ( result.category_id != null && !hasBeenUsed(result) ) {
                results.push(result);
            }
        });

        results = clearDuplicates(results);

         _.each(results, function(result) {
            me.cfs().add(result);
        });
    },

     fillWithGoogleAddress: function(ga) {
      var data = this.data;

      data.lat = ga.geometry.location.lat();
      data.lng = ga.geometry.location.lng();

      this.fillWithGoogleAddressComponents(ga.address_components);
    },

    shareMessage: function(shareMethod)
    {
        var msg = "<???>";
        var method_key_t = Tmo.Consts.SHARETYPE_NAME_MAPPER[shareMethod];
        if (typeof(method_key_t) === 'string')
        {
            msg = I18n.t('place.long_share_message_' + method_key_t, {
                category_name: this.get('main_category_name'),
                place_name: this.get('name'),
                address: this.get('formatted_address'),
                user: Profile.getCurrentUser().getFullName()
            }
            );
        }

        return msg;
    },

    shareTitle: function(shareMethod)
    {
        var msg = "<???>";
        var method_key_t = Tmo.Consts.SHARETYPE_NAME_MAPPER[shareMethod];
        if (typeof(method_key_t) === 'string')
        {
            msg = I18n.t('place.share_title_' + method_key_t, {
                full_name: Profile.getCurrentUser().getFullName(),
                app_name: Tmo.settings.app_name
            });
        }

        return msg;
    },

    formattedAddress: function(){
       return this.data.formatted_address.nl2br();
    },

    getMapIcon: function(){
       if ( !Ext.isEmpty(this.data.gp_icon) ) {
           return this.data.gp_icon;
       } else if ( Ext.isEmpty(this.data.icon) ) {
           return "images/icons/places/pin-export.png";
       } else {
           return "images/icons/places/" + this.data.icon;
       }
    },

    getPosition: function() {
      return (new google.maps.LatLng(this.data.lat, this.data.lng));
    },

    positionIsUndefined: function() {
        return (this.data.lng == 0 && this.data.lat == 0);
    },

    unsetPosition: function() {
        this.data.lng = 0;this.data.lat = 0;
    },

    getInfoWindow:function (list, index, map) {
        var content = "<p>" + Ext.util.Format.ellipsis(this.get('name'), 38) + "<br/>" + this.formattedAddress() + "</p>";
        var map_id = map.b.id;
        Tmo.debug("map_id", map_id);

        if (this.get('is_gp')) {
            content += "<a onclick=\"App.addPlaceByReference( Ext.getCmp('" + map_id + "').map,'" + this.get('gp_reference') + "');\">" + I18n.t('place.actions.new.add_new_place') + "</a>"
        } else {
            content += "<a onclick=\"Ext.getCmp('" + list.getId() + "').store.getAt(" + index + ").redirectToShow();\">" + I18n.t("action.view_details_link") + "</a>";
        }

        return content;
    },
    
    isOwnedBy: function(user){
      return (this.get('creator_id') > 0 && this.get('creator_id') == user.getId());
    },

    relationship_details: function(){
        var res = [];
        var visitors_count = this.get('strangers_at_place_count') + this.get('friends_at_place_count');
        var visitors_label = I18n.tc('check_in.visitors',{count: visitors_count});
        if (this.get('friends_at_place_count') > 0)
            visitors_label += " (" + I18n.tc('check_in.known_visitors',{count: this.get('friends_at_place_count')}) + ") ";

        res.push({icon: "network", type: "visitors", name: visitors_label, value: "null"});
        res.push({icon: "events", type: "events", name: I18n.tc('event',{count: this.get('events_count')}), value: "null"});
        res.push({icon: "tips", type: "tips", name: I18n.tc('tip',{count: this.get('tips_count')}), value: "null"});
        res.push({icon: "images", type: "images", name: I18n.tc('image',{count: this.get('pictures_count')}), value: "null"});
        return res;
    },

    shareName: function() {
        return I18n.t('place.share_title_facebook', {
            place_name: this.get('name')
        });
    },

    sharePicture: function() {
      return (Ext.isEmpty(this.get('thumb_url'))) ? TmoConfig.server+"/assets/thumb_missing.png" : this.get('thumb_url');
    },

    toFacebookMessage: function() {
        return I18n.t('place.long_share_message_facebook', {
            place_name: this.get('name'),
            address: this.get('formatted_address')
        });
    },

    shareDescription: function() {
        return "";
    },

    toTwitterMessage: function(msg) {
        var text = I18n.t('place.long_share_message_twitter', {
            place_name: this.get('name')
        });
        return text.trunc(140);
    },

    get_transport_info: function(){
        return "<strong>"+I18n.t('activerecord.attributes.place.transport') + ":</strong><br />" +
        (Ext.isEmpty(this.get('transport')) ? '-' : this.get('transport')) + "<br />" +
        "<strong>"+I18n.t('activerecord.attributes.place.parking') + ":</strong><br />" +
        (Ext.isEmpty(this.get('parking')) ? '-' : this.get('parking'));
    },

    redirectToShow: function() {
        Ext.dispatch({
            controller: 'Places',
            action: 'show',
            historyUrl: 'Places/show/' + this.getId(),
            place: this
        });
    },

    categoriesLabel: function() {
        if (this.data.cfs) {
            return _.compact([
                this.data.cfs[0].category_name,
                this.data.cfs[0].type_name,
                this.data.cfs[0].theme_name,
                this.data.cfs[0].occasions_name,
                this.data.cfs[0].cuisine_name,
                this.data.cfs[0].targets_name,
                this.data.cfs[0].delay_name,
                this.data.cfs[0].budget_name
            ]).join("<br/>");
        } else {
            return "";
        }
    },

    place_information_for_view: function(){
        var res = [];
        if (!Ext.isEmpty(this.get('opening_hours')))
            res.push({icon: "events", type: "opening_hours", name: this.get('opening_hours'), value: "null"});
        if (!Ext.isEmpty(this.get('transport')) || !Ext.isEmpty(this.get('parking')))
            res.push({icon: "transport", type: "transport", name: this.get_transport_info(), value: "null"});
        if (!Ext.isEmpty(this.get('description')))
            res.push({icon: "description", type: "description", name: this.get('description'), value: "null"});
        return res;
    }

});

App.models.ObjectCategory = Ext.regModel('ObjectCategory', {
  fields: [
    { name: 'id', type: 'int' },
    { name: 'parent_id', type: 'int' },
    { name: 'name', type: 'string' },
    { name: 'shortcut', type: 'string' },
    { name: 'icon', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'gp_types', type: 'string' },
    { name: 'position', type: 'int' }
  ]
});

App.models.PlaceBudget = Ext.regModel('PlaceBudget', {
    extend: 'ObjectCategory'
});

App.models.PlaceCategory = Ext.regModel('PlaceCategory', {
    extend: 'ObjectCategory'
});

App.models.PlaceCf = Ext.regModel('PlaceCf', {
  fields: [
    {name: 'id', type: 'int'},
    {name: 'category_id', type: 'int'},
    {name: 'budget_id', type: 'int'},
    {name: 'type_id', type: 'int'},
    {name: 'theme_id', type: 'int'},
    {name: 'delay_id', type: 'int'},
    {name: 'cuisine_id', type: 'int'},
    {name: 'occasions_ids', type: 'string'},
    {name: 'targets_ids', type: 'string'},
    {name: 'category_name', type: 'string'},
    {name: 'budget_name', type: 'string'},
    {name: 'type_name', type: 'string'},
    {name: 'theme_name', type: 'string'},
    {name: 'delay_name', type: 'string'},
    {name: 'cuisine_name', type: 'string'},
    {name: 'occasions_name', type: 'string'},
    {name: 'targets_name', type: 'string'}
  ]
});

function formatAddress(address, number) {
    if (Profile.getCurrentUser().get('locale_code') == "fr")
        return _.compact([number, address]).join(", ");
    else
        return _.compact([address, number]).join(" ");
}

function formatDistance(value) {
    var float_val = parseFloat(value);
    if (isFinite(float_val)) {
        return (Math.round(float_val * 10) / 10).toString() + ' km';
    } else {
        return null;
    }
}

function formatDistanceForPlaces(value) {
    var formatted_value = formatDistance(value);
    if (formatted_value != null) {
         return ", " + I18n.t("activerecord.attributes.place.distance") + ": " + formatted_value;
    } else {
        return "";
    }
}
