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
			{ name: 'lng', type: 'string' },
			{ name: 'url', type: 'string' },
			{ name: 'category', type: 'string' },
		],
		validations: [
			{ type: 'presence', field: 'idPlace'}
		]
	}
});