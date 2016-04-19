function CanvasHover(map,stage, preload){
	Canvas.call(this,map,stage,preload);

    //state of game
    //0 ->init
    //1 ->placing Building
    //2 ->placing Road
    this.state = 0;

    this.orientationBuilding = 0;
    this.iHover = 0;
    this.jHover = 0;

    this.drawHover = function(){
        this.stage.x = -(this.map.canvasBuilding.grid[0].length*50)/2 + 5*50;
        this.stage.y = -(this.map.canvasBuilding.grid[0].length*25)/2 + 6*25;
        this.stage.update();
    }

    var scope = this;

    this.showHoverBuilding = function(){
        if(scope.state == 1){
            var orientation = scope.orientationBuilding;
            var di = 0;
            var dj = 0;
            var buil = scope.map.drawer.drawBuilding(scope.iHover,scope.jHover,scope.idToPut,1,orientation);
            scope.hoverBuilding = buil;
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
            var tile = scope.map.drawer.drawTile(scope.iHover+di,scope.jHover+dj,1,1);
            scope.hoverTile = tile;
            scope.mapContainer.addChild(tile);
            scope.stage.update();
        }
        if(scope.state == 2){
            console.log("ok");
            var buil = scope.map.drawer.drawRoad(scope.iHover,scope.jHover,scope.idToPut,1);
            scope.hoverBuilding = buil;
            scope.mapContainer.addChild(buil);
            scope.stage.update();
        }
    }

    this.hideHoverBuilding = function(){
        if(scope.state != 0) {
            this.mapContainer.removeChild(this.hoverBuilding);
            if (scope.state == 1) {
                this.mapContainer.removeChild(this.hoverTile);
            }
            this.stage.update();
        }
    }

    this.clickHoverBuilding = function(evt){
        if(scope.state == 1 && scope.map.gridBuilding[evt.target.i][evt.target.j].getType() == 0 && evt.target.i<scope.map.gridBuilding[0].length - 1){
            scope.hideHoverBuilding(evt);
            scope.state = 0;
            scope.map.canvasBuilding.addBuilding(evt.target.i,evt.target.j,scope.idToPut,scope.orientationBuilding);
            scope.orientationBuilding = 0;
        }
    }

    this.putBuilding = function(id){
        console.log("ok");
        this.state = 1;
        this.idToPut = id;
    }

    this.putRoad = function(id){
        this.state = 2;
        this.idToPut = id;
    }


    document.onkeydown = function(evt){
        if(scope.state == 1){
            if(evt.keyCode == 68){
                scope.orientationBuilding = (scope.orientationBuilding + 1)%4;
                scope.hideHoverBuilding();
                scope.showHoverBuilding();
            }
            if(evt.keyCode == 81){
                scope.orientationBuilding = (scope.orientationBuilding - 1);
                if(scope.orientationBuilding < 0){
                    scope.orientationBuilding = 3;
                }
                scope.hideHoverBuilding();
                scope.showHoverBuilding();
            }
        }
    }

}
