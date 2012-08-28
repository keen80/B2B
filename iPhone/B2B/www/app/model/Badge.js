Ext.define("B2B.model.Badge", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		identifier:'uuid',
		fields: [
			{ name: 'idBadge', type: 'string' },
			{ name: 'title', type: 'string' },
			{ name: 'description', type: 'string' },
			{ name: 'imageUrl', type: 'string' },
			{ name: 'active', type: 'boolean' }
		],
		validations: [
			{ type: 'presence', field: 'idBadge'}
		]
	}
});