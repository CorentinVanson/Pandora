function CanvasHover(map,stage, preload){
	Canvas.call(this,map,stage,preload);

    this.drawHover = function(){
        this.stage.x = -(this.map.canvasBuilding.grid[0].length*50)/2 + 5*50;
        this.stage.y = -(this.map.canvasBuilding.grid[0].length*25)/2 + 6*25;
        this.stage.update();
    }

    var scope = this;

    this.showHoverBuilding = function(){
        if(scope.map.state == 1){
            var orientation = scope.map.orientationBuilding;
            var di = 0;
            var dj = 0;
            var buil = scope.map.drawer.drawBuilding(scope.map.iHoverBuilding,scope.map.jHoverBuilding,scope.map.idToPut,1,orientation);
            scope.mapContainer.addChild(buil);
            if(orientation == 0){
                di = 1;
            }else if(orientation == 1){
                dj = 1;
            }else if(orientation == 2){
                di = -1;
            }else{
                dj = -1;
            }
            var tile = scope.map.drawer.drawTile(scope.map.iHoverBuilding+di,scope.map.jHoverBuilding+dj,1,1);
            scope.mapContainer.addChild(tile);
            scope.stage.update();
        }
    }

    this.hideHoverBuilding = function(){
        if(scope.map.state == 1){
            this.mapContainer.removeChild(this.hoverBuilding);
            this.mapContainer.removeChild(this.hoverTile);
            this.stage.update();
        }
    }

    this.clickHoverBuilding = function(evt){
        console.log("ok");
        if(scope.map.state == 1 && scope.map.gridBuilding[evt.target.i][evt.target.j].getType() == 0 && evt.target.i<scope.map.gridBuilding[0].length - 1){
            scope.hideHoverBuilding(evt);
            scope.map.state = 0;
            scope.map.canvasBuilding.addBuilding(evt.target.i,evt.target.j,scope.map.idToPut,scope.map.orientationBuilding);
            scope.map.orientationBuilding = 0;
        }
    }


    document.onkeydown = function(evt){
        if(scope.map.state == 1){
            if(evt.keyCode == 68){
                scope.map.orientationBuilding = (scope.map.orientationBuilding + 1)%4;
                scope.hideHoverBuilding();
                scope.showHoverBuilding();
            }
            if(evt.keyCode == 81){
                scope.map.orientationBuilding = (scope.map.orientationBuilding - 1);
                if(scope.map.orientationBuilding < 0){
                    scope.map.orientationBuilding = 3;
                }
                scope.hideHoverBuilding();
                scope.showHoverBuilding();
            }
        }
    }

}
