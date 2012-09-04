Tmo.BackButton = {
    config_current: {},
    config_history: [],
    config_root: {
            controller: 'Dashboard',
            action: 'index',
            historyUrl: 'Dashboard/index',
            animation: { type: 'slide', reverse: true }
    },
    config_callback: null,

    setCurrentConfig: function(params){
        params.subPath      = params.subPath || false;
        params.animation    = { type: 'slide', reverse: true };
        params.controller   =  Ext.isObject(params.controller) ? params.controller.id : params.controller;        

        if(this._isValidConfig(this.config_current)) {
            if (this.config_current.historyUrl == this.config_root.historyUrl)
                this.config_history = [];
            else
                this._push(this.config_current);
        }

        this.config_current = params;
        if(this._historyExists()) {
            if (this._exitedSubPath())
                this.clearSubPaths();
            this._clearRefreshDuplicate();
        }
        return this.config_current 
    },
    getBackButton: function(label, callback) {
        this.config_callback = callback;
        return {
            text: (label || I18n.t('action.back_link')),
            ui: 'back',
            handler: this._onBackUse,
            scope: this
        };
    },
    isSubPath: function(params){
        return params.subPath = true;
    },
    clearSubPaths: function(){
        var self = this;
        for(var i=0; i<this.config_history.length; i++){
            var config = this.config_history[i];
            if(Ext.isObject(config) && config.subPath) {
                this.config_history.remove(config);
                i--;
            }
        }
    },
    last: function() {
        return this.config_history[this.config_history.length-1];
    },
    clearCurrentConfig: function() {
        return this.config_current = {};
    },
    _isValidConfig:function(params){
      return (Ext.isString(params.action));
    },
    _onBackUse: function(){
        if (this.config_callback)
            this.config_callback.call();
        this.config_current = {};
        Ext.dispatch(this._pop() || this.config_root);
    },
    _clearRefreshDuplicate: function(){
        if(this.last().historyUrl == this.config_current.historyUrl)
            this._pop();
    },
    _push: function(params) {
        return this.config_history.push(params);
    },
    _pop: function() {
        return this.config_history.pop();
    },
    _historyExists: function(){
       return (this.config_history.length > 0);
    },
    _exitedSubPath:function(){
        return (this.config_current.subPath != this.last().subPath);
    }
};