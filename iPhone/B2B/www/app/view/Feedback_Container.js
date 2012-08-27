Ext.define('B2B.view.Feedback_Container', {
	extend: 'Ext.Panel',
	xtype: 'feedbackcontainerpanel',
	id: 'feedbackcontainerpanel',
	config: {
		title: i18n.app.FORM_FEEDBACK
	},
	initialize: function(){
		this.callParent(arguments);

		if(this.target){

			var store = Ext.getStore("Feedback_Ajax");
			store.getProxy().setExtraParam(target, this.target); 
			
			var feedbacklist = {
				xtype: "feedbacklistcomponent",
	            store: store,
	            draggable: false,
	            height: 100
	        };

			var feedbackform = {
				xtype: 'feedbackform'
			};
			
			this.add([feedbacklist, feedbackform]);

		}else{
			var nocomment = [
				'<div>'+i18n.app.TEXT_NOFEEDBACKFOUND+'</div>'
			].join("");
			this.add([nocomment]);
		}
        
	}
});