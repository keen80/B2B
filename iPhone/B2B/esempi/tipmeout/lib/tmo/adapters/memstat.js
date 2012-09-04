Tmo.Adapters.memstat = {};

Tmo.Adapters.memstat.data_array = [];
Tmo.Adapters.memstat.data_string = "Waiting for data";
Tmo.Adapters.memstat.get = function()
{
    if (Ext.is.Android)
    {
        window.plugins.sms.getMemstat(
            function(result) {
                var array = {};
                array["availMem"] = (Math.round(parseInt(result.availMem)/10000) / 100)+"MB";
                array["lowMemory"] = result.lowMemory;
                array["threshold"] = (Math.round(parseInt(result.threshold)/10000) / 100)+"MB";
                array["tpd"] = (Math.round(parseInt(result.tpd)/10) / 100)+"MB";
                array["tpss"] = (Math.round(parseInt(result.tpss)/10) / 100)+"MB";
                array["tsd"] = (Math.round(parseInt(result.tsd)/10) / 100)+"MB";
                Tmo.Adapters.memstat.data_array = array;

                var s = "Memory stats:<br>";
                for(var key in array) {
                    var value = array[key];
                    s += key+": "+value+"<br>";
                }
                Tmo.Adapters.memstat.data_string = s;
                return true;
            },
            function(error) {
                Tmo.Adapters.memstat.data_string = "Error occurred";
                return false;
            }
        );
    } else {
        Tmo.Adapters.memstat.data_string = "Works on Android only!";
    }

};