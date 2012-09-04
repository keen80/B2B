App.placeFields = function(place)
    {
        var disable_field_if_gp = place.data && !Ext.isEmpty(place.data.gp_id);

        return {
            xtype: 'fieldset',
            defaults: {
                useClearIcon: true,
                autoCapitalize : true,
                labelWidth: '30%'
            },
            items: [
    {
        xtype: 'container',
        tpl: new Ext.XTemplate(
            '<div class="overview">',
            '  <div class="overview_head">',
            '    <tpl if="thumb_url">',
            '      <div id="place_picture" class="avatar" style="background-image: url({thumb_url})"></div>',
            '    </tpl>',
            '    <tpl if="!thumb_url">',
            '      <div id="place_picture" class="avatar"><span>{[I18n.t("action.add_photo_link")]}</span></div>',
            '    </tpl>',
            '  </div>',
            '</div>'
            ),
        data: {
            thumb_url: place.data.thumb_url
        }
    },
    App.formHint('is_private_desc'),
    {
        xtype: 'togglefield',
        id: 'is_private',
        name : 'is_private',
        value: place.data.is_private,
        disabled: disable_field_if_gp,
        listeners: {
            change: App.formHintChange('is_private_desc', 'place.actions.new.is_private_desc')
        }
    },
    {
        xtype: 'textfield',
        name: 'name',
        required: true,
        disabled: disable_field_if_gp,
        value: place.data.name
    },
    {
        xtype: 'App.views.ErrorField',
        fieldname: 'name'
    },
    {
        xtype: 'hiddenfield',
        name: 'lat',
        value: place.data.lat
    },
    {
        xtype: 'hiddenfield',
        name: 'lng',
        value: place.data.lng
    },
    {
        xtype: 'hiddenfield',
        name: 'gp_id',
        value: place.data.gp_id
    },
    {
        xtype: 'hiddenfield',
        name: 'gp_reference',
        value: place.data.gp_reference
    },
    {
        xtype: 'textfield',
        name: 'address',
        disabled: disable_field_if_gp,
        value: place.data.address
    },
    {
        xtype: 'App.views.ErrorField',
        fieldname: 'address'
    },
    {
        xtype: 'textfield',
        name: 'number',
        disabled: disable_field_if_gp,
        value: place.data.number
    },
    {
        xtype: 'textfield',
        name: 'locality',
        disabled: disable_field_if_gp,
        value: place.data.locality
    },
    {
        xtype: 'App.views.ErrorField',
        fieldname: 'locality'
    },
    {
        xtype: 'textfield',
        name: 'postal_code',
        disabled: disable_field_if_gp,
        value: place.data.postal_code
    },
    {
        xtype: 'hiddenfield',
        name: 'country',
        value: place.data.country
    },
    {
        xtype: 'App.views.ErrorField',
        fieldname: 'country'
    },
    {
        xtype: 'textfield',
        name: 'tel',
        value: place.data.tel
    },
    {
        xtype: 'textfield',
        name: 'opening_hours',
        value: place.data.opening_hours
    },
    {
        xtype: 'textfield',
        name: 'transport',
        value: place.data.transport
    },
    {
        xtype: 'textfield',
        name: 'parking',
        value: place.data.parking
    },
    {
        xtype: 'textareafield',
        name: 'description',
        value: place.data.description
    },
    {
        xtype: 'textfield',
        name: 'tag_list',
        value: place.data.tag_list
    }
    ]
}
};


