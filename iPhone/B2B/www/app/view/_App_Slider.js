Ext.define("B2B.view._App_Slider", {
    extend: 'Ext.ux.slidenavigation.SlideNavigation',
    xtype: 'appslidercontainer',
    id: 'appslidercontainer',
    requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.event.publisher.Dom'
    ],
    
    config: {
        fullscreen: true,
       // slideSelector: 'x-toolbar',
        slideSelector: 'slidableToolbar',
        selectSlideDuration: 200,
        list: {
            minDrag: 200,
            maxDrag: 400,
            width: 400,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                ui: 'light',                    
                title: {
                    centered: true,
                    width: 200,
                    left: 0
                }
            }]
            
        },
        groups: {
            'Profile': 1,
            'News': 2,
            'Privacy': 3
        },
        defaults: {
            xtype: 'container'
        },
        items: [
            {
                title: '<div class="nav_slidemenu_profile"><img src='+B2B.app.APP_LOGO+'><span>'+B2B.app.APP_NAME+'</span>',
                slideButton: {
                    selector: 'titlebar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'list'
                },
                items: [
                    {
                        xtype: 'App_Container' 
                    }
                ]
            },
            {
                title: i18n.app.LABEL_WHATSNEW,
                group: 'News',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'list'
                },
                items: [
                    {
                        xtype: 'viewwhatsnew'
                    }
                ]
            },
            {
                title: i18n.app.LABEL_TERMS,
                group: 'Privacy',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'list'
                },
                items: [
                    {
                        xtype: 'viewterms'
                    }
                ]
            }
        ]
    }
});