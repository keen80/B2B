Ext.define('B2B.view.Camera_Container', {
	extend: 'Ext.Container',
	xtype: 'cameracontainerpanel',
	config: {
		title : i18n.app.LABEL_CAMERA,
		iconCls : 'photo1',
		styleHtmlContent: true,
		scrollable: true,
		layout: 'vbox',
		items : []
	},
	initialize: function (a, b) {
		var components = [
			{
				xtype: "image",
				id: 'photoView',
				src: '',
				flex: 1
			},
			{
				xtype: "button",
				text: i18n.app.BTN_PHOTO,
				ui: 'action',
				id: 'takephoto_btn',
				handler: this.onTakePhotoButtonTap,
				scope: this,
				height: 50
			}
		];

		this.add(components);
	},
	onTakePhotoButtonTap: function(){
		this.fireEvent("takePhotoCommand", this);
	}
});