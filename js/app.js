/*
 *var Car = function(loc) {
    this.loc = loc;
}
Car.prototype.move = function() {
    this.loc++;
}

var Van = function (loc) {
    Car.call(this, loc);
}
Van.prototype = Object.create(Car.prototype);
Van.prototype.constructor = Van;
Van.prototype.grab = function() {}
*/

/*
 * The level manager keeps track of information that is specific to a game level.
 * In this game, the information is brief but encapsulation still makes sense
 * for future expansion.
 */
var LevelManager = function() {

    // Start at level 0.
    this.currentLevel = 0;
}

// Advances the level and updates all level variables.
LevelManager.prototype.advanceLevel = function() {
    this.currentLevel++;
}

// Returns true if the current level is complete.
LevelManager.prototype.isLevelComplete = function() {
    return player != null && player.beatLevel == true;
}

// Enemies our player must avoid
var Enemy = function(alias, row) {

    // Get the character by alias name.
    var enemy = GameAssets.getEnemy(alias);

    // Configure the enemy!
    this.configure(enemy, row);
}

// Calculates and returns a row for the enemy's travels.
Enemy.prototype.configure = function(enemyAsset, row) {

    // Store the object asset information for future use.
    this.enemyAsset = enemyAsset;

    if (this.enemyAsset != null) {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = enemyAsset.image;
        // Reset the enemy location and speed.  (This first time it's a set, not a reset).
        this.reset(row);
    }
}

// Calculates and returns a row for the enemy's travels.
Enemy.prototype.resetX = function() {
    // The enemies start off screen and move into play.  A negative offset is expected.
    this.x = 0 - GameAssets.getTileWidth();
}

// Calculates and returns a row for the enemy's travels.
Enemy.prototype.getRandomRow = function() {
    // Get a random value betwen min and max.  Adjust to make the range inclusive on the max end.
    return Math.floor(Math.random() * (GameAssets.getEnemyMaxRow(levelManager.currentLevel) - GameAssets.getEnemyMinRow(levelManager.currentLevel) + 1)) +
        GameAssets.getEnemyMinRow(levelManager.currentLevel);
}

// Calculates and returns a speed for the enemy's movement.
Enemy.prototype.getRandomSpeed = function() {
    // Get a random speed between min and max.  Adjust to make the range inclusive on the max end.
    return Math.floor(Math.random() * (GameAssets.getEnemySpeedMax(levelManager.currentLevel) - GameAssets.getEnemySpeedMin(levelManager.currentLevel) + 1)) +
        GameAssets.getEnemySpeedMin(levelManager.currentLevel);
}

