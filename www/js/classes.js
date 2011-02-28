var
	vulcanonClass=new $("<div></div>");
		vulcanonClass.spriteClass({
			spritesheet:spritesheets.filter(".vulcanon"),
			width:113,
			height:114
		}),
	fireballClass=new $("<div>").
		spriteClass({
			spritesheet:spritesheets.filter(".fireball"),
			width:45,
			height:
			45
		}),
	helicopterClass=new $("<div>").
		spriteClass({
			spritesheet:spritesheets.filter(".helicopter"),
			width:44,
			height:24
		}),
	spaceshipClass=new $("<div>").
		spriteClass({
			spritesheet:spritesheets.filter(".spaceship"),
			width:31,
			height:20
		}),
	spaceship2Class=new $("<div>").
		spriteClass({
			spritesheet:spritesheets.filter(".spaceship2"),
			width:30,
			height:6
		}),
	classes=$([vulcanonClass,fireballClass,helicopterClass,spaceshipClass,spaceship2Class]);
	var i=0;