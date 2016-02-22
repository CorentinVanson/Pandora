function Map(preload,data,stage,stageTile,stageRoad,stageBuilding,stageMenu,stageHover) {
	
	this.drawer = new Drawer(this);
	this.stage = stage;
	this.stageTile = stageTile;
	this.stageRoad = stageRoad;
	this.stageBuilding = stageBuilding;
	this.stageMenu = stageMenu;
	this.stageHover = stageHover;

	//state of game
	//0 ->init
	//1 ->placing Building
	this.state = 0;

	this.orientationBuilding = 0;
	this.iHoverBuilding = 0;
	this.jHoverBuilding = 0;

	this.preload = preload;
	this.size = data.mapTile.length;

	this.menu = new Menu(this,stageMenu,preload,data);

    this.gridTile = new Array(this.size);
    this.gridBuilding = new Array(this.size);
	this.gridRoad = new Array(this.size);
	this.gridFence = new Array(2);
	//horizontaux
	this.gridFence[0] = new Array(this.size + 1);
	//verticaux
	this.gridFence[1] = new Array(this.size);

	for (var i = 0; i < this.size + 1; i++) {
		if(i<this.size) {
			this.gridTile[i] = new Array(this.size);
			this.gridBuilding[i] = new Array(this.size);
			this.gridRoad[i] = new Array(this.size);
			this.gridFence[1][i] = new Array(this.size + 1);
		}
		this.gridFence[0][i] = new Array(this.size);
		for (var j = 0; j < this.size + 1; j++) {
			if(i<this.size && j<this.size) {
				this.gridTile[i][j] = new Tile(data.mapTile[i][j]);
				this.gridBuilding[i][j] = new Building(data.mapBuilding[i][j].type || 0, data.mapBuilding[i][j].orientation);
				this.gridRoad[i][j] = new Road(data.mapRoad[i][j]);
				this.gridFence[1][i][j] = new Fence(data.mapFence[1][i][j]);
				this.gridFence[0][i][j] = new Fence(data.mapFence[0][i][j]);
			}else if(i<this.size){
				this.gridFence[1][i][j] = new Fence(data.mapFence[1][i][j]);
			}else if(j<this.size){
				this.gridFence[0][i][j] = new Fence(data.mapFence[0][i][j]);
			}
		}
	}
	console.log(this.gridFence);

    this.canvasTile = new CanvasTile(this,this.stageTile, this.preload, this.gridTile);
    this.canvasRoad = new CanvasRoad(this,this.stageRoad, this.preload, this.gridRoad);
    this.canvasBuilding = new CanvasBuilding(this,this.stageBuilding, this.preload, this.gridBuilding,this.gridFence);
    this.canvasHover = new CanvasHover(this,this.stageHover, this.preload);

	this.drawGame = function(){
		this.drawMap();
		this.menu.drawMenu();
		this.canvasHover.drawHover();
	}

	this.drawMap = function(){
		this.canvasTile.drawMap();
		this.canvasRoad.drawMap();
		this.canvasBuilding.drawMap();
	}

	this.putBuilding = function(id){
		this.state = 1;
		this.idToPut = id;
	}

	var scope = this;
	document.getElementById("PandoraContainer").addEventListener("wheel",function(evt){
		scope.canvasTile.zoom(evt);
		scope.canvasRoad.zoom(evt);
		scope.canvasBuilding.zoom(evt);
		scope.canvasHover.zoom(evt);
	});
}