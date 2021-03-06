// namespace Darkworld.Core {
//     export class DTileMap extends Phaser.Tilemap {
//         marker: DTileMarker;
//         blockingLayer: Phaser.TilemapLayer;
//         floorLayer: Phaser.TilemapLayer;
//         game: DGame;

//         constructor(game: DGame, key?: string, tileWidth?: number, tileHeight?: number, width?: number, height?: number) {
//             super(game, key, tileWidth, tileHeight, width, height);

//             this.game = game;
//             //this.map.addTilesetImage("tile_floor_forest");
//             //this.addTilesetImage("tile_floor_dungeon");
//             //this.addTilesetImage("tile_floor_dungeon_32x32");
//             //this.addTilesetImage("tile_floor_dungeon_64x64_fov");
//             this.addTilesetImage("cave");
//             //this.game.worldMap.addTilesetImage("tile_10");
//             this.floorLayer = this.createBlankLayer('floor', this.width, this.height, this.tileWidth, this.tileHeight);
//             this.blockingLayer = this.createBlankLayer('blocking', this.width, this.height, this.tileWidth, this.tileHeight);

//             debugger;
//             this.blockingLayer.key = "blockingLayer";
//             this.floorLayer.resizeWorld();

//             //fill map random
//             //let randomTileMapData = new Darkworld.Data.RandomTileMapData(this.game, 4, 13, 50, 38);
//             let cellularAutomataGenerator = new Darkworld.Data.CellularAutomata(this.game, this.width, this.height, 0.4, 3, 4);
//             let randomTileMapData = cellularAutomataGenerator.generateMap(true);

//             // let customMapDataGenerator = new Darkworld.Data.TestCustomMap();
//             // let randomTileMapData = customMapDataGenerator.generateMap(true);

            

//             //fill with floor first
//             for (var i = 0; i < randomTileMapData.length; i++) {
//                 for (var j = 0; j < randomTileMapData[i].length; j++) {
//                     //var tile = this.putDTile(new FloorTile(this.game, this.floorLayer, i, j));
//                     //var tile = this.putDDTile(new FloorTile(this.game, this.floorLayer, i, j), i, j);
//                     this.putTile(this.game.rnd.integerInRange(Darkworld.Utils.TileSetIndex.Cave.FloorStart, Darkworld.Utils.TileSetIndex.Cave.FloorEnd), i, j, this.floorLayer);//.alpha = 0;;
//                 }
//             }


//             // create blocking layer
//             for (var i = 0; i < randomTileMapData.length; i++) {
//                 for (var j = 0; j < randomTileMapData[i].length; j++) {
//                     if (randomTileMapData[i][j] == 1) {

//                         //this.layers[2].data[i][j] = new Darkworld.Core.StoneTile(this.blockingLayer, i, j, this.tileWidth, this.tileHeight);
//                         //var tile = this.putDTile(new StoneTile(this.game, this.blockingLayer, i, j));
//                         //var tile = this.putDDTile(new StoneTile(this.game, this.blockingLayer, i, j), i, j);
//                         var tile = this.putTile(Darkworld.Utils.TileSetIndex.Cave.Stone, i, j, this.blockingLayer);
//                     }
//                 }
//             }

//             this.setCollision([Darkworld.Utils.TileSetIndex.Cave.Stone],true,this.blockingLayer,true);

//             this.enableTileMarker();
            
//             this.game.physics.p2.convertTilemap(this, this.blockingLayer);
//         }

//         putDTile(tile: DTile) {
//             if (tile instanceof StoneTile) {
//                 return this.putStoneTile(tile, tile.x, tile.y, tile.layer);
//             } else if (tile instanceof FloorTile) {
//                 return this.putFloorTile(tile, tile.x, tile.y, tile.layer);
//             } else if (tile instanceof FovTile) {
//                 return this.putFovTile(tile, tile.x, tile.y, tile.layer);
//             }
//         }

//         public putDDTile(tile: DTile, x: number, y: number) {

//             var layerIndex = this.getLayer(tile.layer);

//             if (x >= 0 && x < this.layers[layerIndex].width && y >= 0 && y < this.layers[layerIndex].height) {
//                 var index: any;


//                 index = tile.index;

//                 if (this.hasTile(x, y, tile.layer)) {
//                     this.layers[layerIndex].data[y][x].copy(tile);
//                 } else {
//                     this.layers[layerIndex].data[y][x] = tile;
//                 }


