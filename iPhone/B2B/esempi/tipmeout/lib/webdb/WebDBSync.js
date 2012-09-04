WebDB = function() {

    this.database = function()
    {
        return window.openDatabase(this.dbName, this.dbVersion, this.dbDescription, this.dbTable);
    }();

    this.db = undefined;
    this.dbVersion = '1.0';
    this.dbName = undefined;
    this.dbTable = undefined;
    this.dbDescription = '';
    this.dbSize = 5*1024*1024;
    this.dbColumns = undefined;
    this.dbColumnsWithTypes = undefined;

    this.init = function(config)
    {
        this.dbName = config.dbName;
        this.dbTable = config.dbTable;
        this.model = config.model;
        this.dbColumns = config.dbColumns;
        this.dbColumnsWithTypes = config.dbColumnsWithTypes;

        return this.database;
    };

    this.handleError = function(err)
    {
        console.log("Error processing SQL: "+err.code);
        console.log(err)
    };

    this.query = function(queryObj, queryParams, onSuccess)
    {
        onSuccess = onSuccess || function(){};

        var querySuccess = function(tx, results)
        {
            var rows = [];
            for (var i=0; i<results.rows.length; i++) {
                rows.push( results.rows.item(i) );
            }
            onSuccess(rows);
        };

        var queryDb = function(tx)
        {            
            if ( Ext.isArray(queryObj) ) {
                _.each(queryObj, function(queryStr) {
                    console.log(queryStr);
                    tx.executeSql(queryStr, queryParams, querySuccess, this.handleError);
                });
            } else {
                console.log(queryObj);
                tx.executeSql(queryObj, queryParams, querySuccess, this.handleError);
            }
        };

        this.database.transaction(queryDb, this.handleError);
    };

    this.hasTable = function(tableName, onSuccess)
    {
        var queryStr = 'SELECT name FROM sqlite_master WHERE type = "table" and name = ?';
        
        var querySuccess = function(rows)
        {
            onSuccess(rows.length > 0)
        };

        this.query(queryStr,[tableName],querySuccess, this.handleError);
    };

    this.lastUdid = function(tableName, onSuccess)
    {
        var queryStr = 'SELECT updated_at FROM ' + tableName + ' ORDER BY updated_at DESC LIMIT 1';
        var udid = "";
        
        var querySuccess = function(rows)
        {
            if ( rows.length > 0 ) {
                udid = rows[0].updated_at;
            }
            onSuccess( udid );
        };

        this.query(queryStr,[],querySuccess, this.handleError);
    };

    this.syncTable = function(tableName, onSuccess)
    {
        var databaseVersion = this.database.version;
        var udid = "";
        var me = this;

        me.hasTable(tableName,function(hasTable)
        {
          if (hasTable) {
              me.lastUdid(tableName,function(udid)
              {
                me.loadTable(databaseVersion, hasTable, tableName, udid, onSuccess);
              });
          } else {
              me.loadTable(databaseVersion, hasTable, tableName, udid, onSuccess);
          }
        });
    };

    this.loadTable = function(databaseVersion, hasTable, tableName, lastUpdatedAt, onSuccess)
    {
        onSuccess = onSuccess || function(){};
        
        var schemaQueries = [];
        var me = this;

        var parenthesis = function(str) {
            return '(' + str + ')'
        };

        var insertQuery = function(result)
        {
            var insertQuery = 'INSERT INTO ' + tableName + ' ' + parenthesis(me.dbColumns) + ' VALUES ';

            return _.map(result.rows, function(row) {
                return insertQuery + parenthesis(row)
            });
        };

        var onServerResult = function(result)
        {
            if ( !hasTable ) {
                schemaQueries.push('DROP TABLE IF EXISTS ' + tableName);
                schemaQueries.push('CREATE TABLE IF NOT EXISTS ' + tableName + ' '
                    + parenthesis(me.dbColumnsWithTypes));
            }

            schemaQueries = schemaQueries.concat(insertQuery(result));

            me.query(schemaQueries, []);
        };

        Server.request('POST', '/webdbsync/', {
            params: {
                _method: 'PUT',
                lastUpdatedAt: lastUpdatedAt,
                tableName: tableName,
                columns: me.dbColumns
            },
            success: onServerResult
        });
    }
};

/*
App.stores.places.getProxy().webDB.syncTable('places')

App.stores.places.load()
App.stores.places.load({id: 17})




Ext.data.XmlReader = Ext.extend(Ext.data.Reader, {





*/