App.renderPlaceCategorySelect = function(data)
{
    var container = Ext.getCmp('categories_form_container');
    var original_data = data;
    data = data || {};

    var nextRandomId = function(sequence)
    {
        var tmp_id;
        for(tmp_id=0; tmp_id<9999; tmp_id++) {
            if ( !Ext.get(tmp_id + sequence) ) {
                break
            }
        }
        return tmp_id;
    };

    var tmp_id = nextRandomId('_place_category');

    var formSelectFn = function(formSelect, parent_id, selectedValue) {
        if ( formSelect ) {
            formSelect.store.clearFilter();
            formSelect.store.filter('parent_id', parent_id);

            formSelect.store.insert(0, Ext.ModelMgr.create({name:"", id:null}, 'ObjectCategory'));
            var display = formSelect.store.data.items.length > 1;

            if ( !display ) {
                formSelect.setValue('');
                formSelect.hide();
            } else {
                formSelect.setValue(selectedValue);
                formSelect.show();
            }

            formSelect.up().doLayout();
        }
    };

    //simplified categories creation - sibling iterator
    var  openSiblingPicker = function(element){
        var valid_xtypes = ["tmo_selectfield", "selectfield", "multiselectfield"];
        var sibling = element;
        while (sibling = sibling.nextSibling()) {
            if (valid_xtypes.indexOf(sibling.xtype) != -1 && sibling.isVisible()) {
                bindSiblingPicker(sibling);
                break;
            }
        }
    };

    //simplified categories creation - binding picker opening
    var bindSiblingPicker = function(element){
        element.getPicker().toolbar.items.items[2].setText(I18n.t('action.next_link'));
        element.getPicker().show();
        element.getPicker().on('change', function(c){
            openSiblingPicker(element);
        });
    };

    var categorySelect = new Ext.form.Select({
        name : tmp_id + '_place_category',
        id : tmp_id + '_place_category',
        label: I18n.t('activerecord.attributes.place.category'),
        xtype: 'tmo_selectfield',
        store: Tmo.Utils.buildMemoryStore('PlaceCategory', function(store){
            var records = _.sortBy(App.stores.place_categories.data.items, function(r){
                return r.data.name;
            });
            _.each(records, function(record) {
                store.add(record.copy());
            });
        }),
        displayField: 'name',
        valueField: 'id',
        listeners: {
            afterrender: function(field) {
                if (!original_data) {
                    bindSiblingPicker(field);
                }
            },
            change: function(field, selected_category_id) {
                var list = [
                    tmp_id + '_place_budget',
                    tmp_id + '_place_type',
                    tmp_id + '_place_theme',
                    tmp_id + '_place_delay',
                    tmp_id + '_place_cuisine',
                    tmp_id + '_place_occasions_ids',
                    tmp_id + '_place_targets_ids'
                ];
                _.each(list, function(name){
                    formSelectFn( Ext.getCmp(name), selected_category_id );
                });
            }
        }
    });

    categorySelect.setValue( data.category_id );

    var objectCategorySelect = function(type, label, name, value, multiselect, sort)
    {
        multiselect = multiselect || false;
        sort = sort || false;

        var config = {
            id : name,
            name : name,
            label: label,
            store: Tmo.Utils.buildMemoryStore('ObjectCategory', function(store){
                App.stores.object_categories.each(function(record){
                    if ( record.get('type') == type ) {
                        store.add( record.copy() )
                    }
                });
            }),
            displayField: 'name',
            valueField: 'id',
            listeners: {
                afterrender: function(formSelect) {
                    formSelectFn(formSelect, categorySelect.value, value);
                },
                selectionchange: function(formSelect, values) {
                    formSelect.fieldEl.dom.value = _.map(values, function(c){
                        return c.get('name');
                    }).join(', ')
                }
            }
        };

        var field;
        if (multiselect) {
            field = new Ext.form.ux.touch.MultiSelect( config );
        } else {
            field = new Ext.form.Select( config );
        }

        if (sort) { field.store.sort('name', 'ASC') }
        return field;
    };

    var objectCategoryMultiSelect = function(type, label, name, value){
        return objectCategorySelect(type, label, name, value, true);
    };

    var removeBtn = new Ext.Button(
    {
        text: I18n.t('action.destroy_link'),
        style:
        {
            margin: '.4em'
        },
        handler: function() {
            Ext.getCmp(tmp_id + '_destroy').setValue("1");
            this.up().hide();
        }
    });

    var categoryFields = new Ext.form.FieldSet({
        defaults: {
            labelWidth: '30%'
        },
        items: [
        categorySelect,
        {
            xtype: 'textfield',
            id: tmp_id + '_place_id',
            name : tmp_id + '_place_id',
            value: data.id,
            hidden: true
        },
        {
            xtype: 'textfield',
            id: tmp_id + '_destroy',
            name: tmp_id + '_destroy',
            value: '0',
            hidden: true
        },
        objectCategorySelect('PlaceBudget', I18n.t('activerecord.attributes.place.budget'), tmp_id + '_place_budget', data.budget_id),
        objectCategorySelect('Place::Type', I18n.t('activerecord.attributes.place.type'), tmp_id + '_place_type', data.type_id, false, true),
        objectCategorySelect('Place::Theme', I18n.t('activerecord.attributes.place.theme'), tmp_id + '_place_theme', data.theme_id, false, true),
        objectCategorySelect('Place::Cuisine', I18n.t('activerecord.attributes.place.cuisine'), tmp_id + '_place_cuisine', data.cuisine_id, false, true),
        objectCategoryMultiSelect('Place::Occasion', I18n.t('activerecord.attributes.place.occasion'), tmp_id + '_place_occasions_ids', data.occasions_ids),
        objectCategoryMultiSelect('Place::Target', I18n.t('activerecord.attributes.place.target'), tmp_id + '_place_targets_ids', data.targets_ids),
        objectCategorySelect('Place::Delay', I18n.t('activerecord.attributes.place.delay'), tmp_id + '_place_delay', data.delay_id),
        removeBtn
        ]
    });

    container.add(categoryFields);
    container.doLayout();
};
