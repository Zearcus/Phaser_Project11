import Phaser from "phaser";

export default class Preload extends Phaser.Scene{
    constructor(){
        super('PreloadScene');
    }

    preload(){
        this.load.image("ground", "../assets/ground.png");
        this.load.image("obs", "../assets/32x32Prototypes.png")
        this.load.tilemapTiledJSON('map', "../assets/map.json");
        this.load.image("p1", "../assets/tile_Pillar.png")
        this.load.image("p2", "../assets/tile_Pillar2.png")
        this.load.image("p3", "../assets/tile_Pillar3.png")
        this.load.image('player', '../assets/assets/player/player.png');
        this.load.image('ennemy', '../assets/assets/ennemy/turret.png')
        this.load.image('bullet', '../assets/assets/bullet/bullet.png');
        this.load.image('key', '../assets/assets/end_game/key.png');
        this.load.spritesheet('door', '../assets/assets/end_game/door.png', { frameWidth: 95, frameHeight: 96});
    }

    create(){
        this.scene.start('PlayScene');
    }
}
