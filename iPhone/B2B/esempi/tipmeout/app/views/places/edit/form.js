App.views.PlacesEditForm = Ext.extend(App.views.FormPanelWithErrors, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var fields, saveButton;
        var addCategoryButton, categoriesContainer, categoriesFormContainer;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('place.actions.edit.edit_place_header'),
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        fields = App.placeFields(this.place);

        //        added by beu
        Ext.each(fields, function(fieldset){ I18n.loadLabels(fieldset.items, 'Place'); });

        saveButton = {
            xtype: 'button',
            text: I18n.t('place.actions.edit.save_changes_link'),
            ui: 'action',
            handler: this.onSaveChangesAction,
            scope: this
        };

        /* --- categories container --- */

        addCategoryButton = {
            xtype: 'button',
            text: I18n.t('place.actions.edit.add_category_link'),
            handler: this.onAddCategoryAction
        };

        categoriesFormContainer = new Ext.Container({
            id: 'categories_form_container'
        });

        var categoriesErrors = {
            xtype: 'App.views.ErrorField',
            fieldname: 'cfs'
        };

        categoriesContainer = new Ext.Container({
            id: 'categories_container',
            items: [categoriesFormContainer, categoriesErrors, addCategoryButton]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'edit_place_card',
            scroll: 'vertical',
            dockedItems: [ titleBar ],
            items: [ fields, categoriesContainer, saveButton ],
            listeners: {
                show:function()
                {
                    _.each(this.place.data.cfs, function(place_cf) {
                        App.renderPlaceCategorySelect(place_cf);
                    });
                },
                tap: {
                    element: 'el',
                    fn: this.onUploadAction,
                    scope: this,
                    delegate: '.avatar'
                }
            }
        });

        App.views.PlacesEditForm.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onAddCategoryAction: function() {
        App.renderPlaceCategorySelect(null);
    },

    onUploadAction: function() {
        if (!this.actions) {
            var place = this.place;
            var upload = function(source) {
                Tmo.Camera.uploadPicture(source, "/places/" + place.getId() + "/picture", function(r) {
                    var response = JSON.parse(r.response);
                    place.data.thumb_url = response.url;
                    Tmo.Camera.updateBackgroundImage("place_picture", response.url);
                    Tmo.storeFilters.places.dirty = true;
                });
            };
            this.actions = Tmo.Camera.uploadActionSheetFor(this, upload);
        }
        this.actions.show();
    },

    onSaveChangesAction: function() {
        Ext.dispatch({
            controller: 'Places',
            action: 'save',
            place: this.place,
            form: Ext.getCmp('edit_place_card')
        });
    }
});

Ext.reg('PlacesEditForm', App.views.PlacesEditForm);