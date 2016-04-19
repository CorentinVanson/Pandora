function CanvasRoad(map,stage, preload, grid){
	Canvas.call(this,map,stage,preload);
    this.grid = grid;

    this.drawMap = function(){
        for(var i = 0; i<this.grid.length; i++){
            for(var j = 0; j<this.grid[i].length; j++){
                if(this.grid[i][j].getType() != 0){
                    var bitmap = this.map.drawer.drawRoad(i,j,this.grid[i][j].getType(),0);
                    this.mapContainer.addChild(bitmap);
                }
            }
        }
        this.stage.x = -(this.grid[0].length*50)/2 + 5*50;
        this.stage.y = -(this.grid[0].length*25)/2 + 6*25;
        this.stage.update();
    }
}
