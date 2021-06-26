import Phaser from 'phaser';
import '../game_objects/animated_gameobject.js';

var character

export class Idle extends Phaser.Scene{

    constructor(){
        super('IdleState');
    }

    preload(){

    }

    create(){
        this.add.staticGameObject(360, 640, 'BACKGROUND').setScale(1.35)
        this.add.staticGameObject(550, 400, 'WINDOW').setScale(1.0)
        this.add.staticGameObject(200, 410, 'BOARD').setScale(1.1)
        this.add.staticGameObject(570, 640, 'LAMP').setScale(1.8)
        this.add.staticGameObject(570, 850, 'NEST').setScale(1.8)
        this.add.staticGameObject(120, 1170, 'LLEAF').setScale(1.8)
        this.add.staticGameObject(600, 1170, 'RLEAF').setScale(1.8)
        this.add.staticGameObject(570, 720, 'EGG').setScale(1.8)

        this.headerPanel()
        this.animationPlayer()
        this.tweenEgg()
        this.idleStateButton()
        this.screenFadeIn()
    }

    update(){

    }


    //FUNCTION TO CREATE AND TWEEN CHARACTER
    tweenEgg(){ 
        let egg = this.add.sprite(570, 720, 'EGG')
        egg.setScale(1.7)
        egg.setOrigin(0.5)

        this.tweens.add({
            targets: egg,
            scale: 1.9,
            yoyo: true,
            duration: 1000,
            ease: 'Sine.easeInOut',
            loop: -1
        })
    }


    //FUNCTION TO CREATE AND ANIMATE CHARACTER
    animationPlayer(){      

        character = this.add.animatedGameObject(220, 670).setScale(3.0).setOrigin(0.5)
        character.createAnimation('CHAR_IDLE', 23, 20, -1, false)
        character.createAnimation('CHAR_FUN', 32, 20, -1, false)
        character.playAnimation('CHAR_IDLE')
    }

    //FUNCTION TO CREATE AND ANIMATE ELECTRICITY
    animationElectricity(){

        let electricity = this.add.animatedGameObject(450, 800).setScale(0.9).setOrigin(0.5)
        electricity.createAnimation('ELECTRICITY', 7, 10, 0, true)
        electricity.playAnimation('ELECTRICITY')
        electricity.once('animationcomplete', () => {
            let progress = this.add.rexRoundRectangle(135, 75, 10, 45, 20, 0x69FFF4).setOrigin(0, 0.5)

            this.tweens.add({
                targets: progress,
                width: 250,
                duration: 1000,
                ease: 'Sine.easeInOut',
                loop: 0,
                onComplete: () => {
                    character.playAnimation('CHAR_FUN')
                    this.screenFadeOut()
                }
            })
        })
    }

    //FUNCTION TO CREATE, ANIMATE BUTTON AND EXECUTE THE EVENT AFTER IT CLICK
    idleStateButton(){
        let value = 100
        let button = this.add.rexRoundRectangle(360, 1130, 350, 120, 40, 0x1ACA79).setStrokeStyle(10, 0xFFFDFA);
        let pipelineInstance = this.plugins.get('rexGlowFilterPipeline').add(button);

        let text = this.add.text(360, 1130, ''+value, {
            font: '52px FredokaOne',
            fill: '#FFFDFA',
            align: 'center'
        }).setOrigin(0.5)

        button.glowTask = this.tweens.add({
            targets: pipelineInstance,
            intensity: 0.005,
            ease: 'Linear',
            duration: Phaser.Math.Between(600, 600),
            repeat: -1,
            yoyo: true
        });

        let button_scale = this.tweens.add({
            targets: button,
            scale: 1.03,
            yoyo: true,
            duration: 1000,
            ease: 'Sine.easeInOut',
            loop: -1
        })

        button.setInteractive()
        button.on('pointerdown', () => {
            button.setFillStyle(0x107A49)
            pipelineInstance = this.plugins.get('rexGlowFilterPipeline').remove(button);
            button.glowTask.stop();
            button.glowTask = null;
            let timerCount = 0

            let timer = this.time.addEvent({
                delay: 50,
                callback: () => {
                    if(timerCount >= value){
                        timerCount = value
                        button.setFillStyle(0xB6BAC5)
                        this.animationElectricity()

                        timer.remove()
                        button_scale.remove()
                    }
                    else{
                        timerCount += 10
                    }
                    text.text = value - timerCount
                },
                callbackScope: this,
                loop: true
            })
        })
    }

    //FUNCTION TO CREATE HEADER PANEL
    headerPanel(){

        this.add.rexRoundRectangle(360, 0, 720, 150, 40, 0x1A92AD)
        this.add.rexRoundRectangle(360, 66, 620, 80, 30, 0x1FAAC8)
        this.add.rexRoundRectangle(360, 71, 620, 80, 30, 0x72DDF4)
        this.add.rexRoundRectangle(360, 76, 620, 80, 30, 0x23BADA)

        this.add.staticGameObject(450, 75, 'CLOCK').setScale(2.0)
        this.add.staticGameObject(530, 75, 'ENERGY').setScale(2.0)
        this.add.staticGameObject(620, 75, 'SETTING').setScale(0.7)

        this.add.circle(100, 75, 25, 0x317687)
        this.add.rexRoundRectangle(260, 75, 270, 30, 30, 0x317687)
        
        this.add.staticGameObject(100, 75, 'EGG').setScale(0.4)
    }

    screenFadeIn(){         // FUNCTION TO CREATE SCENE ENTRY TRANSITION
        let cover = this.add.rectangle(360, 640, 720, 1280, 0xFFFFFF)
        cover.setAlpha(1)

        this.tweens.add({
            targets: cover,
            alpha: 0,
            yoyo: false,
            duration: 700,
            ease: 'Linear',
            loop: 0,
        })
    }

    screenFadeOut(){            // FUNCTION TO CREATE SCENE EXIT TRANSITION
        let cover = this.add.rectangle(360, 640, 720, 1280, 0xFFFFFF)
        cover.setAlpha(0)

        this.tweens.add({
            targets: cover,
            alpha: 1,
            yoyo: false,
            duration: 1500,
            ease: 'Linear',
            loop: 0,
            onComplete: () => {
                this.scene.start('HatchingState')
            }
        })
    }
}