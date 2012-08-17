var HH_config = {
	"beergroup": 2
}

/* Utils Global Object*/
var utils = {
	/* translate f() a la wordpress */
	__:	function(CONST_String){
	    if ( _.isUndefined(CONST_String)) CONST_String = "";
	    for (var i = arguments.length - 1; i >= 1; i--) {
	    	CONST_String = CONST_String.replace("%"+i, arguments[i]);
	    };
	    return CONST_String;
	},
	getDisplayName: function(json){
		if (json.displayName){
			return json.displayName;
		} else if(json.firstName && json.lastName){
			return json.firstName + " " + ((json.lastName).charAt(0)).toUpperCase() + ".";
		}else if(json.firstName){
			return json.firstName;
		} else {
			return json.username;
		}
	},
	getCountryFromCode: function(value){
		return (_.find(i18n.countries, function(state){ return state.value === value.toUpperCase();})||"").text;
	},
	getCodeFromCountry: function(text){
		return (_.find(i18n.countries, function(state){ return state.text.toUpperCase() === text.toUpperCase();})||"").value;
	},
	getBeerStyleFromCode: function(value) {
		return (_.find(i18n.beerstyles, function(style){ return style.value === value;})||"").text;
	},
	getBeerCodeFromStyle: function(text) {
		return (_.find(i18n.beerstyles, function(code){ return code.text.toUpperCase() === text.toUpperCase();})||"").value;
	}
}
	

