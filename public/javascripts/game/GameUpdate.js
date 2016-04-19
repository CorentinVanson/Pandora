var GameUpdate = function(game){
    this.game = game;

    this.update = function(){

        // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
        game.iso.unproject(game.input.activePointer.position, cursorPos);

        // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
        isoGroup.forEach(function (tile) {

            if(isoGroup.drag){
                //console.log(tile);
                var x = (tile.initDragX + (cursorPos.x - isoGroup.dragX)/worldScale);
                var y = (tile.initDragY + (cursorPos.y - isoGroup.dragY)/worldScale);
                //tile.anchor.set(x,y);
                game.add.tween(tile).to({ isoX: x, isoY:y }, 1, Phaser.Easing.Quadratic.InOut, true);
            }else{
                tile.initDragX = tile.isoX;
                tile.initDragY = tile.isoY;
            }

        });

        // zoom
        if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            worldScale += 0.05;

            // set a minimum and maximum scale value
            worldScale = Phaser.Math.clamp(worldScale, 0.5, 1.5);

            // set our world scale as needed
            isoGroup.scale.set(worldScale);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            worldScale -= 0.05;

            // set a minimum and maximum scale value
            worldScale = Phaser.Math.clamp(worldScale, 0.5, 1.5);

            // set our world scale as needed
            isoGroup.scale.set(worldScale);
        }
    }
}