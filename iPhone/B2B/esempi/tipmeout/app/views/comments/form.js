App.formForComment = function() {
return {
     initComponent: function() {
        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar;
        var fields, createButton;
         
        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: this.title,
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
                    autoCapitalize : true,
                    labelWidth: '40%'
                },
                items: [
                    {
                        name: 'comment',
                        label: I18n.t('comment.label'),
                        xtype: 'textareafield',
                        required: true
                    },
                    {
                        xtype: 'App.views.ErrorField',
                        fieldname: 'comment'
                    }                                               
                ]
            }
        ];

        createButton = {
            xtype: 'button',
            text: this.confirm_button,
            ui: 'action',
            id: 'create_button',
            handler: this.onCreateAction,
            scope: this
        };

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: "comment_form_card",
            scroll: 'vertical',
            dockedItems: [ titleBar ],
            items: [ fields, createButton ],
            listeners: { show: function() { this.loadRecord(this.comment); } }
        });

        App.views.CommentsNewForm.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onCreateAction: function() {
        Ext.dispatch({
            controller: 'Comments',
            action: this.action_name,
            comment: this.comment,
            form: Ext.getCmp('comment_form_card'),
            historyUrl: 'Comments/index',
            back_to_list: this.back_to_list,
            commentable: this.commentable,
            back_page: this.back_page
        });
    }

}
};