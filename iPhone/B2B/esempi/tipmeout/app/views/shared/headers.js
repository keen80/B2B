App.headers = new function() {

    this.render = function(name, data)
    {
        var config = this.configs[name],
            extraCls = config.extraCls || "",
            tpl = config.tpl.join('');

        return new Ext.Container({
                tpl: new Ext.XTemplate(
                    '<div class="overview ' + extraCls + '">',
                    '  <div class="overview_head">',
                    tpl,
                    '  </div>',
                    '</div>'
                )
                ,
                data: data
            }
        );
    },

    this.configs = {
        'profile/show/header':
         {
            extraCls: 'overview_small',
            tpl: [
                '<div class="avatar" id="profile_picture" style="background-image: url({[Tmo.Utils.thumb(values.thumb_url)]})"></div>',
                '<h3>{first_name} {last_name}</h3>'
            ]
        },

        'groups/user/header':
        {
            tpl: [
                '<div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.thumb_url)]})"></div>',
                '<h3>{first_name} {last_name}</h3>'
            ]
        },

        'profile/shared/header':
        {
            extraCls: 'overview_small',
            tpl: [
                '<div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.data.thumb_url)]})"></div>',
                '<h3>{data.first_name} {data.last_name}</h3>',
                '<tpl if="data.id!=Profile.getCurrentUser().getId()">',
                '   <h4>{data.primary_group_name_for_current_user}</h4>',
                '</tpl>'
            ]
        },

        'pictures/shared/header':
        {
            extraCls: 'overview_small',
            tpl: [
                '<div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.data.creator_thumb_url)]})"></div>',
                '<h3>{data.creator_full_name}</h3>',
                '<h4>{[I18n.t("album.actions.show.created")]} {[values.relativeCreatedAt()]}</h4>'
            ]
        },

        'places/shared/header':
        {
            extraCls: 'overview_small',
            tpl: [
                '<div id="place_picture" class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.thumb_url)]})"></div>',
                '<h3>{name}</h3>',
                '<h4>{main_category_name}</h4>'
            ]
        },

        'events/shared/header':
        {
            extraCls: '',
            tpl: [
                '<div class="avatar" style="background-image: url({[Tmo.Utils.thumb(values.data.thumb_url)]})"></div>',
                '<h3>{data.name}</h3>',
                '<h4>{data.category_name}</h4>',
                '<p class="small">{[I18n.t("event.actions.show.payment")]}: <strong>{[values.costToString()]}</strong></p>'
            ]
        }
    }
};
