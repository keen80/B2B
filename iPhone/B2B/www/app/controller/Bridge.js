function loginOnFBCompleted(email, displayName, gender, nationality, birthDay) {
	var profileStore = Ext.getStore("Profile_Local");
	if (profileStore && profileStore.getCount() < 1) {
		var nat = (nationality ? nationality.split("_")[0].toUpperCase() : "");
		var register = Ext.create('B2B.view._Register');

		register.setValues({
			birthDay: new Date(birthDay),
			email: email,
			displayName: displayName,
			gender: gender,
			nationality: nat
		});

		Ext.Viewport.removeAt(0, true);
		Ext.Viewport.add(register);
	} else {
		var data = profileStore.first().data;
		utils.generateToken(data, profileStore, Ext.Viewport);
	}
//	var profileForm = this.getProfileForm();
//	profileForm.reset();
//	profileForm.setRecord(Ext.getStore('Profile_Local').first());

	// Ext.Ajax.request({
	// 	//url: "http://192.168.1.161:8080/birrettaservice/rest/bserv/login",
	// 	url: "http://localhost:8081/birrettaservice/rest/bserv/login",
	// 	method: "POST",
	// 	defaultHeaders: {
	// 		'Content-Type': 'application/json; charset=iso-8859-1'
	// 	},
	// 	params: {
	// 		username: username,
	// 		password: password
	// 	},
	// 	timeout: 10000,
	// 	//success: function(result) {
	// 	failure: function(result) {
	// 		HH.log("---> Step: AUTH Success");
	// 		goingTo.step2("Loading Store.Profile_Ajax");
	// 		HH.log("---> Step: Clear app, loading _App");
	// 		Ext.Viewport.removeAll(true, true);
	// 		Ext.Viewport.add(Ext.create('B2B.view._App'));
	// 	},
	// 	failure_: function(){
	// 		alert("Could not connect to server.");
	// 	}
	// });
}