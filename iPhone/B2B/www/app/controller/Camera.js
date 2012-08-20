Ext.define("B2B.controller.Camera", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			activitylistcontainerpanel: "cameracontainerpanel"
		},
		control: {
			activitylistcontainerpanel: {
				cameraCommand: "openPhotoPicker"
			}
		}
	},
	openPhotoPicker: function(){
		Ext.Msg.alert('Event openPhotoPicker Received');
	},
	launch: function(){
		this.callParent(arguments);
		//Ext.getStore("Activities_Ajax").load();


	},
	init: function(){
		this.callParent(arguments);
	}
});