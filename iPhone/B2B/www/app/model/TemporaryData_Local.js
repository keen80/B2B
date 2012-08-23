Ext.define("B2B.model.TemporaryData_Local", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		//idProperty: 'idDrink',
		identifier:'uuid',
		fields: [
			{ name: 'idDrink', type: 'string' },
			{ name: 'username', type: 'string' },
			{ name: 'beer', type: 'string' },
			{ name: 'feedback', type: 'string' },
			{ name: 'image', type: 'string' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' }
		],
		validations: [
			{ type: 'presence', field: 'idDrink'}
		]
	}
});