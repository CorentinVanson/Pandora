function Menu(map, stage, preload, data){
	this.map = map;
	this.stage = stage;
	this.preload = preload;
	this.data = data;

	var scope = this;


	this.isFirstMenuDisplay = false;

	this.step = 0;

	this.page = 0;

	this.numberStep = 6;

	this.menuContainer = new Array(this.numberStep);
	for (var i = 0; i< this.numberStep; i++){
		this.menuContainer[i] = [];
	}

	this.drawMenu = function(){
		this.initiateFirstMenu();
		this.initiateShopMenu();
		this.initiateRoadMenu();
		this.initiateFenceMenu();
		this.initiateArrowsMenu();
	}

	/********************************/
	/********************************/
	/***********FIRST MENU***********/
	/********************************/
	/********************************/

	this.initiateFirstMenu = function(){
		var con = new createjs.Container();
		con.x = -100;
		var cfence = new createjs.Container();

		var fence = new createjs.Shape();
		fence.graphics.beginFill("#000000").drawCircle(0, 0, 20);
		fence.x = 30;
		fence.y = 85;
		cfence.addChild(fence);
		
		fence = new createjs.Shape();
		fence.graphics.beginFill("#c6ad4a").drawCircle(0, 0, 18);
		fence.x = 30;
		fence.y = 85;
		cfence.addChild(fence);

		bitmap = new createjs.Bitmap(this.preload.getResult("menu_2"));
		bitmap.x = 17;
		bitmap.y = 72;
		bitmap.scaleX = 0.4;
		bitmap.scaleY = 0.4;

		cfence.addChild(bitmap);
		cfence.on("click",this.fenceClick);
		cfence.on("mouseover",handleMouseOver);
		cfence.on("mouseout",handleMouseOut);
		con.addChild(cfence);

		var cshop = new createjs.Container();

		var shop = new createjs.Shape();
		shop.graphics.beginFill("#000000").drawCircle(0, 0, 20);
		shop.x = 30;
		shop.y = 135;
		cshop.addChild(shop);
		
		shop = new createjs.Shape();
		shop.graphics.beginFill("#c6ad4a").drawCircle(0, 0, 18);
		shop.x = 30;
		shop.y = 135;
		cshop.addChild(shop);

		bitmap = new createjs.Bitmap(this.preload.getResult("menu_3"));
		bitmap.x = 18;
		bitmap.y = 121;
		bitmap.scaleX = 0.4;
		bitmap.scaleY = 0.4;

		cshop.addChild(bitmap);
		cshop.on("click",this.shopClick);
		cshop.on("mouseover",handleMouseOver);
		cshop.on("mouseout",handleMouseOut);
		con.addChild(cshop);

		var croad = new createjs.Container();

		var road = new createjs.Shape();
		road.graphics.beginFill("#000000").drawCircle(0, 0, 20);
		road.x = 30;
		road.y = 185;
		croad.addChild(road);

		road = new createjs.Shape();
		road.graphics.beginFill("#c6ad4a").drawCircle(0, 0, 18);
		road.x = 30;
		road.y = 185;
		croad.addChild(road);

		bitmap = new createjs.Bitmap(this.preload.getResult("menu_4"));
		bitmap.x = 17;
		bitmap.y = 171;
		bitmap.scaleX = 0.4;
		bitmap.scaleY = 0.4;

		croad.addChild(bitmap);
		croad.on("click",this.roadClick);
		croad.on("mouseover",handleMouseOver);
		croad.on("mouseout",handleMouseOut);
		con.addChild(croad);

		this.menuContainer[1].push(con);
		this.stage.addChild(con);

		var cconstruction = new createjs.Container();

		var construction = new createjs.Shape();
		construction.graphics.beginFill("#000000").drawCircle(0, 0, 27);
		construction.x = 30;
		construction.y = 30;
		cconstruction.addChild(construction);

		construction = new createjs.Shape();
		construction.graphics.beginFill("#c6ad4a").drawCircle(0, 0, 25);
		construction.x = 30;
		construction.y = 30;
		cconstruction.addChild(construction);

		var bitmap;
		bitmap = new createjs.Bitmap(this.preload.getResult("menu_1"));
		bitmap.x = 15;
		bitmap.y = 14;
		bitmap.scaleX = 0.5;
		bitmap.scaleY = 0.5;

		cconstruction.addChild(bitmap);
		this.construction = cconstruction;
		this.construction.on("mouseover",function(event){
	    	var target = construction;
	    	target.graphics.clear().beginFill("#d7c167").drawCircle(0, 0, 25).endFill();
		});
		this.construction.on("mouseout",function(event){
	    	var target = construction;
	    	target.graphics.clear().beginFill("#c6ad4a").drawCircle(0, 0, 25).endFill();
		});

		this.construction.on("click",this.constructionClick);

		this.stage.addChild(this.construction);
		this.menuContainer[0].push(this.construction);
	}

	function handleMouseOver(event) {
	   var target = event.target.parent.children[1];
	   target.graphics.clear().beginFill("#d7c167").drawCircle(0, 0, 18).endFill();
	}

	function handleMouseOut(event) {
	    var target = event.target.parent.children[1];
	    target.graphics.clear().beginFill("#c6ad4a").drawCircle(0, 0, 18).endFill();
	}

	this.constructionClick = function(evt){
		evt.preventDefault();
		if(scope.step == 1){
			scope.hidePage(scope.page);
			scope.hideArrowsMenu();
			scope.step = 0;
		}else if(scope.step == 0){
			scope.step = 1;
			scope.showPage(scope.page);
			scope.showArrowsMenu();
		}else{
			scope.hidePage(scope.page);
			scope.step = 1;
			scope.showPage(scope.page);
		}
	};

	this.shopClick = function(evt){
		evt.preventDefault();

		scope.hidePage(scope.page);
		scope.step = 3;
		scope.showPage(scope.page);
	};

	this.roadClick = function(evt){
		evt.preventDefault();

		scope.hidePage(scope.page);
		scope.step = 4;
		scope.showPage(scope.page);
	};

	this.fenceClick = function(evt){
		evt.preventDefault();

		scope.hidePage(scope.page);
		scope.step = 5;
		scope.showPage(scope.page);
	};


	/********************************/
	/********************************/
	/***********SHOP MENU***********/
	/********************************/
	/********************************/

	this.initiateShopMenu = function(){
		var cont = undefined;
		for(var i = 1; i<this.data.numberBuilding; i++){
			if((i-1)%8 == 0){
				if(cont != undefined){
					this.stage.addChild(cont);
					this.menuContainer[3].push(cont);
				}
				cont = new createjs.Container();
				cont.x = -100;
			}
			var croad = new createjs.Container();
			croad.id = i;
			var road = new createjs.Shape();
			road.graphics.beginFill("#000000").drawCircle(0, 0, 20);
			road.x = 30;
			road.y = 85 + (i-1)%8*50;
			croad.addChild(road);

			road = new createjs.Shape();
			road.graphics.beginFill("#c6ad4a").drawCircle(0, 0, 18);
			road.x = 30;
			road.y = 85 + (i-1)%8*50;
			croad.addChild(road);

			bitmap = new createjs.Bitmap(this.preload.getResult("building_"+i.toString()+"_front"));
			bitmap.x = 15;
			bitmap.y = 72 +(i-1)%8*50;
			bitmap.scaleX = 0.3;
			bitmap.scaleY = 0.3;

			croad.addChild(bitmap);
			croad.on("click",function(event){
				event.preventDefault();
				scope.map.canvasHover.putBuilding(event.target.parent.id);
			});
			croad.on("mouseover",handleMouseOver);
			croad.on("mouseout",handleMouseOut);

			cont.addChild(croad);
		}
		if(this.data.numberBuilding>1){
			this.stage.addChild(cont);
			this.menuContainer[3].push(cont);
		}
	}

	/********************************/
	/********************************/
	/***********ROAD MENU************/
	/********************************/
	/********************************/

	this.initiateRoadMenu = function(){
		var cont = undefined;
		for(var i = 1; i<this.data.numberRoad; i++){
			if((i-1)%8 == 0){
				if(cont != undefined){
					this.stage.addChild(cont);
					this.menuContainer[4].push(cont);
				}
				cont = new createjs.Container();
				cont.x = -100;
			}
			var croad = new createjs.Container();
			croad.id = i;

			var road = new createjs.Shape();
			road.graphics.beginFill("#000000").drawCircle(0, 0, 20);
			road.x = 30;
			road.y = 85 + (i-1)%8*50;
			croad.addChild(road);

			road = new createjs.Shape();
			road.graphics.beginFill("#ffffff").drawCircle(0, 0, 18);
			road.x = 30;
			road.y = 85 + (i-1)%8*50;
			croad.addChild(road);

			bitmap = new createjs.Bitmap(this.preload.getResult("road_"+i.toString()+"_simple"));
			bitmap.x = 15;
			bitmap.y = 72 +(i-1)%8*50;
			bitmap.scaleX = 0.3;
			bitmap.scaleY = 0.3;

			croad.addChild(bitmap);
			croad.on("click",function(event){
				event.preventDefault();
				scope.map.canvasHover.putRoad(event.target.parent.id);
			});
			cont.addChild(croad);
		}
		if(this.data.numberRoad>1){
			this.stage.addChild(cont);
			this.menuContainer[4].push(cont);
		}
	}

	/********************************/
	/********************************/
	/**********FENCE MENU************/
	/********************************/
	/********************************/

	this.initiateFenceMenu = function(){
		var cont = undefined;
		console.log(this.data);
		for(var i = 1; i<this.data.numberFence; i++){
			if((i-1)%8 == 0){
				if(cont != undefined){
					this.stage.addChild(cont);
					this.menuContainer[4].push(cont);
				}
				cont = new createjs.Container();
				cont.x = -100;
			}
			var croad = new createjs.Container();

			var road = new createjs.Shape();
			road.graphics.beginFill("#000000").drawCircle(0, 0, 20);
			road.x = 30;
			road.y = 85 + (i-1)%8*50;
			croad.addChild(road);

			road = new createjs.Shape();
			road.graphics.beginFill("#ffffff").drawCircle(0, 0, 18);
			road.x = 30;
			road.y = 85 + (i-1)%8*50;
			croad.addChild(road);

			bitmap = new createjs.Bitmap(this.preload.getResult("fence_"+i.toString()+"_simple"));
			bitmap.x = 18;
			bitmap.y = 72 +(i-1)%8*50;
			bitmap.scaleX = 0.5;
			bitmap.scaleY = 0.5;

			croad.addChild(bitmap);
			cont.addChild(croad);
		}
		if(this.data.numberFence>1){
			console.log("test");
			this.stage.addChild(cont);
			this.menuContainer[5].push(cont);
		}
	}

	/********************************/
	/********************************/
	/**********ARROWS MENU***********/
	/********************************/
	/********************************/
	
	this.initiateArrowsMenu = function(){
		var carrow = new createjs.Container();
		carrow.x = -100;

		var arrow = new createjs.Shape();
		arrow.graphics.beginFill("#000000").drawCircle(0, 0, 20);
		arrow.x = 30;
		arrow.y = 485;
		carrow.addChild(arrow);
		
		arrow = new createjs.Shape();
		arrow.graphics.beginFill("#c6ad4a").drawCircle(0, 0, 18);
		arrow.x = 30;
		arrow.y = 485;
		carrow.addChild(arrow);

		var bitmap = new createjs.Bitmap(this.preload.getResult("menu_5"));
		bitmap.x = 40;
		bitmap.y = 485-10;
		bitmap.scaleX = 0.3;
		bitmap.scaleY = 0.3;
		bitmap.rotation = 90;

		carrow.addChild(bitmap);
		carrow.on("mouseover",handleMouseOver);
		carrow.on("mouseout",handleMouseOut);
		this.arrowup = carrow;
		this.stage.addChild(this.arrowup);

		var carrowd = new createjs.Container();
		carrowd.x = -100;

		var arrowd = new createjs.Shape();
		arrowd.graphics.beginFill("#000000").drawCircle(0, 0, 20);
		arrowd.x = 30;
		arrowd.y = 535;
		carrowd.addChild(arrowd);
		
		arrowd = new createjs.Shape();
		arrowd.graphics.beginFill("#c6ad4a").drawCircle(0, 0, 18);
		arrowd.x = 30;
		arrowd.y = 535;
		carrowd.addChild(arrowd);

		bitmap = new createjs.Bitmap(this.preload.getResult("menu_5"));
		bitmap.x = 21;
		bitmap.y = 547;
		bitmap.scaleX = 0.3;
		bitmap.scaleY = 0.3;
		bitmap.rotation = 270;


		carrowd.addChild(bitmap);
		carrowd.on("mouseover",handleMouseOver);
		carrowd.on("mouseout",handleMouseOut);

		this.arrowd = carrowd;
		this.stage.addChild(this.arrowd);

		this.arrowup.on("click",this.clickArrowUp);
		this.arrowd.on("click",this.clickArrowD);
	}

	this.clickArrowUp = function(){
		scope.hidePage(scope.page);
		scope.page--;
		if(scope.page<0){
			scope.page=0;
		}
		scope.showPage(scope.page);
	}

	this.clickArrowD = function(){
		scope.hidePage(scope.page);
		scope.page++;
		if(scope.page>=scope.menuContainer[scope.step].length){
			scope.page = scope.menuContainer[scope.step].length;
		}
		scope.showPage(scope.page);
	}

	this.showArrowsMenu = function(){
		createjs.Tween.get(this.arrowup).to({x:0},300);
		createjs.Tween.get(this.arrowd).to({x:0},300);
		this.isArrowsMenuDisplay = true;
	}

	this.hideArrowsMenu = function(){
		createjs.Tween.get(this.arrowup).to({x:-100},300);
		createjs.Tween.get(this.arrowd).to({x:-100},300);
		this.isArrowsMenuDisplay = false;
	}

	this.showUpArrows = function(){
		this.arrowup.visible = true;
	}

	this.hideUpArrow = function(){
		this.arrowup.visible = false;
	}

	this.showDownArrow = function(){
		this.arrowd.visible = true;
	}

	this.hideDownArrow = function(){
		this.arrowd.visible = false;
	}

	this.showPage = function(page){
		createjs.Tween.get(this.menuContainer[this.step][page]).to({x:0},300);
		if(this.page>0){
			this.showUpArrows();
		}else{
			this.hideUpArrow();
		}
		if(this.page<this.menuContainer[this.step].length-1){
			this.showDownArrow();
		}else{
			this.hideDownArrow();
		}
	}

	this.hidePage = function(page){
		createjs.Tween.get(this.menuContainer[this.step][page]).to({x:-100},300);
	}
}