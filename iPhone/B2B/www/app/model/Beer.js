Ext.define("B2B.model.Beer", {
	extend: "Ext.data.Model",
	config: {
		idProperty: 'idBeer',
		fields: [
			{ name: 'idBeer', type: 'int' },
			{ name: 'idUser', type: 'int' },
			{ name: 'username', type: 'string' },
			{ name: 'name', type: 'string' },
			{ name: 'brewery', type: 'string' },
			{ name: 'nationality', type: 'string' },
			{ name: 'type', type: 'string' },
			{ name: 'beerstyle', type: 'string' },
			{ name: 'grad', type: 'float' },
			{ name: 'image', type: 'string' },
			{ name: 'status', type: 'int' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' },
			{ name: 'param1', type: 'int' },
			{ name: 'param2', type: 'int' },
			{ name: 'param3', type: 'int' }
		],
		validations: [
			{ type: 'presence', field: 'id'}
		]
	}
});