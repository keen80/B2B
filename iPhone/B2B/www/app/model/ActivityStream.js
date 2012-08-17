Ext.define("B2B.model.ActivityStream", {
	extend: "Ext.data.Model",
	config: {
		idProperty: 'idActivity',
		fields: [
			{ name: 'idActivity', type: 'int' },
			{ name: 'avatar', type: 'string' },
			{ name: 'displayName', type: 'string' },
			{ name: 'idUser', type: 'string' },
			{ name: 'idBeer', type: 'string' },
			{ name: 'idPlace', type: 'string' },
			{ name: 'idFriend', type: 'string' },
			{ name: 'beerName', type: 'string' },
			{ name: 'placeName', type: 'string' },
			{ name: 'friendName', type: 'string' },
			{ name: 'type', type: 'int' },
			{ name: 'status', type: 'int' },
			{ name: 'like', type: 'int' },
			{ name: 'date', type: 'date', dateformat: 'c' }
		],
		validations: [
		//	{ type: 'presence', field: 'id'}
		]
	}
});