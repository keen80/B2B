App.views.DashboardIndex = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var titleBar = {
            dock:'top',
            xtype:'toolbar',
            title:I18n.t('dashboard.title'),
            defaults:{
                iconMask:true
            },

            items:(TmoConfig.debug === true ? [{
                    xtype:"button",
                    text:"debug",
                    handler:function () {
                        Ext.dispatch({
                            controller:'Debug',
                            action:'index',
                            historyUrl:'Debug/index',
                            hidden:(!TmoConfig.debug)
                        });
                    }
                }] :[])
        };

//        var debugContainer = {
//            xtype: 'container',
//            style: {
//                fontSize: '70%',
//                padding: '.2em .5em'
//            },
//            html: Server.compilationVersion()
//        };

        var dashboardListTpl = new Ext.XTemplate(
            '<p class="dashboard_intro">{[I18n.t("dashboard.what_can_tmo_do_for_you_today")]}</p>',
            '<ul class="dashboard_list x-hasbadge">',
            '<tpl for=".">',
            '  <li>',
            '    <a href="#{link_url}"><img src="images/icons/dashboard/{icon}.png" />{name}</a>',
            '    <tpl if="this.nonZero(count)">',
            '      <span class="x-badge">{count}</span>',
            '    </tpl>',
            '  </li>',
            '</tpl>',
            '</div>',
            {
                nonZero: function(value){
                     return typeof value == 'number' && value > 0;
                }
            }
        );

        var dashboardContainer = new Ext.DataView({
            tpl: dashboardListTpl,
            scroll: false,
            itemSelector: 'ul > li',
            overItemCls: 'x-item-selected',
            pressedDelay: 0,
            store: new Ext.data.Store({
                fields: ['name', 'link_url', 'icon'],
                data: [
                    {name: I18n.t('dashboard.buttons.network'), link_url: 'Network/index', icon: 'network'},
                    {name: I18n.t('dashboard.buttons.places'), link_url: 'Places/index', icon: 'places'},
                    {name: I18n.t('dashboard.buttons.events'), link_url: 'Events/index', icon: 'events'},
                    {name: I18n.t('dashboard.buttons.notifications'), link_url: 'Messages/index', icon: 'inbox', count: this.resources_count.messages},
                    {name: I18n.t('dashboard.buttons.me'), link_url: 'Profile/show', icon: 'profile'},
                    {name: I18n.t('dashboard.buttons.settings'), link_url: 'Settings/index', icon: 'settings'}
                ]
            }),
            flex: 1
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            dockedItems: [titleBar],
            items: [dashboardContainer],
            cls: 'dashboard_page'
        });

        App.views.DashboardIndex.superclass.initComponent.call(this);
    }

    /* --- actions ------------------------------------------------------------------------------ */
});

Ext.reg('DashboardIndex', App.views.DashboardIndex);
