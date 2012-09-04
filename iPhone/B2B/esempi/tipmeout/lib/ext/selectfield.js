App.views.SelectField = Ext.extend(Ext.form.Select, {

    selectOptions: [],

    constructor: function(config) {
        var selectField = this;

        if (config.includeBlank){
            var blankOption = Ext.isObject(config.includeBlank) ? config.includeBlank : {text:"", value: null};
            config.options = config.options || [];
            config.options.splice(0,0,blankOption);
        }

        this.selectOptions = config.options;
        if (!this.value && this.placeHolder)
            config.options = null;


        config = Ext.apply(config);
        App.views.SelectField.superclass.constructor.call(this, config);

        this.addListener('afterrender', function(c){
            Ext.select('.x-field-select .x-field-mask').on('tap', function(el) {
              Tmo.Adapters.keyboard.hide();
              selectField.setOptions(selectField.selectOptions);
            });
        });
    }
});
Ext.reg('tmo_selectfield', App.views.SelectField);