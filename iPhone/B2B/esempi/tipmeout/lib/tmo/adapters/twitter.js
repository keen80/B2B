Tmo.Adapters.twitter = {
    //TODO hide consumer key/secret pair
    options: {
        consumerKey: 'qprd4A8DVwR6xAM3IphrEA',
        consumerSecret: 'kNTXUPz0S2CqqTA9f57JuC5cHy1NlmaDz8nAENsJxU',
        callbackUrl: TmoConfig.server + '/twitter'
    },

    oauth: null,

    localStoreKey: "TipMeOut_Twitter",

    ensureIsAuthenticated: function(success, failure) {
        var authenticationProcedure = function() {
            var requestParams;

            // Set childBrowser callback to detect our oauth_callback_url
            if (typeof Tmo.Adapters.twitter.locationChanged !== 'function') {
                Tmo.Adapters.twitter.locationChanged = function(loc){

                    // If user hit "No, thanks" when asked to authorize access
                    if (loc.indexOf(Tmo.Adapters.twitter.options.callbackUrl + "?denied") >= 0) {
                        failure && failure();
    //                    alert("User declined access");
                        window.plugins.childBrowser.close();
                        return;
                    }


                    // Same as above, but user went to app's homepage instead
                    // of back to app. Don't close the browser in this case.
                    if (loc === "http://tipmeout.com/") {
                        failure && failure();
    //                    alert("User declined access");
                        return;
                    }

                    // The supplied oauth_callback_url for this session is being loaded
                    if (loc.indexOf(Tmo.Adapters.twitter.options.callbackUrl + "?") >= 0) {
                        var index, verifier = '';
                        var params = loc.substr(loc.indexOf('?') + 1);

                        params = params.split('&');
                        for (var i = 0; i < params.length; i++) {
                            var y = params[i].split('=');
                            if(y[0] === 'oauth_verifier') {
                                verifier = y[1];
                            }
                        }

                        window.plugins.childBrowser.close();

                        // Exchange request token for access token
                        Tmo.Adapters.twitter.oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
                                function(data) {
                                    var accessParams = {};
                                    var qvars_tmp = data.text.split('&');
                                    for (var i = 0; i < qvars_tmp.length; i++) {
                                        var y = qvars_tmp[i].split('=');
                                        accessParams[y[0]] = decodeURIComponent(y[1]);
                                    }

                                    Tmo.Adapters.twitter.oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);

                                    // Save access token/key in localStorage
                                    var accessData = {};
                                    accessData.accessTokenKey = accessParams.oauth_token;
                                    accessData.accessTokenSecret = accessParams.oauth_token_secret;

                                    localStorage.setItem(Tmo.Adapters.twitter.localStoreKey, JSON.stringify(accessData));

                                    Tmo.Adapters.twitter.oauth.get('https://api.twitter.com/1/account/verify_credentials.json?skip_status=true',
                                            function(data) {
                                                success && success();
                                            },
                                            function(data) {
//                                                alert('Error getting user credentials');
//                                                alert("Twitter: " + JSON.parse(data.text).error);
                                                failure && failure();
                                            }
                                    );
    //                                window.plugins.childBrowser.close();
                            },
                            function(data) {
//                                alert("Twitter: Oauth verifier error");
                                failure && failure();
//                                console.log("AppLaudLog: 1 Error " + data);
                            }
                        );
                    }
                };
            } // end if

            window.plugins.childBrowser.close();

            // Note: Consumer Key/Secret and callback url always the same for this app.
            Tmo.Adapters.twitter.oauth = OAuth(Tmo.Adapters.twitter.options);
            Tmo.Adapters.twitter.oauth.get('https://api.twitter.com/oauth/request_token',
                    function(data) {
                        requestParams = data.text;
                        window.plugins.childBrowser.showWebPage('https://api.twitter.com/oauth/authorize?' + data.text, { showLocationBar : false });
                    },
                    function(data) {
//                        alert("Twitter: " + JSON.parse(data.text).error);
                        alert('No Authorization, can not get request token');
                    }
            );
        };

        var storageData = null;

        try {
            storageData = JSON.parse(localStorage.getItem(Tmo.Adapters.twitter.localStoreKey));
        } catch(e) {
            storageData = null;
        }

        if (storageData && storageData.accessTokenKey && storageData.accessTokenSecret) {
            var oauth_options = Ext.Object.merge({
                    accessTokenKey: storageData.accessTokenKey,
                    accessTokenSecret: storageData.accessTokenSecret
                },
                this.options
            );

            Tmo.Adapters.twitter.oauth = OAuth(oauth_options);
            Tmo.Adapters.twitter.oauth.get('https://api.twitter.com/1/account/verify_credentials.json?skip_status=true',
                function(data) {
                    success && success();
                },
                function(data) {
                    oauth_options = {};
                    localStorage.removeItem(Tmo.Adapters.twitter.localStoreKey);
                    authenticationProcedure();
                }
            );
        } else {
            authenticationProcedure();
        }
    },

    tweet: function(msg, success, failure) {
        Tmo.Adapters.twitter.ensureIsAuthenticated(function() {
            var tweet_msg = (msg || "");

            Tmo.LoadMask.show( I18n.t('social.twitter.tweeting') );

            Tmo.Adapters.twitter.oauth.post('https://api.twitter.com/1/statuses/update.json', {
                    'status' : tweet_msg,
                    'trim_user' : 'true'
                },
                function(data) {
                    Tmo.LoadMask.hide();
                    success && success();
                },
                function(data) {
                    Tmo.LoadMask.hide();
                    try {
                        var response = JSON.parse(data.text);
                        alert("Twitter: " + response.error);
                    } catch (e) {

                    }
                    failure && failure();
                    Tmo.logError({}, JSON.stringify(data));
                }
            );
        }, null);

    },

    get_followers: function(success, failure) {
        Tmo.Adapters.twitter.ensureIsAuthenticated(function() {
            Tmo.LoadMask.show("Fetching followers...");
            Tmo.Adapters.twitter.oauth.get('http://api.twitter.com/1/followers/ids.json',
                function(data) {
                    var users = "";
                    try {
                        var response = JSON.parse(data.text);
                        users = response.ids.join(",");
                    } catch (e) {

                    }
                    Tmo.Adapters.twitter.oauth.get('https://api.twitter.com/1/users/lookup.json?user_id=' + users, function(data) {
                        Tmo.LoadMask.hide();
                        var users_data = [];
                        try {
                            var response = JSON.parse(data.text);
                            Ext.each(response, function(item) {
                                users_data.push({
                                    id: item.id,
                                    name: item.name,
                                    screen_name: item.screen_name,
                                    profile_image_url: item.profile_image_url
                                })
                            });
                        } catch (e) {

                        }
                        success && success(users_data);

                    }, function(data) {
                        Tmo.LoadMask.hide();
                        try {
                            var response = JSON.parse(data.text);
                            alert("Twitter: " + response.error);
                        } catch (e) {

                        }
                        failure && failure();
                    });
                },
                function(data) {
                    Tmo.LoadMask.hide();
                    try {
                        var response = JSON.parse(data.text);
                        alert("Twitter: " + response.error);
                    } catch (e) {

                    }
                    failure && failure();
                }
            );
        }, null);
    },

    getAuthenticatedUserData: function(success, failure) {
        Tmo.Adapters.twitter.ensureIsAuthenticated(function() {
            Tmo.LoadMask.show("Twitter...");
            Tmo.Adapters.twitter.oauth.get('https://api.twitter.com/1/account/verify_credentials.json?skip_status=true',
                function(data) {
                    Tmo.LoadMask.hide();
                    var response = {};
                    try {
                        response = JSON.parse(data.text);
                    } catch (e) {
                        response = {};
                    }
                    success && success(response);
                },
                function(data){
                    Tmo.LoadMask.hide();
                    failure && failure(data);
                }
            );
        }, null);
    },

    //pure api, without auth process
    api: {
        sendDirectMessage: function(twitter_id, msg, success, failure) {
            Tmo.Adapters.twitter.oauth.post('https://api.twitter.com/1/direct_messages/new.json', {
                    user_id: twitter_id,
                    text: msg.trunc(139)
                },
                function(data) {
                    var response = {};
                    try {
                        response = JSON.parse(data.text);
                    } catch (e) {
                        response = {};
                    }
                    success && success(response);
                },
                function(data){
                    var response = {};
                    try {
                        response = JSON.parse(data.text);
                    } catch (e) {
                        response = {};
                    }
                    failure && failure(response);
                }
            );
        }
    }


};


