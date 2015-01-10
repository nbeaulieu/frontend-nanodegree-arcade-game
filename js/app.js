/*
 * The game manager keeps track of game play information including level,
 * player win, enemy win, and score information.
 */
var GameManager = function() {

    // Start at level 0.
    this.currentLevel = 0;
    // Keep a running count of how many times the player tries to cross the road.
    this.gamesPlayed = 0;
    // Initialize the win accounting.
    this.playerWinCount = 0;
    this.enemyWinCount = 0;
    // Initialize the score counters.
    this.levelScore = 0;
    this.totalScore = 0;
}

// Advances the level and updates all level variables.
GameManager.prototype.advanceLevel = function() {

    // Update the level counters.
    this.currentLevel++;
    this.gamesPlayed++;
    // Reset the level scores.
    this.levelScore = 0;
}

// Adds a win to the enemy meter.
GameManager.prototype.addEnemyWin = function() {
    // Chalk one up for the enemy.
    this.enemyWinCount++;
    // Keep track of this road crossing attempt.
    this.gamesPlayed++;
}

// Adds a win to the player meter.
GameManager.prototype.addPlayerWin = function() {
    this.playerWinCount++;
}

// Adds the value to the level and total scores.
GameManager.prototype.addToScore = function(award) {

    // If a valid award has been received, add it's point value to the meter.
    if (award != null) {
        this.levelScore = this.levelScore + award.points;
        this.totalScore = this.totalScore + award.points;
    }
}

// Returns true if the current level is complete.
GameManager.prototype.isLevelComplete = function() {
    return player != null && player.beatLevel == true;
}

GameManager.prototype.render = function(context) {

    // Set the font properties for drawing text meters. 
    context.font = 'italic 14px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'left';
    
    // Construct the meter strings and draw them.
    var meter = GameAssets.getMeter("currentLevel");
    var textString = meter.text + this.currentLevel;
    context.fillText(textString, meter.x, meter.y, meter.max);

    meter = GameAssets.getMeter("gamesPlayed");
    textString = meter.text + this.gamesPlayed;
    context.fillText(textString, meter.x, meter.y, meter.max);

    meter = GameAssets.getMeter("playerWins");
    textString = meter.text + this.playerWinCount;
    context.fillText(textString, meter.x, meter.y, meter.max);

    meter = GameAssets.getMeter("enemyWins");
    textString = meter.text + this.enemyWinCount;
    context.fillText(textString, meter.x, meter.y, meter.max);

    meter = GameAssets.getMeter("totalScore");
    textString = meter.text + this.totalScore;
    context.fillText(textString, meter.x, meter.y, meter.max);

    meter = GameAssets.getMeter("levelScore");
    textString = meter.text + this.levelScore;
    context.fillText(textString, meter.x, meter.y, meter.max);
}

/*
 * The Collider object is added to objects that require collision detection in the game.
 * In a real game, this class would be expanded to provide deeper and more robust functionality.
 * This is a lightweight class that really is just defines the 2D collision box.
 */
var Collider = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Collider.prototype.Set = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

/*
 * Defines the awards that the player can collect.
 */

// Enemies our player must avoid
var Award = function() {

    var awardIndex = this.getRandomAward();
    console.log(awardIndex);

    // Configure the award.
    this.configure(awardIndex);
}

// Configures the award for play.
Award.prototype.configure = function(awardIndex) {

    // Store the object asset information for future use.
    this.awardAsset = GameAssets.getAward(awardIndex);
    
    if (this.awardAsset != null) {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = this.awardAsset.image;
        this.points = this.awardAsset.points;
        
        // Place the award.
        // Get a random row and column for the awards.
        var row = this.getRandomRow();
        var column = this.getRandomColumn();

        // Set the x and y values for the award.
        this.x = row * GameAssets.getTileWidth();
        this.y = column * GameAssets.getTileHeight();
        // Reset/initialize the player.
        this.isVisible = true;
        // Get the defined collision box offsets.
        var collisionBox = this.awardAsset.collisionBox;
        // Add the collider to the player.
        this.collider = new Collider(collisionBox[0], collisionBox[1], collisionBox[2], collisionBox[3]);
    }
}

// Gets one of the awards for display.
Award.prototype.getRandomAward = function() {
    // Get a random award between 0 and the total awards.  Formula is: Math.random() * (max - min) + min.
    return Math.floor(Math.random() * (GameAssets.getTotalAwards() - 1) + 1);
}

// Gets one of the awards for display.
Award.prototype.getRandomRow = function() {
    // Get a random award between 0 and the total awards.  Formula is: Math.random() * (max - min) + min.
    return Math.floor(Math.random() * (GameAssets.getAwardMaxRow() - GameAssets.getAwardMinRow()) + GameAssets.getAwardMinRow());
}

// Gets one of the awards for display.
Award.prototype.getRandomColumn = function() {
    // Get a random award between 0 and the total awards.  Formula is: Math.random() * (max - min) + min.
    return Math.floor(Math.random() * (GameAssets.getColumns()));
}

// Update the award.
// Parameter: dt, a time delta between ticks
Award.prototype.update = function(dt) {
}

