Ext.define("B2B.model.Notification", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		idProperty: 'idNotification',
		identifier:'uuid',
		fields: [
			{ name: 'idNotification', type: 'int' },
			{ name: 'idUser', type: 'string' },
			{ name: 'displayName', type: 'string' },
			{ name: 'idTarget', type: 'string' },
			{ name: 'targetName', type: 'string' },
			{ name: 'type', type: 'string' },
			{ name: 'read', type: 'boolean' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' },
		],
		validations: [
			{ type: 'presence', field: 'idNotification'}
		]
	}
});