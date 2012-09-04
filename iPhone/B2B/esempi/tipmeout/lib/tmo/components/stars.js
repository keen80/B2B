// stars for forms
function editableStarsField(label, name, value, stars_count) {
    var max = (typeof stars_count == 'number') ? stars_count : 5;

    return new Ext.ux.touch.Rating({
        id: 'a',
        minValue: -1,
        required: true,
        label: label,
        cls: 'x-field-rating',
        inputCls: 'x-rating-star-input',
        itemCls: 'x-rating-star',
        itemHoverCls: 'x-rating-star-hover',
        showClear: false,
        itemsCount: max,
        name: name,
        value: value
    });
}
