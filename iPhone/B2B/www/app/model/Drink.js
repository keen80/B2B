Ext.define("B2B.model.Drink", {
	extend: "Ext.data.Model",
	config: {
		idProperty: 'id',
		fields: [
			{ name: 'id', type: 'int' },
			{ name: 'username', type: 'string' },
			{ name: 'beer', type: 'string' },
			{ name: 'feedback', type: 'string' },
			{ name: 'image', type: 'string' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' }
		],
		validations: [
			{ type: 'presence', field: 'id'}
		]
	}
});