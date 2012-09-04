var AppInvoker = function () {};

AppInvoker.prototype.sendSMS = function (phones, message, successCallback, failureCallback) {
    return PhoneGap.exec(successCallback, failureCallback, 'AppInvoker', "invokeSMS", [phones, message]);
};

AppInvoker.prototype.sendEmail = function (emails, subject, message, successCallback, failureCallback) {
    return PhoneGap.exec(successCallback, failureCallback, 'AppInvoker', "invokeEmail", [emails, subject, message]);
};

PhoneGap.addConstructor(function() {
    PhoneGap.addPlugin("app_invoker", new AppInvoker());
});

