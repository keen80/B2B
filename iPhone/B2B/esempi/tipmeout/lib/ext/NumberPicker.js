Ext.ns('Ext.ux');

/**
 * @class Ext.ux.NumberPicker
 * @extends Ext.Picker
 *
 * <p>A number picker component which shows a NumberPicker on the screen. This class extends from {@link Ext.Picker} and {@link Ext.Sheet} so it is a popup.</p>
 * <p>This component has no required properties.</p>
 *
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #numberFrom}</li>
 *   <li>{@link #numberTo}</li>
 * </ul>
 *
 * <h2>Example code:</h2>
 *
 * <pre><code>
var numberPicker = new Ext.ux.NumberPicker();
numberPicker.show();
 * </code></pre>
 *
 * <p>you may want to adjust the {@link #numberFrom}, {@link #numberTo} and {@link #numberScale} properties:
 * <pre><code>
var numberPicker = new Ext.ux.NumberPicker({
    numberFrom: 8,
    numberTo  : 18,
	numberScale: 5
});
numberPicker.show();
 * </code></pre>
 *
 * @constructor
 * Create a new Numberpicker
 * @param {Object} config The config object
 * @xtype numberpicker
 */
Ext.ux.NumberPicker = Ext.extend(Ext.Picker, {
    /**
     * @cfg {Number} numberScale
     * List every how many numbers, eg. 5 lists 0, 5, 10, 15, etc. Defaults to 1
     */

	numberScale: 1,
	
    /**
     * @cfg {Number} numberFrom
     * The start number for the number picker.  Defaults to 0
     */
    numberFrom: 0,

    /**
     * @cfg {Number} numberTo
     * The last number for the number picker.  Defaults to 100
     */
    numberTo: 100,

    /**
     * @cfg {String} numberText
     * The label to show for the number column. Defaults to 'Number'.
     */
    numberText: 'Number',

    constructor: function(config){
        config = Ext.apply(config);
        Ext.ux.NumberPicker.superclass.constructor.call(this, config);

        Tmo.Adapters.keyboard.hide();
        Ext.select('.x-field-select .x-field-mask').on('tap', function(el) {
          Tmo.Adapters.keyboard.hide();
        });
    },

    initComponent: function() {
        var numbersFrom = this.numberFrom,
            numbersTo = this.numberTo,
            numbers = [],
            ln, tmp, i, j;

        // swap values if user mixes them up.
        if (numbersFrom > numbersTo) {
            tmp = numbersFrom;
            numbersFrom = numbersTo;
            numbersTo = tmp;
        }

        for (i = j = numbersFrom; i <= numbersTo; i = j = i + this.numberScale) {
            numbers.push({
                text: j,
                value: i
            });
        }

        this.slots = [];
        this.slots.push(this.createSlot(numbers));

        Ext.ux.NumberPicker.superclass.initComponent.call(this);
    },

    afterRender: function() {
        Ext.ux.NumberPicker.superclass.afterRender.apply(this, arguments);
        this.setValue(this.value);
    },

    createSlot: function(numbers){
        return {
            name: 'number',
            align: 'right',
            data: numbers,
            title: this.useTitles ? this.numberText : false,
            flex: 5
        };
    },

    // @private
    onSlotPick: function(slot, value) {
        Ext.ux.NumberPicker.superclass.onSlotPick.apply(this, arguments);
    },

    /**
     * Gets the current value as a Number object
     * @return {number: x} value
     */
    getValue: function() {                
        var value = Ext.ux.NumberPicker.superclass.getValue.call(this);
        return value;
    },

    /**
     * Sets the values of the NumberPicker's slots
     * @param {Date/Object} value The value either in a {number:'value'} format or a String, eg: '23'
     * @param {Boolean} animated True for animation while setting the values
     * @return {Ext.DatePicker} this This DatePicker
     */
    setValue: function(value, animated) {
		if (Ext.isObject(value)) {
			this.value = value;
		} else {
			this.value = {
				number: parseInt(value)
			};
		}
        
        return Ext.ux.NumberPicker.superclass.setValue.call(this, this.value, animated);        
    }
});

Ext.reg('numberpicker', Ext.ux.NumberPicker);