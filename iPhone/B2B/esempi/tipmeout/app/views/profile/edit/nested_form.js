App.views.ProfileEditNestedForm = Ext.extend(App.views.FormPanelWithErrors, {

    object_class: "",
    object_translation_scope: "",
    object_nested_form_scope: "",
    window_title: "User Details",
    add_button_name: "",
    remove_button_name: "",

    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var saveButton, addButton;
        var viewInstance = this;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: this.window_title,
            defaults: { iconMask: true },
            items: [ backButton ]
        };

        var fields = [];

        Ext.each(this.getAdditionalFields(), function(fieldset){
            fields.push(fieldset);
        });

        Ext.each(Tmo.storeFilters.user_details.store.data.items, function(user_detail){
            if (viewInstance.isToDisplay(user_detail.toObject())) {
                fields.push(viewInstance.getObjectContainer(user_detail.toObject()));
            }
        });

        var userDetailsList = new Ext.Container({
            id: "user_details_list",
            items: fields
        });

        saveButton = this.getSaveButton();
        addButton = this.getAddButton();

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'edit_profile_card',
            scroll: 'vertical',
            dockedItems: [ titleBar ],
            items: [ userDetailsList, addButton, saveButton ]
        });

        App.views.ProfileEditNestedForm.superclass.initComponent.call(this);
    },

    onSaveChangesAction: function() {
        Tmo.LoadMask.show();
        Ext.dispatch({
            controller: 'Profile',
            action: 'save',
            form: Ext.getCmp('edit_profile_card')
        });
    },

    getObjectContainer: function(object) {
        var object_id = object.getId() || "tmp"+Math.floor(Math.random()*10000);
        var viewInstance = this;
        var fields = this.getFormFields(object, object_id);

        I18n.loadLabels(fields.items, this.object_translation_scope);
        var attr_prefix = "["+this.object_nested_form_scope+"]["+object_id+"]";
        var container_id = "user_detail_"+object_id;
        _.each(fields.items, function(item){
            if (item.name) item.name = Server.escapeBrackets(attr_prefix+item.name);
            if (item.fieldname) item.fieldname = Server.escapeBrackets(attr_prefix+item.fieldname);
        });

        var removeButton = {
            xtype: 'button',
            text: this.remove_button_name,
            ui: 'decline',
            margin: "10 10 10 10",
            handler: function(){viewInstance.removeObjectContainer(container_id)},
            scope: this
        };

        fields.items.push(removeButton);

        return new Ext.Container({
            id: container_id,
            items: [fields]
        });
    },

    addObjectContainer: function(){
        var list = Ext.getCmp("user_details_list");
        var user_detail = Ext.ModelMgr.create({type: this.object_class}, this.object_class);
        var new_container = this.getObjectContainer(user_detail);
        list.add(new_container);
        list.doLayout();
    },

    removeObjectContainer: function(container_id) {
        var container = Ext.getCmp(container_id);
        Ext.query('#'+container_id+' input[name$="_destroy"]')[0]. value = true;
        container.hide();
        this.doLayout();
    },

    getAddButton: function() {
        return {
            xtype: 'button',
            text: this.add_button_name,
            margin: "0 0 20px 0",
            handler: function(){this.addObjectContainer()},
            scope: this
        };
    },

    getSaveButton: function() {
        return {
            xtype: 'button',
            text: I18n.t('user.actions.edit.save_changes_link'),
            ui: 'action',
            handler: this.onSaveChangesAction,
            scope: this
        };
    },

    getFormFields: function(object, object_id) {
        return {
            xtype: 'fieldset',
            defaults: {
                xtype: 'textfield',
                autoCapitalize : false,
                labelWidth: '35%'
            },
            items: []
        }
    },

    getAdditionalFields: function() {
        return []
    },

    isToDisplay: function(object) {
        return true
    }

});

Ext.reg('ProfileEditNestedForm', App.views.ProfileEditNestedForm);