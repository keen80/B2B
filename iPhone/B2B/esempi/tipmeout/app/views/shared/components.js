App.formHint = function(id, text) {
    return {
            xtype: 'component',
            id: id,
            cls: 'hintfield',
            html: '<p style="text-align: center;">'+ (text ? text : "") +'</p>'
           }
};

App.formHintChange = function(id, key, hide_show_id) {
    return function (slider, thumb, newValue, oldValue) {
        Ext.get(id).down('p').update( I18n.t(key+"."+(newValue==1?"on":"off")));
        if (hide_show_id) {
            var obj = Ext.getCmp(hide_show_id);
            (newValue == 1) ? obj.show() : obj.hide();
        }
    };        
};

