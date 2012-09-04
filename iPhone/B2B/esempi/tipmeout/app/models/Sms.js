App.models.Sms = Ext.regModel('Sms', {

    fields: [
        { name: 'phone_numbers', type: 'string'},
        { name: 'message', type: 'string'}
    ],

    send: function(success_callback, failure_callback) {
        Tmo.debug("Sending msg to " + this.get('phone_numbers') + ":", this.get('message'));
        Tmo.Adapters.sms.send(
            this.get('phone_numbers'),
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

App.models.Sms.initFromUsersList = function(users, message)
{
    var phone_numbers = _.map(Ext.getCmp('share_users_list').getSelectedRecords(), function(x) { return x.data.tel }).join(",");
    return Ext.ModelMgr.create({
        phone_numbers: phone_numbers,
        message: message
    },'Sms');
};