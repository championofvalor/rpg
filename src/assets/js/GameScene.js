import phaser from 'phaser';
import Player from './Player.js';
import Map from './Map.js';


export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload ()
    {
        // Load our spritesheet, giving it a name
        this.load.spritesheet('hero', '../src/assets/images/hero.png', {frameWidth: 64, frameHeight: 64});
        
        // Load in our tilemap image
        this.load.image('plains','../src/assets/maps/plains.png');
        // Load in the Tiled map JSON file
        this.load.tilemapTiledJSON('map','../src/assets/maps/map.json');

        // Load in the music file
        this.load.audio('world','../src/assets/music/melodies_of_the_future.ogg');

    }

    create() {

        /*
            This code looks simple, but it's actually pretty complex.
            this = current scene
            'map' = object created above with tileMapTiledJSON
            'plains' = the ACTUAL name of the tileset shown in the TILED program.  
            'ground' = the bottom layer in the TILED program, that the character walks on
            'collison' = the middle layer in the TILED program - everything in this Layer the player collides with
            'detail' = the top layer in the TILED program - everything in this Layer will appear OVER the player
            18 = the size of each tile in the tilemap image.  MOST are actually 16x16, 32x32 or 64x64

        */
        this.map = new Map(this, 'map', 'plains', 'ground', 'collision','detail',18);
        
        // create our Player sprite object
        this.player = new Player(this, 100,100,'hero',130);
        // setScale can increase or decrease the size of the player relative to everything else.  1.2 is a little bigger.
        this.player.setScale(1.2);
        // setSize sets the collision "box" for the player to a custom size.  To see collision boxes, set debug: true in index.js
        this.player.body.setSize(30,50,true);

        // this makes it so the camera will follow the player
        this.cameras.main.startFollow(this.player);
        // Prevents graphical "shearing" which shows lines between tiles while moving
        this.cameras.main.roundPixels = true;

        // Keeps the camera from wandering off the tilemap or showing black around the edges
        this.cameras.main.setBounds(0,0,this.map.width, this.map.height);
        // Keeps the player from walking off the tilemap
        this.physics.world.setBounds(0,0,this.map.width , this.map.height);

        // Turns on collisions for the player and the World Boundary
        this.player.body.collideWorldBounds = true;
        // Turns on a listener for the player/worldBoundary collision
        this.player.body.onWorldBounds = true;
        // Executes when the player hits the edge.  Effectively just stops the animation IF the character isn't moving.
        this.player.body.world.on('worldbounds', this.freeze, this); //, this.player,);
        
        // Sets the game up to listen for up,down,left,right
        this.cursors = this.input.keyboard.createCursorKeys();
        // createInput changes movement keys from  l,d,u,r to a,s,w,d,
        this.createInput();
        // Stops the player animation anytime the character runs into something AND it's actually moving
        this.addCollisions();
        // Creates the left,right,up,down animations for the character
        this.createAnimations();

        // Create the music object, loop and play at 60% volume
        this.music = this.sound.add('world', {loop: true, volume:0.6});
        // Start the music
        this.music.play();


    }

    addCollisions() {
        
        this.physics.add.collider(this.player, this.map.collisionLayer, this.freeze, null, this);

    }

    freeze() {
        
        if(this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0)
            this.player.anims.stop();

    }

    createInput() {        

        this.cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});

    }

    createAnimations() {

        // Used for tweaking the animations based on your speed and spritesheet
        this.frames1 = 12;
        this.frames2 = 15;

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('hero', { start: 131, end: 138 }),
            frameRate: this.frames2,
            repeat: -1,
            yoyo: false
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('hero', { start: 105, end: 112}),
            frameRate: this.frames2,
            repeat: -1,
            yoyo: false
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hero', { start: 118, end: 125 }),
            frameRate: this.frames1,
            repeat: -1,
            yoyo: false
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 144, end: 151 }),
            frameRate: this.frames1,
            repeat: -1,
            yoyo: false
        });
    }

    update() {
        
        // Pass the cursors to the player.update() functions for movement
        this.player.update(this.cursors);
        
    }

   
}