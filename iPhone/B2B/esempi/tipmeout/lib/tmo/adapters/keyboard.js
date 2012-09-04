Tmo.Adapters.keyboard = {};

Tmo.Adapters.keyboard.hide = function()
{
    if (Ext.is.Android)
    {
       window.plugins.SoftKeyBoard.hide(Ext.emptyFn, Ext.emptyFn);
    }
    if (Ext.is.iOS)
    {
        Ext.each(Ext.query('input[type=text], input[type=search], textarea'), function(item) {
            item.blur();
        })
    }
};

Tmo.Adapters.keyboard.show = function()
{
    if (Ext.is.Android)
    {
        window.plugins.SoftKeyBoard.show(Ext.emptyFn, Ext.emptyFn);
    }

    if (Ext.is.iOS)
    {
    }
};