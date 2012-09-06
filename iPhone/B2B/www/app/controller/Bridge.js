// Bridge to native functions
function facebookLogInStatus(isLoggedIn) {
	if (isLoggedIn) {
		bridge.getFBUserInformations();
	} else {
		if (Ext.fly('appLoadingIndicator')) {
			Ext.fly('appLoadingIndicator').destroy();
		}
		Ext.Viewport.removeAll(true, true);
		Ext.Viewport.add(Ext.create('B2B.view._Login'));
	}
};

function loginOnFBCompleted(success, email, displayName, gender, nationality, birthDay) {
	Ext.Viewport.setMasked(false);
	if (success) {
		if (Ext.fly('appLoadingIndicator')) {
			Ext.fly('appLoadingIndicator').destroy();
		}
		authentication.loginOnFBCompleted(email, displayName, gender, nationality, birthDay);
	} else {
		utils.alert(i18n.app.ALERT_ERRORCOMMUNICATION, i18n.app.COMMON_ATTENTION);
	}
};

function logoutCompleted() {
	window.location.reload();
};

var bridge = {
	getFBUserLogInStatus: function() {
		if (Ext.feature.has.Touch) {
			var selector = "targets=socialManager:getFBUserLogInStatus";
			this.sendSelector(selector);
		} else {
			facebookLogInStatus(true);
		}
	},
	getFBUserInformations: function() {
		Ext.Viewport.setMasked(true);
		if (Ext.feature.has.Touch) {
			var selector = "targets=socialManager:getFBUserInformations";
			this.sendSelector(selector);
		} else {
			loginOnFBCompleted(true, "pippo@gmail.com", "Pippo", "male", "it_IT", "10/09/1983");
		}
	},
	doLoginOnFB: function() {
		if (Ext.feature.has.Touch) {
			var selector = "targets=socialManager:doLoginOnFB";
			this.sendSelector(selector);
		} else {
			loginOnFBCompleted(true, "pippo@gmail.com", "Pippo", "male", "it_IT", "10/09/1983");
		}
	},
	logout: function() {
		if (Ext.feature.has.Touch) {
			var selector = "targets=socialManager:logout";
			this.sendSelector(selector);
		} else {
			logoutCompleted();
		}
	},
	sendSelector: function(selector) {
		if (Ext.feature.has.Touch && !_.isEmpty(selector)) {
			document.location = "selector://" + selector;
		}
	}
};

