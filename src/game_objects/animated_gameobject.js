import Phaser from 'phaser'

export default class AnimatedGameObject extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y){
		super(scene, x, y)
	}

    createAnimation(key, end, frameRate, loop, hide){
        this.anims.create({
            key: key,
            frames: this.anims.generateFrameNumbers(key, {
              start: 0,
              end: end
            }),
            frameRate: frameRate,
            repeat: loop,
            hideOnComplete: hide
        });
    }

    playAnimation(key){
        this.anims.play(key)
    }
}

Phaser.GameObjects.GameObjectFactory.register('animatedGameObject', function(x, y) {
	const animatedGO = new AnimatedGameObject(this.scene, x, y)

    this.displayList.add(animatedGO)
    this.updateList.add(animatedGO)

    return animatedGO
})