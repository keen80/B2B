Ext.define("B2B.model.Place", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		//idProperty: 'idPlace',
		identifier:'uuid',
		fields: [
			{ name: 'idPlace', type: 'string' },
			{ name: 'placeName', type: 'string' },
			{ name: 'lat', type: 'string' },
			{ name: 'long', type: 'string' },
			{ name: 'description', type: 'string' },
			{ name: 'category', type: 'int' },
			{ name: 'subcategory', type: 'int', defaultValue: 0}
		],
		validations: [
			{ type: 'presence', field: 'idPlace'}
		]
	}
});