var authentication = {
	userLoggedOnFB: {
		email: "",
		displayName: "",
		gender: "",
		nationality: "",
		birthDay: ""
	},
	loginOnFBCompleted: function(email, displayName, gender, nationality, birthDay) {
		var viewport = Ext.Viewport;

		this.userLoggedOnFB.email = email;
		this.userLoggedOnFB.displayName = displayName;
		this.userLoggedOnFB.gender = gender;
		this.userLoggedOnFB.nationality = (nationality ? nationality.split("_")[0].toUpperCase() : "");
		this.userLoggedOnFB.birthDay = birthDay;

		viewport.setMasked(true);
		var profileStore = Ext.getStore("Profile_Local");
		if (profileStore) {
			if (profileStore.getCount() < 1) {
				this.generateToken(email, viewport);
			} else {
				var data = profileStore.first().data;
				if (data.idUser !== email || _.isEmpty(data.token)) {
					Ext.getStore("Profile_Local").removeAll();
					this.generateToken(email, viewport);
				} else {
					viewport.removeAll(true, true);
					goingTo.step2("Loading Store.Profile_Ajax");
					viewport.add([Ext.create('B2B.view._App')]);
				}
			}
		}
		viewport.setMasked(false);
	},
	registerUserWithParams: function(values) {
		var errorCode = -1,
			that = this;

		Ext.Viewport.setMasked(true);

		if (values && !_.isEmpty(values.idUser) && !_.isEmpty(values.displayName) && !_.isEmpty(values.birthDate)) {
			var params = {
				idUser: values.idUser,
				username: values.idUser,
				displayName: values.displayName,
				email: values.email,
				gender: values.gender,
				nationality: values.nationality,
				birthDate: values.birthDate
			};

			Ext.Ajax.request({
				url: HH.IP_PORT_SERVER + "/birrettaservice/rest/bserv/saveUser",
				method: "POST",
				headers: {
	        		"btUsername": values.idUser
	    		},
				params: params,
				success: function(result) {
					var json = Ext.decode(result.responseText, true);
					if (json) {
						errorCode = json.response.status.code;

						if (errorCode < 200 && json.response.body.list.length > 0) {
							var token = json.response.body.list[0].btSid;
							that._doRegisterUserCallback(0, {
									idUser: params.idUser,
									username: params.username,
									displayName: params.displayName,
									email: params.email,
									gender: params.gender,
									nationality: params.nationality,
									birthDate: params.birthDate,
									token: token
								},
								errorCode);
						} else {
							that._doRegisterUserCallback(1, null, errorCode);
						}
					} else {
						that._doRegisterUserCallback(1, null, errorCode);
					}
				},
				failure: function(result) {
					that._doRegisterUserCallback(1, null, errorCode);
				}
			});
		} else {
			that._doRegisterUserCallback(2, null, errorCode);
		}
	},
	generateToken: function(idUser) {
		var errorCode = -1,
			that= this;

		Ext.Viewport.setMasked(true);

		if (!_.isEmpty(idUser)) {
			Ext.Ajax.request({
				url: HH.IP_PORT_SERVER + "/birrettaservice/rest/bserv/generaToken",
				method: "POST",
				params: {
					idUser: idUser
				},
				success: function(result) {
					var json = Ext.decode(result.responseText, true),
						index = 0, token = "";
					if (json) {
						errorCode = json.response.status.code;

						if (errorCode < 200 && json.response.body.list.length > 0) {
							token = json.response.body.list[0].btSid;
							index = 0;
						} else if (errorCode === 200) {
							index = 1;
						} else {
							HH.log("--> Step: Generate token failure - CODE: " + json.response.status.code);
							index = 2;
						}
					}

					that._doGenerateTokenCallback(index, token, errorCode);
				},
				failure: function(result) {
					that._doGenerateTokenCallback(2, "", errorCode);
				}
			});
		} else {
			that._doGenerateTokenCallback(3, "", errorCode);
		}
	},
	_doGenerateTokenCallback: function(index, token, errorCode) {
		var store = Ext.getStore("Profile_Local"),
			viewport = Ext.Viewport;

		switch(index) {
			case 0:    // Success
				HH.log("---> Step: [Generate Token] Success");
				if (store.getCount() < 1) {
					store.add({
						idUser: this.userLoggedOnFB.email,
						token: token
					});
				} else {
					store.first().set("token", token);
				}
				goingTo.step2("Loading Store.Profile_Ajax");

				viewport.removeAll(true, true);
				viewport.add([Ext.create('B2B.view._App')]);
				break;
			case 1:    // Fail: user not present
				HH.log("--> Step: [Generate token] User not present - CODE: " + errorCode);
				var register = Ext.create('B2B.view._Register');

				register.setValues({
					idUser: this.userLoggedOnFB.email,
					birthDay: new Date(this.userLoggedOnFB.birthDay),
					email: this.userLoggedOnFB.email,
					displayName: this.userLoggedOnFB.displayName,
					gender: this.userLoggedOnFB.gender,
					nationality: this.userLoggedOnFB.nationality
				});

				Ext.Viewport.removeAll(true, true);
				Ext.Viewport.add([register]);
				break;
			case 2:    // Fail
				HH.log("--> Step: [Generate token] Failure - CODE: " + errorCode);
				utils.alert(i18n.app.ALERT_ERRORCOMMUNICATION, i18n.app.COMMON_ATTENTION);
				break;
			case 3:    // Params error
				HH.log("---> Step: [Generate token] Params are wrongs");
				break;
		}

		viewport.setMasked(false);
	},
	_doRegisterUserCallback: function(index, userValues, errorCode) {
		var store = Ext.getStore("Profile_Local")
			viewport = Ext.Viewport;

		switch(index) {
			case 0:    // Success
				if (userValues) {
					HH.log("---> Step: [Register user] Success");
					store.removeAll();
					store.add(userValues);
					store.sync();

					viewport.removeAll(true, true);
					goingTo.step2("Loading Store.Profile_Ajax");
					viewport.add([Ext.create('B2B.view._App')]);
				} else {
					HH.log("---> Step: [Register user] Failure - User values are empty");
				}
				break;
			case 1:    // Fail
				HH.log("--> Step: [Register user] Failure - CODE: " + errorCode);
				utils.title(i18n.app.COMMON_ATTENTION, i18n.app.ALERT_ERRORCOMMUNICATION);
				break;
			case 2:    // Params error
				HH.log("---> Step: [Register user] Params are wrong");
				break;
		}

		viewport.setMasked(false);
	}
};