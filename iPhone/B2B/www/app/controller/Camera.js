Ext.define("B2B.controller.Camera", {
	extend : "Ext.app.Controller",
	xtype : "camera",
	config : {
		refs : {
			app: "_app",
			userprofileform: "userprofileform",
			cameracontainerpanel : "cameracontainerpanel",
			camerapicker : "camerapicker"
		},
		control : {
			cameracontainerpanel : {
				takePhotoCommand : "takePhoto"
			},
			camerapicker : {
				openCameraCommand : "openCamera",
				openLibraryCommand : "openLibrary"
			},
			userprofileform: {
				chooseProfilePictureCommand: "onChooseProfilePictureCommand",
				removeProfilePictureCommand: "onRemoveProfilePictureCommand"
			}

		}
	},
	takePhoto : function() {
		if (this.isDevice) {
			if (this.isCameraAvailable) {
				this.getApp().push({
					xtype: "camerapicker"
				});
			} else {
				this.openLibrary();
			}
		} else {
			Ext.Msg.alert(i18n.app.COMMON_ATTENTION, i18n.app.LABEL_CAMERA_NOT_AVAILABLE);
		}
	},
	openLibrary : function(){
		this.camera.capture({
			success : function(image) {
				var view = Ext.getCmp('photoView');
				view.setSrc(image);
			},
			failure : function(e) {
			},
			quality : 75,
			destination : 'file',
			source : 'library'
		});
	},
	openCamera : function(){
		this.camera.capture({
			success : function(image) {
				var view = Ext.getCmp('photoView');
				view.setSrc(image);
			},
			failure : function(e) {
			},
			quality : 75,
			destination : 'file',
			source : 'camera'
		});
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

		this.isDevice = (Ext.browser.is.WebView && (Ext.os.is('Android') || Ext.os.is('iOS')));
		this.isCameraAvailable = false;

		if (!this.camera) {
			this.camera = Ext.device.Camera;
		}

		if (this.isDevice) {
			this.camera.capture({
				success : function(image) {
					this.isCameraAvailable = true;
				},
				source : 'camera'
			});
		}
	}
});