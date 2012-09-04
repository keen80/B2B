App.createUserGroupsView = function (view_id, store_filter, group_id_set_callback) {
    return new Ext.DataView({
        cls:'categories_scroll categories_mini',
        id:view_id,
        itemSelector:'div.category_item',
        scroll:'horizontal',
        store:App.stores.groups,
        tpl:new Ext.XTemplate(
            '<div class="categories_scroll_wrapper">',
            '<tpl for=".">',
            '<div class="category_item" data-id="{id}" id="group_{id}_item">',
            '  <div class="category_thumb">{name}</div>',
            '</div>',
            '</tpl>',
            '</div>'
        ),
        listeners:{
            itemtap:{
                fn:function (dataview, index, item, e) {
                    var element = Ext.get(item);
                    var storeFilter = store_filter;
                    var group_id = dataview.store.getAt(index).data.id;

                    if (element.hasCls("x-item-selected")) {
                        storeFilter.set('group_id', '');
                    } else {
                        storeFilter.set('group_id', group_id);
                    }

                    storeFilter.filter();

                    Ext.isFunction(group_id_set_callback) && group_id_set_callback(storeFilter.get('group_id'));
                }
            },
            afterrender:function () {
                var storeFilter = store_filter;
                var group_id = storeFilter.get('group_id');
                if (Ext.get('group_' + group_id + '_item')) {
                    var groups_ids = _.map(Ext.getCmp(view_id).store.data.items, function (item) {
                        return String(item.data.id)
                    });
                    var position = _.indexOf(groups_ids, group_id);
                    Ext.getCmp(view_id).select(position, false, true);
                }
            },
            beforedestroy:function () {
                App.mapListObserver = null;
            }
        }
    });
};