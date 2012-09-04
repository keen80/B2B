Ext.regModel('ConnectUser', {
    extend: 'User'
});

var connectUsersConfig = {
    getGroupString : function(record) {
        return I18n.t('connect.'+record.get('contact_type'));
    },
    model: 'ConnectUser',
    data: {
        records: []
    },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'records'
        }
    },
    sorters: [
        {
            sorterFn: function(o1, o2) {
                var v1 = o1.get('contact_type') == 'tipmeout' ? 1 : 2;
                var v2 = o2.get('contact_type') == 'tipmeout' ? 1 : 2;
                return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
            }
        },
        {
            property : 'first_name',
            direction: 'ASC'
        },
        {
            property : 'last_name',
            direction: 'ASC'
        }
    ]
};

App.stores.phoneUsers = new Ext.data.EnhancedStore(connectUsersConfig);
App.stores.facebookUsers = new Ext.data.EnhancedStore(connectUsersConfig);
App.stores.twitterUsers = new Ext.data.EnhancedStore(connectUsersConfig);
App.stores.connectUsers = new Ext.data.EnhancedStore(connectUsersConfig);
App.stores.displayUsers = new Ext.data.EnhancedStore(connectUsersConfig);

Tmo.storeFilters.phoneUsers = new StoreFilter(App.stores.phoneUsers, "connectUsers");
Tmo.storeFilters.facebookUsers = new StoreFilter(App.stores.facebookUsers, "connectUsers");
Tmo.storeFilters.twitterUsers = new StoreFilter(App.stores.twitterUsers, "connectUsers");
Tmo.storeFilters.connectUsers = new StoreFilter(App.stores.connectUsers, "connectUsers",
    {
        address_book_scope: '0',
        facebook_scope: '0',
        twitter_scope: '0'
    });
Tmo.storeFilters.displayUsers = new StoreFilter(App.stores.displayUsers, "connectUsers",
    {
        search_query: ''
    });

if ( TmoConfig.debug || TmoConfig.test ) {
    navigator.contacts = new function(){
        this.find = function(contactFields, contactSuccess, contactError, contactFindOptions) {
            contacts = [
                {
                    name: {formatted: 'User with mail'},
                    emails: [
                        {type: "work", value: "brian.griffin@fg.com", pref: true}
                    ],
                    phoneNumbers: []
                },
                {
                    name: {formatted: 'User with no mails'},
                    emails: null,
                    phoneNumbers: []
                },
                {
                    name: {formatted: 'Brian Griffin'},
                    emails: [
                        {type: "work", value: "brian.griffin@fg.com", pref: true},
                        {type: "home", value: "brian.griffin@home.com", pref: false}
                    ],
                    phoneNumbers: []
                },
                {
                    name: {formatted: 'Chris Cross Griffin'},
                    emails: [],
                    phoneNumbers: null
                },
                {
                    name: {formatted: 'User with tel'},
                    emails: [],
                    phoneNumbers: [{type: "mobile", value: "555123456", pref: true}]
                },
                {
                    name: null,
                    emails: [],
                    phoneNumbers: []
                },
                {
                    name: {formatted: 'User strange tel'},
                    emails: [],
                    phoneNumbers: [{type: "mobile", value: "+48555123456", pref: true}]
                }
            ];
            contactSuccess(contacts);
        }
    }
}

Tmo.storeFilters.displayUsers.filter = function() {
   this.store.removeAll();
   var search_query = this.get('search_query');

   App.stores.connectUsers.filterBy( function(r) {
       if ( String( r.getConnectUserAsText().toLowerCase() ).match( search_query.toLowerCase() ) ) {
           return r;
       }
   });

   App.stores.connectUsers.filter();

   this.store.add(_.clone( App.stores.connectUsers.data.items.splice( 0, this.limit ) ));
};

