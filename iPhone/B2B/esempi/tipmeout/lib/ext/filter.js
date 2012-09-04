var Tmo = Tmo || {};

function StoreFilter(store, label, defaults) {
  this.store = store;
  this.label = label = 'filter_storage_' + label;
  this.perPage = 10;
  this.limit = 10;

  this.defaults = defaults;
  this.properties = [];
  this.setDefaults();
}

StoreFilter.prototype.setDefaults = function() {
  var scope = this;
  var properties = [];
  this.limit = 10;

  Ext.iterate(this.defaults,function(name,value){
    var key = scope.label + '_' + name;
    window.localStorage.setItem(key, value);
    properties.remove(name);
    properties.push(name);
  });

  Ext.iterate(this.properties,function(name){
    if (typeof scope.defaults[name] === "undefined")
    {
        var key = scope.label + '_' + name;
        window.localStorage.setItem(key, "");
    }
    properties.remove(name);
    properties.push(name);
  });

  this.properties = properties;
  this.dirty = true;
};

StoreFilter.prototype.clear = function() {
    this.setDefaults();
};

StoreFilter.prototype.key = function(name) {
  return this.label + '_' + name;
};

StoreFilter.prototype.get = function(name) {
  return window.localStorage.getItem( this.key(name) );
};

StoreFilter.prototype.getAsArray = function(name) {
  var array = [];
  var value = window.localStorage.getItem( this.key(name) );
  if ( !Ext.isEmpty(value) ) { array = value.split(',') }
  return array;
};

StoreFilter.prototype.set = function(name, value) {
  this.dirty = true;
  this.registerProperty(name);
  return window.localStorage.setItem( this.key(name), value);
};

StoreFilter.prototype.setIfEmpty = function(name, value) {
  if (Ext.isEmpty(this.get(name))) {
      this.set(name, value);
  }
};

StoreFilter.prototype.setIfNotIn = function(name, value, choices) {
  if ( choices.indexOf(this.get(name)) == -1 ) {
      this.set(name, value);
  }
};

StoreFilter.prototype.setDirty = function() {
  this.dirty = true;
};

StoreFilter.prototype.check = function(name, value) {
  return window.localStorage.getItem( this.key(name) ) === value.toString();
};

StoreFilter.prototype.checkArrayIncludes = function(name, value) {
  return _.include( this.getAsArray(name), value);
};

StoreFilter.prototype.registerProperty = function(name) {
  this.properties.remove(name);
  this.properties.push(name);
};

StoreFilter.prototype.unregisterProperty = function(name) {
  this.dirty = true;
  this.properties.remove(name);
  window.localStorage.removeItem( this.key(name) );
};

StoreFilter.prototype.toFilterParams = function() {
  var result = [];
  var scope = this;

  Ext.iterate(this.properties,function(name){
    result.push({ property: name,
      value: scope.get(name)
    });
  });

  return result;
};

StoreFilter.prototype.scrollListTop = function() {
    _.each(Ext.pluck(Ext.query(".x-list"), "id"), function(id){
        var cmp = Ext.getCmp(id);
        if (cmp.scroller)
        {
            Ext.getCmp(id).scroller.scrollTo({x: 0, y: 0});
        }
        else
        {
            Tmo.debug("No scroller");
        }
    });
};

StoreFilter.prototype.filter = function(callback, not_dirty_callback) {
    Tmo.Adapters.keyboard.hide();

  if (this.store && this.dirty) {
    this.store.clearFilter();
    this.store.removeAll();

    if (this.store.remoteFilter) {

        this.store.filters.addAll(this.store.decodeFilters( this.toFilterParams() ));
        this.store.load({
            scope   : this,
            callback: function(records, operation, success) {
                //the operation object contains all of the details of the load operation
                //console.log("this.store.load callback")
                //console.log(records);
                this.scrollListTop();
                if (Ext.isFunction(callback)) {
                    callback.call();
                }
            }
        });

    } else {

        this.store.filter( this.toFilterParams() );
        if (Ext.isFunction(callback)) {
            callback.call();
        }
    }
    
  } else {
      if (Ext.isFunction(not_dirty_callback)) {
          not_dirty_callback.call();
      }
  }
};

Tmo.storeFilters = Tmo.storeFilters || {};

Tmo.storeFiltersClear = function() {
  Ext.iterate(Tmo.storeFilters,function(name,value){
        value.clear();
    });
};

Tmo.storesClear = function() {
    for(var key in App.stores) {
        var store = App.stores[key];
        if (!store.preventCleaning)
            store.removeAll();
    }
};