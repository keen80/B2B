App.views.CommentsIndex = Ext.extend(Ext.Panel, {
initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */
        var backButton, titleBar;
        var createCommentButton;
        var storeFilter = Tmo.storeFilters.comments;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        createCommentButton = {
            iconCls: 'chat',
            iconMask: true,
            handler: this.onCreateCommentAction,
            scope: this
        };

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: I18n.t('comment.header'),
            centered: true,
            cls: 'centered-buttons',
            layout: {
                pack: 'center'
            },            
            defaults: {
                iconMask: true
            },
            items: [ backButton, {xtype: 'spacer'}, createCommentButton ]
        };

        var commentsContent = new Ext.Container({
            id: "comments_content",
            scroll: 'vertical',
            items: [ App.getCommentsListForObject(this.commentable) ]
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'comments_card',
            layout: 'card',
            scroll: false,
            dockedItems: [titleBar],
            items: [commentsContent]
        });

        App.views.CommentsIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onCreateCommentAction: function() {
        Ext.dispatch({
            controller: 'Comments',
            action: 'new_form',
            historyUrl: 'Comments/new/form',
            commentable: this.commentable,
            back_to_list: true,
            back_page: this.back_page
        });
    }
});

Ext.reg('CommentsIndex', App.views.CommentsIndex);