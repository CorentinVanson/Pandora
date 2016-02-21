function Road(type) {
	this.type = type;
	this.getType = function(){
		return this.type;
	}
}

Road.getNumberType = function(){
	return 2;
}

module.exports = Road;