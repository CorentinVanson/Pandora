function Fence(type,x,y,x2,y2){
	this.type = type;
	this.getType = function(){
		return this.type;
	}

	this.vector = [[x,y],[x2,y2]];
	this.getVector = function(){
		return this.vector;
	}

}

Fence.getNumberType = function(){
	return 3;
}

module.exports = Fence;