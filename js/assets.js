/* assets.js
 * This file contains the list of assets loaded during the game as well as
 * load time and run time attributes required of the assets.that are loaded during the game.
 */

var GameAssets = {
    "level": { "totalRows":6, "totalColumns":5, "totalEnemyRows":3, "winningRow":0, "tileWidth":101, "tileHeight": 83, "winningBlinkCount":5, "losingBlinkCount":3 },
    "levelConfig" : [
        {"levelMinRange":0, "character":"boy", "spawnSpeed":750, "enemyCount":2, "enemyMinRow":1, "enemyMaxRow":1, "awardMinRow":1, "awardMaxRow":5, "enemySpeedMin":10, "enemySpeedMax": 30, "totalAwards":1 },
        {"levelMinRange":2, "character":"cat", "spawnSpeed":750, "enemyCount":3, "enemyMinRow":1, "enemyMaxRow":2, "awardMinRow":1, "awardMaxRow":5, "enemySpeedMin":20, "enemySpeedMax": 40, "totalAwards":2 },
        {"levelMinRange":5, "character":"pink", "spawnSpeed":750, "enemyCount":4, "enemyMinRow":1, "enemyMaxRow":3, "awardMinRow":1, "awardMaxRow":5, "enemySpeedMin":30, "enemySpeedMax": 60, "totalAwards":3 },
        {"levelMinRange":8, "character":"princess", "spawnSpeed":750, "enemyCount":5, "enemyMinRow":1, "enemyMaxRow":3, "awardMinRow":1, "awardMaxRow":5, "enemySpeedMin":30, "enemySpeedMax": 60, "totalAwards":4 },
        {"levelMinRange":12, "character":"horn", "spawnSpeed":750, "enemyCount":6, "enemyMinRow":1, "enemyMaxRow":3, "awardMinRow":1, "awardMaxRow":5, "enemySpeedMin":30, "enemySpeedMax": 60, "totalAwards":5 }
    ],
    "tiles": [
        { "alias": "stone", "image": "images/stone-block.png", "startX":0, "startY":0 },
        { "alias": "water", "image": "images/water-block.png", "startX":0, "startY":0 },
        { "alias": "grass", "image": "images/grass-block.png", "startX":0, "startY":0 },
        { "alias": "enemy", "image": "images/enemy-bug.png", "startX":0, "startY":0 }
    ],
    "characters": [
        { "alias": "boy", "image": "images/char-boy.png", "startX":2, "startY":5, "deltaX":101, "deltaY": 63, "collisionBox": [ 0, 52, 101, 88 ] },
        { "alias": "cat", "image": "images/char-cat-girl.png", "startX":2, "startY":5, "deltaX":101, "deltaY": 63, "collisionBox": [ 0, 52, 101, 88 ] },
        { "alias": "horn", "image": "images/char-horn-girl.png", "startX":2, "startY":5, "deltaX":101, "deltaY": 63, "collisionBox": [ 0, 52, 101, 88 ] },
        { "alias": "pink", "image": "images/char-pink-girl.png", "startX":2, "startY":5, "deltaX":101, "deltaY": 63, "collisionBox": [ 0, 52, 101, 88  ] },
        { "alias": "princess", "image": "images/char-princess-girl.png", "startX":2, "startY":5, "deltaX":101, "deltaY": 63, "collisionBox": [ 0, 52, 101, 88 ] }
    ],
    "enemies": [
        { "alias": "enemy-bug", "image": "images/enemy-bug.png", "collisionBox": [ 0, 76, 101, 71 ] }
    ],
    "awards": [
        { "alias": "blue-gem", "image": "images/Gem Blue.png", "points": 1, "deltaX":101, "deltaY": 63, "collisionBox": [ 0, 58, 101, 102 ] },
        { "alias": "green-gem", "image": "images/Gem Green.png", "points": 3, "deltaX":101, "deltaY": 63, "collisionBox": [ 0, 58, 101, 102 ] },
        { "alias": "orange-gem", "image": "images/Gem Orange.png", "points": 5, "deltaX":101, "deltaY": 63, "collisionBox": [ 0, 58, 101, 102 ] },
        { "alias": "key", "image": "images/Key.png", "points": 10, "deltaX":101, "deltaY": 63, "collisionBox": [ 0, 58, 101, 102 ] },
    ],
    "lives": [
        { "alias": "heart", "image": "images/Heart.png" }
    ],
    "obstacles": [
        { "alias": "rock", "image": "images/Rock.png", "startX":200, "startY":400 }
    ],
    "meters": [
        { "alias":"currentLevel", "text": "Current Level: ", "x":5,   "y":560, "max":125 },
        { "alias":"gamesPlayed",  "text": "Games Played: ",  "x":130, "y":560, "max":125 },
        { "alias":"playerWins",   "text": "Player Wins: ",   "x":255, "y":560, "max":125 },
        { "alias":"enemyWins",    "text": "Enemy Wins: ",    "x":375, "y":560, "max":125 },
        { "alias":"totalScore",   "text": "Total Score: ",   "x":100, "y":580, "max":125 },
        { "alias":"levelScore",   "text": "Level Score: ",   "x":280, "y":580, "max":125 }
    ]
};

