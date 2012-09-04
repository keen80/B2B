App.views.Search = Ext.extend(Ext.form.Search, {

    constructor: function(config) {
        var searchField = this;

        config.useClearIcon = true;
        config = Ext.apply(config);

        App.views.Search.superclass.constructor.call(this, config);
    },

    onClearIconTap: function() {
        if (!this.disabled) {
            this.setValue('');
            if (this.nextSibling().xtype == "button") {
                this.nextSibling().handler()
            }
        }
    }
});
Ext.reg('tmo_searchfield', App.views.Search);