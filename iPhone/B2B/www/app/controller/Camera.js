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
				chooseProfilePictureCommand: "onChooseProfilePictureCommand"
			}

		}
	},
	onChooseProfilePictureCommand: function(source, imageView){
		this.takePhoto(source, imageView);
	},
	takePhoto : function(source, imageView) {
		this.imageView = imageView;

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
		this.captureFromCamera(false);
	},
	openCamera : function(){
		this.captureFromCamera(true);
	},
	captureFromCamera : function(camera){
		var imageView = this.imageView;
		this.camera.capture({
			success : function(image) {
				if (imageView) {
					imageView.setSrc(image);
				}
			},
			failure : function(e) {
			},
			quality : 75,
			destination : 'file',
			source : (camera ? 'camera' : 'library')
		});
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