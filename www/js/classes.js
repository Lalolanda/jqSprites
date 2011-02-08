var
	vulcanonClass=new $.jSprites.SpriteClass(spritesheets.filter(".vulcanon"),113,114).calculate(),
	fireballClass=new $.jSprites.SpriteClass(spritesheets.filter(".fireball"),45,45).calculate(),
	helicopterClass=new $.jSprites.SpriteClass(spritesheets.filter(".helicopter"),44,24).calculate(),
	spaceshipClass=new $.jSprites.SpriteClass(spritesheets.filter(".spaceship"),31,20).calculate(),
	spaceship2Class=new $.jSprites.SpriteClass(spritesheets.filter(".spaceship2"),30,6).calculate(),
	classes=new Array(vulcanonClass,fireballClass,helicopterClass,spaceshipClass,spaceship2Class);
$.jSprites.classes=classes;