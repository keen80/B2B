Ext.define("B2B.view._App_Slider", {
    extend: 'Ext.ux.slidenavigation.SlideNavigation',
    xtype: 'appslidercontainer',
    id: 'appslidercontainer',
    requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar'
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
                ui: 'plain',
                id: 'slider_toolbar',                  
                title: {
                    title: '<img id="slider_logo" src="resources/img/logopin_text_black_small.png" width="160px">',
                    width: 200,
                    left: 0
                }
            }]
            
        },
        groups: {
            'Profile': 1,
            'Goodies': 2,
            'News': 3,
            'Privacy': 4
        },
        defaults: {
            xtype: 'container'
        },
        items: [
            {
                title: '<div class="nav_slidemenu_profile">'+i18n.app.PANEL_CLAIM+'</div>',
                id: 'slider_myprofile',
                slideButton: {
                    selector: 'titlebar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'list slidebutton',
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
                id: 'slider_whatsnew',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'list slidebutton',
                    ui: 'plain'
                },
                items: [
                    {
                        xtype: 'viewwhatsnew'
                    }
                ]
            },
            {
                title: i18n.app.LABEL_GOODIES,
                group: 'Goodies',
                id: 'slider_goodies',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'list slidebutton',
                    ui: 'plain'
                },
                items: [
                    {
                 //       xtype: 'viewwhatsnew'
                    }
                ]
            },
            {
                title: i18n.app.LABEL_TERMS,
                group: 'Privacy',
                id: 'slider_privacy',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'list',
                    ui: 'plain'
                },
                items: [
                    {
                        xtype: 'viewterms'
                    }
                ]
            },
            {
                title: i18n.app.LABEL_ABOUTUS ,
                group: 'Privacy',
                id: 'slider_aboutus',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'list slidebutton',
                    ui: 'plain'
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