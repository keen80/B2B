App.renderPlaceCategoryFilter = function(storeFilter, type, label, filterParam, multiselect)
{
    multiselect = multiselect || false;

    var filterItemsFn = function(type) {
        var category_id = parseInt(storeFilter.get('category_id')),
            records = [];

        App.stores.object_categories.each(function(record){
            if ( record.get('type') == type && record.get('parent_id') == category_id ) {
                records.push(record)
            }
        });

        records = _.sortBy(records, function(r){
            return r.data.position;
        });

        return records;
    };

    var filterItems = filterItemsFn(type);

    if ( Ext.isEmpty(filterItems) ) {
        return [];
    }

    if ( multiselect ) {        
        
        return _.map(filterItems, function(item) {
            return new App.views.Checkbox({
                label: item.data.name,
                name: filterParam,
                value: item.data.id,
                checked: storeFilter.checkArrayIncludes(filterParam, String(item.data.id)),
                onChange: function() {
                    var filterParamArray = storeFilter.getAsArray(filterParam);
                    if (this.isChecked()) {
                        filterParamArray.push(this.value);
                    } else {
                        filterParamArray.remove(this.value);
                    }
                    storeFilter.set(filterParam, filterParamArray.join(','))
                }
            });
        });

    } else {

        filterItems.unshift( {name: I18n.t('select.all'), id: ''} );

        return new Ext.form.Select({
            label: label,
            name: filterParam,
            options: filterItems,
            displayField: 'name',
            valueField: 'id',
            value: parseInt(storeFilter.get(filterParam)),
            listeners: {
                change: function(field, selectedCategoryId) {
                    storeFilter.set(filterParam, selectedCategoryId);
                }
            }
        })

    }
};


App.views.PlacesFilter = Ext.extend(App.views.FormPanelWithErrors, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var storeFilter = this.storeFilter || Tmo.storeFilters.places;
        var backButton, titleBar;
        var selects;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton(null, function(){storeFilter.filter()});

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title:  I18n.t('place.titles.filter'),
            defaults: {
                iconMask: true
            },
            items: [ backButton ]
        };

        selects = new Ext.form.FieldSet({
            defaults: {
                labelWidth: '35%',
                cls: 'x-field-label-white'
            },
            items: [
                App.renderPlaceCategoryFilter(storeFilter, 'PlaceBudget', I18n.t('activerecord.attributes.place.budget'), 'budget_id'),
                App.renderPlaceCategoryFilter(storeFilter, 'Place::Type', I18n.t('activerecord.attributes.place.type'), 'type_id'),
                App.renderPlaceCategoryFilter(storeFilter, 'Place::Theme', I18n.t('activerecord.attributes.place.theme'), 'theme_id'),
                App.renderPlaceCategoryFilter(storeFilter, 'Place::Cuisine', I18n.t('activerecord.attributes.place.cuisine'), 'cuisine_id'),
                App.renderPlaceCategoryFilter(storeFilter, 'Place::Delay', I18n.t('activerecord.attributes.place.delay'), 'delay_id')
            ]
        });

        var multiselectContainer = function(label, checkboxes) {
            return new Ext.Container({
                items: [
                    {
                        xtype: 'container',
                        html: '<div class="x-list-title small">'+label+'</div>'
                    },
                    {
                        xtype: 'fieldset',
                        labelWidth: 'auto',
                        cls: 'x-field-label-white',
                        items: checkboxes
                    }
                ],
                hidden: Ext.isEmpty(checkboxes)
            })
        }

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'filter_places_form',
            scroll: 'vertical',
            dockedItems: [titleBar],
            items: [
                selects,
                multiselectContainer(
                    I18n.t('activerecord.attributes.place.occasion'),
                    App.renderPlaceCategoryFilter(storeFilter, 'Place::Occasion', 'Occasion', 'occasions_ids', true)
                ),
                multiselectContainer(
                    I18n.t('activerecord.attributes.place.target'),
                    App.renderPlaceCategoryFilter(storeFilter, 'Place::Target', 'Target', 'targets_ids', true)
                )
            ]
        });

        App.views.PlacesFilter.superclass.initComponent.call(this);
    }

});

Ext.reg('PlacesFilter', App.views.PlacesFilter);