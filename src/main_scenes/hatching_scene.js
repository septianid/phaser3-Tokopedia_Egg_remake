import Phaser from 'phaser';

export class Hatching extends Phaser.Scene{

    constructor(){
        super('HatchingState');
    }

    preload(){

    }

    create(){
        this.add.staticGameObject(360, 640, 'BACKGROUND_HATCHING').setScale(1.0).setOrigin(0.5)
        this.add.staticGameObject(360, 1000, 'NEST').setScale(5.9).setOrigin(0.5)
        this.animationEgg()

        this.tweenFading(this.createCover(1, 0xFFFFFF), 0, 1500)
    }

    update(){

    }

    createButton(x, y, width, height, radius, fillColor, strokeColor, text, textColor, event){
        let buttonContainer = this.add.container(x, y)
        let button = this.add.rexRoundRectangle(0, 0, width, height, radius, fillColor)
            .setStrokeStyle(10, strokeColor)
            .setInteractive()
            .on('pointerdown', event)
        let buttonText = this.add.text(0, 0, text, {
            font: '36px FredokaOne',
            fill: textColor,
            align: 'center'
        }).setOrigin(0.5)
        
        buttonContainer.add(button)
        buttonContainer.add(buttonText)

        return buttonContainer
    }

    createCover(alpha, color){
        let cover = this.add.rectangle(360, 640, 720, 1280, color).setAlpha(alpha)

        return cover
    }

    createShine(size){
        let shine = this.add.sprite(360, 640, 'SHINE').setScale(size).setOrigin(0.5)
        
        return shine
    }

    createContainerFloatingBox(){
        let floatBoxContainer = this.add.container(360, 350)

        let floatBox = this.add.rexRoundRectangle(0, 0, 470, 80, 20, 0xFFFEFF)
        let floatBoxText = this.add.text(0, 0, 'WOW! The egg is hatching...', {
            font: '26px FredokaOne',
            fill: '#777879',
            align: 'center'
        }).setOrigin(0.5)

        floatBoxContainer.add(floatBox)
        floatBoxContainer.add(floatBoxText)

        return floatBoxContainer
    }

    createContainerDialogBox(){
        let dialogBoxContainer = this.add.container(360, 500)

        let leafAsset = this.add.sprite(15, -278, 'CONTAINER_LEAF').setScale(2.0).setOrigin(0.5)
        let upperPanel = this.add.rexRoundRectangle(0, -80, 600, 150, 80, 0xE9FCFF)
        let bodyPanel = this.add.rexRoundRectangle(0, 80, 600, 350, 20, 0xE9FCFF)
        let textBox = this.add.rexRoundRectangle(0, 160, 550, 140, 20, 0xC7F2FE)
        let dialogBoxText = this.add.text(0, 20, "Yay! Here's your reward:", {
            font: '36px FredokaOne',
            fill: '#60A4B4',
            align: 'center'
        }).setOrigin(0.5)
        let poinBoxText = this.add.text(0, 160, '100 Tokopoints', {
            font: '48px FredokaOne',
            fill: '#60A4B4',
            align: 'center'
        }).setOrigin(0.5)

        dialogBoxContainer.add(upperPanel)
        dialogBoxContainer.add(bodyPanel)
        dialogBoxContainer.add(textBox)
        dialogBoxContainer.add(dialogBoxText)
        dialogBoxContainer.add(poinBoxText)
        dialogBoxContainer.add(leafAsset)

        return dialogBoxContainer
    }

    animationEgg(){
        
        let shine = this.createShine(0.5)
        let floatbox = this.createContainerFloatingBox()

        let egg = this.add.animatedGameObject(360, 640).setScale(6.5).setOrigin(0.5)
        egg.createAnimation('EGG_CRACK', 89, 30, 0, false)
        egg.createAnimation('EGG_HATCH', 29, 30, 0, false)

        this.tweens.add({
            targets: shine,
            angle: 360,
            yoyo: false,
            duration: 25000,
            ease: 'Linear',
            loop: -1
        })

        this.tweens.add({
            targets: floatbox,
            y: 330,
            yoyo: true,
            duration: 1000,
            loop: -1
        })

        egg.playAnimation('EGG_CRACK')
        egg.once('animationcomplete', () => {
            this.tweenFading(shine, 0, 500)
            this.tweenFading(floatbox, 0, 500)

            egg.playAnimation('EGG_HATCH')
            egg.once('animationcomplete', () => {
                this.tweenFading(this.createCover(0, 0x000000), 0.5, 1000)
                this.tweenCoin()
            })
        })
    }

    tweenFading(object, to, duration){
        this.tweens.add({
            targets: object,
            alpha: to,
            yoyo: false,
            duration: duration,
            ease: 'Linear',
            loop: 0,
        })
    }

    tweenCoin(){
        let coin = this.add.sprite(360, 620, 'COIN').setScale(1.3).setOrigin(0.5).setDepth(1)
        let container = this.createContainerDialogBox().setScale(0)
        let backButton = this.createButton(360, 850, 450, 100, 35, 0x1ACA79, 0xFFFDFA,'Hatch Another Egg', '#F6FDFF', () => {
            this.scene.start('IdleState')
        }).setScale(0)
        let tokopointsButton = this.createButton(360, 990, 450, 100, 35, 0xF6FDFF, 0xFFFDFA,'Use TokoPoints', '#919A9D', () => {
            console.log("Nothing");
        }).setScale(0)

        this.tweens.add({
            targets: coin,
            y: 320,
            yoyo: false,
            duration: 300,
            ease: 'Linear',
            loop: 0
        })

        this.tweens.add({
            targets: coin,
            scale: 4.2,
            yoyo: false,
            duration: 300,
            ease: 'Linear',
            loop: 0,
            onComplete: () => { 
                this.tweenUITimeline(container, backButton, tokopointsButton)
                this.tweenCoinTimeLine(coin)
            }
        })
    }

    tweenButtonTimeline(button){
        this.tweens.timeline({
            tweens:[{
                targets:button,
                scale: 1.2,
                yoyo: false,
                duration: 100,
                ease: 'Linear',
                loop: 0,
            },{
                targets:button,
                scale: 1.0,
                yoyo: false,
                duration: 100,
                ease: 'Linear',
                loop: 0,
            }]
        })
    }

    tweenUITimeline(panel, button1, button2){
        this.tweens.timeline({
            tweens:[{
                targets:panel,
                scale: 1.0,
                yoyo: false,
                duration: 200,
                delay: 300,
                ease: 'Linear',
                loop: 0,
            },{
                targets:button1,
                scale: 1.2,
                yoyo: false,
                duration: 200,
                delay: 300,
                ease: 'Linear',
                loop: 0,
                onComplete: () => {
                    this.tweenButtonTimeline(button1)
                }
            },{
                targets:button2,
                scale: 1.3,
                yoyo: false,
                duration: 200,
                delay: 300,
                ease: 'Linear',
                loop: 0,
                onComplete: () => {
                    this.tweenButtonTimeline(button2)
                }
            }]
        })
    }

    tweenCoinTimeLine(price){
        this.tweens.timeline({
            tweens:[{
                targets: price,
                scale: 2.2,
                yoyo: false,
                duration: 200,
                delay: 500,
                ease: 'Linear',
                loop: 0,
            },{
                targets: price,
                scale: 2.8,
                yoyo: false,
                duration: 120,
                ease: 'Linear',
                loop: 0,
            },{
                targets: price,
                scale: 2.2,
                yoyo: false,
                duration: 120,
                ease: 'Linear',
                loop: 0,
            }
            ]
        })
    }
}