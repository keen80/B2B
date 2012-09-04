App.tabBarReloadTranslations = function() {
    Ext.each(App.tabBar.items.items, function(button){
        button.setText(I18n.t('dashboard.buttons.'+button.type))
    });
};

App.setActiveTab = function(controller) {
    if (Ext.isEmpty(Ext.query(".x-tab-active")))  {
        var tabButton = Ext.getCmp(controller.toLowerCase()+"_tab_button");
        if (tabButton) {
            tabButton.addCls('x-tab-active');
        }
    }
};

