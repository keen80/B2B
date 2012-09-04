App.profileDetailsList = function(relationship_details, config) {
    var userDetailsStore = new Ext.data.Store({
        model: "RelationshipDetail",
        data: relationship_details,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        },
        autoLoad: false
    });

    var profileDetailsTpl = new Ext.XTemplate(
        '<div class="global_list">',
        '<tpl if="icon">',
        '  <span class="avatar" style="background-image: url(images/icons/list/{icon}.png)"></span>',
        '</tpl>',            
        '  <p><strong class="cl_purple">{[ !Ext.isNumber(values.value)||values.value<0 ? "" : values.value ]}</strong> {name}</p>',
        '</div>'
    );

    var defaults = {
        xtype: 'list',
        cls: 'single_list',
        scroll: false,
        itemTpl: profileDetailsTpl,
        store: userDetailsStore,
        listeners: {}
    };

    Ext.Object.each((config || {}), function(key, value, myself) {
        defaults[key] = value;
    });

    return defaults;
};

App.headingPartial = function(text) {
    return new Ext.Container({
            tpl: new Ext.XTemplate(
                '<div class="heading_bar">',
                '    <p><strong>{text}</strong></p>',
                '</div>'
            )
            ,
            data: {text: text || "&nbsp;"}
        }
    );
};