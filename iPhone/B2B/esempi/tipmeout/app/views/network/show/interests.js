App.views.NetworkShowInterests = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */
        var backButton, titleBar;
        var interestsListTpl, interestsList;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        /* --- view types --- */

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },
            items: [ backButton ]
        };

        /* --- content tpl --- */



        var interests = [];
        Ext.each(App.stores.user_details.data.items, function(item){
            var interest = item.toObject();
            interest.fillGetName();
            interests.push(interest);
        });

        var store = new Ext.data.JsonStore({
            model  : 'UserDetail::Interest',
            data: interests,
            sorters: 'get_name'
        });              

        interestsListTpl = new Ext.XTemplate(
            '<div class="single_list no_arrow">',
            '   <div class="medium" style="padding-top: 5px;">{get_name}</div>',
            '</div>'
        );

        interestsList = new Ext.List({
            flex: 1,
            id: 'interests_list',
            itemTpl: interestsListTpl,
            disableSelection: true,
            store: store
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'interests_card',
            layout: 'card',
            dockedItems: [titleBar, App.headers.render('profile/shared/header', this.user)],
            items: [interestsList]
        });

        App.views.NetworkShowInterests.superclass.initComponent.call(this);
    }
});

Ext.reg('NetworkShowInterests', App.views.NetworkShowInterests);