Ext.define("B2B.model.Notification", {
	extend: "Ext.data.Model",
	config: {
		idProperty: 'id',
		fields: [
			{ name: 'id', type: 'int' },
			{ name: 'description', type: 'string' },
			{ name: 'idUser', type: 'string' },
			{ name: 'idTarget', type: 'string' },
			{ name: 'type', type: 'string' },
			{ name: 'read', type: 'int' }
			{ name: 'insertedOn', type: 'date', dateformat: 'c' },
		],
		validations: [
			{ type: 'presence', field: 'id'}
		]
	}
});