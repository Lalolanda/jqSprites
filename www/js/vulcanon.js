$(document).ready(function(){
	$("#stage").draggable();
	var initGame=function(){
		$.jSprites.init();
		$.jSprites.play();
		$("body").click(function(event){
			console.log(event);
		});
	}
	spritesheets.
		arrayBind("load",function(){
			var classesCalculated=true;
			classes.
				arrayBind("calculateComplete",function(){
					initGame();
				}).
				each(function(){
					$(this).spriteClass("calculate");
				}).
				each(function(){
					if($(this).spriteClass("option","calculated")==false)classesCalculated=false;
				});
		});
});