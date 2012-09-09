Ext.define("B2B.view._App", {
    extend: 'Ext.NavigationView',
    id: "_app",
    xtype: '_app',
    config: {
        navigationBar: false,
        items: [
            {
                xtype: 'appslider',
                id: 'appslider'
            }
        ]
    }
});
