var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Darkworld;
(function (Darkworld) {
    var Preloader = /** @class */ (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.preloadBar = null;
            return _this;
        }
        Preloader.prototype.preload = function () {
            this.game.time.advancedTiming = true;
            this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.spritesheet('tile_floor_forest', './../img/tiles/EasyTiles.png', 16, 16);
        };
        Preloader.prototype.create = function () {
            this.game.state.start("Main");
        };
        return Preloader;
    }(Phaser.State));
    Darkworld.Preloader = Preloader;
})(Darkworld || (Darkworld = {}));
//# sourceMappingURL=Preloader.js.map