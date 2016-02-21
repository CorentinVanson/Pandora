
function init() {

	var url = "http://localhost:8080";
	//var url = "http://beta-pandorazoo.rhcloud.com";

	var size = 50;

	$.get(url+"/map/getRandomMap?size="+size.toString(),function(data,status){

		data = JSON.parse(data);

		var stage = new createjs.Stage("Pandora");
		var stageTile = new createjs.Stage("PandoraTile");
		var stageRoad = new createjs.Stage("PandoraRoad");
		var stageBuilding = new createjs.Stage("PandoraBuilding");
		var stageMenu = new createjs.Stage("PandoraMenu");
		var stageHover = new createjs.Stage("PandoraHover");

		var numbIconMenu = 6;

		stageMenu.enableMouseOver(20);
		stageHover.enableMouseOver(20);
		stageTile.enableMouseOver(20);

		stageRoad.nextStage = stageTile;
		stageBuilding.nextStage = stageRoad;
		stage.nextStage = stageBuilding;
		stageHover.nextStage = stage;
		stageMenu.nextStage = stageHover;

		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", stageMenu);

		var preload = new createjs.LoadQueue(true,'./',true);

		for(var i = 0; i<data.numberTile; i++){
			preload.loadFile(new createjs.LoadItem().set({src:'images/Tiles/'+i.toString()+'.png', id:'tile_'+i.toString()}));
		}

		for(var i = 1; i<data.numberRoad; i++){
			preload.loadFile(new createjs.LoadItem().set({src:'images/Roads/'+i.toString()+'/simple.png', id:'road_'+i.toString()+'_simple'}));
			preload.loadFile(new createjs.LoadItem().set({src:'images/Roads/'+i.toString()+'/two.png', id:'road_'+i.toString()+'_two'}));
			preload.loadFile(new createjs.LoadItem().set({src:'images/Roads/'+i.toString()+'/twotwo.png', id:'road_'+i.toString()+'_twotwo'}));
			preload.loadFile(new createjs.LoadItem().set({src:'images/Roads/'+i.toString()+'/three.png', id:'road_'+i.toString()+'_three'}));
			preload.loadFile(new createjs.LoadItem().set({src:'images/Roads/'+i.toString()+'/four.png', id:'road_'+i.toString()+'_four'}));
		}

		for(var i = 1; i<data.numberFence; i++){
			preload.loadFile(new createjs.LoadItem().set({src:'images/Fences/'+i.toString()+'/simple.png', id:'fence_'+i.toString()+'_simple'}));
		}

		for(var i = 1; i<data.numberBuilding; i++){
			preload.loadFile(new createjs.LoadItem().set({src:'images/Buildings/'+i.toString()+'/front.png', id:'building_'+i.toString()+'_front'}));
			preload.loadFile(new createjs.LoadItem().set({src:'images/Buildings/'+i.toString()+'/back.png', id:'building_'+i.toString()+'_back'}));
		}

		for(var i = 1; i<numbIconMenu; i++){
			preload.loadFile(new createjs.LoadItem().set({src:'images/Menu/'+i.toString()+'.png', id:'menu_'+i.toString()}));
		}

		preload.addEventListener('progress', handleProgress);
		preload.addEventListener('complete', handleComplete);
		preload.addEventListener('fileload', handleFileLoad);
		//preload.loadManifest(manifest);

		function handleProgress(event) {

		}
		function handleComplete(event) {
			var map = new Map(preload,data,stage,stageTile,stageRoad,stageBuilding,stageMenu,stageHover);	
			map.drawGame();
			
		}
		function handleFileLoad(event) {
		}
	});
}