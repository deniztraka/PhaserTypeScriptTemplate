namespace Darkworld {

    export class Preloader extends Phaser.State {
        preloadBar: Phaser.Sprite = null;

        preload() {
            this.game.time.advancedTiming = true;

            this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.spritesheet('tile_floor_forest', './../img/tiles/EasyTiles.png', 16, 16);
        }

        create() {
            this.game.state.start("Main");
        }
    }
}
