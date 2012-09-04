Tmo.Adapters.PushNotification = {};


Tmo.Adapters.PushNotification.init = function (deviceIdRetrievedCallback) {
    if (Ext.is.Android) {
        window.plugins.pushNotification.registerCallback(function(){}, function(){});
        window.plugins.pushNotification.getDeviceId(function (device_id, c2dm_id) {
            if (typeof device_id !== 'undefined') {
                deviceIdRetrievedCallback && deviceIdRetrievedCallback({device_type: "android", device_id: device_id, android_c2dm_id: c2dm_id});
            } else {
                deviceIdRetrievedCallback && deviceIdRetrievedCallback(null);
            }
        });
    }
    if (Ext.is.iOS) {
        window.plugins.pushNotification.startNotify();
        window.plugins.pushNotification.register(
            function(e){deviceIdRetrievedCallback && deviceIdRetrievedCallback({device_type: "ios", device_id: e.deviceToken})},
            function(e){deviceIdRetrievedCallback && deviceIdRetrievedCallback(null);},
            [{ alert:true, badge:true, sound:true }]
        );
    }
};

Tmo.Adapters.PushNotification.register = function (device_info, callback) {
    if (typeof device_info !== "undefined") {
        Server.request('POST', '/api/push_notifications/register', {
            params: device_info,
            success:function () {
                callback && callback(true);
            },
            failure:function () {
                callback && callback(false);
            }
        });
    }
};

Tmo.Adapters.PushNotification.onMsgId = function(msg_id) {
    if (Profile.isLogged()) {
        if (typeof msg_id === "number") {
            //dispatch to msg
            Ext.dispatch({
                controller: 'Messages',
                action: 'show',
                historyUrl: 'Messages/show/' + msg_id,
                message_id: msg_id
            });
        } else {
            //dispatch to app
        }
    }
};