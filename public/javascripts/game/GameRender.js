var GameRender = function(game){
    this.game = game;
    this.render = function(){
        //game.debug.text("Move your mouse around!", 2, 36, "#ffffff");
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
    }
}