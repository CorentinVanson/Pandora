var Map = function (size,res) {

	var Building = require('./Building');
	var Tile = require('./Tile');
	var Road = require('./Road');
	var Fence = require('./Fence');

	this.size = size;
	this.res = res;

    this.gridTile = new Array(this.size);
    this.gridRoad = new Array(this.size);
    this.gridBuilding = new Array(this.size);
    this.gridFence = new Array();

    for (var i = 0; i < this.size; i++) {
		this.gridTile[i] = new Array(this.size);
		this.gridRoad[i] = new Array(this.size);
		this.gridBuilding[i] = new Array(this.size);
    	for (var j = 0; j < this.size; j++) {
		  	this.gridTile[i][j] = 0;
		  	this.gridRoad[i][j] = 0;
		  	this.gridBuilding[i][j] = 0;
		}
	}

	this.initiateRandomMap = function(){
		for(var i = 0; i<this.size; i++){
			for (var j = 0; j<this.size; j++){
				var prob1 = -1;
				var prob2 = -1;
				var neighbors = new Array(Tile.getNumberType());
				for(var k = 0; k<Tile.getNumberType(); k++){
					neighbors[k] = 0;
				}

				if((i-1)>0 && this.gridTile[i-1][j] != 0){
					neighbors[this.gridTile[i-1][j].getType()] += 1;
					prob1 = this.gridTile[i-1][j].getType();
				}
				if((j-1)>0 && this.gridTile[i][j-1] != 0){
					neighbors[this.gridTile[i][j-1].getType()] += 1;
					prob2 = this.gridTile[i][j-1].getType();

				}

				var rand = Math.random();
				var newType = 0;
				if(prob1 != -1 && prob1 == prob2){
					if(rand < 0.9){
						newType = prob1;
					}else{
						newType = Math.floor((rand-0.9)/((1-0.9)/Tile.getNumberType()));
					}
				}else if(prob1 != -1 && prob2 != -1 && prob1 != prob2){
					if(rand < 0.4){
						newType = prob1;
					}else if(rand < 0.8){
						newType = prob2;
					}else{
						newType = Math.floor((rand-0.8)/((1-0.8)/Tile.getNumberType()));
					}
				}else if(prob1 != prob2){
					if(rand < 0.4){
						if(prob1 == -1){
							newType = prob2 ;
						}else{
							newType = prob1 ;
						}
					}else{
						newType = Math.floor((rand-0.4)/((1-0.4)/Tile.getNumberType()));
					}
				}else{
					newType = Math.floor((rand)/(1/Tile.getNumberType()));
				}
				this.gridTile[i][j] = new Tile(newType);

				rand = Math.random();
					if(rand < 0.8){
						newType = 0;
					}else{
						newType = Math.floor((rand-0.8)/((1-0.8)/Building.getNumberType()));
					}
				this.gridBuilding[i][j] = new Building(newType,Math.floor(Math.random() * (3 + 1)));

				rand = Math.random();
					if(rand < 0.2){
						newType = 0;
					}else{
						newType = Math.floor((rand-0.2)/((1-0.2)/Road.getNumberType()));
					}
				this.gridRoad[i][j] = new Road(newType);

				rand = Math.random();
				this.gridFence.push(new Fence(Math.floor(rand*Fence.getNumberType()),i,j,i+1,j));
			}
		}
	}

	this.getMatrixTile = function(){
		var matrix = new Array(this.size);
	    for (var i = 0; i < this.size; i++) {
		  matrix[i] = new Array(this.size);
		}
		for(var i = 0; i<this.size; i++){
			for (var j = 0; j<this.size; j++){
				matrix[i][j] = this.gridTile[i][j].getType();
			}
		}
		return matrix;
	}

	this.getMatrixBuilding = function(){
		var matrix = new Array(this.size);
	    for (var i = 0; i < this.size; i++) {
		  matrix[i] = new Array(this.size);
		}
		for(var i = 0; i<this.size; i++){
			for (var j = 0; j<this.size; j++){
				if(this.gridBuilding[i][j] != 0){
					matrix[i][j] = {
						type 		:this.gridBuilding[i][j].getType(),
						orientation	:this.gridBuilding[i][j].getOrientation()
					};
				}else{
					matrix[i][j] = 0;
				}
			}
		}
		return matrix;
	}

	this.getMatrixRoad = function(){
		var matrix = new Array(this.size);
	    for (var i = 0; i < this.size; i++) {
		  matrix[i] = new Array(this.size);
		}
		for(var i = 0; i<this.size; i++){
			for (var j = 0; j<this.size; j++){
				if(this.gridRoad[i][j] != 0){
					matrix[i][j] = this.gridRoad[i][j].getType();
				}else{
					matrix[i][j] = 0;
				}
			}
		}
		return matrix;
	}

	this.getMatrixFence = function(){
		var matrix = new Array();
		for (var i = 0; i < this.gridFence.length; i++){
			matrix += [this.gridFence[i].getType(),this.gridFence[i].getVector()]
		}
		return matrix;
	}
}

module.exports = Map;