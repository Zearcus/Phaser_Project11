import Phaser from "phaser";

import { ConvertXCartesianToIsometric, ConvertYCartesianToIsometric } from "../index.js";
class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');

        this.bulletGroup;
    }
    

    create() {
        const map = this.createMap();
        const layers = this.createLayer(map);
        

        this.player = this.createPlayer();
        this.ennemy = this.createEnnemy();
        this.playerSpeed = 200;

        // collider physics
        this.physics.add.collider(this.player, layers.platformsColliders);
        this.physics.add.collider(this.ennemy, this.player);
        this.physics.add.collider(this.player, this.key);
        this.physics.add.collider(this.player, this.door);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player);

        //ennemy part
        this.ennemy.scale = 0.80;
        this.ennemy.setImmovable();

        //key part
        this.key = this.physics.add.sprite(-80,175, 'key');
        this.key.scale = 0.10;

        //door part
        this.door = this.physics.add.sprite(75,50, 'door');

        this.anims.create({ // open part
            key: 'open',
            frames: this.anims.generateFrameNumbers('door', { start: 4, end: 10 }),
            frameRate: 4,
        });

        this.check = false;
        this.win = false;

        // key config
        this.playerInput = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            pick: Phaser.Input.Keyboard.KeyCodes.E
        })

        this.bulletGroup = new bulletGroup(this);

        //this.physics.add.overlap(this.player, this.key, this.collectStar, null, this);
    }

    // map part initialisation

    createMap() {
        const map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 16 });
        console.log(map);
        map.addTilesetImage("isoTile", "ground");
        map.addTilesetImage("tile_Pillar", "p1");
        map.addTilesetImage("tile_Pillar2", "p2");
        map.addTilesetImage("tile_Pillar3", "p3");
        return map;
    }
    createLayer(map) {
        const tileset = map.getTileset('isoTile');
        const tileset2 = map.getTileset('tile_Pillar');
        const tileset3 = map.getTileset('tile_Pillar2');
        const tileset4 = map.getTileset('tile_Pillar3');
        const ground = map.createLayer("bottom", tileset);
        const block = map.createLayer("block", [tileset, tileset2, tileset3, tileset4]);
        //const obstacle=map.createFromObjects('colliderSize');

        let colliders = []
        // map.filterObjects('collider', (obj) => obj.name === 'c').forEach((c) => (
        //     this.add.rectangle(
        //         ConvertXCartesianToIsometric(c.x, c.y)-25,
        //         ConvertYCartesianToIsometric(c.x, c.y)+5,
        //         c.width,
        //         c.height,
        //         { angle: 1.05, label: "collision", isStatic: true }
        //     )
        // ));
        // map.filterObjects('border', (obj) => obj.name === 'b1').forEach((b1) => (
        //     this.add.rectangle(
        //         ConvertXCartesianToIsometric(b1.x, b1.y)-400,
        //         ConvertYCartesianToIsometric(b1.x, b1.y)+200,
        //         b1.width,
        //         b1.height+100,
        //         { angle: 1.1, label: "collision", isStatic: true }
        //     )
        // ));
        // map.filterObjects('border', (obj) => obj.name === 'b2').forEach((b2) => (
        //     this.add.rectangle(
        //         ConvertXCartesianToIsometric(b2.x, b2.y)+330,
        //         ConvertYCartesianToIsometric(b2.x, b2.y)+200,
        //         b2.width+100,
        //         b2.height,
        //         { angle: 0.48, label: "collision", isStatic: true }
        //     )
        // ));
        // map.filterObjects('border', (obj) => obj.name === 'b3').forEach((b3) => (
        //     this.add.rectangle(
        //         ConvertXCartesianToIsometric(b3.x, b3.y)-380,
        //         ConvertYCartesianToIsometric(b3.x, b3.y)+210,
        //         b3.width,
        //         b3.height+200,
        //         { angle: 1.1, label: "collision", isStatic: true }
        //     )
        // ));
        // map.filterObjects('border', (obj) => obj.name === 'b4').forEach((b4) => (
        //     this.add.rectangle(
        //         ConvertXCartesianToIsometric(b4.x, b4.y)+400,
        //         ConvertYCartesianToIsometric(b4.x, b4.y)+180,
        //         b4.width+140,
        //         b4.height,
        //         { angle: 0.45, label: "collision", isStatic: true }
        //     )
        // ));
        // map.filterObjects('pilier', (obj) => obj.name === 'p').forEach((p) => (
        //     this.add.rectangle(
        //         ConvertXCartesianToIsometric(p.x, p.y)-10,
        //         ConvertYCartesianToIsometric(p.x, p.y),
        //         p.width,
        //         p.height,
        //         { angle: 0.9, label: "collision", isStatic: true }
        //     )
        // ));


        return { ground, block };

    }

    // character initilisation

    createPlayer() {
        let player = this.physics.add.sprite(30,720, 'player');
        return player;
    }

    createEnnemy() {
        let lifPoint = 3 ;
        let ennemy = this.physics.add.sprite(400, 250, 'ennemy');

        return ennemy;
    }




    update() {


        
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);


        if (this.playerInput.left.isDown) { // left control
            this.player.flipX = 1;
            this.player.setVelocityX(-this.playerSpeed);
            if(this.playerInput.shift.isDown){
                this.player.flipX = 1;
                this.player.setVelocityX(-this.playerSpeed * 2);
            }
        } 
        else if (this.playerInput.right.isDown) { // right control
            this.player.flipX = 0;
            this.player.setVelocityX(this.playerSpeed);
            if(this.playerInput.shift.isDown){
                this.player.flipX = 0;
                this.player.setVelocityX(this.playerSpeed * 2);
            }
            
        }
        if (this.playerInput.up.isDown) { // up control
            this.player.setVelocityY(-this.playerSpeed);
            if(this.playerInput.shift.isDown){
                this.player.setVelocityY(-this.playerSpeed * 2);
            }
        } 
        else if (this.playerInput.down.isDown) { // down control
            this.player.setVelocityY(this.playerSpeed);
            if(this.playerInput.shift.isDown){
                this.player.setVelocityY(this.playerSpeed * 2);
            }
        }  
        
        if(this.ennemy.lifePoint != 10){ // shoot condition
            this.shootBullet();
        }

        // collect key condition
        if(this.playerInput.pick.isDown && this.check == false){ // open door condition
            this.physics.add.overlap(this.player, this.key, this.collectStar, null, this);
            this.door.anims.play('open', true);
            this.check = true;
        }


        //win condition
        if(this.check == true && this.win == false){ // beginning win condition
            this.check = false;
            this.physics.add.overlap(this.player, this.door, this.destroyDoor, null, this);
            
            if(this.door.body.disableBody == true){
                this.scene.restart();
            }

        }




       
    }

    shootBullet(){ // shoot function
        this.bulletGroup.fireBullet(this.ennemy.x - 28, this.ennemy.y + 25);
    }

    collectStar (player, key){ // collect function
        
        key.disableBody(true, true);
        return key;
    }

    destroyDoor (player, door){ // collect function
        this.door.body.disable;
        door.disableBody(true, true);
        player.disableBody(true, true);
        return door, player, this.door;
    }   
}

class bulletGroup extends Phaser.Physics.Arcade.Group {

    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Bullet,
            frameQuantity: 1,
            active: false,
            visible: false,
            key: 'bullet'
        })
    }

    fireBullet(x, y){ // fire condition
        const bullet = this.getFirstDead(false);
        if(bullet){
            bullet.fire(x, y);
        }
    }
    

}

class Bullet extends Phaser.Physics.Arcade.Sprite{ // sprite option bullet
    
    constructor(scene, x, y){
        super(scene, x, y, 'bullet');
    }

    fire(x, y){ // fire option
        this.body.reset(x, y);
        this.scale = 0.1;
        this.setActive(true);
        this.setVisible(true);
        this.setVelocity(-250, 150); //speed bullet in X axe
    }

    preUpdate(time, delta){ // reset bullet out of the screen
        super.preUpdate(time, delta);

        if(this.x <= 150){ // set range for the bullet - for long range and + for short range
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

export default Play;