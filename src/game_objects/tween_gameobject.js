import Phaser from 'phaser'

export default class TweenGameObject extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y){
		super(scene, x, y)
	}

    createFadingTween(target, endValue){
        
    }
}

Phaser.GameObjects.GameObjectFactory.register('tweenGameObject', function(x, y) {
	const tweenGO = new TweenGameObject(this.scene, x, y)

    this.displayList.add(tweenGO)
    this.updateList.add(tweenGO)

    return tweenGO
})