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
    return Math.floor(Math.random () * (this.enemyAsset.maxRow - this.enemyAsset.minRow + 1)) +  this.enemyAsset.minRow;
}

// Calculates and returns a speed for the enemy's movement.
Enemy.prototype.getRandomSpeed = function() {
    // Get a random speed between min and max.  Adjust to make the range inclusive on the max end.
    return Math.floor(Math.random () * (this.enemyAsset.speedMax - this.enemyAsset.speedMin + 1)) +  this.enemyAsset.speedMin;
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
        console.log("y: ", this.y);
        // Get a random speed.
        this.speed = this.getRandomSpeed();
        console.log("this.speed: ", this.speed);
    }
    else {
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(alias) {

    // Get the character by alias name.
    var character = GameAssets.getCharacter(alias);

    if (character != null) {
        // Assign the sprite name.
        this.sprite = character.image;
        // The x and y coordinates are grid offsets.  The delta x and y coordinates
        // provide usable width and height information for each tile and provide
        // the placement information for the character within the grid system.
        this.deltaX = character.deltaX;
        this.deltaY = character.deltaY;
        this.x = character.startX * this.deltaX;
        this.y = character.startY * this.deltaY;
    }
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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
    
    // Make sure that the character doesn't run off of the screen.
    if (this.x < 0) {
        this.x = 0;
    }
    // Moving in the x direction moves the character to the next column.
    // Calculations are performed on 0-based column indices, thus the - 1.
    else if (this.x > ((GameAssets.getColumns() - 1) * GameAssets.getTileWidth())) {
        this.x = (GameAssets.getColumns() - 1) * GameAssets.getTileWidth();
    }
    
    if (this.y < 0) {
        this.y = 0;
    }
    // Moving in the y direction moves the character to the next row.
    // Calculations are performed on 0-based row indices, thus the - 1.
    else if (this.y > ((GameAssets.getRows() - 1) * GameAssets.getTileHeight())) {
        this.y = (GameAssets.getRows() - 1) * GameAssets.getTileHeight();
    }
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    //this.x = 0; this.y = 0;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = new Array();
//allEnemies.push(new Enemy("enemy-bug"));

// On game start, add an array to each row.  They'll move at random speeds.
allEnemies.push(new Enemy("enemy-bug", 1));
allEnemies.push(new Enemy("enemy-bug", 2));
allEnemies.push(new Enemy("enemy-bug", 3));

// Place the player object in a variable called player

var player = new Player("boy");

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
