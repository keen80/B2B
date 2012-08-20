Ext.define("B2B.model.BeerSingle", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		idProperty: 'idBeer',
		identifier:'uuid',
		fields: [
			{ name: 'idBeer', type: 'int' },
			{ name: 'name', type: 'string' }
			
		],
		validations: [
		//	{ type: 'presence', field: 'idBeer'}
		]
	}
});