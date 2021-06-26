import Phaser from 'phaser';

export class Loading extends Phaser.Scene{

    constructor(){
      super('Loading');
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
        this.load.image('BACKGROUND', 'src/assets/background.jpg');
        this.load.image('BACKGROUND_HATCHING', 'src/assets/egg_crack_background.png')
        this.load.image('WINDOW', 'src/assets/window.png')
        this.load.image('BOARD', 'src/assets/board.png')
        this.load.image('LAMP', 'src/assets/lamp.png')
        this.load.image('NEST', 'src/assets/nest.png')
        this.load.image('LLEAF', 'src/assets/leaf_left.png')
        this.load.image('RLEAF', 'src/assets/leaf_right.png')
        this.load.image('EGG', 'src/assets/blue_egg.png')
        this.load.image('CLOCK', 'src/assets/clock.png')
        this.load.image('ENERGY', 'src/assets/energy.png')
        this.load.image('SETTING', 'src/assets/settingIcon.png')
        this.load.image('SHINE', 'src/assets/shine.png')
        this.load.image('COIN', 'src/assets/price.png')
        this.load.image('CONTAINER_LEAF', 'src/assets/popupAsset.png')

        var loading = this.add.rexCircularProgress({
            x: 360,
            y: 640,
            radius: 50,

            trackColor: 0xFFFFFF,
            barColor: 0x1A92AD,
            centerColor: 0xEF4138,
            value: 0
        })

        this.load.on('progress', function (value) {
            loading.value = value
        });
      
        this.load.on('fileprogress', function (file) {
      
        });
      
        this.load.on('complete', () => {
            this.scene.start("IdleState");
        });
    }

    create(){

    }
}