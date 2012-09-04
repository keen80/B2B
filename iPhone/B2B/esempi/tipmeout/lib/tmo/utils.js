var Tmo = Tmo || {};

Tmo.debug = function() {
    if (!Ext.is.Phone) {
        if ((typeof(console) !== 'undefined') && (typeof(console.log) === 'function')) {
            var len = arguments.length;
            if (len > 0) {
                console.log.apply(console, arguments);
            }

        }
    }
};

Tmo.LoadMask = {

    loadMask: null,

    show: function(text, context){
        var msg = text || I18n.t('components.nestedlist.loadingText');
        context = context || Ext.getBody();

        if(this.loadMask == null){
            this.loadMask = new Ext.LoadMask(context, {msg: msg});
            this.loadMask.show();
        }
    },

    hide: function(){
        if(this.loadMask != null){
            this.loadMask.destroy();
            this.loadMask = null;
        }
    }
  
};

Tmo.Utils = {
    
    inc: function(object, field) {
        return object.set(field, object.get(field)+1);
    },

    dec: function(object, field) {
        return object.set(field, object.get(field)+-1);
    },
    
    thumb: function(thumb_url) {
        return (Ext.isEmpty(thumb_url)) ? "images/system/thumb_missing.png" : thumb_url;
    },

    //must be changed
    formatDate: function(date) {
        // dd.mm.yyyy - hh:mm
        return this._format_date(date, "d.m.Y") + " - " + this._format_date(date, "H:i");
    },

    fDate: function(date) {
        return this._format_date(date, "dS M Y");
    },

    fDateWithDayName: function(date) {
        return this._format_date(date, "l, dS M Y");
    },

    fDataMsg: function(date) {
        return this._format_date(date, "l d/M/Y");
    },

    fDbDate: function(date) {
        return this._format_date(date, "Y-m-d H:i:s");
    },

    _format_date: function(date, format) {
        if ( Ext.isEmpty(date) ) {
            return "";
        } else {
            return date.format( format );
        }
    },

    toRelativeTime: function(date, now_threshold) {
      var delta = new Date() - date;

      now_threshold = parseInt(now_threshold, 10);

      if (isNaN(now_threshold)) {
        now_threshold = 10 * 1000;
      }

      if (delta <= now_threshold) {
        return I18n.t('datetime.distance_in_words.just_now');
      }

      var units = null;
      var conversions = {
        milliseconds: 1, // ms -> ms
        seconds: 1000, // ms -> sec
        minutes: 60, // sec -> min
        hours: 60, // min -> hour
        days: 24, // hour -> day
        months: 30, // day -> month (roughly)
        years: 12 // month -> year
      };

      for (var key in conversions) {
        if (delta < conversions[key]) {
          break;
        } else {
          units = key; // keeps track of the selected key over the iteration
          delta = delta / conversions[key];
        }
      }

      delta = Math.floor(delta);

      return I18n.t('datetime.distance_in_words.x_'+units, {count: delta});
    },

    /*
     *    <= 1.7 - 1 star
     * 1.7 - 2.7 - 2 stars
     * 2.7 - 3.7 - 3 stars
     * 3.7 - 4.7 - 4 stars
     *    >= 4.7 - 5 stars
     */
    stars: function(value, use_stars_count_instead_of_avg_result)
    {
        var filled_star = "&#9733;";
        var empty_star  = "&#9734;";
        var res = "";
        var i;

        if (use_stars_count_instead_of_avg_result === true)
        {
            for(i = 1; i <= 5; i++)
            {
                res += ( i <= value ) ? filled_star : empty_star;
            }
        }
        else
        {
            for(i = 1; i <= 5; i++)
            {
                res += ( (i-0.3) <= value ) ? filled_star : empty_star;
            }
        }

        return res;
    },

    likes: function(likes_count)
    {
        return "&hearts; "+ I18n.t("components.like", {count: likes_count});
    },

    pluralize: function(count, singular, plural)
    {
        return (count == 1) ? singular : plural;
    },

    onSwipe: function(e, bt, handler)
    {
        if ( Ext.isEmpty( bt.getHTML() ) ) {
            new Ext.Button({
                text: 'Remove',
                ui: 'decline-small',
                renderTo: bt,
                handler: handler
            });
        }

        if ( e.direction == "right" )
        {
            bt.setStyle('display', 'block');
        }
        else
        {
            bt.setStyle('display', 'none');
        }
    },

    buildMemoryStore: function(model, storeFillFn) {
        var store = new Ext.data.Store({
          model: model,
          data : {},
          proxy: {
            type: 'memory'
          },
          autoLoad: true
        });

        storeFillFn(store);

        return store;
    },

    //example: handlerFunc(scope, fn, param_a, param_b) => function() { return fn(param_a, param_b); }
    handlerFunc: function() {
        var args = arguments;
        if (args.length >= 2) {
            if (typeof(args[1]) === 'function') {
                var params = Array.prototype.slice.call(args).slice(2, args.length);

                return function() {
                    return args[1].apply(args[0], params);
                };
            }
        }
    },

    emptyTextForList:function (txt) {
        return '<div class="x-list-empty-text"><p style="text-align:center; font-size: 0.9em">' + Tmo.Utils.h(txt) + '</p></div>';
    },

    h: function(data) {
        var escaped = Ext.util.Format.htmlEncode(data);
        if (escaped !== null && typeof(escaped) !== 'undefined') {
            return Ext.util.Format.htmlEncode(data);
        }

        return "";
    }

};
