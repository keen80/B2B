Tmo.PaginationListPlugin = function(config) {
    Tmo.PaginationListPlugin.superclass.constructor.call(this, config);
};

Ext.extend(Tmo.PaginationListPlugin, Ext.plugins.ListPagingPlugin, {
    autoPaging: false,
    loadMoreText: I18n.t('support.load_more_text'),
    isLoadPageButtonListenerSet: false,
    resetCurrentPage: true,

    onListUpdate : function() {
        if (!this.rendered) {
            this.render();
        }

        this.el.hide();
        this.el.appendTo(this.list.getTargetEl());
        if (!this.autoPaging) {
            this.el.removeCls('x-loading');
        }

        var loadPageButton = Ext.get("load_next_page_button");
        if (loadPageButton && !this.isLoadPageButtonListenerSet) {
            this.isLoadPageButtonListenerSet = true;
            loadPageButton.on("tap", this.onLoadNextPageButton, this);
        }

        this.loading = false;
    },

    render : function() {
        //console.log('Tmo.PaginationListPlugin#render')

        var list = this.list,
            targetEl = list.getTargetEl(),
            html = '';

        if ( this.list.store.loading ) {
            this.list.loadMask.disabled = false;
            this.list.loadMask.show();
        }

        if (!this.autoPaging) {
            html += '<div class="x-list-paging-msg" id="load_next_page_button">' + this.loadMoreText + '</div>';
        }

        this.el = targetEl.createChild({
            cls: 'x-list-paging' + (this.autoPaging ? ' x-loading' : ''),
            html: html + Ext.LoadingSpinner
        });

        if (this.autoPaging) {
            this.mon(targetEl.getScrollParent(), 'scrollend', this.onScrollEnd, this);
        }
        else {
            this.mon(this.el, 'tap', this.onPagingTap, this);
        }
        this.rendered = true;
    },

    init: function(list) {
        list.store.on("load", this.onStoreLoad, this);
        Tmo.PaginationListPlugin.superclass.init.call(this, list);
    },

    onLoadNextPageButton: function(store) {
        this.resetCurrentPage = false;
    },

    onStoreLoad: function(store, records, success) {
        this.list && this.list.loadMask && (this.list.loadMask.disabled = false);

        if ( records !== undefined ) {
            //Tmo.debug("records.length: " + records.length);
            //Tmo.debug("store.pageSize: " + store.pageSize);

            var includesGooglePlace = store.last() && store.last().get('is_gp');

            if ((records.length < store.pageSize) || includesGooglePlace) {
                this.el && this.el.hide();
            } else {
                this.el && this.el.show();
            }
        }

        if (this.resetCurrentPage) {
            if (this.list && this.list.store)
                this.list.store.currentPage = 1;
        } else {
            this.resetCurrentPage = true;
        }
    }
});
