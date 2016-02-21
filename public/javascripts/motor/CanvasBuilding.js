function CanvasBuilding(map,stage, preload, grid){
	Canvas.call(this,map,stage,preload);
    this.grid = grid;

    this.drawMap = function(){
        for(var i = 0; i<this.grid.length; i++){
            for(var j = 0; j<this.grid[i].length; j++){
                if(this.grid[i][j].getType() != 0){
                    this.showBuilding(i,j,this.grid[i][j].getType(),this.grid[i][j].getOrientation(),0);
                }
            }
        }
        this.stage.x = -(this.grid[0].length*50)/2 + 5*50;
        this.stage.y = -(this.grid[0].length*25)/2 + 6*25;
        this.stage.update();
    }

    this.showBuilding = function(i,j,id,orientation,hover){
        var bitmap = this.map.drawer.drawBuilding(i,j,id,hover,orientation);
        this.mapContainer.addChild(bitmap);
        this.sortout();
    }

    this.addBuilding = function(i,j,id,orientation){
        this.map.gridBuilding[i][j] = new Building(id,0);
        this.showBuilding(i,j,id,orientation,0);
        this.stage.update();
    }
}
