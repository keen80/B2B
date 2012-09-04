App.views.ErrorField = Ext.extend(Ext.Component, {

	// privat
	initComponent: function() {
		config = {
			xtype: 'component',
			id: this.fieldname + 'ErrorField',
			cls: 'errorfield',
			tpl: [
				'<tpl if="values.length &gt; 0">',
				'	<ul>',
				'		<tpl for=".">',
				'			<li>{field} {message}</li>',
				'		</tpl>',
				'	</ul>',
				'</tpl>'
			],
			hidden: true
		};

		Ext.apply(this, config);
		App.views.ErrorField.superclass.initComponent.call(this);
	}

});
Ext.reg('App.views.ErrorField', App.views.ErrorField);

App.views.FormPanelWithErrors = Ext.extend(Ext.form.FormPanel, {
    constructor: function(config) {
        config = Ext.apply(config);
        App.views.FormPanelWithErrors.superclass.constructor.call(this, config);
        
        this.addListener('afterrender', function(c){
            c.scroller && c.scroller.on('scrollstart', Tmo.Adapters.keyboard.hide);
        });
    },

  showErrors: function(errors) {
      if ( Ext.isObject(errors) ) {
        this.fields.each(function(field) {
            try {
                var field_name = Server.unescapeBrackets(field.name); //Server.paramsToUnderscore(field.name);

                var fieldErrors = errors[field_name],
                    errorField = this.resetField(field);

                if (errorField && fieldErrors && fieldErrors.length > 0) {
                    field.addCls('invalid-field');
                    errorField.update(fieldErrors.join(', '));
                    errorField.show();
                    delete errors[field_name];
                }
            } catch(err) {
                Tmo.logError(err);
            }
        }, this);

       Ext.iterate(errors,function(fieldName,fieldErrors){
          var field_name = Server.unescapeBrackets(fieldName); //Server.paramsToUnderscore(field.name);
          var errorField = Ext.get(field_name+'ErrorField');
          if (errorField) {
              try {
                  errorField.update(fieldErrors.join(', '));
                  errorField.show();
              } catch(err) {
                  Tmo.logError(err);
              }
          }
          delete errors[field_name];
        });
      }
    },

    resetField: function(field) {
        var field_name = field.name; //Server.paramsToUnderscore(field.name);
        var errorField = this.down('#'+field_name+'ErrorField');
        if ( Ext.isObject(errorField) ) {
          errorField.hide();
          field.removeCls('invalid-field');
        }
        return errorField;
    }

});
Ext.reg('App.views.FormPanelWithErrors', App.views.FormPanelWithErrors);