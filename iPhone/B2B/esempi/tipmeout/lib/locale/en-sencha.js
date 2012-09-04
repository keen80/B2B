function setTmoLocales() {
    //*****************************************************************
    //DATETIME
    Date.dayNames = I18n.t('date.day_names');
    var monthNames = I18n.t('date.month_names');
    Date.monthNames = monthNames.splice(1, 12);
    var monthNumbers = I18n.t('date.abbr_month_names');
    Date.monthNumbers = monthNumbers.splice(1, 12);

    Date.getShortMonthName = function (month) {
        return Date.monthNames[month].substring(0, 3);
    };

    Date.getShortDayName = function (day) {
        return Date.dayNames[day].substring(0, 3);
    };

    Date.getMonthNumber = function (name) {
        return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
    };

    if (Ext.util.Format) {
        Ext.util.Format.defaultDateFormat = I18n.t('date.js_formats.default');
    }

    Date.parseCodes.S.s = '(?:st|nd|rd|th)';

    //*****************************************************************
    //COMPONENTS
    if (Ext.Picker) {
        Ext.override(Ext.Picker, I18n.t('components.picker'));
    }

    if (Ext.NestedList) {
        Ext.override(Ext.NestedList, I18n.t('components.nestedlist'));
    }

    if (Ext.MessageBox) {
        Ext.MessageBox.OK.text = I18n.t('components.messagebox.ok');
        Ext.MessageBox.CANCEL.text = I18n.t('components.messagebox.cancel');
        Ext.MessageBox.YES.text = I18n.t('components.messagebox.yes');
        Ext.MessageBox.NO.text = I18n.t('components.messagebox.no');
    }

    if (Ext.DatePicker) {
        Ext.override(Ext.DatePicker, I18n.t('components.datepicker'));
    }

    if (Ext.ux.TimePicker) {
        Ext.override(Ext.ux.TimePicker, I18n.t('components.datepicker'));
    }

    if (Ext.ux.NumberPicker) {
        Ext.override(Ext.ux.NumberPicker, I18n.t('components.datepicker'));
    }

    if (Ext.List) {
        Ext.override(Ext.List, I18n.t('components.nestedlist'));
    }

    if (Ext.DataView) {
        Ext.override(Ext.DataView, I18n.t('components.nestedlist'));
    }

    if (App.views.TmoList) {
        Ext.override(App.views.TmoList, I18n.t('components.nestedlist'));
    }

    Ext.apply(Ext.util.Format, {
        defaultDateFormat:I18n.t('components.datepicker.format')
    });
}

setTmoLocales();