App.getCommentsListForObject = function(commentable, renderTo) {
    var object_id = commentable.getId();
    var class_name = commentable.constructor.modelName;
    var storeFilter = Tmo.storeFilters.comments;
    var tpl = new Ext.XTemplate(
            '<div class="global_list no_arrow">',
            '       <div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.creator_thumb_url)]})"></div>',
            '       <div class="name">{[Ext.ModelMgr.create(values, "Comment").formattedCreatorName()]}</div>',
            '       <div class="small">{comment}</div>',
            '       <div class="grey">{[Ext.ModelMgr.create(values, "Comment").labelForCreationDate()]}</div>',
            '</div>'
        );

    if (storeFilter.dirty || !(object_id == storeFilter.get('commentable_id') && class_name == storeFilter.get('commentable_type'))) {
        App.stores.comments.removeAll();
        storeFilter.set('commentable_type', class_name);
        storeFilter.set('commentable_id', object_id);
        storeFilter.filter();
    }

    return new Ext.List({
        itemTpl: tpl,
        store: App.stores.comments,
        scroll: false,
        disableSelection: true,
        renderTo: renderTo,
        emptyText: null,
        id: 'comments_list'
    });
};

App.getLabelForCommentsCount = function(count) {
    return I18n.tc('comment', {count: count})
};

App.getCommentButton = function(options) {
    var text = options.label_with_couter ? App.getLabelForCommentsCount(options.commentable.get('comments_count')) : I18n.t('comment.button_label');
    return new Ext.Button({
        iconCls: 'chat',
        iconMask: true,
        text: text,
        id: 'comment_object_button',
        renderTo:'comment_object',
        handler: function() {
            if (options.action == 'index')
                Ext.dispatch({
                    controller: 'Comments',
                    action: 'index',
                    historyUrl: 'Comments/index',
                    commentable: options.commentable
                });
            else
                Ext.dispatch({
                    controller: 'Comments',
                    action: 'new_form',
                    historyUrl: 'Comments/new/form',
                    commentable: options.commentable,
                    back_to_list: false
                });
        }
    });
    
};

