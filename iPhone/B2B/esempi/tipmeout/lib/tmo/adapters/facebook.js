Tmo.Adapters.facebook = {
    options:{
        client_id:'116293318486328',
        callbackUrl:'http://www.facebook.com/connect/login_success.html'
    },

    localStoreKey:"TipMeOut_Facebook",

    ensureIsAuthenticated:function (success, failure) {
        if (Ext.is.Desktop && TmoConfig.debug) {
            this.desktop.authenticate(success, failure);
        } else {
            var client_id = this.options.client_id;
            var redirect_uri = this.options.callbackUrl;

            var authorize_url = "https://graph.facebook.com/oauth/authorize?";
            authorize_url += "client_id=" + client_id;
            authorize_url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
            authorize_url += "&response_type=token";
            authorize_url += "&display=touch";
            authorize_url += "&scope=" + "publish_stream,email,friends_hometown";

            if (typeof Tmo.Adapters.facebook.locationChanged !== 'function') {
                Tmo.Adapters.facebook.locationChanged = function (loc) {
                    var check_token = Tmo.Adapters.facebook.getAccessToken();
                    if (check_token != null) {
                        if (loc.indexOf(Tmo.Adapters.facebook.options.callbackUrl + "?dialog_invitation=1") === 0) {
                            window.plugins.childBrowser.close();
                            success && success(check_token);
                        } else if (loc.indexOf("https://www.facebook.com/dialog/apprequests") >= 0) {

                        } else {
                            window.plugins.childBrowser.close();
                            success && success(check_token);
                        }

                    } else {
                        if (/access_token/.test(loc)) {
                            var result = unescape(loc).split("#")[1];
                            result = unescape(result);
                            var access_token = result.split("&")[0].split("=")[1];

                            Tmo.Adapters.facebook.setAccessToken(access_token);
                            window.plugins.childBrowser.close();

                            success && success(access_token);
                        }
                        if (!(/facebook.com\/login/.test(loc))) {
                            if (/user_denied/.test(loc)) {
                                window.plugins.childBrowser.close();
                                failure && failure();
                            }
                        }
                    }
                };
            }
            window.plugins.childBrowser.close();

            if (!Tmo.Adapters.facebook.getAccessToken()) {
                window.plugins.childBrowser.showWebPage(authorize_url, {showLocationBar:false});
            } else {
                //we still need to check if access token we have is valid
                Ext.Ajax.request({
                    url:'https://graph.facebook.com/me',
                    params:{
                        access_token:Tmo.Adapters.facebook.getAccessToken()
                    },
                    method:'GET',
                    success:function (xhr) {
                        var responseData = {};
                        try {
                            responseData = JSON.parse(xhr.responseText);
                        } catch (e) {

                        }
                        if (responseData.error) {
                            localStorage.removeItem(Tmo.Adapters.facebook.localStoreKey);
                            window.plugins.childBrowser.showWebPage(authorize_url, {showLocationBar:false});
                        } else {
                            success && success(Tmo.Adapters.facebook.getAccessToken());
                        }
                    },
                    failure:function (xhr) {
                        localStorage.removeItem(Tmo.Adapters.facebook.localStoreKey);
                        window.plugins.childBrowser.showWebPage(authorize_url, {showLocationBar:false});
                    }
                });

            }
        }
    },

    getAccessToken:function () {
        var token = localStorage.getItem(Tmo.Adapters.facebook.localStoreKey);

        if (token && token.length > 0) {
            return token;
        }

        return null;
    },

    setAccessToken:function (token) {
        localStorage.setItem(Tmo.Adapters.facebook.localStoreKey, token);
    },

    logout: function() {
        Ext.Ajax.request({
            url:'https://www.facebook.com/logout.php',
            params:{
                access_token:Tmo.Adapters.facebook.getAccessToken(),
                next: Tmo.Adapters.facebook.options.callbackUrl
            },
            method:'GET',
            success:function (xhr) {
                localStorage.removeItem(Tmo.Adapters.facebook.localStoreKey);
            },
            failure:function (xhr) {

            }
        });

    },

    hasAccessToken: function() {
        return this.getAccessToken() !== null;
    },

    sendInvitationToAppDialog: function(recipients_ids, success_callback, failure_callback) {
        var params = {
            display: 'touch',
            message: I18n.t('social.facebook.invitations.message', {full_name: Profile.getCurrentUser().getFullName()}),
            title: I18n.t('social.facebook.invitations.title'),
            app_id: Tmo.Adapters.facebook.options.client_id,
            to: recipients_ids.join(","),
            redirect_uri: Tmo.Adapters.facebook.options.callbackUrl + "?dialog_invitation=1"
        };

        window.plugins.childBrowser.showWebPage('https://www.facebook.com/dialog/apprequests?'+Server.serialize(params), {showLocationBar:false});
        success_callback && success_callback();

    },

    postObjectToWall: function(message, object, success_callback, failure_callback)
    {
//        object.constructor.modelName == 'Event'
        var name = object.shareName();
        var description = object.shareDescription();
        if (['Event','Place'].indexOf(object.constructor.modelName) != -1) {
            message = object.toFacebookMessage();
        }
        var link = "http://tipmeout.com";

        var picture = object.sharePicture();

        Tmo.Adapters.facebook.postToWall(name, message, description, link, picture, success_callback, failure_callback);
    },

    postToWall: function(name, message, description, link, picture, success_callback, failure_callback)
    {
        Tmo.Adapters.facebook.ensureIsAuthenticated(function(access_token){
            var params = {
                display: 'iframe',
                message: message,
                name: name,
                picture: picture,
                description: description,
                link: link,
                access_token: access_token
            };

            Tmo.LoadMask.show(I18n.t('social.facebook.posting_to_wall'));
            Ext.Ajax.request({
                url:'https://graph.facebook.com/me/feed',
                params: params,
                method:'POST',
                success:function (xhr) {
                    success_callback && success_callback();
                    Tmo.LoadMask.hide();
                },
                failure:function (xhr) {
                    failure_callback && failure_callback();
                    Tmo.LoadMask.hide();
                }
            });
        }, function() {
            failure_callback && failure_callback();
            Tmo.LoadMask.hide();
        });

    },

    api:{
        getMe:function (success, failure) {
            if (Ext.is.Desktop && TmoConfig.debug) {
                FB.api('/me', function(response) {
                  if (!response || response.error) {
                    failure && failure(response.error||'Error occured in FB.api');
                  } else {
                    success && success(response);
                  }
                });
            } else {
                Ext.Ajax.request({
                    url:'https://graph.facebook.com/me',
                    params:{
                        access_token:Tmo.Adapters.facebook.getAccessToken()
                    },
                    method:'GET',
                    success:function (xhr) {
                        success && success(JSON.parse(xhr.responseText));
                    },
                    failure:function (xhr) {
                        localStorage.removeItem(Tmo.Adapters.facebook.localStoreKey);
                        failure && failure(JSON.parse(xhr.responseText));
                    }
                });
            }
        }
    },

    desktop: {
        init: function() {
          window.fbAsyncInit = function() {
            FB.init({
              appId      : '414712365222166', // App ID
              status     : false, // check login status
              cookie     : false, // enable cookies to allow the server to access the session
              xfbml      : true  // parse XFBML
            });
          };
          
          (function(d){
             var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement('script'); js.id = id; js.async = true;
             js.src = "//connect.facebook.net/en_US/all.js";
             ref.parentNode.insertBefore(js, ref);
           }(document));
        },
        authenticate: function (success, failure) {
            FB.login(
                function(result) {
                    var access_token = result.authResponse.accessToken;
                    Tmo.Adapters.facebook.setAccessToken(access_token);
                    success && success(access_token);
                },
                {
                  scope: "email,friends_hometown"
                }
            );
        }
    }

}
;
