Ext.define("B2B.controller._Login", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			_Login: "#BTN_login",
			_App: "_app"
		},
		control: {
			_Login:{
				loginCommand: "onLoginCommand"
			}
		}
	},
	onLoginCommand: function(){
	  	if (navigator.onLine){
                goingTo.step2("Profile_Local: Store Empty, Refresh Data via Ajax");

        }else{
                goingTo.step3("Profile_Local: Offline Mode");
        }
        /* TO DO AUTH */
        if(true){
        	Ext.Viewport.removeAll(true);
        	Ext.Viewport.add(Ext.create('B2B.view._App'));
        }

	},
	init: function(){
		this.callParent(arguments);
	}
});


