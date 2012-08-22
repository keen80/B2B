Ext.define("B2B.model.Notification", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
	//	idProperty: 'idNotification',
		identifier:'uuid',
		fields: [
			{ name: 'idNotification', type: 'string' },
			{ name: 'idUser', type: 'string' },
			{ name: 'displayName', type: 'string' },
			{ name: 'idBeer', type: 'string' },
			{ name: 'beerName', type: 'string' },
			{ name: 'idFriend', type: 'string' },
			{ name: 'friendName', type: 'string' },
			{ name: 'idPlace', type: 'string' },
			{ name: 'placeName', type: 'string' },
			{ name: 'description', type: 'string' },
			{ name: 'type', type: 'string' },
			{ name: 'read', type: 'boolean' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' },
		],
		validations: [
			{ type: 'presence', field: 'idNotification'}
		]
	}
});