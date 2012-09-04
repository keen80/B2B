App.views.TmoList = Ext.extend(Ext.List, {
    constructor: function(config) {
        this.loadingText = I18n.t('components.nestedlist.loadingText');
            
        config = Ext.apply(config);
        App.views.TmoList.superclass.constructor.call(this, config);


        var list = this; 

        this.recordsSelected = [];
        this.lockedRecords = [];
        this.lockingFunction = config.lockingFunction || function(record){return false};

        this.addListener('selectionchange', function(c, selectedRecords){
            if (!list.isDisabled()) {
                this.getSelectionModel().deselect(this.lockedRecords);
                if (!this.initialConfig.multiSelect)
                    this.clearSelection();
                this.forgetSelection();
                this.rememberSelection();
                this.uniqSelection();
            }
        });
        this.addListener('update', function(c){
            list.disable();
        });

        this.addListener('afterrender', function(c){
            c.scroller && c.scroller.on('scrollstart', Tmo.Adapters.keyboard.hide);
        });        

        this.store.addListener('load', function(s){
            list.selectRecords();
            list.enable();
        });
    },

    forgetSelection: function() {
        var res = [];
        var ids = Ext.pluck(_.difference(this.getStore().data.items, this.getCurrentSelectedRecords()),'internalId');
        Ext.each(this.recordsSelected,function(record){
            if (_.indexOf(ids,record.internalId) == -1) {
                res.push(record);
            }
        });
        this.recordsSelected = res;
    },

    rememberSelection: function() {
        this.recordsSelected = _.union(this.recordsSelected, this.getCurrentSelectedRecords());
    },

    clearSelection: function() {
        this.recordsSelected = [];
    },

    uniqSelection: function() {
        var a = [];
        var l = this.recordsSelected.length;
        for(var i=0; i<l; i++) {
          for(var j=i+1; j<l; j++) {
            if (this.recordsSelected[i].internalId === this.recordsSelected[j].internalId )
              j = ++i;
          }
          a.push(this.recordsSelected[i]);
        }
        this.recordsSelected = a;
    },

    selectRecords: function() {
        var list = this;
        if (list.getStore()){
            list.lockRecords();
            var ids = Ext.pluck(this.recordsSelected, 'internalId');
            var to_select = [];
            Ext.each(this.getStore().data.items,function(record){
                if (_.indexOf(ids,record.internalId) != -1) {
                    to_select.push(record);
                }
            });
            list.getSelectionModel().select(to_select);
            list.getSelectionModel().deselect(list.lockedRecords);
            list.forgetSelection();
        }
    },

    lockRecords: function() {
        var list = this;
        list.lockedRecords = [];
        Ext.each(this.getStore().data.items,function(record){
            if (list.lockingFunction(record)) {
                list.lockedRecords.push(record);
            }
        });
    },

    getCurrentSelectedRecords : function(){
        return this.selModel.getSelection();
    },

    getSelectedRecords: function(){
      return this.recordsSelected;  
    }

});
Ext.reg('tmo_list', App.views.TmoList);