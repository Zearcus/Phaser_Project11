import Phaser from "phaser";

export default class Preload extends Phaser.Scene{
    constructor(){
        super('PreloadScene');
    }

    preload(){
        this.load.image("ground", "../assets/ground.png");
        this.load.image("obs", "../assets/32x32Prototypes.png")
        this.load.tilemapTiledJSON('map', "../assets/map.json");
        this.load.image('player', '../assets/assets/player/movements/idle01.png');
        this.load.image('bullet', '../assets/assets/collectibles/diamond_big_01.png');
    }

    create(){
        this.scene.start('PlayScene');
    }
}