// Draw the enemy on the screen, required method for game
Award.prototype.render = function() {
    // Only draw the award if it's visible.
    if (this.isVisible == true) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

Award.prototype.onCollision = function () {
    // Reset/initialize the player.
    this.isVisible = false;
    // Remove the collider so that this award is no longer included in the detection.
    this.collider = null;
}

/*
 * Defines the awards that the player can collect.
 */

// Manages the awards that the player collects during the game.
var AwardManager = function(levelId) {

    // Create the enemies for the current game level.
    this.initAwards(levelId);
}

// Called to create and configure enemies for the current level.
AwardManager.prototype.initAwards = function (levelId) {

    // Place all enemy objects in an array called allEnemies
    this.awards = new Array();
    
    console.log("AwardManager.initAwards: ", levelId);
    console.log("GameAssets.getAwardCount: ", GameAssets.getAwardCount(levelId));

    // On game start, add the defined number of enemies to rows.  The enemies will move at random speeds
    // and manage their own collisions so that they don't walk on each other  When the enemies have reached
    // the end of the screen, they'll reset and move into random rows again.0
    for (var i = 0; i < GameAssets.getAwardCount(levelId); i++) {

        // Push the award into the list.
        this.awards.push(new Award());
    }
}

AwardManager.prototype.onCollision = function (award) {

    // Route the collision to the award.
    if (award != null) {
        award.onCollision();
    }
}

// Called to update the attributes of the enemies (location, etc.).
AwardManager.prototype.updateAwards = function(dt) {

    // Update each of the enemies.
    if (this.awards != null) {
        this.awards.forEach(function(award) {
            award.update(dt);
        });
    }
    else {
        console.log("AwardManager.updateAwards: No awards to render.");
    }
}

// Called to draw the awards on screen.
AwardManager.prototype.renderAwards = function() {

    // Loop through the objects in the allEnemies array and call the render function.
    if (this.awards != null) {
        this.awards.forEach(function(award) {
            award.render();
        });
    }
}

// Called to reset the awards for the next level.
AwardManager.prototype.advanceLevel = function (levelId) {
    // Reset/initialize the enemies.
    this.initAwards(levelId);
}

/*
 * Defines the enemies that the player must avoid.
 */

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
    return Math.floor(Math.random() * (GameAssets.getEnemyMaxRow(gameManager.currentLevel) - GameAssets.getEnemyMinRow(gameManager.currentLevel) + 1)) +
        GameAssets.getEnemyMinRow(gameManager.currentLevel);
}

// Calculates and returns a speed for the enemy's movement.
Enemy.prototype.getRandomSpeed = function() {
    // Get a random speed between min and max.  Adjust to make the range inclusive on the max end.
    return Math.floor(Math.random() * (GameAssets.getEnemySpeedMax(gameManager.currentLevel) - GameAssets.getEnemySpeedMin(gameManager.currentLevel) + 1)) +
        GameAssets.getEnemySpeedMin(gameManager.currentLevel);
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

        // Get the defined collision box offsets.
        var collisionBox = this.enemyAsset.collisionBox;
        // Add the collider to the player.
        this.collider = new Collider(collisionBox[0], collisionBox[1], collisionBox[2], collisionBox[3]);
    }
    else {
        // Log an error to the console.
        console.log("Enemey.reset, Invalid enemyAsset!");
        this.sprite = "";
        this.speed = 20;
        this.x = 0;
        this.y = 0;
        this.collider = null;
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

// Called to reset the enemies and prepare them for the next level.
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
        console.log("EnemyManager.updateEnemies: No enemies to render.");
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
    this.init(levelId);
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
        // The x and y coordinates are grid offsets.  The step x and y values
        // provide usable width and height information for each tile and provide
        // the placement information for the character within the grid system.
        // These values also define how far in each direction the character moves
        // on player input.
        this.stepX = GameAssets.getTileWidth();
        this.stepY = GameAssets.getTileHeight() - 3;
        this.x = this.character.startX * this.stepX;
        this.y = this.character.startY * this.stepY;

        // Get the defined collision box offsets.
        var collisionBox = GameAssets.getCollisionBox(this.alias);
        // Add the collider to the player.
        this.collider = new Collider(collisionBox[0], collisionBox[1], collisionBox[2], collisionBox[3]);
    }
    // Set default and safe values.
    else {
        this.sprite = "";
        this.stepX = 0;
        this.stepY = 0;
        this.x = 0;
        this.y = 0;
        this.collider = new Collider(0, 0, 0, 0);
        this.collider.Set(0, 0, 0, 0);
    }
    // Enable movement by default.
    this.enableInput = true;
}

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // In this version of the game, the player's movement is tile based, not delta based.  This function is not
    // technically needed in this model.
}

// Celebrate the winning level.
Player.prototype.completedLevel = function() {
    // Disable movement when the level up occurs.
    this.enableInput = false;
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

    // If the player is not allowed to move, do not process the keystrokes.
    if (this.enableInput == false) {
        return;
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (keyCode == "up") {
        this.y = this.y - this.stepY;
    } else if (keyCode == "down") {
        this.y = this.y + this.stepY;
    } else if (keyCode == "right") {
        this.x = this.x + this.stepX;
    } else if (keyCode == "left") {
        this.x = this.x - this.stepX;
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

Player.prototype.onCollision = function (enemy, levelId) {
    // Reset/initialize the player.
    this.init(levelId);
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

// Create the game manager object first.
var gameManager = new GameManager();

// Create an enemy manager.  This object keeps track of instantiated enemies
// and manages their update and render functions.
var enemyManager = new EnemyManager(gameManager.currentLevel);

// Create an enemy manager.  This object keeps track of instantiated enemies
// and manages their update and render functions.
var awardManager = new AwardManager(gameManager.currentLevel);

// Place the player object in a variable called player
var player = new Player(gameManager.currentLevel);

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
