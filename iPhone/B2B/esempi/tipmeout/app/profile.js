/* --- Profile config ----------------------------------------------------------------------------------------------- */

var Profile = {};

Profile.logout = function() {
    Profile.clear();
    Ext.redirect('Session/index');
};

Profile.inform_no_connection = function() {
    Tmo.LoadMask.hide();
    Profile.hideTabBar();
    if (Profile.getCurrentUser() == null) {
        Profile.logout();
    } else {
        Ext.dispatch({
            controller:'Session',
            action:'no_connection'
        });
    }
};

Profile.clear = function() {
    window.localStorage.auth_token = null;
    window.localStorage.current_user = null;
    Profile.unloadStores();
    Ext.Ajax.extraParams = {
        auth_token: window.localStorage.auth_token
        };
    // clear Facebook
    if (Tmo.Adapters.facebook.hasAccessToken()) {
        Tmo.Adapters.facebook.logout();
    }

    return true;
};

Profile.hasAuthToken = function() {
  return !Ext.isEmpty( window.localStorage.auth_token );    
};

Profile.setAuthToken = function(token) {
  window.localStorage.auth_token = token;
  Ext.Ajax.extraParams = {auth_token: window.localStorage.auth_token};

  return window.localStorage.auth_token;
};

Profile.setCurrentUser = function(current_user) {
  var user = Ext.ModelMgr.create(current_user, "User");
  window.localStorage.setItem('current_user', Ext.encode(user));
  App.setBadge(user.get('unread_count'));
  return user;
};

Profile.getCurrentUser = function() {
    try {
        var user_data = Ext.decode(window.localStorage.getItem('current_user'));
        return user_data ? Ext.ModelMgr.create(user_data.data, "User") : null;
    } catch (err) {
        return null
    }
};

Profile.getCurrentUserUnreadMessagesCount = function() {
    var current_user = Profile.getCurrentUser();
    if( current_user && current_user.data )
    {
        return current_user.data.unread_count || 0;
    }
    return 0;
};

Profile.updateAttributes = function(attributes) {
  var user = Profile.getCurrentUser();
  user.set(attributes);
  window.localStorage.setItem('current_user', Ext.encode(user));
};

Profile.isLogged = function() {
  return Profile.getCurrentUser() != null;
};

Profile.requireUser = function() {
    Server.request('GET', '/dashboard.json', {
        params:{},
        success: function(result) {
            if( Profile.hasAuthToken() ) {
                Profile.loadStores();
                return true;
            } else {
                Profile.inform_no_connection();
                return false;
            }
        },
        failure: function(result) {
            Profile.inform_no_connection();
            return false;
        }
    });
};

Profile.unloadStores = function() {
    Profile.hideTabBar();
    for(var key in App.stores) {
        var store = App.stores[key];
        if (store.requireUser)
            store.removeAll();
            store.autoLoad = false;
    }
};

Profile.loadStores = function() {
    Profile.showTabBar();
    for(var key in App.stores) {
        var store = App.stores[key];
        if (!store.autoLoad && store.requireUser) {
            store.autoLoad = true;
            store.load();
        }
    }
};

Profile.showTabBar = function() {
    if (App.tabBar)
        App.viewport.addDocked(App.tabBar, false);
};

Profile.hideTabBar = function() {
    if (App.tabBar)
        App.viewport.removeDocked(App.tabBar, false);
};

Profile.setup = function(result) {
    Profile.setAuthToken(result.auth_token);
    Profile.setCurrentUser(result.current_user);
};