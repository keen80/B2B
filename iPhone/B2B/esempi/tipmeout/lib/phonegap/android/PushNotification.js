var PushNotification = {
    registerCallback:function (successCallback, failureCallback) {
        return PhoneGap.exec(
            successCallback, // called when signature capture is successful
            failureCallback, // called when signature capture encounters an error
            'PushNotificationPlugin', // Tell PhoneGap that we want to run "PushNotificationPlugin"
            'registerCallback', // Tell the plugin the action we want to perform
            []);                       // List of arguments to the plugin
    },
    notificationCallback:function (json) {
    },

    notificationOpened:function (msg_id) {
        setTimeout(function(){Tmo.Adapters.PushNotification.onMsgId(msg_id)}, 100);
//        Tmo.Adapters.PushNotification.onMsgId(msg_id);
//        window.delayedOnMessage = function() {
//            window.delayedOnMessage = null;
//            Tmo.Adapters.PushNotification.onMsgId(msg_id);
//        };
    },
    getDeviceId:function (callback) {
        return PhoneGap.exec(function (res_data) {
                var data = JSON.parse(res_data);
                callback(data.apid, data.c2dm_id);
            },
            function () {
                callback(null, null);
            },
            'PushNotificationPlugin',
            'getDeviceId',
            []);
    }
};

PhoneGap.addConstructor(function () {
    PhoneGap.addPlugin("pushNotification", PushNotification);
});


