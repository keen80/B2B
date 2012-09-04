App.new_place = Ext.ModelMgr.create({},'Place');

App.views.PlacesNewForm = Ext.extend(App.views.FormPanelWithErrors, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var fields, createButton;
        var addCategoryButton, categoriesContainer, categoriesFormContainer,
            addTipButton, removeTipButton, tipContainer, tipFormContainer;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('place.actions.new.new_place_header'),
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        fields = App.placeFields(App.new_place);
//        added by beu
        Ext.each(fields, function(fieldset){ I18n.loadLabels(fieldset.items, 'Place'); });

        createButton = {
            xtype: 'button',
            text: I18n.t('place.actions.new.new_place_link'),
            ui: 'action',
            handler: this.onCreateAction,
            margin: "10px 0 0 0"
        };        

        /* --- categories container --- */

        addCategoryButton = {
            xtype: 'button',
            text: I18n.t('place.actions.new.add_category_link'),
            handler: this.onAddCategoryAction
        };

        addTipButton = {
            id: 'tip_form_add_button',
            xtype: 'button',
            text: I18n.t('place.actions.new.add_tip_link'),
            handler: this.onAddTipAction,
            margin: "10px 0 0 0"
        };

        removeTipButton = {
            id: 'tip_form_remove_button',
            xtype: 'button',
            text: I18n.t('place.actions.new.remove_tip_link'),
            handler: this.onAddRemoveAction,
            hidden: true
        };

        categoriesFormContainer = new Ext.Container({
            id: 'categories_form_container'
        });

        tipFormContainer = new Ext.Container({
            id: 'tip_form_container'
        });

        var categoriesErrors = {
          xtype: 'App.views.ErrorField',
          fieldname: 'cfs'
        };

        categoriesContainer = new Ext.Container({
            id: 'categories_container',
            cls: 'no_pdd',
            items: [categoriesFormContainer, categoriesErrors, addCategoryButton]
        });

        tipContainer = new Ext.Container({
            items: [addTipButton, tipFormContainer, removeTipButton]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'new_place_form',
            scroll: 'vertical',
            dockedItems: [ titleBar ],
            items: [ fields, categoriesContainer, tipContainer, createButton ],
            listeners: {
                show:function()
                {
                    _.each(App.new_place.cfs().data.items, function(place_cf) {
                        App.renderPlaceCategorySelect(place_cf.data);
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

        App.views.PlacesNewForm.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onAddCategoryAction: function() {
        App.renderPlaceCategorySelect(null);
    },

    onUploadAction: function() {
      if (!this.actions) {
        
        var upload = function(source) {
          function onSuccess(imageURI) {
            App.new_place.data.imageURI = imageURI;
            Tmo.Camera.updateBackgroundImage("place_picture", imageURI);
          }
          Tmo.Camera.getPicture(source, onSuccess);
        };

        this.actions = this.actions = Tmo.Camera.uploadActionSheetFor(this, upload);
        
      }
      this.actions.show();
    },

    onCreateAction: function() {
        Ext.dispatch({
            controller: 'Places',
            action: 'create',
            form: Ext.getCmp('new_place_form')
        });
    },

    onAddTipAction: function() {
        this.hide();
        Ext.getCmp('tip_form_remove_button').show();

        var container = Ext.getCmp('tip_form_container');

        var tipFields = new Ext.form.FieldSet({
            defaults: {
                labelWidth: '35%'
            },
            items: [
                {
                    xtype: 'textareafield',
                    name: '[new_tip]review',
                    label: I18n.t('place.review_label'),
                    required: true
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'new_tip_review'
                },
                editableStarsField('Rating', '[new_tip]real_value', 0 - 1)
            ]
        });

        container.add(tipFields);
        container.doLayout();
    },

    onAddRemoveAction: function() {
        this.hide();
        Ext.getCmp('tip_form_container').removeAll();
        Ext.getCmp('tip_form_add_button').show();
    }
});

Ext.reg('PlacesNewForm', App.views.PlacesNewForm);