Ext.define("B2B.view._App", {
    extend: 'Ext.NavigationView',
    xtype: '_app',

    config: {
        navigationBar: false,
        items: [
            {
                xtype: 'appslidercontainer'
            }
        ]
    }
});
