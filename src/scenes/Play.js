import Phaser from "phaser";

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
        this.physics.add.collider(this.player, layers.platformsColliders);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player);

        this.ennemy.scale = 0.15;
        this.ennemy.flipX = 1;


        this.playerInput = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            shoot: Phaser.Input.Keyboard.KeyCodes.F
            

        })

        this.bulletGroup = new bulletGroup(this);


        
    }

    createMap() {
        const map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 16 });
        map.addTilesetImage("ground", "ground");
        map.addTilesetImage("32x32Prototypes", "obs");
        return map;
    }

    createLayer(map) {
        const tileset = map.getTileset('ground');
        const tileset2 = map.getTileset('32x32Prototypes');
        const tileset3 = map.getTileset('platformCollider');
        const ground = map.createLayer("bottom", tileset);
        const block = map.createLayer("block", tileset2);
        const platformsColliders = map.createLayer('platformCollider', tileset3);

        platformsColliders.setCollisionByExclusion(-1, true);

        return { ground, block, platformsColliders };

    }

    createPlayer() {
        let player = this.physics.add.sprite(20, 300, 'player');

        return player;
    }

    createEnnemy() {
        let lifPoint = 10 ;
        let ennemy = this.physics.add.sprite(200, 300, 'ennemy');

        return ennemy;
    }

    shootBullet(){
        this.bulletGroup.fireBullet(this.ennemy.x, this.ennemy.y - 10);
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
        
        if(this.ennemy.lifePoint != 10){
            this.shootBullet();
        }
       
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

class Bullet extends Phaser.Physics.Arcade.Sprite{
    
    constructor(scene, x, y){
        super(scene, x, y, 'bullet');
    }

    fire(x, y){ // fire option
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(-150); //speed bullet in X axe
    }

    preUpdate(time, delta){ // reset bullet out of the screen
        super.preUpdate(time, delta);

        if(this.x <= 100){ // set range for the bullet - for long range and + for short range
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

export default Play;