/*
 * Level building asset access functions.
 */

GameAssets.getRows = function() {
    //console.log("GameAssets.getRows: ", GameAssets.level.totalRows);
    return GameAssets.level.totalRows;
}

GameAssets.getColumns = function() {
    //console.log("GameAssets.getColumns: ", GameAssets.level.totalColumns);
    return GameAssets.level.totalColumns;
}

GameAssets.getEnemyRows = function() {
    //console.log("GameAssets.getEnemyRows: ", GameAssets.level.totalEnemyRows);
    return GameAssets.level.totalEnemyRows;
}

GameAssets.getWinningRow = function() {
    //console.log("GameAssets.getWinningRow: ", GameAssets.level.winningRow);
    return GameAssets.level.winningRow;
}

GameAssets.getTileWidth = function() {
    //console.log("GameAssets.getTileWidth: ", GameAssets.level.tileWidth);
    return GameAssets.level.tileWidth;
}

GameAssets.getTileHeight = function() {
    //console.log("GameAssets.getTileHeight: ", GameAssets.level.tileHeight);
    return GameAssets.level.tileHeight;
}

GameAssets.getWinningBlinkCount = function() {
    //console.log("GameAssets.getWinningBlinkCount: ", GameAssets.level.winningBlinkCount);
    return GameAssets.level.winningBlinkCount;
}

/*
 * Level configuration and behavior asset access functions.
 */

GameAssets.getIndexForLevel = function(levelid) {

    // Always return a valid index.
    var returnLevel = 0;

    // Loop through the level config array and find the config entry that corresponds with the
    // level id received.  Level config entries are defined by the minimum level.
    for(var levelIndex in GameAssets.levelConfig) {
        if (levelid >= GameAssets.levelConfig[levelIndex].levelMinRange) {
            // Update the return index.
            returnLevel = levelIndex;
        }
    }

    return returnLevel;
}

GameAssets.getLevelMaxRange = function(levelId) {
    //console.log("GameAssets.getLevelMaxRange: ", GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].levelMaxRange);
    return GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].levelMaxRange;
}

GameAssets.getLevelCharacter = function(levelId) {
    //console.log("GameAssets.getLevelCharacter: ", GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].character);
    return GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].character;
}

GameAssets.getLevelEnemyCount = function(levelId) {
    //console.log("GameAssets.getLevelEnemyCount: ", GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].enemyCount);
    return GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].enemyCount;
}

GameAssets.getSpawnSpeed = function(levelId) {
    //console.log("GameAssets.getSpawnSpeed: ", GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].spawnSpeed);
    return GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].spawnSpeed;
}

GameAssets.getEnemyMinRow = function(levelId) {
    //console.log("GameAssets.getEnemyMinRow: ", GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].enemyMinRow);
    return GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].enemyMinRow;
}

GameAssets.getEnemyMaxRow = function(levelId) {
    //console.log("GameAssets.getEnemyMaxRow: ", GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].enemyMaxRow);
    return GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].enemyMaxRow;
}

