Ext.define("B2B.model.Notification", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
	//	idProperty: 'idNotification',
		identifier:'uuid',
		fields: [
			{ name: 'idNotification', type: 'string' },
			{ name: 'image', type: 'string' },
			{ name: 'idBeer', type: 'string' },
			{ name: 'beerName', type: 'string' },
			{ name: 'idFriend', type: 'string' },
			{ name: 'friendName', type: 'string' },
			{ name: 'idPlace', type: 'string' },
			{ name: 'placeName', type: 'string' },
			{ name: 'targetName', type: 'string' },
			{ name: 'type', type: 'int' },
			{ name: 'jumpTo', type: 'string' },
			{ name: 'status', type: 'int' },
			{ name: 'insertedOn', type: 'date', dateformat: 'c' },
		],
		validations: [
			{ type: 'presence', field: 'idNotification'}
		]
	}
});