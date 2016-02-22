function CanvasBuilding(map,stage, preload, grid, gridFence){
	Canvas.call(this,map,stage,preload);
    this.grid = grid;
    this.gridFence = gridFence;

    this.drawMap = function(){
        for(var i = 0; i<this.grid.length + 1; i++){
            for(var j = 0; j<this.gridFence[0][i].length + 1; j++){
                if(i<this.grid.length && j<this.grid.length) {
                    if (this.grid[i][j].getType() != 0) {
                        this.showBuilding(i, j, this.grid[i][j].getType(), this.grid[i][j].getOrientation(), 0);
                    }
                    if(this.gridFence[0][i][j].getType() != 0){
                        this.showFence(0,i,j,this.gridFence[0][i][j].getType());
                    }
                    if(this.gridFence[1][i][j].getType() != 0){
                        this.showFence(1,i,j,this.gridFence[1][i][j].getType());
                    }
                }else if(i<this.grid.length){
                    if(this.gridFence[1][i][j].getType() != 0){
                        this.showFence(1,i,j,this.gridFence[1][i][j].getType());
                    }
                }else if(j<this.grid.length){
                    if(this.gridFence[0][i][j].getType() != 0){
                        this.showFence(0,i,j,this.gridFence[0][i][j].getType());
                    }
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

    this.showFence = function(vertical,i,j,id,hover){
        var bitmap = this.map.drawer.drawFence(vertical,i,j,id,hover);
        this.mapContainer.addChild(bitmap);
        this.sortout();
    }

    this.addFence = function(vertical,i,j,id){
        this.map.gridFence[vertical][i][j] = new Fence(id);
        this.showFence(vertical,i,j,id,0);
        this.stage.update();
    }
}
