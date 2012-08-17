Ext.define("B2B.store.Beers_Ajax", {
    extend: "Ext.data.Store",
    id: "Beers_Ajax",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "B2B.model.Beer",
        sorters: 'name',
        grouper: function(record){
            return (record.get('name')[0]).toUpperCase();
        }, /* {
            groupFn: function(record){
               return record.get('name').subStr(0,1);
            },
            transform: function(record){
                console.log(record);
                return  utils.getBeerStyleFromCode(record);
            },
            property: "name"
            //sortProperty: 'beerStyle',
            //direction: 'ASC' 
        },*/
        proxy: {
            type:'ajax',
            url:'mock_beerlist.json',
            reader: {
                type:'json',
                rootProperty: 'response.body.beers',
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
                console.log("Beers Store Callback");
            },
            load:function(el,records, successful){ 
              //  console.log(records);
            }
        }
    }
    
});
