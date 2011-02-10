var
	vulcanonClass=$("<div>").spriteClass({spritesheet:spritesheets.filter(".vulcanon"),width:113,height:114}),
	fireballClass=$("<div>").spriteClass({spritesheet:spritesheets.filter(".fireball"),width:45,height:45}),
	helicopterClass=$("<div>").spriteClass({spritesheet:spritesheets.filter(".helicopter"),width:44,height:24}),
	spaceshipClass=$("<div>").spriteClass({spritesheet:spritesheets.filter(".spaceship"),width:31,height:20}),
	spaceship2Class=$("<div>").spriteClass({spritesheet:spritesheets.filter(".spaceship2"),width:30,height:6}),
	classes=$([vulcanonClass,fireballClass,helicopterClass,spaceshipClass,spaceship2Class]);
$.jSprites.classes=classes;