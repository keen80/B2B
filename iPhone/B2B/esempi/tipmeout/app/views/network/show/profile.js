App.views.NetworkShowProfile = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */
        var editButton, backButton, titleBar;
        var viewInstance = this;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        editButton = (Profile.getCurrentUser().getId() != this.user.getId()) ? {xtype: 'spacer'} : {
            iconCls: 'compose1',
            iconMask: true,
            handler: this.onEditAction,
            scope: this
        };

        /* --- view types --- */

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('user.relationship_details.live_in_short'),
            defaults: {
                iconMask: true
            },
            items: [ backButton, {xtype: 'spacer'}, editButton ]
        };

        /* --- content tpl --- */

        var fields = [];
        var add_field = function(field_name, value, cls){
            if (!value) value = viewInstance.user.get(field_name);
            if (value) value = value.nl2br();
            if (viewInstance.user.get(field_name)) {
                fields.push({ cls: cls, name: field_name, value: value});
            }
        };

        add_field.call(this, 'user_detail_residences_list');
        add_field.call(this, 'birthday', this.user.formatedBirthday());
        add_field.call(this, 'relationship_status_name');
        add_field.call(this, 'employment_status_name');
        add_field.call(this, 'user_detail_profession_company');
        add_field.call(this, 'user_detail_profession_industry');
        add_field.call(this, 'user_detail_school_label');
        add_field.call(this, 'user_detail_club_label');
        add_field.call(this, 'user_detail_interest_label', null, 'right_arrow');
        I18n.loadLabels(fields, 'User');


        var store = new Ext.data.JsonStore({
            model  : 'UserDetail',
            data: fields
        });

        var userDetailsListTpl = new Ext.XTemplate(
            '<div class="x-form-fieldset x-field x-field-label-white {cls}" id="{name}">',
            '   <div class="x-form-label" style="width: 35%"><span>{label}:</span></div>',
            '   <div class="x-form-text">{value:ellipsis(25)}</div>',
            '</div>'
        );

        var userDetailsList = new Ext.List({
            flex: 1,
            cls: 'x-form-fieldset',
            style: 'margin:0',
            pressedCls: '',
            id: 'user_details_list',
            itemTpl: userDetailsListTpl,
            disableSelection: true,
            store: store
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout:'card',
            scroll: 'vertical',
            dockedItems: [titleBar, App.headers.render('profile/shared/header', this.user)],
            items: [userDetailsList],
            listeners: {
                show: function(){
                    var field = Ext.get("user_detail_interest_label");
                    if (field) {
                        field.on('tap', function(c){
                            Ext.dispatch({
                                controller: 'Network',
                                action: 'show_interests',
                                historyUrl: 'Network/show_interests/' + viewInstance.user.getId(),
                                user_id: viewInstance.user.getId(),
                                user: viewInstance.user
                            });
                        });
                    }
                }
            }
        });

        App.views.NetworkShowProfile.superclass.initComponent.call(this);
    },

    onEditAction: function() {
        Ext.dispatch({
            controller: 'Profile',
            action: 'edit',
            historyUrl: 'Profile/edit'
        });
    }
});

Ext.reg('NetworkShowProfile', App.views.NetworkShowProfile);