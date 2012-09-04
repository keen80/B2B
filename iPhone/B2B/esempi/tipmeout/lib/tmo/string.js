String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.nl2br = function() {
    var breakTag = '<br>';
    return (this + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
};

String.prototype.newLineReplaceWith = function(separator) {
    return Ext.util.Format.trim(this + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + separator + '$2');
};

String.prototype.toCamel = function(){
	return this.replace(/([\-_][a-z])/g, function($1){return $1.toUpperCase().replace(/[-_]/,'');});
};

String.prototype.toPurple = function(){
    return "<span class=\"cl_purple\">" + this + "</span>";
};

String.prototype.toPurpleBold = function(){
    return "<strong class=\"cl_purple\">" + this + "</strong>";
};


// truncate string (ruby-like)
String.prototype.trunc = function(length, options) {
    var defaults = Ext.Object.merge({omission: "..."}, options || {});

    var stop = length - defaults.omission.length;

    return (this.length > length ? this.substring(0, stop) + defaults.omission : this).toString();
};