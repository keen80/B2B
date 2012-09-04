/**
 * WebSQL proxy connects models and stores to local WebSQL database.
 *
 * Requires underscore.js
 *
 * Useful links:
 * https://github.com/zefhemel/persistencejs
 * https://raw.github.com/grgur/Ext.data.proxy.IndexedDB/master/Ext.data.proxy.WebDB.js
 * 
 */

Ext.data.WebDBProxy = Ext.extend(Ext.data.Proxy, {

    idProperty: 'id',
    webDB: undefined,
    db: undefined,

    /**
     * @private
     * Read database columns with type setup from model
     * Used for table creation only
     * @return {Array} of {String}s
     */
    dbColumnsWithTypes:  function(modelName) {
        var model = Ext.ModelMgr.getModel(modelName),
            fields = model.prototype.fields.items,
            associations = model.prototype.associations.items,
            columns = [];

        Ext.each(fields, function(f)
        {
            if (f.isTableField || !Ext.isDefined(f.isTableField))
            {
                var type = f.type.type;
                var fieldoption = (f.fieldOption)  ? f.fieldOption : '';

                type = type
                    .replace(/int/i, 'INTEGER')
                    .replace(/string/i,'TEXT')
                    .replace(/date/i, 'DATETIME');

                columns.push(f.name + ' ' + type + ' ' + fieldoption);
            }
        });

        Ext.each(associations, function(f)
        {
            var name = f.name;
            var fieldoption = (f.fieldOption)  ? f.fieldOption : '';
            var type = 'TEXT';

            columns.push(name + ' ' + type+' '+fieldoption);
        });

        return columns;
    },

    /**
     * @private
     * Read database columns names from model
     * Used for inserting into database
     * uses {dbColumnsWithTypes} to ensure the same columns set
     * @return {Array} of {String}s
     */
    dbColumns: function(model) {
        return _.map( this.dbColumnsWithTypes(model), function(f){
            return f.split(" ")[0]
        });
    },

    constructor: function(config) {
        console.log("-> constructor")
        
        Ext.data.Proxy.superclass.constructor.call(this, config);

        this.idProperty = config.idProperty || this.idProperty;
        config.idProperty = this.idProperty;

        this.reader = Ext.data.ReaderMgr.create({model: config.model},'webdb');

        config.dbColumnsWithTypes = this.dbColumnsWithTypes(config.model).join(',');
        config.dbColumns = this.dbColumns(config.model).join(',');
        
        this.webDB = new WebDB;
        this.db = this.webDB.init(config);
        this.webDB.syncTable(config.dbTable); // TODO: callback to przeladowania stora?
    },

    throwDbError: function(tx, err) {
        console.log(this.type + "----" + err.message);
    },

    read: function(operation, callback, scope) {
        var me = this;

        var finishReading = function(resultSet) {
            operation.setSuccessful();
            operation.setCompleted();
            operation.resultSet = resultSet;

            if (typeof callback == 'function') {
                callback.call(scope || this, operation);
            }
        };

//        console.log(me)
//        console.log("operation:")
//        console.log(operation)

        if (operation.id) {
            this.getRecord(operation.id, finishReading, me);
        } else {
            this.getAllRecords(operation, finishReading,me);
            operation.setSuccessful();
        }
    },

    /**
     * @private
     * Fetches a single record by id.
     * @param {Mixed} id Record id
     * @param {Function} callback Callback function
	 * @param {Object} scope Callback fn scope
     */
    getRecord: function(id, callback, scope) {
//        console.log("-> getRecord (" + id + ")");

        var me = this,
            onSuccess = function(tx,rs) {
                if (typeof callback == 'function') {
                    //callback.call(scope || me, me.readRecords(rs)[0], me);
                    callback.call(scope || me, me.getReader().read(rs.rows), me);
                }
            };

        me.db.transaction(function(tx){
            tx.executeSql('SELECT * FROM ' + me.dbTable + ' WHERE '+me.idProperty+' = ?',
                [id],
                onSuccess, //on success
                me.onError); // on error
        });

        return true;
    },

	/**
     * @private
     * Fetches all records
     * @param {Function} callback Callback function
	 * @param {Object} scope Callback fn scope
     */
    getAllRecords: function(operation, callback, scope) {
//        console.log("-> getAllRecords");

        var me = this,
            onSuccess = function(tx,rs) {                
                if (typeof callback == 'function') {
                    callback.call(scope || me, me.getReader().read(rs.rows), me);
                }
            };

        me.db.transaction(function(tx){
            tx.executeSql('SELECT * FROM ' + me.dbTable + ' LIMIT ' + operation.limit + ' OFFSET ' + operation.start,
                [],
                onSuccess,  //on success
                me.throwDbError);   // on error
        });

        return true;
    }
    
});

Ext.data.ProxyMgr.registerType("webdb", Ext.data.WebDBProxy);