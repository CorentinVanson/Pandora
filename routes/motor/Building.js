function Building(type,orientation) {
	this.type=type;

	//0->SE 1->SW 2->NW 3->NE
	this.orientation = orientation;
	
	this.getType = function(){
		return this.type;
	}
	
	this.getOrientation = function(){
		return this.orientation;
	}
	
	this.setOrientation = function(o){
		this.orientation = o;
	}
}
Building.getNumberType = function(){
	return 11;
}

module.exports = Building;