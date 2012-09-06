Ext.define("B2B.model.Friend", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		//idProperty: 'idUser',
		identifier:'uuid',
		fields: [
			{ name: 'idUser', type: 'string' },
			{ name: 'username', type: 'string' },
			{ name: 'displayName', type: 'string' },
			{ name: 'firstName', type: 'string' },
			{ name: 'lastName', type: 'string' },
			{ name: 'description', type: 'string' },
			{ name: 'email', type: 'email' },
			{ name: 'gender', type: 'int', defaultValue: 0},
			{ name: 'nationality', type: 'string' },
			{ name: 'birthDate', type: 'date', dateformat: 'c' },
			{ name: 'avatar', type: 'string', defaultValue: 'resources/images/defaultAvatar.jpg'},
			{ name: 'role', type: 'int' },
			{ name: 'status', type: 'int' },
			{ name: 'activatedOn', type: 'date', dateformat: 'c' },
			{ name: 'lastLoginOn', type: 'date', dateformat: 'c' },
			{ name: 'badges', type: 'string', defaultValue: ''},
			{ name: 'favorites', type: 'string', defaultValue: ''},
			{ name: 'liked', type: 'string', defaultValue: '' },
			{ name: 'counterCheckIns', type: 'int', defaultValue: 0 },
			{ name: 'counterFriend', type: 'int', defaultValue: 0 },
			{ name: 'counterBadges', type: 'int', defaultValue: 0},
			{ name: 'countWeekCheckIns', type: 'int', defaultValue: 0}
		],
		validations: [
			{ type: 'presence', field: 'displayName'}
		]
	}
});