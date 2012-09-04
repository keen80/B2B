var FilterBar = (function () {
    function FilterBar(scope, filter, callback, barOptions, buttonsAndItsOptions) {
        var self = this;
        this.filter = filter;
        this.callback = (callback) ? callback : null;
        this.barOptions = barOptions;
        this.buttonsAndItsOptions = buttonsAndItsOptions;
        this.buttons = [];
        this.scope = scope;


        Ext.iterate(this.buttonsAndItsOptions, function(obj) {
            var button = {};

            if (typeof obj == 'string') {
                button.text = obj;
                button.search_scope = self._underscored(self._downcased(obj));

            } else if (typeof obj == 'object') {
                button.text = obj.text || "unknown";
                button.search_scope = obj.search_scope || self._underscored(self._downcased(button.text));
                button.pressed = self.filter.check('search_scope', button.search_scope);
            }

            button.pressed = self.filter.check('search_scope', button.search_scope);
            button.handler = self._callback(); //create callback

            self.buttons.push(button);
        });

        this.segmentedButton = {
            xtype: 'segmentedbutton',
            id: 'filterBar',
            centered: true,
            defaults: {flex: 1},
            style: 'width: 100%',
            items: this.buttons
        };

        this.barItems = [
            {xtype: 'spacer'},
            this.segmentedButton,
            {xtype: 'spacer'}
        ];

        this.barOptions = (typeof barOptions == 'object') ? barOptions : {};
        this.barOptions.xtype = 'toolbar';
        this.barOptions.items = this.barItems;
        this.barOptions.dock = barOptions.dock || 'top';
        this.barOptions.ui = barOptions.ui || 'light';
    }

    FilterBar.prototype._underscored = function(str) {
        return Ext.util.Format.trim(str).replace(/\s+/g, "_");
    };

    FilterBar.prototype._downcased = function(str) {
        return str.toLowerCase();
    };

    FilterBar.prototype._callback = function() {
        if (this.callback != null) {
            var self = this;
            return function() {
                self.callback(self.scope, self.filter, this.search_scope);
            }
        }

        return null;
    };

    FilterBar.prototype.getBar = function() {
        return this.barOptions;
    };

    return function(scope, filter, callback, barOptions, buttonsAndItsOptions) {
        return new FilterBar(scope, filter, callback, barOptions, buttonsAndItsOptions);
    };
})();
