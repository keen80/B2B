App.views.Checkbox = Ext.extend(Ext.form.Checkbox, {
    constructor: function(config) {
        var defaultConfig = { labelWidth: '97%' };
        config = Ext.merge(defaultConfig, config);
        config = Ext.apply(config);
        App.views.Checkbox.superclass.constructor.call(this, config);

        this.addListener('afterrender', function(c){
            c.labelEl.on('tap', function(l){ c.isChecked() ? c.uncheck() : c.check() })
        });
    }
});
Ext.reg('tmo_checkbox', App.views.Checkbox);