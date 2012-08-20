Ext.define("B2B.controller.Camera", {
	extend : "Ext.app.Controller",
	xtype : "camera",
	config : {
		refs : {
			app: "_app",
			userprofileform: "userprofileform",
			cameraTestcontainerpanel : "cameracontainerpanel"
		},
		control : {
			cameraTestcontainerpanel : {
				takePhotoCommand : "takePhoto"
			},
			userprofileform: {
				chooseProfilePictureCommand: "onChooseProfilePictureCommand",
				removeProfilePictureCommand: "onRemoveProfilePictureCommand"
			}
			
		}
	},
	takePhoto : function() {
		var isDevice = (Ext.browser.is.WebView && (Ext.os.is.Android || Ext.os.is.iOS)),
			isCameraAvailable = false,
			camera = Ext.device.Camera;

		if (isDevice) {
			camera.capture({
				success : function(image) {
					isCameraAvailable = true;
				},
				source : 'camera'
			});

			/*camera.capture({
				success : function(image) {
					var view = Ext.getCmp('photoView');
					view.setSrc(image);
				},
				failure : function(e) {
					console.log("SKIFO|||" + e);
				},
				quality : 75,
				width : 200,
				height : 200,
				destination : 'file',
				source : 'camera'
			});
			*/
			this.getApp().push({
				xtype: "camerapicker"
			});
		} else {
			this.getApp().push({
			xtype: "camerapicker"
		});
			//Ext.Msg.alert(i18n.app.COMMON_ATTENTION, i18n.app.LABEL_CAMERA_NOT_AVAILABLE);
		}
	},
	onChooseProfilePictureCommand: function(){
		console.log("TODO: Choose Profile Picture Event Received");
	},
	onRemoveProfilePictureCommand: function(){
		console.log("TODO: Remove Profile Picture Event Received");
	},
	launch : function() {
		this.callParent(arguments);
	},
	init : function() {
		this.callParent(arguments);
	}
});