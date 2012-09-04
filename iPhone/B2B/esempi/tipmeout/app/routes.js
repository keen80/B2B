Ext.Router.draw(function(map)
{  
    map.connect(':controller/new/:action');
    map.connect(':controller/edit/:action');
    map.connect(':controller/:action');
    map.connect(':controller/:action/:id');
});