GameAssets.getEnemySpeedMin = function(levelId) {
    //console.log("GameAssets.getEnemySpeedMin: ", GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].enemySpeedMin);
    return GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].enemySpeedMin;
}

GameAssets.getEnemySpeedMax = function(levelId) {
    //console.log("GameAssets.getEnemySpeedMax: ", GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].enemySpeedMax);
    return GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].enemySpeedMax;
}

GameAssets.getAwardCount = function(levelId) {
    return GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].totalAwards;
}

/*
 * Character asset access functions.
 */

GameAssets.getCharacter = function(alias) {

    for(var asset in GameAssets.characters) {
        if (GameAssets.characters[asset].alias == alias) {
            //console.log(GameAssets.characters[asset]);
            return GameAssets.characters[asset];
        }
    }
    // Log an error to the console.
    console.log("GameAssets.getCharacter, Unable to find character by alias: ", alias)
    return null;
}

GameAssets.getDeltaX = function(alias) {
    var character = this.getCharacter(alias);
    if (character != null) {
        return character.deltaX;
    }
    return 0;
}

GameAssets.getDeltaY = function(alias) {
    var character = this.getCharacter(alias);
    if (character != null) {
        return character.deltaY;
    }
    return 0;
}

GameAssets.getCollisionBox = function(alias) {

    var character = this.getCharacter(alias);
    if (character != null) {
        return character.collisionBox;
    }
    return [0, 0, 0, 0];
}


/*
 * Enemy asset access functions.
 */

GameAssets.getEnemy = function(alias) {

    // Find the enemy asset by alias name.
    for(var asset in GameAssets.enemies) {
        if (GameAssets.enemies[asset].alias == alias) {
            //console.log(GameAssets.enemies[asset]);
            return GameAssets.enemies[asset];
        }
    }
    // Log an error to the console.
    console.log("GameAssets.getEnemy, Unable to find enemy by alias: ", alias)
    return null;
}

/*
 * Game level tile asset access functions.
 */

GameAssets.getTile = function(alias) {

    for(var asset in GameAssets.tiles) {
        if (GameAssets.tiles[asset].alias == alias) {
            //console.log(GameAssets.tiles[asset]);
            return GameAssets.tiles[asset];
        }
    }
    // Log an error to the console.
    console.log("GameAssets.getTile, Unable to find level tile by alias: ", alias)
    return null;
}

/*
 * Meter asset access functions.
 */
GameAssets.getMeter = function(alias) {

    for(var asset in GameAssets.meters) {
        if (GameAssets.meters[asset].alias == alias) {
            //console.log(GameAssets.meters[asset]);
            return GameAssets.meters[asset];
        }
    }
    // Log an error to the console.
    console.log("GameAssets.meters, Unable to find meter by alias: ", alias)
    return null;
}

/*
 * Meter asset access functions.
 */
GameAssets.getAward = function(alias) {

    for(var asset in GameAssets.awards) {
        if (GameAssets.awards[asset].alias == alias) {
            //console.log(GameAssets.awards[asset]);
            return GameAssets.awards[asset];
        }
    }
    // Log an error to the console.
    console.log("GameAssets.meters, Unable to find meter by alias: ", alias)
    return null;
}

GameAssets.getAward = function(index) {

    // Return the award specified.
    if (index < GameAssets.awards.length) {
        return GameAssets.awards[index];
    }

    // Log an error to the console.
    console.log("GameAssets.getAward, Invalid award index: ", index)
    // return the default.
    return GameAssets.awards[0];
}

GameAssets.getTotalAwards = function() {
    return GameAssets.awards.length;
}

GameAssets.getAwardPoints = function(levelId) {
    return GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].points;
}

GameAssets.getAwardMinRow = function(levelId) {
    //console.log("GameAssets.getAwardMinRow: ", GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].awardMinRow);
    return GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].awardMinRow;
}

GameAssets.getAwardMaxRow = function(levelId) {
    //console.log("GameAssets.getAwardMaxRow: ", GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].awardMaxRow);
    return GameAssets.levelConfig[GameAssets.getIndexForLevel(levelId)].awardMaxRow;
}

