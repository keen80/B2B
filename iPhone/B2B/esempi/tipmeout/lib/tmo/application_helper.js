Tmo.getServerAddress = function(url) {
    return TmoConfig.server + url;
};

Tmo.settings = {
    app_name: "TipMeOut",
    site_url: "http://tipmeout.com"
};

Tmo.isVersionOutOfDate = function(version_from_server) {
    return (!Ext.is.Desktop) && (!Ext.is.Blackberry) && (!TmoConfig.debug) && (TmoConfig.version !== version_from_server);
};

Tmo.showAppOutOfDatePopup = function() {
    var _showAppOutOfDatePopup = new Ext.Panel({
        id: 'update_app_popup',
        modal: true,
        floating: true,
        centered: true,
        scroll: 'vertical',
        width: 300,
        height: 200,
        styleHtmlContent: true,
        hideOnMaskTap: false, //disbale click handlers
        html: '<p>'+I18n.t('support.please_update_your_application')+'</p>',
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('support.application_out_of_date')
        }]
    });

    return function() {
        _showAppOutOfDatePopup.show();
    };
}();

Tmo.showLongMessage = function (message) {
    var dlg = new Ext.Panel({
        modal:true,
        floating:true,
        centered:true,
        scroll:'vertical',
        width:300,
        height:200,
        styleHtmlContent:false,
        hideOnMaskTap:true,
        html:message,
        listeners:{
            tap:{
                element:'el',
                fn:function () {
                    dlg.destroy();
                }
            }
        }
    });
    dlg.show();
};

// turn card switching animations off
Ext.Panel.override({
    setActiveItem : function(card, animation) {
//        if (Ext.is.Android)
//        {
        animation = false;
//        }
        this.layout.setActiveItem(card, animation);
        return this;
    }
});

// default animation options set to reverse slide
Ext.dispatchBack = function(params)
{
    return Ext.dispatch(Ext.Object.merge(
        {
            animation: {
                type: 'slide',
                reverse: true
            }
        },
        params || {}
    ));
};


Tmo.onDeviceReady = function()
{
    // backbutton
    // http://www.sencha.com/forum/showthread.php?158179-How-to-link-Android-Back-Button-to-Sencha-overlays-and-message-boxes&p=682889
    if (Ext.is.Android) {
        document.addEventListener("backbutton", function(){
            Ext.each(Ext.query('.x-floating'), function(el,idx) {
                var cmp = Ext.getCmp(el.id);
                if (el.id !== "update_app_popup") {
                    if(!cmp.isHidden()) {
                        cmp.hide();
                    }
                }
            });
            Tmo.BackButton._onBackUse();
        }, false);
    }

    if (Ext.is.iOS) {
        ChildBrowser && ChildBrowser.install();
        App.setBadge(Profile.getCurrentUserUnreadMessagesCount());
    }

    if (!Ext.is.Desktop) {
        if (window.plugins.childBrowser && typeof window.plugins.childBrowser.onLocationChange !== "function") {
            window.plugins.childBrowser.onLocationChange = Tmo.Adapters.ChildBrowserLoc;
        }
    }
};

Tmo.onResume = function()
{
    if (Ext.is.iOS) {
        App.setBadge(Profile.getCurrentUserUnreadMessagesCount());
    }
};



Ext.Controller.prototype.renderPage = function(action, options, params) {
    var controller = this.id;
    var viewObjName = action.toCamel() + controller.toCamel().capitalize() + 'View'; //example: showNetworkView

    if(Ext.isEmpty(params))
        params = {};
    if(Ext.isEmpty(options))
        options = {};

    if(Ext.isEmpty(params.animation))
        params.animation = options.animation;
    if(Ext.isEmpty(params.back_page))
        params.back_page = options.back_page;

    if (!this[viewObjName] || this[viewObjName].isDestroyed)
    {
        if(Ext.isEmpty(params.xtype))
            params.xtype = controller.toCamel().capitalize()+action.toCamel().capitalize();

        this[viewObjName] = this.render(params);
    }
    else
    {
        for (var param in params)
        {
            this[viewObjName][param] = params[param];
        }
    }
    
    if(Ext.isEmpty(params.animation))
        params.animation = { type: 'slide' };

    Tmo.BackButton.setCurrentConfig(options);

    var oldCard = this.application.viewport.getActiveItem();
    this.application.viewport.setActiveItem(this[viewObjName], params.animation);
    if (oldCard && this[viewObjName] != oldCard) { oldCard.destroy() }
    Tmo.LoadMask.hide();
};

Ext.Dispatcher.on('before-dispatch', function(interaction) {
  Tmo.LoadMask.show();
  return true;
});

function double_digit(number){
    return number < 10 ? "0"+number : number;
}