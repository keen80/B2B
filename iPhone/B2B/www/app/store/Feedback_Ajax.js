Ext.define("B2B.store.Feedback_Ajax", {
	extend: "Ext.data.Store",
	id: "Feedback_Ajax",
	config: {
		model: "B2B.model.Feedback",
		proxy: {
			// Mock for Development
			type:'ajax',
			url:'json/mock_feedbacklist.json',
			// type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
            // url: (HH.OFFLINE_MODE ? 'json/mock_feedbacklist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listBeer_jsonp'),
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			},
			extraParams:{
                target:''
            }
		},
		//autoLoad: true,
		autosync: true,
		listeners:{
			exception:function(proxy, response, orientation){
				console.error('Failure Notification', response.responseText);
				utils.alert('Loading failed', response.statusText);
			},
			callback: function(success,response){
				console.log("Feedback Store Callback");
			},
			load:function(el,records, successful){
				HH.log("* Loaded: Store.Feedback_Ajax");

			}
		}
	}

});
