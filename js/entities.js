$(document).ready(function(){
	var
		vulcanon=$("<div>").
			sprite({spriteClass:vulcanonClass}).
			appendTo("#stage").
			css("position","absolute").
			css("bottom","-10px").
			css("left","10px").
			draggable().
			sprite("enterFrame",function(event){
				if(event.frames%8<4){
					$(this).css("bottom","+=2px");
				}else{
					$(this).css("bottom","-=2px");
				}
			}).sprite("addMethod",function(){

			},"shootFireball"),
		fireball=$("<div>").
			sprite({spriteClass:fireballClass}).
			appendTo("#stage").
			css("position","absolute").
			css("bottom","45px").
			css("left","147px").
			draggable(),
		spaceship=$("<div>").
			sprite({spriteClass:spaceshipClass}).
			appendTo("#stage").
			css("position","absolute").
			css("bottom","85px").
			css("left","255px").
			draggable(),
		spaceship2=$("<div>").
			sprite({spriteClass:spaceship2Class}).
			appendTo("#stage").
			css("position","absolute").
			css("top","140px").
			css("left","335px").
			draggable(),
		helicopter=$("<div>").
			sprite({spriteClass:helicopterClass}).
			appendTo("#stage").
			css("position","absolute").
			css("top","50px").
			css("left","320px").
			draggable();
});