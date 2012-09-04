Ext.ns('Ext.ux.form');
/**
 * @class Ext.ux.form.NumberPicker
 * @extends Ext.form.Field
 * 
Specialized field which has a button which when pressed, shows a {@link Ext.ux.NumberPicker}.


 * @xtype numberpickerfield
 */
Ext.ux.form.NumberPicker = Ext.extend(Ext.form.Field, {
    ui: 'select',

	/**
     * @cfg {Number} numberScale
     * List every how many numbers, eg. 5 lists 0, 5, 10, 15, etc. Defaults to 1
     */
    numberScale: 1,
    numberFrom: 0,
    numberTo: 100,
    
	/**
     * @cfg {Object/Ext.ux.NumberPicker} picker
     * An object that is used when creating the internal {@link Ext.ux.NumberPicker} component or a direct instance of {@link Ext.ux.NumberPicker}
     * Defaults to null
     */
    picker: null,

    
	/**
     * @cfg {Object/Number} value
     * Default value for the field and the internal {@link Ext.ux.NumberPicker} component. Accepts an object of 'number',
     * and 'number' values, all of which should be numbers, or a Number string.
     * 
     * Example: {number: 18} = 18
     */
	/**
     * @cfg {Boolean} destroyPickerOnHide
     * Whether or not to destroy the picker widget on hide. This save memory if it's not used frequently, 
     * but increase delay number on the next show due to re-instantiation. Defaults to false
     */
    destroyPickerOnHide: false,

    // @cfg {Number} tabIndex @hide

    // @cfg {Boolean} useMask @hide
    
    // @private
    initComponent: function() {
        this.addEvents(
            
			/**
             * @event change
             * Fires when a Number is selected
             * @param {Ext.ux.form.NumberPicker} this
             * @param {Number} Number The new Number
             */
            'change'
        );

        this.tabIndex = -1;
        this.useMask = true;

        Ext.form.Text.superclass.initComponent.apply(this, arguments);
    },

    
	/**
     * Get an instance of the internal Number picker; will create a new instance if not exist.
     * @return {Ext.ux.NumberPicker} NumberPicker
     */
    getNumberPicker: function() {
        if (!this.numberPicker) {
            if (this.picker instanceof Ext.ux.NumberPicker) {
                this.numberPicker = this.picker;
            } else {
                this.numberPicker = new Ext.ux.NumberPicker(Ext.apply(this.picker || { numberScale: this.numberScale, numberFrom: this.numberFrom, numberTo: this.numberTo }));
            }

            this.numberPicker.setValue(this.value || null);

            this.numberPicker.on({
                scope : this,
                change: this.onPickerChange,
                hide  : this.onPickerHide
            });
        }

        return this.numberPicker;
    },

    /**
     * @private
     * Listener to the tap event of the mask element. Shows the internal {@link #numberPicker} component when the button has been tapped.
     */
    onMaskTap: function() {
        if (Ext.ux.form.NumberPicker.superclass.onMaskTap.apply(this, arguments) !== true) {
            return false;
        }
        
        this.getNumberPicker().show();
    },
    
    /**
     * Called when the picker changes its value
     * @param {Ext.ux.NumberPicker} picker The number picker
     * @param {Object} value The new value from the number picker
     * @private
     */
    onPickerChange : function(picker, value) {
        this.setValue(value);
        this.fireEvent('change', this, this.getValue());
    },
    
    /**
     * Destroys the picker when it is hidden, if
     * {@link Ext.ux.form.icker#destroyPickerOnHide destroyPickerOnHide} is set to true
     * @private
     */
    onPickerHide: function() {
        if (this.destroyPickerOnHide && this.numberPicker) {
            this.numberPicker.destroy();
        }
    },

    // inherit docs
    setValue: function(value, animated) { 
        if (this.numberPicker) {
            this.numberPicker.setValue(value, animated);
            this.value = (value != null) ? this.numberPicker.getValue() : null;
        } else {            
            if (Ext.isObject(value)) {                             
				this.value =  value.number+"";
            } else {
                this.value = value;
            }
        }

        if (this.rendered) {
            this.fieldEl.dom.value = this.getValue(true);
        }
        
        return this;
    },
    
    
	/**
     * Returns the value of the field, which will be a {@link Number} unless the format parameter is true.
     * @param {Boolean} format True to format the value with Ext.util.Format.defaultNumberFormat
     */
    getValue: function(format) {
        var value = this.value || null;

		if (Ext.isObject(value)) {
			return value.number+"";
		}

		return value
    },
    
    // @private
    onDestroy: function() {
        if (this.numberPicker) {
            this.numberPicker.destroy();
        }
        
        Ext.ux.form.NumberPicker.superclass.onDestroy.call(this);
    }
});

Ext.reg('numberpickerfield', Ext.ux.form.NumberPicker);