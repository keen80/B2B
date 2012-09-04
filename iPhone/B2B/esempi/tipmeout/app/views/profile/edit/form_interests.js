App.views.ProfileEditFormInterests = Ext.extend(App.views.ProfileEditNestedForm, {

    object_class: "UserDetail::Interest",
    object_translation_scope: "user_detail_interest",
    object_nested_form_scope: "user_detail_interests_attributes",
    window_title: I18n.t('profile.actions.edit.interests'),
    add_button_name: I18n.t('profile.actions.edit.add_interest_link'),
    remove_button_name: I18n.t('profile.actions.edit.remove_interest_link'),

    getFormFields: function(object, object_id){
        return {
            xtype: 'fieldset',
            defaults: {
                xtype: 'textfield',
                autoCapitalize : false,
                labelWidth: '35%'
            },
            items: [
                {
                    name : 'name',
                    xtype: 'textfield',
                    required: true,
                    value: object.get('name')
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'name'
                },
                {
                    name : 'tmp_id',
                    xtype: 'hiddenfield',
                    value: object_id
                },
                {
                    name : 'id',
                    xtype: 'hiddenfield',
                    value: object.get('id')
                },
                {
                    name : '_destroy',
                    xtype: 'hiddenfield',
                    value: false
                }
         ]
        };
    },

    getAdditionalFields: function() {
        var viewInstance = this;
        var fields = [];
        
        Ext.each(App.stores.interest_types.data.items, function(item) {
            var interest = viewInstance.getInterestForType(item) || Ext.ModelMgr.create({}, "UserDetail::Interest");
            var object_id = interest.getId() || "tmp"+Math.floor(Math.random()*10000);
            var attr_prefix = "["+viewInstance.object_nested_form_scope+"]["+object_id+"]";

            var checkbox = [
                {
                    xtype: 'tmo_checkbox',
                    name : 'interest_type_id',
                    label: item.get('name'),
                    value: item.getId(),
                    checked: !!interest.getId(),
                    listeners:{
                        check: function(c) { Ext.query('input[name="'+Server.escapeBrackets(attr_prefix)+'_destroy"]')[0].value = false;},
                        uncheck: function(c) { Ext.query('input[name="'+Server.escapeBrackets(attr_prefix)+'_destroy"]')[0].value = true;}
                    }
                },
                {
                    name : 'tmp_id',
                    xtype: 'hiddenfield',
                    value: object_id
                },
                {
                    name : 'id',
                    xtype: 'hiddenfield',
                    value: interest.getId()
                },
                {
                    name : '_destroy',
                    xtype: 'hiddenfield',
                    value: !interest.getId()
                }
            ];

            _.each(checkbox, function(field){
                if (field.name) field.name = Server.escapeBrackets(attr_prefix+field.name);
            });

            fields.push(checkbox);
        });

        return [
            {
                xtype: 'fieldset',
                defaults: {
                    xtype: 'textfield',
                    autoCapitalize : false,
                    labelWidth: '100%',
                    cls: 'x-field-label-white'
                },
                items: fields
            }
        ]
    },

    getInterestForType: function(interestType) {
        var res = null;
        Ext.each(App.stores.user_details.data.items, function(interest) {
            if (interest.toObject().get('interest_type_id') == interestType.getId()) {
                res = interest.toObject();
            }
        });
        return res;
    },

    isToDisplay: function(object) {
        return !(object.get('interest_type_id') > 0)
    }
});

Ext.reg('ProfileEditFormInterests', App.views.ProfileEditFormInterests);