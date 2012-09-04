App.views.TipsIndex = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var tipsFilterBar, tipItems, tipTpl;

        if (this.tipObjFor === 'place')
        {
            tipsFilterBar = FilterBar(this, Tmo.storeFilters.tips, this.onPlaceScopeChanged, {}, (new App.models.Tip()).tabsForTipsOwnership());
        }
        else if (this.tipObjFor === 'user')
        {
            tipsFilterBar = FilterBar(this, Tmo.storeFilters.tips, this.onScopeChanged, {}, (new App.models.Tip()).tabsForTipsPopularity());
        }

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();


        titleBar = {
            dock: 'top',
            title: I18n.t('tip.actions.index.header'),
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        if (this.tipObjFor === 'place')
        {
            tipTpl = new Ext.XTemplate(
                '<div class="global_list">',
                '   <div class="avatar" style="background-image: url({[this.getUserName(values)]})"></div>',
                '   <div class="name">',
                '   {[this.getUserName(values)]}',
                '   <span class="rating"><em>{[Tmo.Utils.stars(values.value)]}</em></span>',
                '   </div>',
                '   <div class="grey">{review:ellipsis(100)}</div>',
                '   <div class="grey">{[I18n.t("tip.actions.index.added_the")]} {[Tmo.Utils.formatDate(values.created_at)]}</div>',
                '</div>',
                {
                    getUserName: function(values) {
                        return Ext.ModelMgr.create(values.rater, "User").getFullName();
                    },
                    getUserThumbUrl: function(values) {
                        return Ext.ModelMgr.create(values.rater, "User").get('thumb_url');
                    }
                });
        }
        else if (this.tipObjFor === 'user')
        {
            tipTpl = new Ext.XTemplate(
                '<div class="global_list no_avatar">',
                '  <div class="name">@ {rateable.name}',
                '   <span class="rating"><em>{[Tmo.Utils.stars(values.value)]}</em></span>',
                '  </div>',
                '  <div class="grey">{review:ellipsis(100)}</div>',
                '  <div class="grey">{[I18n.t("tip.actions.index.added_the")]} {[Tmo.Utils.formatDate(values.created_at)]}</div>',
                '</div>'
            );
        }

        var tipsList = new Ext.List({
            plugins: [new Tmo.PaginationListPlugin()],
            itemTpl: tipTpl,
            flex: 1,
            store: App.stores.tips,
            listeners: {
                selectionchange:
                {
                    fn: this.onShowAction,
                    scope: this
                }
            }
        });

        if (this.tipObjFor === 'place')
        {
            tipItems = [App.headers.render('places/shared/header', this.tipObj.data), tipsFilterBar.getBar(), tipsList];
        }
        else if (this.tipObjFor === 'user')
        {
            tipItems = [ App.headers.render('profile/shared/header', this.user), tipsList ];

            //if not current user then it can display filter bar
            if (!this.user.isCurrentUser()) {
                tipItems = [App.headers.render('profile/shared/header', this.user), tipsFilterBar.getBar(), tipsList];
            }
        }

        var tipsContent = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            fullscreen: true,
            items: tipItems
        });


        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            dockedItems: [titleBar],
            items: [tipsContent]
        });

        App.views.TipsIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */
    onShowAction: function(sel, records) {
        if (records[0] !== undefined) {
            var row = records[0];
            if (this.tipObjFor === 'place')
            {
                Ext.dispatch({
                    controller: 'Tips',
                    action: 'show',
                    historyUrl: 'Tips/show/' + row.getId(),
                    id: row.getId(),
                    tipObj: this.tipObj,
                    tipObjFor: 'place',
                    user_id: row.get('rater_id')
                });
            }
            else if (this.tipObjFor === 'user')
            {
                Ext.dispatch({
                    controller: 'Tips',
                    action: 'show',
                    historyUrl: 'Tips/show/' + row.getId(),
                    id: row.getId(),
                    tipObjFor: 'user',
                    user: this.user
                });
            }
        }
    },

    onScopeChanged: function(view, filter, scope) {
        filter.set('user_id', view.user.getId());
        filter.set('search_scope', scope);
        filter.filter();
    },
    onPlaceScopeChanged: function(view, filter, scope) {
        filter.set('id', view.tipObj.getId());
        filter.set('tip_for', 'place');
        filter.set('user_id', Profile.getCurrentUser().getId());
        filter.set('search_scope', scope);
        filter.filter();
    }
});

Ext.reg('TipsIndex', App.views.TipsIndex);