Ext.define("B2B.model.Badge", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		identifier:'uuid',
		fields: [
			{ name: 'idBadge', type: 'int' },
			{ name: 'name', type: 'string' },
			{ name: 'cod', type: 'int' },
			{ name: 'category', type: 'int' },
			{ name: 'image', type: 'string' },
			//TO DO
			{ name: 'active', type: 'boolean' },
			{ name: 'description', type: 'string' }
		],
		validations: [
			{ type: 'presence', field: 'idBadge'}
		]
	}
});