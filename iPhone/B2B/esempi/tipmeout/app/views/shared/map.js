App.createSharedMapView = function (view_id, function_that_returns_store) {
    return new Ext.Map({
        id:view_id,
        mapOptions:{
            zoom:13,
            disableDoubleClickZoom:false,
            streetViewControl:false
        },
        listeners:{
            mapload:function (centre, bounds, boundingRadius, bufferRadius, zoom) {
                if (this.isVisible()) {
                    if (Ext.isFunction(function_that_returns_store)) {
                        var storeFilter = function_that_returns_store()
                        storeFilter.set('lat', centre.lat);
                        storeFilter.set('lng', centre.lng);
                        storeFilter.set('radius', boundingRadius + bufferRadius);
                        storeFilter.filter();
                    }

                }
            }
        },
        hidden:true
    });
};

