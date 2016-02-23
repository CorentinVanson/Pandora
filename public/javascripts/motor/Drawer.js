function Drawer(map){

    this.map = map;

    this.drawTile = function(i,j,id,hover){
        var tile = new createjs.Shape();
        tile.graphics.beginStroke("black");
        var image;
        image = this.map.preload.getResult("tile_"+id.toString());

        tile.graphics.beginBitmapFill(image, "repeat");
        tile.graphics.moveTo(0, 0).lineTo(-50,25).lineTo(0,50).lineTo(50,25).lineTo(0,0);
        tile.x = i*50 + (this.map.canvasTile.grid[0].length - j) * 50;
        tile.y = j*25 + i*25;
        tile.i = i;
        tile.j = j;

        if(hover == 1){
            tile.alpha = 0.5;
            this.map.canvasHover.hoverTile = tile;
        }             

        tile.cache(-50,0,100,50);
        return tile;
    }

    this.drawBuilding = function(i,j,id,hover,orientation){
        var bitmap;
        if(orientation<=1){
            bitmap = new createjs.Bitmap(this.map.preload.getResult("building_"+id.toString()+"_front"));
            bitmap.x = i*50 + (this.map.canvasBuilding.grid[i].length - j) * 50 - 50;
            bitmap.y = j*25 + i*25 - 33;
            if(orientation==1){
                this.symetryX(bitmap);
            }
        }else{
            bitmap = new createjs.Bitmap(this.map.preload.getResult("building_"+id.toString()+"_back"));
            bitmap.x = i*50 + (this.map.canvasBuilding.grid[i].length - j) * 50 - 50;
            bitmap.y = j*25 + i*25 - 33;
            if(orientation==3){
                this.symetryX(bitmap);
            }
        }

        if(hover == 1){
            bitmap.alpha = 0.5;
            if(this.map.canvasBuilding.grid[i][j].getType() != 0 || (i >= this.map.canvasBuilding.grid[0].length - 1 && orientation == 0)){
                bitmap.filters = [
                    new createjs.ColorFilter(2)
                ];
            }
            this.map.canvasHover.hoverBuilding = bitmap;
        }
        bitmap.yy = bitmap.y;
        bitmap.cache(0,0,100,85);

        return bitmap;
    }

    this.drawFence = function(vertical,i,j,id,hover){
        var bitmap;
        bitmap = new createjs.Bitmap(this.map.preload.getResult("fence_"+id.toString()+"_simple"));
        bitmap.x = i*50 + (this.map.canvasBuilding.gridFence[vertical][i].length - j) * 50 - 50;
        bitmap.y = j*25 + i*25 - 18;
        if(vertical==1){
            bitmap.x += -50;
            this.symetryX(bitmap);
        }

        if(hover == 1){
            bitmap.alpha = 0.5;
            if(this.map.canvasBuilding.gridFence[vertical][i][j].getType() != 0 ){
                bitmap.filters = [
                    new createjs.ColorFilter(2)
                ];
            }
            this.map.canvasHover.hoverBuilding = bitmap;
        }
        bitmap.yy = bitmap.y - 18;
        bitmap.cache(0,0,100,85);

        return bitmap;
    }

    this.drawRoad = function(i,j){
        var neig = 0;

        var SE;
        if(i+1 < this.map.canvasRoad.grid.length && this.map.canvasRoad.grid[i+1][j].getType() != 0){
            SE = true;
            neig++;
        }else{
            SE = false;
        }


        var SW;
        if(j+1 < this.map.canvasRoad.grid[0].length && this.map.canvasRoad.grid[i][j+1].getType() != 0){
            SW = true;
            neig++;
        }else{
            SW = false;
        }


        var NE;
        if(j-1 >= 0 && this.map.canvasRoad.grid[i][j-1].getType() != 0){
            NE = true;
            neig++;
        }else{
            NE = false;
        }


        var NW;
        if(i-1 >= 0 && this.map.canvasRoad.grid[i-1][j].getType() != 0){
            NW = true;
            neig++;
        }else{
            NW = false;
        }

        var bitmap;
        if(neig >= 4){
            bitmap = new createjs.Bitmap(this.map.preload.getResult("road_"+this.map.canvasRoad.grid[i][j].getType().toString()+"_four"));
            bitmap.x = i*50 + (this.map.canvasRoad.grid[i].length - j) * 50 - 50;
            bitmap.y = j*25 + i*25 -33;
        }else if(neig == 3){
            bitmap = new createjs.Bitmap(this.map.preload.getResult("road_"+this.map.canvasRoad.grid[i][j].getType().toString()+"_three"));
            bitmap.x = i*50 + (this.map.canvasRoad.grid[i].length - j) * 50 - 50;
            bitmap.y = j*25 + i*25 -33;
            if(NE && NW && SE){
                this.symetryX(bitmap);
            }else if(NE && SE && SW){
                this.symetryX(bitmap);
                this.symetryY(bitmap);
            }else if(NW && SE && SW){
                this.symetryY(bitmap);
            }
        }else{
            if((NE && SW) || (NW && SE) || neig <= 1){
                bitmap = new createjs.Bitmap(this.map.preload.getResult("road_"+this.map.canvasRoad.grid[i][j].getType().toString()+"_simple"));
                bitmap.x = i*50 + (this.map.canvasRoad.grid[i].length - j) * 50 - 50;
                bitmap.y = j*25 + i*25 -33;
                if(NW || SE){
                    this.symetryX(bitmap);
                }
            }else{
                if((NW && SW) ||(NE && SE)){
                    bitmap = new createjs.Bitmap(this.map.preload.getResult("road_"+this.map.canvasRoad.grid[i][j].getType().toString()+"_two"));
                    bitmap.x = i*50 + (this.map.canvasRoad.grid[i].length - j) * 50 - 50;
                    bitmap.y = j*25 + i*25 -33;
                    if(NW && SW){
                        this.symetryX(bitmap);
                    }
                }else{
                    bitmap = new createjs.Bitmap(this.map.preload.getResult("road_"+this.map.canvasRoad.grid[i][j].getType().toString()+"_twotwo"));
                    bitmap.x = i*50 + (this.map.canvasRoad.grid[i].length - j) * 50 - 50;
                    bitmap.y = j*25 + i*25 -33;
                    if(NE && NW){
                        this.symetryY(bitmap);
                    }
                }
            }
        }
        bitmap.zIndex = i+j;
        bitmap.cache(0,0,100,85);
        return bitmap;
    }

    this.drawAnimal = function(i,j,id,hover){
        console.log("test");
        var bitmap;
        bitmap = new createjs.Bitmap(this.map.preload.getResult("animal_"+id.toString()+"_simple"));
        bitmap.x = i*50 + (this.map.canvasBuilding.grid.length - j) * 50 - 50;
        bitmap.y = j*25 + i*25 - 18;

        if(hover == 1){
            bitmap.alpha = 0.5;
            if(this.map.canvasBuilding.gridFence[vertical][i][j].getType() != 0 ){
                bitmap.filters = [
                    new createjs.ColorFilter(2)
                ];
            }
            this.map.canvasHover.hoverBuilding = bitmap;
        }
        bitmap.yy = bitmap.y - 18;
        bitmap.cache(0,0,100,85);

        return bitmap;
    }

    this.symetryX = function(bitmap){
        bitmap.scaleX = -1;
        bitmap.x += 100;
    }

    this.symetryY = function(bitmap){
        bitmap.scaleY = -1;
        bitmap.y += 116;
    }
}
