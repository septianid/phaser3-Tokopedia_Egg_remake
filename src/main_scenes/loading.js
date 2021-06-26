import Phaser from 'phaser';
import '../game_objects/static_gameobject.js';

export class Loading extends Phaser.Scene{

    constructor(){
      super({
        key: 'Loading',
        pack: {
            files: [
              { type: 'image', key: 'BACKGROUND_HATCHING', url: 'src/assets/egg_crack_background.png'},
              { type: 'image', key: 'EGG', url: 'src/assets/blue_egg.png'},
              { type: 'image', key: 'NEST', url: 'src/assets/nest.png'},
            ]
        }
      });
    }

    preload(){
        this.load.spritesheet('CHAR_IDLE', './src/assets/char_idle.png', {
            frameWidth: 225,
            frameHeight: 225,
        });
        this.load.spritesheet('CHAR_FUN', './src/assets/char_excited.png', {
            frameWidth: 225,
            frameHeight: 225,
        });
        this.load.spritesheet('EGG_CRACK', './src/assets/egg_crack.png', {
            frameWidth: 85,
            frameHeight: 65,
        });
        this.load.spritesheet('EGG_HATCH', './src/assets/egg_hatch.png', {
            frameWidth: 85,
            frameHeight: 65,
        });
        this.load.spritesheet('ELECTRICITY', './src/assets/electricity_big.png', {
            frameWidth: 350,
            frameHeight: 540,
        });
        this.add.staticGameObject(360, 640, 'BACKGROUND_HATCHING').setScale(1.0).setOrigin(0.5)
        this.load.image('BACKGROUND', 'src/assets/background.jpg');
        this.load.image('BACKGROUND_HATCHING', 'src/assets/egg_crack_background.png')
        this.load.image('WINDOW', 'src/assets/window.png')
        this.load.image('BOARD', 'src/assets/board.png')
        this.load.image('LAMP', 'src/assets/lamp.png')
        this.load.image('LLEAF', 'src/assets/leaf_left.png')
        this.load.image('RLEAF', 'src/assets/leaf_right.png')
        this.load.image('CLOCK', 'src/assets/clock.png')
        this.load.image('ENERGY', 'src/assets/energy.png')
        this.load.image('SETTING', 'src/assets/settingIcon.png')
        this.load.image('SHINE', 'src/assets/shine.png')
        this.load.image('COIN', 'src/assets/price.png')
        this.load.image('CONTAINER_LEAF', 'src/assets/popupAsset.png')

        this.add.staticGameObject(360, 640, 'EGG').setScale(1.5).setOrigin(0.5)
        var loading = this.add.rexCircularProgress({
            x: 360,
            y: 640,
            radius: 100,

            trackColor: 0xccdcc7,
            barColor: 0x107A49,
            centerColor: undefined,
            value: 0
        })
        this.add.staticGameObject(360, 1100, 'NEST').setScale(2.5).setOrigin(0.5)

        this.load.on('progress', function (value) {

            loading.value = value
        });
      
        this.load.on('fileprogress', function (file) {
      
        });
      
        this.load.on('complete', () => {
            let cover = this.add.rectangle(360, 640, 720, 1280, 0xFFFFFF)
            cover.setAlpha(0)

            this.tweens.add({               //TWEEN TO FADING OUT
                targets: cover,
                alpha: 1,
                yoyo: false,
                duration: 700,
                ease: 'Linear',
                loop: 0,
                onComplete: () => {
                    this.scene.start('IdleState')   //CHANGE TO HOME SCENE (IDLE STATE)
                }
            })
        });
    }

    create(){

    }
}