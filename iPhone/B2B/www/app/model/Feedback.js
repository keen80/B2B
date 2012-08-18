Ext.define("B2B.model.Feedback", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		idProperty: 'idFeedback',
		identifier:'uuid',
		fields: [
			{ name: 'idFeedback', type: 'int' },
			{ name: 'rate', type: 'int' },
			{ name: 'comment', type: 'string' },
			{ name: 'idUser', type: 'string' },
			{ name: 'idTarget', type: 'string' },
			{ name: 'type', type: 'string' },
			{ name: 'like', type: 'int' }
			{ name: 'insertedOn', type: 'date', dateformat: 'c' },
		],
		validations: [
			{ type: 'presence', field: 'idFeedback'}
		]
	}
});