App.views.CheckInsNewForm = Ext.extend(App.views.FormPanelWithErrors, {
     initComponent: function() {
        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var fields, createButton;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('check_in.actions.new.title'),
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        fields = [
            {
                xtype: 'fieldset',
                defaults: {
                    useClearIcon: true,
                    autoCapitalize : true
                },
                items: [
                    {
                        name: 'note',
                        xtype: 'textareafield',
                        label: null
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: I18n.t('check_in.actions.new.notifications_title'),
                defaults: {
                    useClearIcon: true,
                    autoCapitalize : true,
                    labelWidth: '35%'
                },
                items: [
                    {
                        xtype: 'togglefield',
                        name: 'post_on_facebook'
                    },
                    {
                        xtype: 'togglefield',
                        name: 'post_on_twitter'
                    },
                    {
                        name: 'place_id',
                        xtype: 'hiddenfield'
                    }
                ]
            }
        ];
        I18n.loadLabels(fields[1].items, 'CheckIn');

        createButton = {
            xtype: 'button',
            text: I18n.t('check_in.actions.new.create_button'),
            ui: 'action',
            id: 'create_button',
            handler: this.onCreateAction,
            scope: this
        };

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: "check_in_form_card",
            scroll: 'vertical',
            dockedItems: [ titleBar, App.headers.render('places/shared/header', this.place.data) ],
            items: [ fields, createButton ],
            listeners: {
                show: function() {
                    this.loadRecord(this.check_in);
                }
            }
        });

        App.views.CheckInsNewForm.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onCreateAction: function() {
        Ext.dispatch({
            controller: 'CheckIns',
            action: 'create',
            place: this.place,
            form: Ext.getCmp('check_in_form_card'),
            historyUrl: 'CheckIns/index'
        });
    }

});
Ext.reg('CheckInsNewForm', App.views.CheckInsNewForm );
