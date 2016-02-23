function Animal(type, i, j){
	this.type = type;
	this.getType = function(){
		return this.type;
	}

	this.i = i;
	this.getI = function(){
		return this.i;
	}

	this.j = j;
	this.getJ = function(){
		return this.j;
	}

}

Animal.getNumberType = function(){
	return 7;
}

module.exports = Animal;