//                 if (this.collideIndexes.indexOf(index) > -1) {
//                     this.layers[layerIndex].data[y][x].setCollision(true, true, true, true);
//                 } else {
//                     this.layers[layerIndex].data[y][x].resetCollision();
//                 }

//                 this.layers[layerIndex].dirty = true;

//                 this.calculateFaces(layerIndex);

//                 return this.layers[layerIndex].data[y][x];
//             }
//             return null;
//         }

//         private putStoneTile(tile: StoneTile, x: number, y: number, layer: Phaser.TilemapLayer) {

//             var layerIndex = this.getLayer(layer);

//             if (x >= 0 && x < this.layers[layerIndex].width && y >= 0 && y < this.layers[layerIndex].height) {
//                 var index: any;

//                 if (tile instanceof DTile) {
//                     index = tile.index;

//                     if (this.hasTile(x, y, layer)) {
//                         this.layers[layerIndex].data[y][x].copy(tile);
//                     } else {
//                         this.layers[layerIndex].data[y][x] = tile;
//                     }
//                 } else {
//                     index = tile;

//                     if (this.hasTile(x, y, layer)) {
//                         this.layers[layerIndex].data[y][x].index = index;
//                     } else {
//                         this.layers[layerIndex].data[y][x] = tile;
//                     }
//                 }

//                 if (this.collideIndexes.indexOf(index) > -1) {
//                     this.layers[layerIndex].data[y][x].setCollision(true, true, true, true);
//                 } else {
//                     this.layers[layerIndex].data[y][x].resetCollision();
//                 }

//                 this.layers[layerIndex].dirty = true;

//                 this.calculateFaces(layerIndex);

//                 return this.layers[layerIndex].data[y][x];
//             }
//             return null;
//         }

//         private putFloorTile(tile: FloorTile, x: number, y: number, layer: Phaser.TilemapLayer) {

//             var layerIndex = this.getLayer(layer);

//             if (x >= 0 && x < this.layers[layerIndex].width && y >= 0 && y < this.layers[layerIndex].height) {
//                 var index: any;

//                 if (tile instanceof DTile) {
//                     index = tile.index;

//                     if (this.hasTile(x, y, layer)) {
//                         this.layers[layerIndex].data[y][x].copy(tile);
//                     } else {
//                         this.layers[layerIndex].data[y][x] = tile;
//                     }
//                 } else {
//                     index = tile;

//                     if (this.hasTile(x, y, layer)) {
//                         this.layers[layerIndex].data[y][x].index = index;
//                     } else {
//                         this.layers[layerIndex].data[y][x] = tile;
//                     }
//                 }

//                 if (this.collideIndexes.indexOf(index) > -1) {
//                     this.layers[layerIndex].data[y][x].setCollision(true, true, true, true);
//                 } else {
//                     this.layers[layerIndex].data[y][x].resetCollision();
//                 }

//                 this.layers[layerIndex].dirty = true;

//                 this.calculateFaces(layerIndex);

//                 return this.layers[layerIndex].data[y][x];
//             }
//             return null;
//         }

//         private putFovTile(tile: FovTile, x: number, y: number, layer: Phaser.TilemapLayer) {

//             var layerIndex = this.getLayer(layer);

//             if (x >= 0 && x < this.layers[layerIndex].width && y >= 0 && y < this.layers[layerIndex].height) {
//                 var index: any;

//                 if (tile instanceof DTile) {
//                     index = tile.index;

//                     if (this.hasTile(x, y, layer)) {
//                         this.layers[layerIndex].data[y][x].copy(tile);
//                     } else {
//                         this.layers[layerIndex].data[y][x] = tile;
//                     }
//                 } else {
//                     index = tile;

//                     if (this.hasTile(x, y, layer)) {
//                         this.layers[layerIndex].data[y][x].index = index;
//                     } else {
//                         this.layers[layerIndex].data[y][x] = tile;
//                     }
//                 }

//                 if (this.collideIndexes.indexOf(index) > -1) {
//                     this.layers[layerIndex].data[y][x].setCollision(true, true, true, true);
//                 } else {
//                     this.layers[layerIndex].data[y][x].resetCollision();
//                 }

//                 this.layers[layerIndex].dirty = true;

