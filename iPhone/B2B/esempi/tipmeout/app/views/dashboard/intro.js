App.views.DashboardIntro = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var titleBar;

        /* --- init --------------------------------------------------------------------------------- */
        var homeButton = {
            text: (I18n.t('action.finish_link')),
            ui: 'action',
            handler: function(){
                Profile.showTabBar();

                var requestParams = Server.toRailsParams('user', {intro_read: 'true'});
                requestParams['_method'] = 'PUT';
                Server.request('POST', '/profile', { params: requestParams });

                Ext.dispatch({
                    controller: 'Dashboard',
                    action: 'index',
                    historyUrl: 'Dashboard/index'
                });
            }
        };

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('intro.title'),
            defaults: { iconMask: true },
            items: [ {xtype: 'spacer'}, {xtype: 'spacer'}, homeButton ]
        };

        var introCardTpl = new Ext.XTemplate(
            '<div class="intro_card">',
            '   <div class="intro_screen" style="background-image: url({img})"></div>',
            '   <p class="small">{text}</p>',
            '</div>'
        );

        var introData = [];
        for (var i=0; i<4; i++) {
            var index = i+1;
            introData.push({
                xtype: 'component',
                tpl: introCardTpl,
                data: { text: I18n.t('intro.page_'+index), img: 'images/intro/page_'+index+'_'+I18n.locale+'.png' }
            })
        }

        var introContainer = {
            id: 'intro_carousel',
            xtype: 'carousel',
            layout: 'vbox',
            items: introData
        };

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            dockedItems: [titleBar],
            items: [introContainer]
        });

        App.views.DashboardIntro.superclass.initComponent.call(this);
    }

    /* --- actions ------------------------------------------------------------------------------ */
});

Ext.reg('DashboardIntro', App.views.DashboardIntro);
