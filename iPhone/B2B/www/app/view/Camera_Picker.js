Ext.define('B2B.view.Camera_Picker', {
	extend: 'Ext.picker.Picker',
	xtype: 'camerapicker',
	config: {
		slots: [
			{
				name : 'camera_source',
				title : 'Select source',
				data : [
					{text: 'Camera', value:true},
					{text: 'Album', value:false},
				]
			}
		]
	},
	initialize: function(){
		this.callParent(arguments);
		console.log("CAMERA: " + arguments);
	}
});