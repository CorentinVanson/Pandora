var GameCreate = function(game){

    var scope = this;

    this.game = game;

    this.create = function(data,animals){
        worldScale = 1;

        render = new Render(game,data);

        // Create a group for our tiles.
        isoGroup = game.add.group();
        content = game.add.group();
        animalIndex = 0;
        classes = {};
        classList = [];
        nbClass = 0;
        animalClass = 0;

        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();

        // Let's make a load of tiles on a grid.
        this.spawnTiles(data);

        var w = 800;
        var h = 400;

        showButton();

        // Add a input listener that can help us return from being paused
        game.input.onDown.add(unpause, self);

        function showButton(){
            menu_button = game.add.graphics(w-70, 10);
            // draw a rectangle
            menu_button.beginFill(0xffffff, 0.8);
            menu_button.lineStyle(2, 0x000000, 1);
            menu_button.drawRect(0, 0, 50, 50);
            menu_button.endFill();
            // Create a label to use as a button
            pause_label = game.add.sprite(w-70,10, 'menu_1');
            pause_label.scale.set(0.8);
            pause_label.inputEnabled = true;
            pause_label.events.onInputUp.add(function () {
                game.menuState = true;

                menu_button.destroy();
                pause_label.destroy();


                menu_window = game.add.group();
                menu = game.add.graphics(0, 0);
                menu.beginFill(0xffffff, 0.8);
                menu.lineStyle(2, 0x000000, 1);
                menu.drawRect(10, 10, 780, 380);
                menu.endFill();
                menu.inputEnabled = true;
                menu.events.onInputUp.add(function (){console.log("menu block");});
                menu_window.add(menu);

                // And a label to illustrate which menu item was chosen. (This is not necessary)
                /*choiseLabel = game.add.text(w / 2, h - 150, 'Click outside menu to continue', {
                    font: '30px Arial',
                    fill: '#fff'
                });
                choiseLabel.anchor.setTo(0.5, 0.5);
                menu_window.add(choiseLabel);*/

                addMenuButton(2);
                addMenuButton(3);
                addMenuButton(4);
                addMenuButton(5);

                addRemoveButton();

                initContent();
                initDataContent();
            });
        }

        // And finally the method that handels the pause menu
        function unpause(event){
            // Only act if paused
            if(game.menuState){
                // Calculate the corners of the menu
                var x1 = 10, x2 = 790,
                    y1 = 10, y2 = 390;

                // Check if the click was inside the menu
                if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){

                }
                else{
                    // Remove the menu and the label
                    menu_window.destroy();
                    panelButtonX = 20;
                    panelButtonY = 20;
                    showButton();

                    // Unpause the game
                    game.menuState = false;
                }
            }
        };

        function showContent() {
            initContent();
            switch (game.constructionState){
                case 5:
                    showAnimals();
                    break;
                default:
                    showConstruct();
            }
        }

        function initContent(){
            if (content != null && content != undefined) {
                content.destroy();
            }
            content = game.add.group();
            menu_window.add(content);
        }

        function initDataContent(){
            animalIndex = 0;
            classes = {};
            classList = [];
            nbClass = 0;
            animalClass = 0;
            classes["All"] = nbClass;
            classList.push(animals);
            nbClass++;
            for(var i = 0; i<animals.length; i++){
                if(classes[animals[i].class] == undefined){
                    classes[animals[i].class] = nbClass;
                    classList.push([]);
                    nbClass++;
                }
                classList[classes[animals[i].class]].push(animals[i]);
            }
        }

        function showAnimals(){
            panelX = 135;
            panelY = 60;
            panelButtonAnimalX = 20;
            panelButtonAnimalY = 60;
            addAnimalClassButton(0);
            addAnimalClassButton(1);
            addAnimalClassButton(2);
            addAnimalClassButton(3);
            addAnimalClassButton(4);
            addAnimalClassButton(5);
            addAnimalClassButton(6);
            addAnimalClassButton(7);
            addAnimalClassButton(8);
            addAnimalClassButton(9);
            addAnimalClassButton(10);
            addAnimalClassButton(11);
            addAnimalMoveButton(1);
            addPanel(classList[animalClass][animalIndex]);
            if(animalIndex+1<classList[animalClass].length) {
                addPanel(classList[animalClass][animalIndex + 1]);
            }else{
                panelX += 190;
            }
            if(animalIndex+2<classList[animalClass].length) {
                addPanel(classList[animalClass][animalIndex + 2]);
            }else{
                panelX += 190;
            }
            addAnimalMoveButton(0);
        }

        function showConstruct(){
            var style = { font: "32px Arial", fill: "#000000"};
            var label = game.add.text(400, 200, "En Construction...", style);
            label.anchor.set(0.5);
            content.add(label);
        }

        function addPanel(animal){
            var panell = game.add.group();
            var panel = game.add.graphics(panelX,panelY);
            panel.beginFill(0x4d96d1, 0.95);
            panel.lineStyle(2, 0x3276ad, 1);
            panel.drawRect(0, 0, 180, 320);
            panel.endFill();
            panel.inputEnabled = true;
            panel.events.onInputUp.add(function (){console.log("menu panel");});
            panell.add(panel);
            var img = game.add.image(panelX+15,panelY+15,'animal_'+animal._id);
            img.width = 150;
            img.height = 100;
            panell.add(img);
            var style = { font: "12px Arial", fill: "#ffffff"};
            var title = game.add.text(panelX+15,panelY+120,"Name :", style);
            var title2 = game.add.text(panelX+15,panelY+135,animal.name, style);
            panell.add(title);
            panell.add(title2);
            var title3 = game.add.text(panelX+15,panelY+160,"Class :", style);
            var title4 = game.add.text(panelX+15,panelY+175,animal.class, style);
            panell.add(title3);
            panell.add(title4);
            var title3 = game.add.text(panelX+15,panelY+200,"Species :", style);
            var title4 = game.add.text(panelX+15,panelY+215,animal.species, style);
            panell.add(title3);
            panell.add(title4);
            var button = game.add.button(panelX + 65, panelY + 265, 'button_1', null, this, 0, 4, 0);
            button.width = 50;
            button.height = 50;
            panell.add(button);
            var img = game.add.image(panelX+70,panelY+270,'menu_8');
            img.width = 40;
            img.height = 40;
            panell.add(img);
            var button = game.add.button(panelX + 123, panelY + 265, 'button_1', showAnimal, this, 0, 4, 0);
            button.width = 50;
            button.height = 50;
            panell.add(button);
            var img = game.add.image(panelX + 128,panelY+270,'menu_7');
            img.width = 40;
            img.height = 40;
            panell.add(img);
            content.add(panell);
            panelX += 190;
            function showAnimal(){
                showDetailAnimal(animal);
            }
        };

        function showDetailAnimal(animal){
            animal_window = game.add.group();
            detail = game.add.graphics(0, 0);
            detail.beginFill(0x4d96d1, 1);
            detail.lineStyle(2, 0x3276ad, 1);
            detail.drawRect(10, 10, 780, 380);
            detail.endFill();
            detail.inputEnabled = true;
            detail.events.onInputUp.add(function (){console.log("menu panel");});
            animal_window.add(detail);

            var button = game.add.button(800-20-30,20, 'button_1', closeWindow, this, 3, 7, 3);
            button.scale.y = 0.435;
            button.scale.x = 0.135;
            animal_window.add(button);

            function closeWindow() {
                animal_window.destroy();
            }
            var cross = game.add.graphics(800-20-30,20);
            cross.inputEnabled = true;
            cross.beginFill(0xffffff, 0.95);
            cross.lineStyle(2, 0xffffff, 1);
            cross.moveTo(2,2);
            cross.lineTo(5, 2);
            cross.lineTo(15, 12);
            cross.lineTo(25, 2);
            cross.lineTo(28, 2);
            cross.lineTo(28, 5);
            cross.lineTo(18, 15);
            cross.lineTo(28, 25);
            cross.lineTo(28, 28);
            cross.lineTo(25, 28);
            cross.lineTo(15, 18);
            cross.lineTo(5, 28);
            cross.lineTo(2, 28);
            cross.lineTo(2, 25);
            cross.lineTo(12, 15);
            cross.lineTo(2, 5);
            cross.lineTo(2, 2);
            cross.endFill();

            animal_window.add(cross);

            var img = game.add.image(25,25,'animal_'+animal._id);
            img.width = 300;
            img.height = 200;
            animal_window.add(img);
            detail = game.add.graphics(0, 0);
            detail.beginFill(0xffffff, 1);
            detail.lineStyle(2, 0x000000, 1);
            detail.drawRect(25, 240, 300, 125);
            detail.endFill();
            animal_window.add(detail);
            var style = { font: "25px Arial", fill: "#000000", wordWrap:true, wordWrapWidth:250};
            var g = game.add.group();
            var title1 = game.add.text(50,253,"Name : "+animal.name, style);
            title1.fontWeight = 'bold';
            var title2 = game.add.text(50,253+title1.height,"Class : "+animal.class, style);
            g.add(title1);
            g.add(title2);
            var title3 = game.add.text(50,255+title1.height+title2.height,"Family : "+animal.family, style);
            var title4 = game.add.text(50,255+title1.height+title2.height+title3.height,"Species : "+animal.species, style);
            g.add(title3);
            g.add(title4);
            while(g.height>100){
                title1.fontSize -= 1;
                title2.fontSize -= 1;
                title2.y = 253+title1.height;
                title3.fontSize -= 1;
                title3.y = 253+title1.height+title2.height;
                title4.fontSize -= 1;
                title4.y = 253+title1.height+title2.height+title3.height;
            }
            animal_window.add(g);
            var style = { font: "15px Arial", fill: "#ffffff", wordWrap:true, wordWrapWidth:400};
            var title4 = game.add.text(350,25,animal.description, style);
            while(title4.height >= 400){
                title4.fontSize -= 1;
            }
            //title4.height = 200;
            animal_window.add(title4);
            menu_window.add(animal_window);
        }

        panelButtonX = 20;
        panelButtonY = 20;

        function addMenuButton(i){
            var button = game.add.button(panelButtonX, panelButtonY, 'button_1', setConstructionState, this, 0, 4, 0);
            button.scale.y = 0.45;
            button.scale.x = 0.15;
            menu_window.add(button);
            var ic = game.add.sprite(panelButtonX+4, panelButtonY+4, 'menu_'+i);
            ic.scale.set(0.4);
            menu_window.add(ic);
            panelButtonX += 50;
            function setConstructionState(){
                console.log(i);
                game.constructionState = i;
                initDataContent();
                showContent();
            }
        };

        function addAnimalMoveButton(i){
            if(i == 0) {
                var button = game.add.button(panelX, panelY, 'button_2', setAnimalIndexP, this, 5, 1, 5);
            }else{
                var button = game.add.button(panelX, panelY, 'button_2', setAnimalIndexM, this, 5, 1, 5);
            }
            button.scale.y = 4.57;
            button.scale.x = 0.15;
            content.add(button);
            var ic = game.add.sprite(panelX+4, panelY+4+136, 'menu_6');
            ic.scale.set(0.4);
            if(i == 0){
                ic.scale.x = -0.4;
                ic.x += 26;
            }
            content.add(ic);
            panelX += 43;
            function setAnimalIndexP(){
                animalIndex++;
                if(animalIndex >= classList[animalClass].length - 2){
                    animalIndex = classList[animalClass].length - 3;
                }
                if(animalIndex<0){
                    animalIndex = 0;
                }
                showContent();
            }
            function setAnimalIndexM(){
                animalIndex--;
                if(animalIndex<0){
                    animalIndex = 0;
                }
                showContent();
            }
        };

        function addAnimalClassButton(i){
            var found = false;
            for(var c in classes){
                if(classes[c] == i){
                    found = true;
                    classname = c;
                }
            }
            if(found) {
                var button = game.add.button(panelButtonAnimalX, panelButtonAnimalY, 'button_1', setAnimalClass, this, 3, 7, 3);
                button.scale.y = 0.3;
                button.scale.x = 0.45;
                content.add(button);
                var style = {font: "12px Arial", fill: "#ffffff"};
                var ic = game.add.text(panelButtonAnimalX + 5, panelButtonAnimalY + 3, classname, style);
                content.add(ic);
                panelButtonAnimalY += 27;
                function setAnimalClass() {
                    animalClass = i;
                    animalIndex = 0;
                    showContent();
                }
            }
        };

        function addRemoveButton(){
            var button = game.add.button(800-20-30,20, 'button_1', closeWindow, this, 3, 7, 3);
            button.scale.y = 0.435;
            button.scale.x = 0.135;
            menu_window.add(button);

            function closeWindow() {
                menu_window.destroy();
                panelX = 85;
                panelY = 60;
                panelButtonX = 20;
                panelButtonY = 20;
                showButton();
                game.menuState = false;

            }
            var cross = game.add.graphics(800-20-30,20);
            cross.inputEnabled = true;
            cross.beginFill(0xffffff, 0.95);
            cross.lineStyle(2, 0xffffff, 1);
            cross.moveTo(2,2);
            cross.lineTo(5, 2);
            cross.lineTo(15, 12);
            cross.lineTo(25, 2);
            cross.lineTo(28, 2);
            cross.lineTo(28, 5);
            cross.lineTo(18, 15);
            cross.lineTo(28, 25);
            cross.lineTo(28, 28);
            cross.lineTo(25, 28);
            cross.lineTo(15, 18);
            cross.lineTo(5, 28);
            cross.lineTo(2, 28);
            cross.lineTo(2, 25);
            cross.lineTo(12, 15);
            cross.lineTo(2, 5);
            cross.lineTo(2, 2);
            cross.endFill();

            menu_window.add(cross);
        };

    }

    this.spawnTiles = function (data) {

        for(var i = 0; i<data.mapTile.length + 1; i++){
            for(var j = 0; j<data.mapTile.length + 1; j++){
                if(i<data.mapTile.length && j<data.mapTile.length) {
                    if(data.mapFence[1][i][j] != 0){
                        var fence;
                        fence = render.addFence(i,j,data.mapFence[1][i][j],1, isoGroup);
                    }
                    if(data.mapFence[0][i][j] != 0){
                        var fence;
                        fence = render.addFence(i,j,data.mapFence[0][i][j],0, isoGroup);
                    }
                }else if(i<data.mapTile.length){
                    if(data.mapFence[1][i][j] != 0){
                        var fence;
                        fence = render.addFence(i,j,data.mapFence[1][i][j],1, isoGroup);
                    }
                }else if(j<data.mapTile.length){
                    if(data.mapFence[0][i][j] != 0){
                        var fence;
                        fence = render.addFence(i,j,data.mapFence[0][i][j],0, isoGroup);
                    }
                }
                if(i<data.mapTile.length && j<data.mapTile.length) {

                    var tile;
                    tile = render.addTile(i, j, data.mapTile[i][j], isoGroup);
                    tile.inputEnabled = true;
                    tile.events.onInputDown.add(function (tile) {
                        if (!isoGroup.drag) {
                            isoGroup.dragX = cursorPos.x;
                            isoGroup.dragY = cursorPos.y;
                            isoGroup.drag = true;
                        }
                    }, this);
                    tile.events.onInputUp.add(function (tile) {
                        isoGroup.dragX = 0;
                        isoGroup.dragY = 0;
                        isoGroup.drag = false;
                    }, this);
                    if (data.mapRoad[i][j] != 0) {
                        var buil;
                        buil = render.addRoad(i, j, data.mapRoad[i][j], isoGroup);
                    }
                    if (data.mapBuilding[i][j] != 0) {
                        var buil;
                        buil = render.addBuilding(i, j, data.mapBuilding[i][j].type, data.mapBuilding[i][j].orientation, isoGroup);
                    }
                }
            }
        }

    }

}