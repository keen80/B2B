Ext.data.EnhancedStore = Ext.extend(Ext.data.Store, {

    requireUser: false,

    loadRecords: function(records, add) {
        if (!add) {
            this.data.clear();
        }

        this.data.addAll(records);

        if (records) { // this is added
            for (var i = 0, length = records.length; i < length; i++) {
                records[i].needsAdd = false;
                records[i].join(this);
            }
        } // this is added

        this.suspendEvents();

        if (this.filterOnLoad && !this.remoteFilter) {
            this.filter();
        }

        if (this.sortOnLoad && !this.remoteSort) {
            this.sort();
        }

        this.resumeEvents();
        this.fireEvent('datachanged', this, records);
    }
});