import Phaser from "phaser";

export default class Preload extends Phaser.Scene{
    constructor(){
        super('PreloadScene');
    }

    preload(){
        this.load.image("ground", "../assets/ground.png");
        this.load.image("obs", "../assets/32x32Prototypes.png")
        this.load.tilemapTiledJSON('map', "../assets/map.json");
        this.load.image('player', '../assets/assets/player/player.png');
        this.load.image('ennemy', '../assets/assets/ennemy/turret.png')
        this.load.image('bullet', '../assets/assets/bullet/bullet.png');
    }

    create(){
        this.scene.start('PlayScene');
    }
}
