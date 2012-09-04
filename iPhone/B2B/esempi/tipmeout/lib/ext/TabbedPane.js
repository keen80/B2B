Ext.TabbedPane = Ext.extend(Ext.Panel, {

    componentCls: 'x-tabpanel',

    ui: 'dark',

    initComponent : function() {
        var layout = new Ext.layout.CardLayout(this.layout || {});
        this.layout = null;
        this.setLayout(layout);

        this.tabBar = new Ext.TabBar(Ext.apply({}, this.tabBar || {}, {
            cardLayout: layout,
            cardSwitchAnimation: false,
            dock: 'top',
            ui: this.ui,
            sortable: false,
            hidden: true
        }));

        if (this.dockedItems && !Ext.isArray(this.dockedItems)) {
            this.dockedItems = [this.dockedItems];
        }
        else if (!this.dockedItems) {
            this.dockedItems = [];
        }
        this.dockedItems.push(this.tabBar);

        Ext.TabPanel.superclass.initComponent.call(this);
    },

    getTabBar : function() {
        return this.tabBar;
    },

    changeTab: function(idx) {
        this.setActiveItem(idx);
        this.tabBar.doLayout();
    },

    onAdd: function(cmp, idx) {
        cmp.tab = this.tabBar.insert(idx, {
            xtype: 'tab',
            card: cmp
        });

        this.tabBar.doLayout();
    },

    onRemove: function(cmp, autoDestroy) {
        if (!this.destroying) {
            this.tabBar.remove(cmp.tab, autoDestroy);
            this.tabBar.doLayout();
        }
    }
});

Ext.reg('tabbedpane', Ext.TabbedPane);