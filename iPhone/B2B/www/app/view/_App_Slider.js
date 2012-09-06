Ext.define("B2B.view._App_Slider", {
    extend: 'Ext.ux.slidenavigation.SlideNavigation',
    xtype: 'appslider',
    requires: [
        'Ext.Container',
        'Ext.Toolbar'
    ],
    config: {
        fullscreen: true,
        slideSelector: 'slidableToolbar',
        selectSlideDuration: 200,
        list: {
            id: "slider_left",
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
                title: '<div id="slider_title" class="slider_item_icon">'+i18n.app.PANEL_CLAIM+'</div>',
                id: 'slider_myprofile',
                slideButton: {
                    selector: 'titlebar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'slider slidebutton',
                    ui: 'plain'
                },
                items: [
                    {
                        xtype: 'appcontainer',
                        id: 'appcontainer'
                    }
                ]
            },
            {
                title: '<div class="slider_item_icon slider_whatsnew">'+i18n.app.LABEL_WHATSNEW+'</div>' ,
                group: 'News',
                id: 'slider_whatsnew',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'slider slidebutton',
                    ui: 'plain'
                },
                items: [
                    {
                        xtype: 'viewwhatsnew',
                        id: 'viewwhatsnew'
                    }
                ]
            },
            {
                title: '<div id="slider_goodies"  class="slider_item_icon slider_bottle">'+i18n.app.LABEL_BOTTLESPINNER+'</div>' ,
                group: 'Goodies',
                id: 'slider_goodies',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'slider slidebutton',
                    ui: 'plain'
                },
                items: [
                    {
                        xtype: 'viewbottlespinner',
                        id: 'viewbottlespinner'
                    }
                ]
            },
            {
                title: '<div class="slider_item_icon slider_terms">'+i18n.app.LABEL_TERMS+'</div>' ,
                group: 'Privacy',
                id: 'slider_privacy',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'slider slidebutton',
                    ui: 'plain'
                },
                items: [
                    {
                        xtype: 'viewterms',
                        id: 'viewterms'
                    }
                ]
            },
            {
                title: '<div class="slider_item_icon slider_aboutus">'+i18n.app.LABEL_ABOUTUS+'</div>' ,
                group: 'Privacy',
                id: 'slider_aboutus',
                slideButton: {
                    selector: 'toolbar',
                    docked: 'left',
                    iconMask: true,
                    iconCls: 'slider slidebutton',
                    ui: 'plain'
                },
                items: [
                    {
                        xtype: 'viewaboutus',
                        id: 'viewaboutus'
                    }
                ]
            }
        ]
    }
});