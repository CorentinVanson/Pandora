function Tile(type){
	this.type = type;
	this.getType = function(){
		return this.type;
	}
}

Tile.getNumberType = function(){
	return 3;
}