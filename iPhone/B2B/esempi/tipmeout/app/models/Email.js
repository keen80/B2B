App.models.Email = Ext.regModel('Email', {

    fields: [
        { name: 'recipients', type: 'string'},
        { name: 'message', type: 'string'},
        { name: 'subject', type: 'string'}
    ],

    send: function(success_callback, failure_callback) {
        Tmo.debug("Sending email to " + this.get('recipients') + ":", this.get('message'));
        Tmo.Adapters.email.send(
            this.get('recipients'),
            this.get('subject'),
            this.get('message'),
            function () {
                success_callback && success_callback();
            },
            function () {
                failure_callback && failure_callback();
            }
        );

    }
});

App.models.Email.initFromUsersList = function(users, subject, message)
{
    var recipients = _.map(Ext.getCmp('share_users_list').getSelectedRecords(), function(x) { return x.data.email }).join(",");
    return Ext.ModelMgr.create({
        recipients: recipients,
        subject: subject,
        message: message
    },'Email');
};