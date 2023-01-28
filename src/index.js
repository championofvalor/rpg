import GameScene from './assets/js/GameScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
	height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE
    },
    scene: GameScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 0,
            }
        }
    }
};

const game = new Phaser.Game(config);
