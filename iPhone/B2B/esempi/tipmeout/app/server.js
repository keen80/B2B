
/* make each ajax request include auth_token
 */
Ext.Ajax.extraParams = { auth_token: window.localStorage.auth_token };

var Server = {

  begin_of_bracket_signature: '_BoB_',
  end_of_bracket_signature: '_EoB_',

  onLine: (navigator.onLine === true),

  offLineMsg: function() {
     Ext.Msg.alert("Network", "You are offline");
  },

  apiUrl: function(url) {
    return Tmo.getServerAddress(url);
  },

    compilationVersion: function() {
        var s = TmoConfig.server.replace(/srv\.tipmeout\.com/, "gui.tipmeout.com");
        s += "<br>";
        if (TmoConfig.compilationDate) {
            s += TmoConfig.compilationDate + " / ";
        }
        s += (this.onLine ? "online" : "offline");
        return s;
    },

  escapeBrackets: function(string) {
    string = string.replace(/\[/g,this.begin_of_bracket_signature);
    string = string.replace(/\]/g,this.end_of_bracket_signature);
    return string;
  },

  unescapeBrackets: function(string) {
    var r1 = new RegExp(this.begin_of_bracket_signature, 'g');
    var r2 = new RegExp(this.end_of_bracket_signature, 'g');
    string = string.replace(r1, '[');
    string = string.replace(r2, ']');
    return string;
  },

  toRailsParams: function(modelName,values) {
    var result = {};
    Ext.each( Ext.Object.toQueryObjects(modelName, values, true), function(item) {
      result[Server.unescapeBrackets(item.name)] = item.value;
    });
    return result;
  },

    paramsToUnderscore: function(data) {
        var result = data.replace(/[\[\]]/g, "_"); //zamien wszystkie nawiasy kwadratowe na underscory
        result = result.replace(/_{2,}/g, "_").replace(/^_|_$/, ""); //usun wszystkie zbedne underscory

        return result;
    },

  request: function(method,url,options) {
    if (options.loadMask == true) { Tmo.LoadMask.show() }
    Ext.Ajax.request({
      method: method,
      url: Server.apiUrl(url),
      params: options.params,
      success: function(response, opts)
      {
        if (options.loadMask == true) { Tmo.LoadMask.hide() }

        var result;
        Tmo.tryCatch(function(){
          var responseText = Ext.util.Format.trim(response.responseText);
          result = Ext.isEmpty(responseText) ? Ext.decode("{}") : Ext.decode(responseText);
          options.success(result);
        });
      },
      failure: function(response, opts)
      {
        if (options.loadMask == true) { Tmo.LoadMask.hide() }
        
        var result;
        Tmo.tryCatch(function(){
          var responseText = Ext.util.Format.trim(response.responseText);
          result = Ext.isEmpty(responseText) ? Ext.decode("{}") : Ext.decode(responseText);
        });
        options.failure(result);
      }
    });
  },

    serialize: function(obj){
        var str = "";
        for (var key in obj) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(obj[key]);
        }
        return str;
    }

};

/* Fix Sencha Model.save sends /0.json to server
 * http://stackoverflow.com/questions/5181503/sencha-model-save-sends-0-json-to-server
 * http://www.sencha.com/forum/showthread.php?122595-Model.load-not-sending-id-loading-all-models/page2
 */
Ext.data.RailsRestProxy = Ext.extend(Ext.data.RestProxy, {
    buildUrl: function(request) {
        var operation = request.operation,
            records   = operation.records || [],
            record    = records[0],
            format    = this.format,
            url       = request.url || this.url,
            id        = record ? record.getId() : operation.id;

        if (this.appendId && id) {
            if (!url.match(/\/$/)) {
                url += '/';
            }
            url += id;
        }

        if (format) {
            if (!url.match(/\.$/)) {
                url += '.';
            }
            url += format;
        }

        request.url = url;

        /* Deliberately skip the superclass implementation. */
        return Ext.data.RestProxy.superclass.buildUrl.apply(this, arguments);
    }
});
Ext.data.ProxyMgr.registerType("railsrest", Ext.data.RailsRestProxy);


/* before filter for controllers
 */
Ext.Dispatcher.on('before-dispatch', function(interaction) {
    Tmo.Adapters.keyboard.hide();

    if (Ext.isFunction(interaction.controller.beforeFilter)) {
        return interaction.controller.beforeFilter.call();
    }
    return true;
});

/* after filter for controllers
 */
Ext.Dispatcher.on('dispatch', function(interaction) {
    if (Ext.isFunction(interaction.controller.afterFilter)) {
        return interaction.controller.afterFilter.call();
    }
    return true;
});
