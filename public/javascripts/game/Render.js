/**
 * Created by corentin on 11/03/2016.
 */
var Render = function(game,data){
    this.game = game;
    this.data = data;

    this.addTile = function(i,j,id,group){
        // Create a tile using the new game.add.isoSprite factory method at the specified position.
        // The last parameter is the group you want to add it to (just like game.add.sprite)
        var tile;
        var x = i*56;
        var y = j*56;
        var z = 0;
        if(id == 1){
            z = -7;
        }
        tile = game.add.isoSprite(x, y, z, 'tile_'+id, 0, group);
        tile.initDragX = tile.isoX;
        tile.initDragY = tile.isoY;
        tile.anchor.set(0, 0);

        return tile;
    }

    this.addBuilding = function(i,j,id,orientation,group){
        // Create a tile using the new game.add.isoSprite factory method at the specified position.
        // The last parameter is the group you want to add it to (just like game.add.sprite)
        var tile;
        var x = i*56;
        var y = j*56;
        var z = 21;
        if(orientation == 0){
            tile = game.add.isoSprite(x, y, z, 'building_'+id+'_S', 0, group);
        }else if(orientation == 1){
            tile = game.add.isoSprite(x, y, z, 'building_'+id+'_W', 0, group);
        }else if(orientation == 2){
            tile = game.add.isoSprite(x, y, z, 'building_'+id+'_N', 0, group);
        }else if(orientation == 3){
            tile = game.add.isoSprite(x, y, z, 'building_'+id+'_E', 0, group);
        }
        tile.scale.setTo(0.75757575, 0.75757575);
        tile.initDragX = tile.isoX;
        tile.initDragY = tile.isoY;
        tile.anchor.set(0, 0);

        return tile;
    }

    this.addRoad = function(i,j,id,group){
        var neig = 0;

        var S;
        if(i+1 < this.data.mapRoad.length && this.data.mapRoad[i+1][j] != 0){
            S = true;
            neig++;
        }else{
            S = false;
        }


        var W;
        if(j+1 < this.data.mapRoad.length && this.data.mapRoad[i][j+1] != 0){
            W = true;
            neig++;
        }else{
            W = false;
        }


        var E;
        if(j-1 >= 0 && this.data.mapRoad[i][j-1] != 0){
            E = true;
            neig++;
        }else{
            E = false;
        }


        var N;
        if(i-1 >= 0 && this.data.mapRoad[i-1][j] != 0){
            N = true;
            neig++;
        }else{
            N = false;
        }

        var buil;
        var x = i*56;
        var y = j*56;
        var z = 0;

        if(neig == 0){
            buil = game.add.isoSprite(x, y, z, 'road_'+id+'_roadNS', 0, group);
        }else if(neig == 1){
            if(N){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_endN', 0, group);
            }else if(S){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_endS', 0, group);
            }else if(E){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_endE', 0, group);
            }else if(W){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_endW', 0, group);
            }
        }else if(neig == 2){
            if(N && S){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_roadNS', 0, group);
            }else if(E && W){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_roadEW', 0, group);
            }else if(E && S){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_roadES', 0, group);
            }else if(N && E){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_roadNE', 0, group);
            }else if(N && W){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_roadNW', 0, group);
            }else if(S && W){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_roadSW', 0, group);
            }
        }else if(neig == 3){
            if(E && S && W){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_crossroadESW', 0, group);
            }else if(N && E && S){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_crossroadNES', 0, group);
            }else if(N && E && W){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_crossroadNEW', 0, group);
            }else if(N && S && W){
                buil = game.add.isoSprite(x, y, z, 'road_'+id+'_crossroadNSW', 0, group);
            }
        }else{
            buil = game.add.isoSprite(x, y, z, 'road_'+id+'_crossroad', 0, group);
        }

        buil.initDragX = buil.isoX;
        buil.initDragY = buil.isoY;
        buil.anchor.set(0, 0);

        return buil;
    }

    this.addFence = function(i,j,id,vertical,group){
        var x = i*56;
        var y = j*56;
        var z = 19;
        var fence;
        if(vertical) {
            x += 28;
            y -= 28;
            fence = game.add.isoSprite(x, y, z, 'fence_'+id+'_two', 0, group);
        }else{
            fence = game.add.isoSprite(x, y, z, 'fence_'+id+'_simple', 0, group);
        }
        return fence;
    }
}