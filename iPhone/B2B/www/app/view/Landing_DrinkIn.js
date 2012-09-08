Ext.define('B2B.view.Landing_DrinkIn', {
	extend: 'Ext.Panel',
	xtype: 'landingdrinkin',
	config: {
		title: i18n.app.LABEL_FRIENDS,
        layout: {
        	type: 'fit'
        }
	},
	initialize: function(){

    	this.callParent(arguments);
  
      	var continueButton = {
          text: i18n.app.BTN_CONTINUE,
          ui: 'back',
          id: 'back_landingdrink_btn',
          handler: this.onContinue,
          scope: this
      	};

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_GREAT,
			docked: 'top',
			items: [
			]
		};

		var content = {

		};

		this.add([toolbar, content]);

    },
	onContinue: function(){
		this.fireEvent("landingDrinkBackCommand", this);
	}

});