//                 this.calculateFaces(layerIndex);

//                 return this.layers[layerIndex].data[y][x];
//             }
//             return null;
//         }

//         /* Private Methods */
//         private updateMarker() {
//             if (this.game.input.activePointer.isDown) {
//                 debugger;
//                 var currentTile = this.getTileWorldXY(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, this.tileWidth, this.tileHeight, this.blockingLayer) as Darkworld.Core.DTile;
//                 if (currentTile != null) {
//                     this.marker.x = currentTile.x * this.tileWidth;
//                     this.marker.y = currentTile.y * this.tileHeight;



//                     //console.log("x:" + currentTile.x + ", y:" + currentTile.y + ", isVisible:" + currentTile.isVisible + ", alpha:" + currentTile.alpha + ", isTweening" + currentTile.isTweening);
//                     console.log(currentTile.name);
//                 }
//             }
//         }


//         /* Public Methods */
//         enableTileMarker() {
//             this.marker = new DTileMarker(this.game);
//             this.game.input.addMoveCallback(this.updateMarker, this);
//         }



//         putTile(tile: any, x: number, y: number, layer?: any): Darkworld.Core.DTile {
//             if (tile === null) {
//                 return this.removeTile(x, y, layer) as DTile;
//             }

//             layer = this.getLayer(layer);

//             if (x >= 0 && x < this.layers[layer].width && y >= 0 && y < this.layers[layer].height) {
//                 var index: any;

//                 if (tile instanceof DTile) {
//                     index = tile.index;

//                     if (this.hasTile(x, y, layer)) {
//                         this.layers[layer].data[y][x].copy(tile);
//                     } else {
//                         this.layers[layer].data[y][x] = tile;
//                     }
//                 } else {
//                     index = tile;

//                     if (this.hasTile(x, y, layer)) {
//                         this.layers[layer].data[y][x].index = index;
//                     } else {
//                         this.layers[layer].data[y][x] = tile;
//                     }
//                 }

//                 if (this.collideIndexes.indexOf(index) > -1) {
//                     this.layers[layer].data[y][x].setCollision(true, true, true, true);
//                 } else {
//                     this.layers[layer].data[y][x].resetCollision();
//                 }

//                 this.layers[layer].dirty = true;

//                 this.calculateFaces(layer);

//                 return this.layers[layer].data[y][x];
//             }
//             return null;
//         }

//         getOpenCellPoint(): Phaser.Point {
//             let openCellPoint: Phaser.Point;
//             let openCellFound = false;
//             while (!openCellFound) {

//                 var randomX = this.game.rnd.integerInRange(0, this.width - 1);
//                 var randomY = this.game.rnd.integerInRange(0, this.height - 1);


//                 let randomTile = this.getTile(randomX, randomY, this.blockingLayer);
//                 debugger;
//                 if (randomTile == null) {
//                     let openCell = this.getTile(randomX, randomY, this.floorLayer);
//                     openCellFound = true; //we found an open cell
//                     openCellPoint = new Phaser.Point(openCell.worldX + openCell.width / 2, openCell.worldY + openCell.height / 2);
//                 }
//             }

//             return openCellPoint;
//         }

//         getDTilesArray(layer: Phaser.TilemapLayer): Darkworld.Core.DTile[] {
//             let tiles: Darkworld.Core.DTile[] = [];
//             for (var i = 0; i < this.width; i++) {
//                 for (var j = 0; j < this.height; j++) {
//                     tiles.push(this.getTile(i, j, layer.name) as Darkworld.Core.DTile);
//                 }
//             }

//             return tiles;
//         }

//         update() {
//             //Check tile show/hide
//             var self = this;
//             // this.layers.forEach(function(layer){

//             //     var tiles = self.getDTilesArray(layer) as Darkworld.Core.DTile[];
//             //     tiles.forEach(tile => {



//             //         if(tile.show && tile.alpha == 0){
//             //             //console.log("showing");
//             //             self.game.add.tween(tile).to({ alpha: 1 }, 250, "Linear", true);
//             //         }else if(!tile.show && tile.alpha == 1){
//             //             //console.log("hiding");
//             //             self.game.add.tween(tile).to({ alpha: 0 }, 250, "Linear", true);

//             //         }
//             //     });
//             //     layer.dirty = true;
//             // });

//         }
//     }
// }