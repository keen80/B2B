/**
 * @author Pavel Podlipensky - http://podlipensky.com
 * @class Ext.ux.starrating.View
 * <p>This is an extension for Ext.field.Field which works with Sencha Touch 2.
 * The Rating control provides an intuitive rating experience that allows users to select the number of stars (or other symbols) that represents their rating.</p>
 * <p>Sample Usage</p>
 * <pre><code>
 * 		new Ext.ux.starrating.View({
 * 			label : 'Rating',
 * 			itemsCount : 5,
 * 			itemCls : 'x-rating-star',
 * 			itemHoverCls : 'x-rating-star-hover'
 * 		})
 * 	</code></pre>
 *
 */
//Ext.namespace('Ext.ux.touch');

//Ext.define('Ext.ux.starrating.View', {
Ext.define('Ext.ux.starrating.StarRating', {
    extend: 'Ext.field.Field',
    xtype: 'starrating',

	 /**
     * @event change
     * Fires just after user selected new value
     * @param {Ext.ux.starrating.View} this This field
     * @param {Mixed} newValue The new value
     * @param {Mixed} oldValue The original value
     */

	config: {
        /**
        * @cfg {String} baseCls
        * The base CSS class to apply to this components's element. This will also be prepended to
        * other elements within this component. To add specific styling for sub-classes, use the {@link #cls} config.
        * @accessor
        */
        baseCls: Ext.baseCSSPrefix + 'field x-rating-field',

        /**
        * @cfg {Number} minValue
        * Minimum value which can be selected by user
        */
        minValue: -1,

        /**
        * @cfg {Number} defaultValue The default value for this field when no value has been set. It is also used when
        *                            the value is set to `NaN`.
        */
        defaultValue: -1,

        /**
        * @cfg {Number} value
        * Value represents index of far right selected star, i.e. if 4 stars selected value will be equal to 3
        */
        value: -1,

        /**
        * @cfg {String} clearCls
        * Class to apply to the clear button
        */
        clearCls: 'x-rating-clear',

        /**
        * @cfg {Boolean} clearIcon
        * Determine whether to show clear button
        */
        clearIcon: false,

        /**
        * @cfg {Number} itemsCount
        * If @items collection is not specified, the it will generate it with total amount of items equal to @itemsCount
        * NOTE: @itemCls and @itemHoverCl should be specified for proper items collection generation and control rendering.
        */
        itemsCount: 5,

        /**
        * @cfg {String} itemCls
        * Class to apply to the item when it is not selected
        */
        itemCls: 'x-rating-star',

        valueCls: 'x-rating-value',
        startValue: false,
        endValue: false,
        startValueCls: 'x-rating-startvalue',
        endValueCls: 'x-rating-endvalue',

        /**
        * @cfg {String} itemHoverCls
        * Class to apply to the item when it is selected
        */
        itemHoverCls: 'x-rating-item-hover',

        /**
        * @cfg {Array} tooltips
        * Message to display when star is selected (only message for the last selected star will be displayed)
        */
        tooltips: '', //TBD

        disabled: false,

        component: {
            tpl: new Ext.XTemplate(
                '<tpl if="startValue">',
                    '<div class="{startValueCls}">',
                    '</div>',
                '</tpl>',
                '<tpl for="items">',
				    '<div index="{[xindex - 1]}" class="{parent.itemCls} x-rating-item">',
            //'{tooltip}', TBD
				    '</div>',
			    '</tpl>',
			    '<tpl if="clearIcon">',
				    '<div class="{clearCls}">',
				    '</div>',
			    '</tpl>',
                '<tpl if="endValue">',
                    '<div class="{endValueCls}">',
                    '</div>',
                '</tpl>',
			{
			    compile: true
			}),
            cls: 'x-rating-inner'
        }
    },

    initialize: function () {

        var me = this;
        Ext.ux.starrating.StarRating.superclass.initialize.apply(me, arguments);

        me.element.on({
            scope: me,
            touchstart: me.onTouchStart,
            touchmove: me.onTouchMove,
            preventDefault: true
        });
    },

    updateComponent: function (newComponent, oldComponent) {
        this.callParent(arguments);
        if (oldComponent) {
            //TODO: cleanup event subscriptions
            //this.clearBtn
        }
        var innerElement = this.innerElement,
            cls = this.getCls();

        this.getComponent(); //why do we make this call?
        var newConfig = Ext.applyIf({
            items: new Array(this.getItemsCount() || 0)
        }, this.config);
        newComponent._tpl.overwrite(newComponent.element.dom, newConfig);
        this.items = newComponent.element.select('.x-rating-item', newComponent.element.dom);
        if (this.config.clearIcon) {
            this.clearBtn = newComponent.element.down('.' + this.getClearCls());
            this.clearBtn.on('tap', this.onClear, this);
        }
        if (this.config.startValue) {
            this.startValueTag = newComponent.element.down('.' + this.getStartValueCls());
        }
    },

    /*
    * Start assigning values (selecting stars) when user touched the control.
    */
    onTouchStart: function (e) {
        if (this.clearBtn && e.target == this.clearBtn.dom) {
            this.onClear();
            return;
        }
        this.onTouchMove(e);
    },

    /*
    * Calculate the position of thumb related to control's items and determine what value is selected
    */
    onTouchMove: function (e) {
        if (this.getDisabled()) {
            return;
        }
        var offset = this.innerElement.getXY();

        var x = e.touches[0].pageX - offset[0];
        if (!Ext.isDefined(this.diameter)) {
            if (this.items.getCount()) {
                var size = this.items.first().getSize();
                this.diameter = Math.min(size.height, size.width);
            }
            else {
                this.diameter = 0;
            }
        }

        var targetIndex = Math.floor(x / this.diameter);
        if (targetIndex > -1) {//TODO check if targetIndex is a number
            this.setValue(targetIndex);
        }
    },

    applyValue: function (value) {
        value = parseFloat(value);
        if (isNaN(value) || value === null) {
            value = this.getDefaultValue();
        }
        //round the value to 1 decimal
        value = Math.round(value * 10) / 10;

        this._value = value;
    },

    /*
    * Display value's representation in UI
    * @param {Number} value - index of item to select to
    */
    displayValue: function (value) {
        if (!this.rendered) {
            //TODO: replace event with ST2.0 equivalent
            this.on('painted', Ext.Function.bind(this.displayValue, this, [value]), this, { single: true });
            return;
        }
        var items = this.items;
        var count = items.getCount();
        var itemCls = this.getItemCls();
        var hoverCls = this.getItemHoverCls();
        var valueCls = this.getValueCls();
        var item = null;

        for (var i = 0; i < count; i++) {
            item = items.item(i);
            item[i < value ? 'addCls' : 'removeCls'](hoverCls);
            item[i < value ? 'removeCls' : 'addCls'](itemCls);
            item['removeCls'](valueCls);
        }

        value--;
        value = (value >= count ? (count - 1) : value);
        value = (value < 0 ? 0 : value);

        item = items.item(value);
        item['removeCls'](hoverCls);
        item['removeCls'](itemCls);
        item['addCls'](valueCls);
    },

    setValue: function (value) {
        var currentValue = this._value;
		value = parseFloat(value);
        if (isNaN(value) || value === null) {
            throw 'Argument exception: value argument is not a number.';
        }
        var minValue = this.getMinValue();
        //auto-correct user's input
        if (Ext.isNumber(minValue) && value < minValue) {
            value = minValue;
        }
        var count = this.items ? this.items.getCount() : this.itemsCount;
        if (this.items && value > this.items.getCount()) {
            value = this.items.getCount() - 1;
        }
        this.callParent([value]);
        this.displayValue(value);
		this.fireEvent('change', this, value, currentValue);
    },

    reset: function () {
        this.setValue(this.getDefaultValue());
    },

    onClear: function () {
        if (!this.getDisabled()) {
            this.setValue(this.getDefaultValue());
        }
    }
}, function() {
    //<deprecated product=touch since=2.0>
    /**
     * @member Ext.ux.starrating.View
     * @cfg {Boolean} showClear
     * Determine whether to show clear button
     * @deprecated 2.0.0 Please use {@link #clearIcon} instead
     */
    Ext.deprecateProperty(this, 'showClear', 'clearIcon', "Ext.ux.starrating.View.showClear has been removed, use showClear instead");

    /**
     * @member Ext.ux.starrating.View
     * @cfg {Boolean} singleColorPerValue
     * @removed 2.0.0
     */
    Ext.deprecateProperty(this, 'singleColorPerValue', null, "Ext.ux.starrating.View.singleColorPerValue has been removed");

	/**
     * @member Ext.ux.starrating.View
     * @cfg {Boolean} useClearIcon
     * @removed 2.0.0
     */
    Ext.deprecateProperty(this, 'useClearIcon', null, "Ext.ux.starrating.View.useClearIcon has been removed");
});