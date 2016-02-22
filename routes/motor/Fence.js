function Fence(type){
	this.type = type;
	this.getType = function(){
		return this.type;
	}
}

Fence.getNumberType = function(){
	return 3;
}

module.exports = Fence;