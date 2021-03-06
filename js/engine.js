/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        // Draw the game.
        render();
        // Check for collisions after all updates and rendering is complete.
        checkCollisions();

        /*
         * Check for level complete and advance the game level if appropriate.
         */
        checkForLevelComplete();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    };

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
    }

    // Checks to see if any of the enemies are colliding with the player.
    function checkCollisions() {

        // Check to see if the player has run into any awards.
        for (var award in awardManager.awards) {

            var collision = checkCollision (player, awardManager.awards[award]);
            // The player has collected an award, add the points and remove the award from play.
            if (collision == true) {
                gameManager.addToScore(awardManager.awards[award]);
                awardManager.onCollision(awardManager.awards[award]);
            }
        }

        // Check to see if the player is going to survive the level.
        for (var enemy in enemyManager.allEnemies) {

            var collision = checkCollision (player, enemyManager.allEnemies[enemy]);
            // The player has been defeated.  Handle the loss.
            if (collision == true) {
                gameManager.addEnemyWin();
                player.onCollision(enemyManager.allEnemies[enemy], gameManager.currentLevel);
                // Stop processing.  The enemy has been detected.
                break;
            }
        }
    }

    // Checks to see if the two objects are colliding.
    function checkCollision(thing1, thing2) {
    
        var image1 = Resources.get(thing1.sprite);
        var image2 = Resources.get(thing2.sprite);
    
        var collider1 = thing1.collider;
        var collider2 = thing2.collider;
    
        // If the objects aren't both collidable, return.    
        if (collider1 == null || collider2 == null) {
            return false;
        }
    
        // Check to see if any of the corners of either of the objects are within the bounds
        // of the other object.  If any of the corners evalutes to true, return true.
        if ((thing1.x + collider1.x) < (thing2.x + collider2.width) &&
            (thing1.x + collider1.width) > (thing2.x + collider2.x) &&
            (thing1.y + collider1.y) < (thing2.y + collider2.height) &&
            (thing1.y + collider1.height) > (thing2.y + collider2.y)) {
            
            // Collision detected!
            return true;
        }
        return false;
    }
    
    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {

        // Update the enemies of a valid enemy manager exists.
        if (enemyManager != null) {
            enemyManager.updateEnemies(dt);
        }

        if (awardManager != null) {
            awardManager.updateAwards(dt);
        }
        // Update the player.
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {

        // Render the enemies of a valid enemy manager exists.
        if (enemyManager != null) {
            enemyManager.renderEnemies();
        }

        // Render the awards.
        if (awardManager != null) {
            awardManager.renderAwards();
        }

        // Render the player.
        player.render();
        // Draw the game meters last so that they appear on top.
        gameManager.render(ctx);
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
    }

    /*
     * Called to determine if the current level is complete.
     */
    function checkForLevelComplete() {

        if (gameManager.isLevelComplete()) {
            advanceLevel();
        }
    }

    /* Called to start a new game level.  All objects need to handle their own
     * level reset functionality.  This function centralizes the feature.
     */
    function advanceLevel() {
        // Set the next game level.
        gameManager.advanceLevel();
        gameManager.addPlayerWin();
        enemyManager.advanceLevel(gameManager.currentLevel);
        awardManager.advanceLevel(gameManager.currentLevel);
        player.advanceLevel(gameManager.currentLevel);
    }
    
    // Build an array of assets to load from the asset list defined for the game.
    // In future iterations, consider updating the loading method to accept
    // the json objects directly.
    var assetArray = new Array();
    for(var asset in GameAssets.tiles) {
        assetArray.push(GameAssets.tiles[asset].image);
    }
    for(var asset in GameAssets.characters) {
        assetArray.push(GameAssets.characters[asset].image);
    }
    for(var asset in GameAssets.awards) {
        assetArray.push(GameAssets.awards[asset].image);
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load(assetArray);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
