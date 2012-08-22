Ext.define("B2B.model.Login", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		identifier:'uuid',
		fields: [
			{ name: 'username', type: 'string' },
			{ name: 'password', type: 'string' },
			{ name: 'dateRequest', type: 'date', dateformat: 'c' }
		],
		validations: [
			{ type: 'presence', field: 'username'},
			{ type: 'presence', field: 'password'},
			{ type: 'length', field: 'username', min:3},
			{ type: 'length', field: 'password', min: 3},
		]
	}
});