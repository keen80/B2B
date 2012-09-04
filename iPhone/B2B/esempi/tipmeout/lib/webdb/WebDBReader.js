/**
 * Reader for local WebSQL database records
 */

Ext.data.WebDBReader = Ext.extend(Ext.data.JsonReader, {

    readRecords: function(data) {
        this.rawData = data;

        var records = [],
            i=0;

        for (; i<data.length;i++) {
            var result = this.readRecord( data.item(i) );
            records.push( result );
        }

        return new Ext.data.ResultSet({
            total  : records.length,
            count  : records.length,
            records: records,
            success: true
        });
    },

    readRecord: function(data) {
        var me = this;
        
        var record = Ext.ModelMgr.create( me.extractFields(data), me.model );

        _.each(record.associations.items, function(association) {
            if ( data[association.name] ) {

                var store = record[association.name]();
                //console.log(store)
                var associationRecords= [];
                var json = data[association.name].replace(/\\"/g, '"');
                //console.log( json )
                //console.log( JSON.stringify(json) )
                //console.log( JSON.parse(json) )

                if (association.type == "hasMany") {
                    var aData = JSON.parse(json);
                    _.each(aData, function(a){
                        //console.log(a)
                        var aRecord = Ext.ModelMgr.create(a, association.model);
                        associationRecords.push( aRecord )
                    })
                }

                store.add.apply(store, associationRecords);
            }
        });

        return record;
    },

    extractFields: function(data) {
        var fields = this.model.prototype.fields.items,
            length = fields.length,
            output = {},
            field, value, i;

        for (i = 0; i < length; i++) {
            field = fields[i];
            value = data[field.name] || field.defaultValue;

            output[field.name] = value;
        }

        return output;
    }

});

Ext.data.ReaderMgr.registerType('webdb', Ext.data.WebDBReader);

/**
 * Testing

var rawData = {
	id: 1,
	name: 'Test' ,
	cfs: "[{\"budget_id\":37,\"category_name\":\"Restaurants\",\"id\":1,\"category_id\":36,\"budget_name\":\"Under 20 Euro\"}]"
}

var dataWrap = { length: 1, tem: function(idx) { return rawData; } }
var reader = Ext.data.ReaderMgr.create({model: 'Place'},'webdb');

reader.read(dataWrap).records[0].cfsStore.getAt(0)

*/
