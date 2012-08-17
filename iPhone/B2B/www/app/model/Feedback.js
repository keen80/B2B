Ext.define("B2B.model.Feedback", {
	extend: "Ext.data.Model",
	config: {
		idProperty: 'id',
		fields: [
			{ name: 'id', type: 'int' },
			{ name: 'rate', type: 'int' },
			{ name: 'comment', type: 'string' },
			{ name: 'idUser', type: 'string' },
			{ name: 'idTarget', type: 'string' },
			{ name: 'type', type: 'string' },
			{ name: 'like', type: 'int' }
			{ name: 'insertedOn', type: 'date', dateformat: 'c' },
		],
		validations: [
			{ type: 'presence', field: 'id'}
		]
	}
});