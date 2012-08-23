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
                    title: i18n.app.PANEL_NAVIGATION,
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
                title: '<div class="nav_slidemenu_profile">'+i18n.app.PANEL_CLAIM+'</div>',
                slideButton: {
                    selector: 'titlebar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'more',
                    ui: 'plain'
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
                    iconCls: 'more',
                    ui: 'plain'
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
                    iconCls: 'more',
                    ui: 'plain'
                },
                items: [
                  /*  {
                        xtype: 'viewterms'
                    }
                    */
                ],
                handler: function(){ alert("click"); }
            },
            {
                title: i18n.app.LABEL_ABOUTUS ,
                group: 'Privacy',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'more'
                },
                items: [
                    {
                        xtype: 'viewaboutus'
                    }
                ]
            }
        ]
    }
});