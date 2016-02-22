function Canvas(map,stage, preload){
	this.stage = stage;
	this.preload = preload;
	this.map = map;

	this.mapContainer = new createjs.Container();
	this.mapContainer.x = this.mapContainer.y = 0;
    this.mapContainer.scaleX = this.mapContainer.scaleY = 1;

    this.stage.addChild(this.mapContainer);

    var sortFunction = function(obj1, obj2, options) {
	    if (obj1.yy > obj2.yy) { return 1; }
	    if (obj1.yy < obj2.yy) { return -1; }
	    return 0;
	}

	this.sortout=function(){
		this.stage.sortChildren(sortFunction);
		this.mapContainer.sortChildren(sortFunction);
	}
	

    this.zoom = function(evt){
    	var sx = this.mapContainer.scaleX;
		var sy = this.mapContainer.scaleY;
		var offset = $('#PandoraContainer').offset();
		var p = this.mapContainer.globalToLocal(evt.pageX - offset.left, evt.pageY - offset.top);

    	this.mapContainer.scaleX += evt.wheelDelta/1000;
    	this.mapContainer.scaleY += evt.wheelDelta/1000;
    	
    	if(this.mapContainer.scaleX>1){
    		this.mapContainer.scaleX = 1;
    	}else if(this.mapContainer.scaleX <0.5){
    		this.mapContainer.scaleX = 0.5;
    	}

    	if(this.mapContainer.scaleY>1){
    		this.mapContainer.scaleY = 1;
    	}else if(this.mapContainer.scaleY <0.5){
    		this.mapContainer.scaleY = 0.5;
    	}

    	this.mapContainer.x += p.x * (sx - this.mapContainer.scaleX);
    	this.mapContainer.y += p.y * (sy - this.mapContainer.scaleY);
    	this.stage.update();
    }

    // Listeners
	this.dragX = 0;
	this.dragY = 0;
	this.dragMapX = 0;
	this.dragMapY = 0;
	this.isDragging = false;

	this.stage.on('stagemousedown', function(evt) {
		this.isDragging = true;
	    this.dragX = evt.stageX;
	    this.dragY = evt.stageY;
	    this.dragMapX = evt.currentTarget.x;
	    this.dragMapY = evt.currentTarget.y;
	});
	this.stage.on('stagemouseup', function(evt) {
		this.isDragging = false;
	});
	this.stage.on("stagemousemove",function(evt) {
		if(this.isDragging){
			// currentTarget will be the container that the event listener was added to:
			evt.currentTarget.x = this.dragMapX + (evt.stageX - this.dragX);
			evt.currentTarget.y = this.dragMapY + (evt.stageY - this.dragY);
			// make sure to redraw the stage to show the change:
			stage.update(); 
		}
	});
}
