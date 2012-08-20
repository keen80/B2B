Ext.define("B2B.controller.Camera", {
	extend : "Ext.app.Controller",
	config : {
		refs : {
			activitylistcontainerpanel : "cameracontainerpanel"
		},
		control : {
			activitylistcontainerpanel : {
				takePhotoCommand : "takePhoto"
			}
		}
	},
	takePhoto : function() {
		var isDevice = (Ext.browser.is.WebView && (Ext.os.is.Android || Ext.os.is.iOS));

		if (isDevice) {
			Ext.device.Camera.capture({
				success : function(image) {
					var view = Ext.getCmp('photoView');
					console.log(image);
					view.setSrc(image);
				},
				quality : 75,
				width : 200,
				height : 200,
				destination : 'file',
				source : 'library'
			});
		} else {
			Ext.Msg.alert(i18n.app.COMMON_ATTENTION, i18n.app.LABEL_CAMERA_NOT_AVAILABLE);
		}
	},
	launch : function() {
		this.callParent(arguments);
	},
	init : function() {
		this.callParent(arguments);
	}
});