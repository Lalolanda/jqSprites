

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<title>jTimer</title>
		<link type="text/css" href="css/ui-lightness/jquery-ui-1.8.9.custom.css" rel="stylesheet" />
		<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.8.9.custom.min.js"></script>
		<script type="text/javascript" src="jquery.ui.widget.js"></script>
		<script type="text/javascript" src="jqSprites.js"></script>
		<style>
			#stage{
				width:600px;
				height:600px;
				background:#000;
				border:1px solid #000;
			}
		</style>
		<script>
			var sd;
			$(document).ready(function(){
				var ballSpritesheet= new jSprites.Spritesheet("ballComplete.png");
				var ballSpriteType;
				var ballSprite;
				var balls=new Array();
				$("#stage").draggable();
				ballSpritesheet.element.load(function(){
					ballSpriteType=new jSprites.SpriteType(ballSpritesheet,32,32);
					ballSpriteType.calculate();
					for(var i=0;i<10;i++){
						ballSprite=new jSprites.Sprite(ballSpriteType);
						ballSprite.element.appendTo("#stage");
						var top=Math.random()*568;
						var left=Math.random()*568;
						ballSprite.dX=3;
						ballSprite.dY=3;
						ballSprite.element.css("top",top+"px");
						ballSprite.element.css("left",left+"px");
						var collide=false;
						do{
							$.each(balls,function(i,val){
								collide=ballSprite.checkCollisionWith(val);
								if(collide){
									var top=Math.random()*568;
									var left=Math.random()*568;
									ballSprite.element.css("top",top+"px");
									ballSprite.element.css("left",left+"px");
								}
							});
						}while(collide);
						ballSprite.play();
						balls.push(ballSprite);
						window.setInterval(function(){
							$.each(balls,function(i,val){
								if(val!=ballSprite){
									if(ballSprite.checkCollisionWith(val)){
										ballSprite.dX=-ballSprite.dX;
										ballSprite.dY=-ballSprite.dY;
									}
									ballSprite.element.css("top",parseInt(ballSprite.element.css("top").replace("px", ""))+ballSprite.dY+"px");
									ballSprite.element.css("left",parseInt(ballSprite.element.css("left").replace("px", ""))+ballSprite.dX+"px");
								}
							});
						},1000);
					}
				});
				var test=test;
			});
		</script>
	</head>

	<body>
		<div id="stage">

		</div>
	</body>
</html>
