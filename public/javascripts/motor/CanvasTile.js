function CanvasTile(map,stage, preload, grid){
	Canvas.call(this,map,stage,preload);
    this.grid = grid;

    var scope = this;

    this.drawMap = function(){
        for(var i = 0; i<this.grid.length; i++){
            for(var j = 0; j<this.grid[i].length; j++){
                this.showTile(i,j,this.grid[i][j].getType(),0);
            }
        }
        this.stage.x = -(this.grid[0].length*50)/2 + 5*50;
        this.stage.y = -(this.grid[0].length*25)/2 + 6*25;
        this.stage.update();
    }

    this.showTile = function(i,j,id,hover){
        var tile = this.map.drawer.drawTile(i,j,id,hover);
        tile.on("mouseover",this.tilemouseover);
        tile.on("mouseout",this.tilemouseout);                
        tile.on("click",this.tileclick);   
        this.mapContainer.addChild(tile);
    }

    this.tilemouseover = function(evt){
        scope.map.iHoverBuilding = evt.target.i;
        scope.map.jHoverBuilding = evt.target.j;
        scope.map.canvasHover.showHoverBuilding();
    }

    this.tilemouseout = function(evt){
        scope.map.canvasHover.hideHoverBuilding();
    }

    this.tileclick = function(evt){
        scope.map.canvasHover.clickHoverBuilding(evt);
    }
}
