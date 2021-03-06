namespace Darkworld.States {

    export class Preloader extends Phaser.State {
        preloadBar: Phaser.Sprite = null;

        preload() {            
            this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.spritesheet('tile_floor_forest', './../img/tiles/EasyTiles.png', 16, 16);
            this.load.spritesheet('tile_10', './../img/tiles/10.png', 16, 16);
            this.load.spritesheet('tile_floor_dungeon', './../img/tiles/floor_broken.png', 16, 16);
            this.load.spritesheet('tile_floor_dungeon_32x32', './../img/tiles/floor_broken_32x32.png', 32, 32);
            this.load.spritesheet('tile_floor_dungeon_64x64', './../img/tiles/floor_broken_64x64.png', 64, 64);
            this.load.spritesheet('tile_floor_dungeon_64x64_fov', './../img/tiles/floor_broken_64x64_fov.png', 64, 64);
            this.load.spritesheet('cave', './../img/tiles/cave_64x64.jpg', 64, 64);
            this.load.spritesheet('chests', './../img/sprites/chest_32x32.png', 32, 32);
            this.load.image('playerImg', './../img/player.png');
            this.load.image('picaxeIcon', './../img/mouseIcons/pickaxe.png');
            this.load.image('defaultIcon', './../img/mouseIcons/default.png');
            this.load.image('handIcon', './../img/mouseIcons/hand.png');
        }

        create() {
            this.game.state.start("Main");
        }
    }
}
