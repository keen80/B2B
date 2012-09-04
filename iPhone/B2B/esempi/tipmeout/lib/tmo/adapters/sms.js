Tmo.Adapters.sms = {};

Tmo.Adapters.sms.send = function(phone_numbers, msg, success_callback, failure_callback)
{
    if (Ext.is.Android)
    {
        window.plugins.sms.sendSMS(phone_numbers, msg,
            function() {
                success_callback && success_callback();
            },
            function() {
                failure_callback && failure_callback();
            }
        );
    } else if (Ext.is.iOS) {
        var myCallback = function(result) {
            if(result === SMSComposer.ComposeResultType.Sent)
                success_callback && success_callback();
            else {
                failure_callback && failure_callback();
            }
        };
        window.plugins.smsComposer.showSMSComposerWithCB(myCallback, phone_numbers, msg);
    } else if (Ext.is.Blackberry) {
        window.plugins.app_invoker.sendSMS(phone_numbers, msg,
            function() {
                success_callback && success_callback();
            },
            function() {
                failure_callback && failure_callback();
            }
        );
    }
};