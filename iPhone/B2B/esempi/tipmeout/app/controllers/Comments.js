Ext.regController('Comments', {

    beforeFilter: function() {        
        return Profile.requireUser();
    },

    // index action
    index: function(options)
    {
        this.renderPage('index', options, { commentable: options.commentable } );
    },

    // new comment action
    new_form: function(options)
    {
        Tmo.BackButton.isSubPath(options);
        var config = {
            confirm_button: I18n.t('comment.actions.new.create_the_comment'),
            title: I18n.t('comment.actions.new.title'),
            action_name: "create",
            comment: new App.models.Comment,
            back_to_list: options.back_to_list || false,
            commentable: options.commentable
        };
        this.renderPage('new_form', options, config);
    },

    create: function(params)
    {
      Tmo.BackButton.clearSubPaths();
      var requestParams = Server.toRailsParams('comment', params.form.getValues());
      requestParams['comment[commentable_type]'] = params.commentable.constructor.modelName;
      requestParams['comment[commentable_id]'] = params.commentable.getId();
      requestParams['comment[user_id]'] = Profile.getCurrentUser().getId();

      Server.request('POST', '/comments', {
        params: requestParams,
        success: function(result) {
            Tmo.debug(params.commentable);
            params.commentable.data.comments_count += 1;
            Tmo.storeFilters.comments.dirty = true;
//            App.stores.comments.add(result.records[0]); //niestety czasem failuje :/

            if (params.back_to_list)
                Ext.dispatch({
                    controller: 'Comments',
                    action: 'index',
                    historyUrl: 'Comments/index',
                    commentable: params.commentable,
                    back_page: params.back_page
                });
            else
                Ext.dispatch(Tmo.BackButton.last());
        },
        failure: function(result) {
            params.form.showErrors(result);
            Ext.Msg.alert(I18n.t('support.create_failed'));
        }
      });        
    }

});
