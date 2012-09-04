var PushNotification = function() {};

// call this to register for push notifications
PushNotification.prototype.register = function(success, fail, options) {
    PhoneGap.exec(success, fail, "PushNotification", "registerAPN", options);
};

// call this to notify the plugin that the device is ready
PushNotification.prototype.startNotify = function(notificationCallback) {
    PhoneGap.exec(null, null, "PushNotification", "startNotify", []/* BUG - dies on null */);
};

// use this to log from JS to the Xcode console - useful!
PushNotification.prototype.log = function(message) {
    PhoneGap.exec(null, null, "PushNotification", "log", [{"msg":message}]);
};


PhoneGap.addConstructor(function() 
{
    if(!window.plugins)
    {
        window.plugins = {};
    }
    window.plugins.pushNotification = new PushNotification();
});



// Customized callback for receiving notification
PushNotification.prototype.notificationCallback = function (notification) {
    //window.plugins.pushNotification.log("Received a notification.");
    
    Ext.Msg.show(
    {
        title: Tmo.settings.app_name,
        msg: notification.alert,
        defaultTextHeight: 140,
        buttons: [
            {text: I18n.t('push_notification.policy_yes')},
            {text: I18n.t('push_notification.policy_no')}
        ],
        fn: function(e)
        {                 
            if ( e === I18n.t('push_notification.policy_yes') ) 
            {
                Tmo.Adapters.PushNotification.onMsgId( parseInt(notification.msg_id) );
            }     
        }
    });    
    
};

// when APN register succeeded
function PushNotificationSuccessCallback(e) {
    registerUAPush(e.deviceToken, e.host, e.appKey, e.appSecret);
}

// when APN register failed
function PushNotificationErrorCallback(e) {
    alert(e.error);
}

// register button action
function PushNotificationRegisterAPN() 
{    
    //window.plugins.pushNotification.log("Registering with APNS via the App Delegate");  
    window.plugins.pushNotification.register(PushNotificationSuccessCallback, PushNotificationErrorCallback, [{ alert:true, badge:true, sound:true }]);
    
    //or unregister
    //navigator.pushNotification.register();
}

// register urban airship push service after APN is registered successfully
function PushNotificationRegisterUAPush(deviceToken, host, appKey, appSecret) 
{    
    //window.plugins.pushNotification.log("Registering with Urban Airship.");
       
    var request = new XMLHttpRequest();
    
    // open the client and encode our URL
    request.open('PUT', host+'api/device_tokens/'+deviceToken, true, appKey, appSecret);
    
    // callback when request finished
    request.onload = function() {
        //        result.innerHTML = resultStr + 'Status: ' + this.status + '<br>';
        
        if(this.status == 200 || this.status == 201) 
        {
            alert("UA push service successfully registered.");
            // register UA push success
            //            result.innerHTML = result.innerHTML + 'UA push service successfully registered.';
        } else 
        {
            alert("Error when registering UA push service" + this.statusText);
            // error
            //            result.innerHTML = result.innerHTML + 'Error when registering UA push service.<br>error: '+this.statusText;
        }
    };
    
    request.send();
}