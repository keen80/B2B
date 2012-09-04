Tmo.Adapters.email = {};

Tmo.Adapters.email.send = function(recipients, subject, msg, success_callback, failure_callback)
{
    if (Ext.is.Android)
    {
        window.plugins.sms.sendEmail(recipients, subject, msg,
            function() {
                success_callback && success_callback();
            },
            function() {
                failure_callback && failure_callback();
            }
        );
    } else if (Ext.is.iOS)
    {
        var myCallback = function(result) {
            if(result === EmailComposer.ComposeResultType.Sent)
                success_callback && success_callback();
            else {
                failure_callback && failure_callback();
            }
        };
        window.plugins.emailComposer.showEmailComposerWithCB(myCallback, subject, msg, undefined, undefined, recipients, false);
    } else if (Ext.is.Blackberry) {
        window.plugins.app_invoker.sendEmail(recipients, subject, msg,
            function() {
                success_callback && success_callback();
            },
            function() {
                failure_callback && failure_callback();
            }
        );
    } else if (Ext.is.Desktop) {
        var text = "Subject: " + subject +
            "\nRecipients: " + recipients +
            "\nBody: " + msg;

        Ext.Msg.alert("emailComposer", text, success_callback);
    }
    
};