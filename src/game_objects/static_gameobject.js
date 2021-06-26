import Phaser from 'phaser'

export default class StaticGameObject extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, texture){
		super(scene, x, y, texture)
	}
}

Phaser.GameObjects.GameObjectFactory.register('staticGameObject', function(x, y, texture) {
	const staticGO = new StaticGameObject(this.scene, x, y, texture)

    this.displayList.add(staticGO)
    this.updateList.add(staticGO)

    return staticGO
})