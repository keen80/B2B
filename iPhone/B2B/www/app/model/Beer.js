Ext.define("B2B.model.Beer", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		//idProperty: 'idBeer',
		identifier:'uuid',
		fields: [
			{ name: 'idBeer', type: 'string' },
			{ name: 'idUser', type: 'string' },
			{ name: 'username', type: 'string' },
			{ name: 'name', type: 'string' },
			{ name: 'brewery', type: 'string' },
			{ name: 'nationality', type: 'string' },
			{ name: 'beertype', type: 'string' },
			{ name: 'beerstyle', type: 'string' },
			{ name: 'grad', type: 'float' },
			{ name: 'image', type: 'string' },
			{ name: 'status', type: 'int' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' },
			{ name: 'param1', type: 'int', defaultValue: 1  },
			{ name: 'param2', type: 'int', defaultValue: 1 },
			{ name: 'param3', type: 'int', defaultValue: 1 }
		],
		validations: [
		//	{ type: 'presence', field: 'idBeer'}
		]
	}
});