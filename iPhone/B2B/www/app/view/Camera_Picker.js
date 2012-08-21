Ext.define('B2B.view.Camera_Picker', {
	extend: 'Ext.picker.Picker',
	xtype: 'camerapicker',
	autoDestroy: true,
	config: {
		slots: [
			{
				name : 'camera_source',
				title : 'Select source',
				data : [
					{text: i18n.app.PICKER_CAMERA, value:true},
					{text: i18n.app.PICKER_LIBRARY, value:false}
				]
			}
		]
	},
	initialize: function(){
		this.callParent(arguments);
	},
	listeners: {
		change: function (picker, value, oldValue) {
			var eventName = "openLibraryCommand";
			if (value.camera_source) {
				eventName = "openCameraCommand";
			}

			this.fireEvent(eventName, this);
		},
		cancel: function (picker) {}
	}
});