Tmo.storeFilters.connectUsers.filter = function() {
    var scope = this;
    this.addressBookUsers = this.addressBookUsers || [];
    this.facebookUsers = this.facebookUsers || [];
    this.twitterUsers = this.twitterUsers || [];

    var address_book_scope = this.check("address_book_scope", "1");
    var facebook_scope = this.check("facebook_scope", "1");
    var twitter_scope = this.check("twitter_scope", "1");

    var toggleInfo = function(fieldset_id, active, count)
    {
        var togglefield = Ext.get(fieldset_id);

        if (togglefield) {
            if (active) {
                togglefield.down("#info").hide();
                togglefield.down("#count").show();
                togglefield.down("#count").update(count+ " " + Tmo.Utils.pluralize(count, "contact", "contacts") + " found");
            } else {
                togglefield.down("#info").show();
                togglefield.down("#count").hide();
            }
        }
    };

    var unifyAddresses = function( users )
    {
        var unifiedAddresses = [];
        var usersEmails = [];

        _.each( users, function( c ) {
            var email = c.email;
            if ( c.contact_type == "tipmeout" && !_.include(usersEmails, email) ) {
                unifiedAddresses.push(c);
                usersEmails.push(email);
            }
        });

        _.each( users, function( c ) {
            var email = c.email;
            if ( c.contact_type != "tipmeout" && !_.include(usersEmails, email) ) {
                unifiedAddresses.push(c);
                usersEmails.push(email);
            }
        });

        //unifiedAddresses = unifiedAddresses.splice(0,10);
        
        return unifiedAddresses;
    };

    var fillStore = function()
    {
        var doStoreFill = function(store, items) {
            store.removeAll(); // clear memory store
            store.add(_.clone( items ));
            store.sort();
        };

        var aggregatedStore = App.stores.connectUsers;
        aggregatedStore.removeAll();

        if (address_book_scope) {
            scope.addressBookUsers = unifyAddresses(scope.addressBookUsers);
            doStoreFill( Tmo.storeFilters.phoneUsers.store, scope.addressBookUsers );
            aggregatedStore.add(_.clone( scope.addressBookUsers ));
        }

        if (facebook_scope) {
            doStoreFill( Tmo.storeFilters.facebookUsers.store, scope.facebookUsers );
            aggregatedStore.add(_.clone( scope.facebookUsers ));
        }

        if (twitter_scope) {
            scope.twitterUsers = unifyAddresses(scope.twitterUsers);
            doStoreFill( Tmo.storeFilters.twitterUsers.store, scope.twitterUsers );
            aggregatedStore.add(_.clone( scope.twitterUsers ));
        }

        Ext.each(aggregatedStore.data.items,function(item){
            item.internalId = item.getConnectUserAsText();
        });

        aggregatedStore.sort();

        toggleInfo("address_book_togglefield", address_book_scope, scope.addressBookUsers.length);
        toggleInfo("facebook_togglefield", facebook_scope, scope.facebookUsers.length);
        toggleInfo("twitter_togglefield", twitter_scope, scope.twitterUsers.length);

        Tmo.storeFilters.displayUsers.filter();
    };

    if (address_book_scope && Ext.isEmpty(this.addressBookUsers) && navigator.contacts) {

        function onContactsLoaded(contacts) {
            var emails = [];
            var phoneNumbers = [];

            contacts = _.filter(contacts, function(r) { if (r.name) return r; });

            _.each(contacts, function(c){
                var name = !Ext.isEmpty(c.name.formatted) ? c.name.formatted : c.displayName;
                if (!Ext.isEmpty(name) && c.emails) {
                    _.each(c.emails, function(e){
                        emails.push({name: name, email: e.value});
                    });
                }

                if ( !Ext.isEmpty(c.phoneNumbers) ) {
                    Tmo.tryCatch(function(){
                        phoneNumbers = phoneNumbers.concat( _.map(c.phoneNumbers, function(el){return el.value}) );
                    }, {phoneNumbers: c.phoneNumbers});
                }
            });

            Server.request('POST', '/connect_users.json', {
                loadMask: true,
                params: {
                    address_book: Ext.encode(emails),
                    phone_book: Ext.encode(phoneNumbers)
                },
                success: function(result)
                {
                    scope.addressBookUsers = _.map(result.users, function(c){
                        c.contact_type = 'tipmeout';
                        return c;
                    });

                    _.each(contacts, function(c) {
                        if ( !Ext.isEmpty(c.emails) ) {

                            _.map(c.emails, function(el){
                                var mail =  el.value;

                                scope.addressBookUsers.push({
                                    first_name: c.name.formatted,
                                    email: mail,
                                    contact_type: 'email'
                                });

                            });

                        }
                    });

                    fillStore();
                }
            });
        }

        function onContactsFailed(contactError) {
            Tmo.LoadMask.hide();
            Ext.Msg.alert("Contacts error");
        }

        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        filter = ["*"];

        Tmo.LoadMask.show();
        navigator.contacts.find(filter, onContactsLoaded, onContactsFailed, options);

    } else if (address_book_scope && !facebook_scope) {
        fillStore();
    }

    if ( facebook_scope && Ext.isEmpty(this.facebookUsers) ) {

        Tmo.Adapters.facebook.ensureIsAuthenticated(function(access_token){
            Server.request('POST', '/connect_users.json', {
                loadMask: true,
                params: {
                    access_token: access_token
                },
                success: function(result) {
                    scope.facebookUsers = _.map(result.users, function(c){
                        c.contact_type = 'tipmeout';
                        return c;
                    }).concat(
                        _.map(result.not_users, function(c){
                            c.contact_type = 'facebook';
                            return c;
                        })
                    );

                    fillStore();
                }
            });
        });


    } else if (facebook_scope) {
        fillStore();
    }

    if ( twitter_scope && Ext.isEmpty(this.twitterUsers) ) {

        Tmo.Adapters.twitter.getAuthenticatedUserData(
            function(user_record) {
                Server.request('POST', '/connect_users.json', {
                    loadMask: true,
                    params: {
                        twitter_id: user_record.id
                    },
                    success: function(result)
                    {
                        scope.twitterUsers = _.map(result.users, function(c){
                            c.contact_type = 'tipmeout';
                            return c;
                        }).concat(
                            _.map(result.not_users, function(c){
                                c.contact_type = 'twitter';
                                return c;
                            })
                        );
                        fillStore();
                    }
                });
            }
        );

    } else if (twitter_scope) {
        fillStore();
    }

    if (!address_book_scope && !facebook_scope && !twitter_scope) {
        fillStore();
    }
};
