var GameLoader = function(game){
    this.game = game;

    this.load = function(data,animals){

        game.load.onFileComplete.add(fileComplete, this);
        game.load.onLoadComplete.add(loadComplete, this);

        game.load.crossOrigin = 'anonymous';
        var numbIconMenu = 9;
        var numbButton = 3;

        window_load = game.add.group();

        function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

            drawLoading();

        }

        function loadComplete() {

            window_load.destroy();

        }

        for(var i = 0; i<data.numberTile; i++){
            game.load.spritesheet('tile_'+i, 'images/Tiles/'+i+'.png');
        }

        for(var i = 1; i<data.numberAnimal; i++){
            game.load.spritesheet('animal_'+i+'_simple', 'images/Animal/'+i+'/simple.png');
        }

        for(var i = 1; i<data.numberRoad; i++){
            game.load.spritesheet('road_'+i+'_crossroad', 'images/Roads/'+i+'/crossroad.png');
            game.load.spritesheet('road_'+i+'_crossroadESW', 'images/Roads/'+i+'/crossroadESW.png');
            game.load.spritesheet('road_'+i+'_crossroadNES', 'images/Roads/'+i+'/crossroadNES.png');
            game.load.spritesheet('road_'+i+'_crossroadNEW', 'images/Roads/'+i+'/crossroadNEW.png');
            game.load.spritesheet('road_'+i+'_crossroadNSW', 'images/Roads/'+i+'/crossroadNSW.png');
            game.load.spritesheet('road_'+i+'_endE', 'images/Roads/'+i+'/endE.png');
            game.load.spritesheet('road_'+i+'_endW', 'images/Roads/'+i+'/endW.png');
            game.load.spritesheet('road_'+i+'_endN', 'images/Roads/'+i+'/endN.png');
            game.load.spritesheet('road_'+i+'_endS', 'images/Roads/'+i+'/endS.png');
            game.load.spritesheet('road_'+i+'_roadEW', 'images/Roads/'+i+'/roadEW.png');
            game.load.spritesheet('road_'+i+'_roadNS', 'images/Roads/'+i+'/roadNS.png');
            game.load.spritesheet('road_'+i+'_roadES', 'images/Roads/'+i+'/roadES.png');
            game.load.spritesheet('road_'+i+'_roadNE', 'images/Roads/'+i+'/roadNE.png');
            game.load.spritesheet('road_'+i+'_roadNW', 'images/Roads/'+i+'/roadNW.png');
            game.load.spritesheet('road_'+i+'_roadSW', 'images/Roads/'+i+'/roadSW.png');
        }

        for(var i = 1; i<data.numberFence; i++){
            game.load.spritesheet('fence_'+i+'_simple', 'images/Fences/'+i+'/simple.png');
            game.load.spritesheet('fence_'+i+'_two', 'images/Fences/'+i+'/two.png');
        }

        for(var i = 1; i<data.numberBuilding; i++){
            game.load.spritesheet('building_'+i+'_N', 'images/Buildings/'+i+'/N.png');
            game.load.spritesheet('building_'+i+'_S', 'images/Buildings/'+i+'/S.png');
            game.load.spritesheet('building_'+i+'_E', 'images/Buildings/'+i+'/E.png');
            game.load.spritesheet('building_'+i+'_W', 'images/Buildings/'+i+'/W.png');
        }

        for(var i = 1; i<numbIconMenu; i++){
            game.load.spritesheet('menu_'+i, 'images/Menu/'+i+'.png');
        }

        for(var i = 1; i<numbButton; i++){
            game.load.spritesheet('button_'+i, 'images/Buttons/'+i+'.png',224,70);
        }

        for(var i = 0; i<animals.length; i++){
            game.load.image('animal_'+animals[i]._id,"http://127.0.0.1:8080/about/"+animals[i].wikiPageId+"/image");
        }

        game.time.advancedTiming = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(1.9, -1.3);
        function drawLoading(){
            window_load.destroy();
            window_load = game.add.group();
            var back = game.add.graphics(0, 0);
            back.beginFill(0x4d96d1, 1);
            back.lineStyle(2, 0x3276ad, 1);
            back.drawRect(0, 0, 800, 400);
            back.endFill();
            window_load.add(back);
            var style = { font: "80px Arial", fill: "#ffffff"};
            var title = game.add.text(400,160,"PANDORA", style);
            title.anchor.set(0.5);
            var style = { font: "40px Arial", fill: "#ffffff"};
            var title = game.add.text(400,260,"Loading", style);
            title.anchor.set(0.5);
            var title = game.add.text(400,300,game.load.progress+' %', style);
            title.anchor.set(0.5);
            window_load.add(title);
        }
    }
}