/* assets.js
 * This file contains the list of assets loaded during the game as well as
 * load time and run time attributes required of the assets.that are loaded during the game.
 */

var GameAssets = {
    "level": { "totalRows":6, "totalColumns":5, "tileWidth":101, "tileHeight": 83 },
    "tiles": [
        { "alias": "stone", "image": "images/stone-block.png", "startX":0, "startY":0 },
        { "alias": "water", "image": "images/water-block.png", "startX":0, "startY":0 },
        { "alias": "grass", "image": "images/grass-block.png", "startX":0, "startY":0 },
        { "alias": "enemy", "image": "images/enemy-bug.png", "startX":0, "startY":0 },
    ],
    "characters": [
        { "alias": "boy", "image": "images/char-boy.png", "startX":2, "startY":5, "deltaX":101, "deltaY": 83 },
    ],
    "awards": [
        { "alias": "blue-gem", "image": "images/Gem Blue.png", "startX":0, "startY":0 },
        { "alias": "green-gem", "image": "images/Gem Green.png", "startX":0, "startY":0 },
        { "alias": "orange-gem", "image": "images/Gem Orange.png", "startX":0, "startY":0 },
        { "alias": "key", "image": "images/Heart.png", "startX":0, "startY":0 },
        { "alias": "heart", "image": "images/Key.png", "startX":0, "startY":0 },
    ],
    "obstacles": [
        { "alias": "rock", "image": "images/Rock.png", "startX":200, "startY":400 },
    ],
};

GameAssets.getRows = function() {
    console.log("GameAssets.getRows: ", GameAssets.level.totalRows);
    return GameAssets.level.totalRows;
}

GameAssets.getColumns = function() {
    console.log("GameAssets.getColumns: ", GameAssets.level.totalColumns);
    return GameAssets.level.totalColumns;
}

GameAssets.getTileWidth = function() {
    console.log("GameAssets.getTileWidth: ", GameAssets.level.tileWidth);
    return GameAssets.level.tileWidth;
}

GameAssets.getTileHeight = function() {
    console.log("GameAssets.getTileHeight: ", GameAssets.level.tileHeight);
    return GameAssets.level.tileHeight;
}

GameAssets.getCharacter = function(alias) {

    for(var asset in GameAssets.characters) {
        if (GameAssets.characters[asset].alias == alias) {
            //console.log(GameAssets.characters[asset]);
            return GameAssets.characters[asset];
        }
    }
    console.log("GameAssets.getCharacter, Unable to find character by alias: ", alias)
    return null;
}

GameAssets.getTile = function(alias) {

    for(var asset in GameAssets.tiles) {
        if (GameAssets.tiles[asset].alias == alias) {
            console.log(GameAssets.tiles[asset]);
            return GameAssets.tiles[asset];
        }
    }
    console.log("GameAssets.getTile, Unable to find level tile by alias: ", alias)
    return null;
}