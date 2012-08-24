Ext.define('B2B.view.Feedback_Form', {
	extend: 'Ext.form.Panel',
	xtype: 'feedbackform',
	id: 'feedbackform',
	config: {
		title: i18n.app.FORM_FEEDBACK
	},

	initialize: function(){
		this.callParent(arguments);

		var components = [
			{
				xtype: "textareafield",
				id: 'textAreaComment',
				src: '',
				flex: 1
			},
			{
				xtype: "button",
				text: i18n.app.BTN_SEND,
				ui: 'action',
				id: 'sendcomment_btn',
				handler: this.onSendButtonTap,
				scope: this,
				height: 50
			}
		];

		this.add(components);
	},
	onSendButtonTap: function(){
		this.fireEvent("sendCommentCommand", this);
	}
});