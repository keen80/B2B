Ext.define('B2B.view.Component_IOSToggle', {
	extend: 'Ext.field.Toggle',
	xtype: 'iostogglefield',
	config: {
		cls: 'ios5_toggle'
	}/*,
    HH Commentato perchè maschera la generazione degli eventi
	initialize: function () {			        
        var me = this;
        var mec = this.getComponent();
        var mythumb = this.element.down('.x-thumb');
        var mytoggle = this.element.down('.x-toggle');
        var myelement = this.element;
        
        mythumb.on({
            // this improves the ON/OFF effect 
            drag: {
                fn: function () {
                    var value,oldvalue,onCls,offCls;
                    value = me.getValue();
                    onCls = me.getMaxValueCls(),
                    offCls = me.getMinValueCls();
                    if(value != oldvalue) {
                        mytoggle.addCls(value ? onCls : offCls);
                        mytoggle.removeCls(value ? offCls : onCls);
                    }
                    oldvalue = value;
                }
            },
            tap: {
                fn: function (e,t) {
                    var value,oldValue,onCls,offCls,thumb;
                    oldValue = me.getValue();
                    value = ((me.getValue()==1) ? 0 : 1);
                    mec.setIndexValue(0, value, mec.getAnimation());
                    onCls = me.getMaxValueCls(),
                    offCls = me.getMinValueCls();
                    mytoggle.addCls(value ? onCls : offCls);
                    mytoggle.removeCls(value ? offCls : onCls);
                }
            }
        });
    }*/
});