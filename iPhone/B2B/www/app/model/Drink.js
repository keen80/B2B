Ext.define("B2B.model.Drink", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		identifier:'uuid',
		fields: [
			{ name: 'idDrink', type: 'string' },
			{ name: 'displayName', type: 'string' },
			{ name: 'idUser', type: 'string' },
			{ name: 'idBeer', type: 'string' },
			{ name: 'beerName', type: 'string' },
			{ name: 'idPlace', type: 'string' },
			{ name: 'placeName', type: 'string' },
			{ name: 'image', type: 'string' },
			{ name: 'rate', type: 'int' },
			{ name: 'rate2', type: 'int' },
			{ name: 'rate3', type: 'int' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' }
		],
		validations: [
			{ type: 'presence', field: 'idDrink'}
		]
	}
});