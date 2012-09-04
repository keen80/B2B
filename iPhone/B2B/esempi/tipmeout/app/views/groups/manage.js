App.views.GroupsManage = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var viewInstance = this;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            title: I18n.t('user.groups.manage_groups_header'),
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        var addGroupButton = {
            xtype: 'button',
            text: I18n.t('action.add_link'),
            handler: this.onAddGroupAction
        };

        var newFields = new Ext.form.FieldSet({
            cls: 'x-field-button-below',
            defaults: {
                labelWidth: '35%'
            },
            items: [
                {
                    xtype: 'textfield',
                    id: 'new_group_name',
                    name: 'name',
                    label: I18n.t('user.groups.label')
                }
            ]
        });

        var groupsListTpl = new Ext.XTemplate(
                '<tpl for=".">',
                '<div data-id="{id}" id="group_{id}_item" class="group_item">',
                '    <tpl if="thumb_url">',
                '      <div class="avatar" style="background-image: url({thumb_url})"></div>',
                '    </tpl>',
                '    <tpl if="!thumb_url">',
                '      <div class="avatar"><span>'+I18n.t('profile.actions.edit.add_photo_link')+'</span></div>',
                '    </tpl>',
                '  <div class="list_item">',
                '    <div class="list_field">{name}</div>',
                '    <div class="list_buttons"></div>',
                '  </div>',
                '  <div class="edit_item">',
                '    <div class="edit_field"></div>',
                '    <div class="edit_buttons""></div>',
                '  </div>',
                '</div>',
                '</tpl>'
                );

        var groupsList = new Ext.DataView({
            cls: 'groups_list',
            id: 'groups_list',
            scroll: false,
            itemSelector: 'div.avatar',
            tpl: groupsListTpl,
            store: App.stores.groups,
            listeners: {
                itemtap:
                {
                    fn: this.onUploadAction
                },
                refresh: function() {
                    _.each(this.store.data.items, function(item) {

                        var listRow = Ext.get('group_' + item.getId() + '_item');

                        listRow.down(".list_item").show();
                        listRow.down(".edit_item").hide();

                        var nameField = new Ext.form.Text({
                            name: 'name',
                            value: item.data.name
                        });

                        new Ext.Container({
                            renderTo: listRow.down(".edit_field"),
                            items: [ nameField ]
                        });

                        new Ext.Container({
                            renderTo: listRow.down(".list_buttons"),
                            layout: { type: 'hbox' },
                            items: [
                                {
                                    xtype: 'button',
                                    text: I18n.t('action.edit_link'),
                                    ui: 'small',
                                    handler: function() {
                                        listRow.down(".list_item").hide();
                                        listRow.down(".edit_item").show();
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: I18n.t('action.delete_link'),
                                    ui: 'decline-small',
                                    handler: function() {
                                        viewInstance.onRemoveGroup(item);
                                    }
                                }
                            ]
                        });

                        new Ext.Container({
                            renderTo: listRow.down(".edit_buttons"),
                            layout: { type: 'hbox' },
                            items: [
                                {
                                    xtype: 'button',
                                    text: I18n.t('action.save_link'),
                                    ui  : 'confirm-small',
                                    handler: function() {
                                        viewInstance.onUpdateGroup(item, listRow, nameField);
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: I18n.t('action.cancel_link'),
                                    ui: 'small',
                                    handler: function() {
                                        nameField.setValue(item.data.name);
                                        listRow.down(".list_item").show();
                                        listRow.down(".edit_item").hide();
                                    }
                                }
                            ]
                        });

                    });

                    this.up().doComponentLayout();
                }
            }
        });

        var cardContainer = new Ext.Container({
            cls: 'x-panel-body-padding',
            items: [ newFields, addGroupButton, groupsList ]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            scroll: 'vertical',
            dockedItems: [ titleBar ],
            items: [ cardContainer ],
            listeners:
            {
                deactivate: function() {
                    App.stores.groups.load();
                }
            }
        });

        App.views.ProfileShow.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onAddGroupAction: function()
    {
        Tmo.Adapters.keyboard.hide();
        var field = Ext.getCmp('new_group_name');
        Server.request('POST', '/groups', {
            params: {
                name: field.getValue()
            },
            success: function(result) {
                field.setValue('');
                App.stores.groups.load();
            }
        });
    },

    onRemoveGroup: function(item)
    {
        Ext.Msg.confirm(I18n.t('user.groups.confirmation_header'), I18n.t('user.groups.confirm_delete_text') + item.data.name +  I18n.t('user.groups.group_question_text'), function(btn, text) {
            if (btn == 'yes')
            {
                Server.request('POST', '/groups/' + item.getId(), {
                    params: {
                        _method: 'DELETE'
                    },
                    success: function(result) {
                        App.stores.groups.remove(item);
                    }
                });
            }
        });
    },

    onUpdateGroup: function(item, listRow, nameField)
    {
        Tmo.Adapters.keyboard.hide();
        var newName = nameField.getValue();
        Server.request('POST', '/groups/' + item.getId(), {
            params: {
                _method: 'PUT',
                name: newName
            },
            success: function(result) {
                nameField.setValue(result.name);
                listRow.down(".list_field").update(result.name);
                listRow.down(".list_item").show();
                listRow.down(".edit_item").hide();
            }
        });
    },

    onUploadAction: function(dataview, index, item, e)
    {
        if (this.actions) {
            this.actions.destroy();
        }

        var group = dataview.store.getAt(index);
        var listRow = Ext.get('group_' + group.getId() + '_item');

        var upload = function(source) {
            Tmo.Camera.uploadPicture(source, "/groups/" + group.getId() + "/picture", function(r) {
                var response = JSON.parse(r.response);
                var css = "background-image: url(" + response.url + ");";
                listRow.down('.avatar').dom.style.cssText = css;
                listRow.down(".avatar span").remove();
            })
        };

        this.actions = Tmo.Camera.uploadActionSheetFor(this, upload);
        this.actions.show();
    }

});

Ext.reg('GroupsManage', App.views.GroupsManage);