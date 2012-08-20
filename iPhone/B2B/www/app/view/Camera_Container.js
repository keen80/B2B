Ext.define('B2B.view.Camera_Container', {
	extend: 'Ext.Container',
	xtype: 'cameracontainerpanel',

	config: {
		title : i18n.app.LABEL_CAMERA,
		iconCls : 'photo1',
		styleHtmlContent: true,
		scrollable: true,
		items : [
			{
				xtype: "button",
				text: i18n.app.BTN_CAMERA,
				ui: 'action',
				id: 'camera_btn',
				handler: this.onCameraButtonTap,
				scope: this
			}
		]
	},

	onCameraButtonTap: function(){
		console.log("CIAO");
		this.fireEvent("cameraCommand", this);
	}
});