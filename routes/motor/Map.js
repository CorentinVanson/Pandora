var Map = function (size,res) {

	var Building = require('./Building');
	var Tile = require('./Tile');
	var Road = require('./Road');
	var Fence = require('./Fence');
	var Animal = require('./Animal');

	this.size = parseInt(size);
	this.res = res;

    this.gridTile = new Array(this.size);
    this.gridRoad = new Array(this.size);
    this.gridBuilding = new Array(this.size);
	this.gridFence = new Array(2);
	this.animal = new Array();
	//horizontaux
	this.gridFence[0] = new Array(this.size + 1);
	//verticaux
	this.gridFence[1] = new Array(this.size);
    for (var i = 0; i < this.size + 1; i++) {
		if(i<this.size) {
			this.gridTile[i] = new Array(this.size);
			this.gridRoad[i] = new Array(this.size);
			this.gridBuilding[i] = new Array(this.size);
			this.gridFence[1][i] = new Array(this.size + 1);
		}
		this.gridFence[0][i] = new Array(this.size);
		for (var j = 0; j < this.size + 1; j++) {
			if(i<this.size && j<this.size) {
				this.gridTile[i][j] = 0;
				this.gridRoad[i][j] = 0;
				this.gridBuilding[i][j] = 0;
				this.gridFence[1][i][j] = 0;
				this.gridFence[0][i][j] = 0;
			}else if(i<this.size){
				this.gridFence[1][i][j] = 0;
			}else if(j<this.size){
				this.gridFence[0][i][j] = 0;
			}
		}
	}

	this.initiateRandomMap = function(rand){
		if(rand) {
			for (var i = 0; i < this.size + 1 ; i++) {
				for (var j = 0; j < this.size + 1 ; j++) {
					if(i<this.size && j<this.size) {
						var prob1 = -1;
						var prob2 = -1;
						var neighbors = new Array(Tile.getNumberType());
						for (var k = 0; k < Tile.getNumberType(); k++) {
							neighbors[k] = 0;
						}

						if ((i - 1) > 0 && this.gridTile[i - 1][j] != 0) {
							neighbors[this.gridTile[i - 1][j].getType()] += 1;
							prob1 = this.gridTile[i - 1][j].getType();
						}
						if ((j - 1) > 0 && this.gridTile[i][j - 1] != 0) {
							neighbors[this.gridTile[i][j - 1].getType()] += 1;
							prob2 = this.gridTile[i][j - 1].getType();

						}

						var rand = Math.random();
						var newType = 0;
						if (prob1 != -1 && prob1 == prob2) {
							if (rand < 0.9) {
								newType = prob1;
							} else {
								newType = Math.floor((rand - 0.9) / ((1 - 0.9) / Tile.getNumberType()));
							}
						} else if (prob1 != -1 && prob2 != -1 && prob1 != prob2) {
							if (rand < 0.4) {
								newType = prob1;
							} else if (rand < 0.8) {
								newType = prob2;
							} else {
								newType = Math.floor((rand - 0.8) / ((1 - 0.8) / Tile.getNumberType()));
							}
						} else if (prob1 != prob2) {
							if (rand < 0.4) {
								if (prob1 == -1) {
									newType = prob2;
								} else {
									newType = prob1;
								}
							} else {
								newType = Math.floor((rand - 0.4) / ((1 - 0.4) / Tile.getNumberType()));
							}
						} else {
							newType = Math.floor((rand) / (1 / Tile.getNumberType()));
						}
						this.gridTile[i][j] = new Tile(newType);
					}

				}
			}
			var size = this.size;
			for(var k = 0; k<this.size/2; k++){
				this.gridRoad[k][Math.floor(this.size/2)] = new Road(1);
				if(k%2 == 1) {
				this.gridBuilding[k][Math.floor(this.size / 2 - 1)] = new Building(1, 1);
				//this.gridBuilding[k][Math.floor(this.size / 2)] = new Building(1, 1);
				this.gridBuilding[k][Math.floor(this.size / 2 + 1)] = new Building(2, 3);
				}
			}
			for(var i = 0; i<this.size + 1; i++){
				for (var j = 0; j<this.size; j++){
					if(i == 0 || i == this.size){
						this.gridFence[0][i][j] = new Fence(1);
					}
				}
			}
			for(var i = 0; i<this.size; i++){
				for (var j = 0; j<this.size +1; j++){
					if(j == 0 || j == this.size){
						this.gridFence[1][i][j] = new Fence(1);
					}
				}
			}
			for (var i = 0; i<10; i++){
				this.gridFence[0][10][Math.floor(this.size / 2 + 2) + i] = new Fence(1);
				this.gridFence[0][10][Math.floor(this.size / 2 - 2) - i] = new Fence(1);
				this.gridFence[1][i][Math.floor(this.size / 2 - 1)] = new Fence(1);
				this.gridFence[1][i][Math.floor(this.size / 2 + 2)] = new Fence(1);
				this.gridFence[1][i][Math.floor(this.size / 2 - 11)] = new Fence(1);
				this.gridFence[1][i][Math.floor(this.size / 2 + 12)] = new Fence(1);
				this.gridFence[0][20][Math.floor(this.size / 2 + 2) + i] = new Fence(1);
				this.gridFence[0][20][Math.floor(this.size / 2 - 2) - i] = new Fence(1);
				this.gridFence[1][i+10][Math.floor(this.size / 2 - 1)] = new Fence(1);
				this.gridFence[1][i+10][Math.floor(this.size / 2 + 2)] = new Fence(1);
				this.gridFence[1][i+10][Math.floor(this.size / 2 - 11)] = new Fence(1);
				this.gridFence[1][i+10][Math.floor(this.size / 2 + 12)] = new Fence(1);
				this.gridFence[0][30][Math.floor(this.size / 2 + 2) + i] = new Fence(1);
				this.gridFence[0][30][Math.floor(this.size / 2 - 2) - i] = new Fence(1);
				this.gridFence[1][i+20][Math.floor(this.size / 2 - 1)] = new Fence(1);
				this.gridFence[1][i+20][Math.floor(this.size / 2 + 2)] = new Fence(1);
				this.gridFence[1][i+20][Math.floor(this.size / 2 - 11)] = new Fence(1);
				this.gridFence[1][i+20][Math.floor(this.size / 2 + 12)] = new Fence(1);
			}
			this.animal.push(new Animal(1,5,20));
			this.animal.push(new Animal(2,5,32));
			this.animal.push(new Animal(3,15,20));
			this.animal.push(new Animal(4,15,32));
			this.animal.push(new Animal(5,25,20));
			this.animal.push(new Animal(6,25,32));

		}else{

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
		var matrix = new Array(this.gridFence.length);

		for (var i = 0; i < this.gridFence.length; i++){
			matrix[i] = new Array(this.gridFence[i].length);
			for(var j = 0; j < this.gridFence[i].length; j++){
				matrix[i][j] = new Array(this.gridFence[i][j].length);
				for(var k = 0; k < this.gridFence[i][j].length; k++){
					if(this.gridFence[i][j][k] != 0){
						matrix[i][j][k] = this.gridFence[i][j][k].getType();
					}else{
						matrix[i][j][k] = 0;
					}
				}
			}
		}
		return matrix;
	}

	this.getAnimals = function(){
		var matrix = new Array();
		for (var i = 0; i<this.animal.length; i++){
			matrix.push({type:this.animal[i].getType(),i:this.animal[i].getI(),j:this.animal[i].getJ()})
		}
		return matrix;
	}
}

module.exports = Map;