import Phaser from 'phaser'

export default class TweenType extends Phaser.Tweens {

    constructor(target){
        this.target = target
    }

    fadingTween(target, endAlpha, duration){
        this.tweens.add({
            targets: target,
            alpha: endAlpha,
            yoyo: false,
            duration: duration,
            ease: 'Linear',
            loop: 0,
        })
    }
}