// Calculates and returns a row for the enemy's travels.
Enemy.prototype.reset = function(row) {

    if (this.enemyAsset != null) {
        // The enemies start off screen and move into play.
        this.resetX();

        // If the row has been received as a parameter, use it to set the position.
        // Otherwise, generate a random row and use it as the setting.
        if (row != undefined) {
            this.y = row * GameAssets.getTileHeight();
        }
        else {
            // Set the enemy y offset based on the random row and game tile height.
            this.y = this.getRandomRow() * GameAssets.getTileHeight();
        }
        // Get a random speed.
        this.speed = this.getRandomSpeed();
    }
    else {
        // Log an error to the console.
        console.log("Enemey.reset, Invalid enemyAsset!");
        this.sprite = "";
        this.speed = 20;
        this.x = 0;
        this.y = 0;
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    // If the enemy has moved off screen, reset it.
    if (this.x > GameAssets.getTileWidth() * GameAssets.getColumns()) {
        this.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
var EnemyManager = function(levelId) {

    // Create the enemies for the current game level.
    this.initEnemies(levelId);
}

// Called to create and configure enemies for the current level.
EnemyManager.prototype.initEnemies = function (levelId) {

    // Place all enemy objects in an array called allEnemies
    this.allEnemies = new Array();

    // On game start, add the defined number of enemies to rows.  The enemies will move at random speeds
    // and manage their own collisions so that they don't walk on each other  When the enemies have reached
    // the end of the screen, they'll reset and move into random rows again.0
    for (var i = 0; i < GameAssets.getLevelEnemyCount(levelId); i++) {

        // Push the enemy into the list.
        this.allEnemies.push(new Enemy("enemy-bug"));

        // The row can optionally be forced by adding a second parameter to the enemy constructor, as shown.
        //this.allEnemies.push(new Enemy("enemy-bug", i % GameAssets.getEnemyRows() + 1));
    }
}

// Called to reset the player and advance it to the next level.
EnemyManager.prototype.advanceLevel = function (levelId) {
    // Reset/initialize the enemies.
    this.initEnemies(levelId);
}

// Called to update the attributes of the enemies (location, etc.).
EnemyManager.prototype.updateEnemies = function(dt) {

    // Update each of the enemies.
    if (this.allEnemies != null) {
        this.allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
    }
    else {
        console.log("no enemies");
    }
}

// Called to draw the enemies on screen.
EnemyManager.prototype.renderEnemies = function() {

    // Loop through the objects in the allEnemies array and call the render function.
    if (this.allEnemies != null) {
        this.allEnemies.forEach(function(enemy) {
            enemy.render();
        });
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(levelId) {

    // initialize the player.
    this.init();
}

// Initialize the player.
Player.prototype.init = function(levelId) {

    // Get the character alias for the current level.
    this.alias = GameAssets.getLevelCharacter(levelId)
    // Get the character by alias name.
    this.character = GameAssets.getCharacter(this.alias);

    // Create a variable that will allow the code to hide and show the player icon.
    // By default, the player will be visible.
    this.isShowing = true;
    // Stores a reference to the active blink function.
    this.playerBlinker = null;
    // Initialize the win blink counter.
    this.winBlinkCount = 0;
    // Set the flag indicating level complete.
    this.beatLevel = false;

    // If the character asset is valid, configure this player based on the asset specs.
    if (this.character != null) {
        // Assign the sprite name.
        this.sprite = this.character.image;
        // The x and y coordinates are grid offsets.  The delta x and y coordinates
        // provide usable width and height information for each tile and provide
        // the placement information for the character within the grid system.
        this.deltaX = this.character.deltaX;
        this.deltaY = this.character.deltaY;
        this.x = this.character.startX * this.deltaX;
        this.y = this.character.startY * this.deltaY;
    }
    // Set default and safe values.
    else {
        this.sprite = "";
        this.deltaX = 0;
        this.deltaY = 0;
        this.x = 0;
        this.y = 0;
    }
}

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // In this version of the game, the player's movement is tile based, not delta based.  This function is not
    // technically needed in this model.
}

// Celebrate the winning level.
Player.prototype.completedLevel = function() {
    // Blink the player to show that the level is complete.
    this.startBlink();
}

// Called to start blinking the player.
Player.prototype.startBlink = function() {

    // Reset the variables that track the state of the flashing.
    this.winBlinkCount = 0;
    // Make sure that the interval function is not running before starting another.
    clearInterval(this.playerBlinker);
    // Start the blink function.
    this.playerBlinker = setInterval(function () { blinkPlayer() }, 250);
}

// Called to stop blinking the player.
Player.prototype.stopBlink = function() {
    // Make sure that the interval function is not running before starting another.
    clearInterval(this.playerBlinker);
    // Reset the variables that track the state of the flashing.
    this.winBlinkCount = 0;
}

// Update the players's position, required method for game
Player.prototype.handleInput = function(keyCode) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (keyCode == "up") {
        this.y = this.y - this.deltaY;
    } else if (keyCode == "down") {
        this.y = this.y + this.deltaY;
    } else if (keyCode == "right") {
        this.x = this.x + this.deltaX;
    } else if (keyCode == "left") {
        this.x = this.x - this.deltaX;
    }

    // Left side of the screen.
    // Make sure that the character doesn't run off of the screen.
    if (this.x < 0) {
        this.x = 0;
    }
    // Right side of the screen.
    // Moving in the x direction moves the character to the next column.
    // Calculations are performed on 0-based column indices, thus the - 1.
    else if (this.x > ((GameAssets.getColumns() - 1) * GameAssets.getTileWidth())) {
        this.x = (GameAssets.getColumns() - 1) * GameAssets.getTileWidth();
    }

    // Top of the screen.
    // Make sure that the player doesn't move beyond the top of the screen.
    if (this.y < 0) {
        this.y = 0;
    }
    // Bottom of the screen.
    // Moving in the y direction moves the character to the next row.
    // Calculations are performed on 0-based row indices, thus the - 1.
    else if (this.y > ((GameAssets.getRows() - 1) * GameAssets.getTileHeight())) {
        this.y = (GameAssets.getRows() - 1) * GameAssets.getTileHeight();
    }

    // Check to see if the player reached the top of the screen and completed the level.
    if (this.y <= GameAssets.getWinningRow() * GameAssets.getTileHeight()) {
        this.completedLevel();
    }
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {


    // If the player is showing, draw it.
    if (this.isShowing == true) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Called to reset the player and advance it to the next level.
Player.prototype.advanceLevel = function (levelId) {
    // Reset/initialize the player.
    this.init(levelId);
}

function checkCollision(thing1, thing2) {

    var image1 = Resources.get(thing1.sprite);
    var image2 = Resources.get(thing2.sprite);
    
    //console.log("x1: ", thing1.x);
    //console.log("y1: ", thing1.y);
    //console.log("w1: ", image1.width);
    //console.log("h1: ", image1.height);
    
    //console.log("x2: ", thing2.x);
    //console.log("y2: ", thing2.y);
    //console.log("w2: ", image2.width);
    //console.log("h2: ", image2.height);
    
    if (thing1.x < thing2.x + image2.width &&
       thing1.x + image1.width > thing2.x &&
       thing1.y < thing2.y + image2.height &&
       image1.height + thing1.y > thing2.y) {
        
        // Collision detected!
        return true;
    }
    return false;
}

// Global function used to set an interval that adjusts the visibility state of
// the player so that it blinks when the player finishes a level.
function blinkPlayer() {

    // Set the flag to the opposite boolean state.
    player.isShowing = !player.isShowing;
    // Increment the counter.  The game will reset after the defined number of celebration blinks.
    player.winBlinkCount++;

    // The player will flash x times and then stop.
    if (player.winBlinkCount >= GameAssets.getWinningBlinkCount()) {
        // Stop blinking the player.
        player.stopBlink();
        // Trigger the advance of the game level.
        player.beatLevel = true;
    }
}

// Now instantiate your objects.

// Create the level manager object first.
var levelManager = new LevelManager();

// Create an enemy manager.  This object keeps track of instantiated enemies
// and manages their update and render functions.
var enemyManager = new EnemyManager(levelManager.currentLevel);

// Place the player object in a variable called player
var player = new Player(levelManager.currentLevel);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
