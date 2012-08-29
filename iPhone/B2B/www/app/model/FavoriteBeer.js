Ext.define("B2B.model.FavoriteBeer", {
	extend: "Ext.data.Model",
	requires:'Ext.data.identifier.Uuid',
	config: {
		identifier:'uuid',
		fields: [
			{ name: 'idFavorite', type: 'int' },
			{ name: 'idBeer', type: 'string' },
			{ name: 'beerName', type: 'string' },
		]
	}
});