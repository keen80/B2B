Ext.define("B2B.store.Places_Ajax", {
    extend: "Ext.data.Store",
    id: "Places_Ajax",
    config: {
        model: "B2B.model.Place",
        proxy: {
            // type:'ajax',
            //url:'json/mock_placelist.json',
            url: 'http://192.168.1.7:8080/birrettaservice/rest/bserv/findLocNear_jsonp',
            type: 'jsonp',
            reader: {
                type:'json',
                rootProperty: 'response.body.list',
                successProperty: 'response.status.success',
                totalProperty: 'response.status.count',
                messageProperty: 'response.status.msg'
            }
        },
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                Ext.Msg.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                HH.log("Beers Store Callback");
            },
            load:function(el,records, successful){
                HH.log("* Loaded: Store.Places_Ajax");
            }
        }
    }

});
