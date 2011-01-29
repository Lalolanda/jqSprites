

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<title>jTimer</title>
		<link type="text/css" href="css/ui-lightness/jquery-ui-1.8.9.custom.css" rel="stylesheet" />
		<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.8.9.custom.min.js"></script>
		<script type="text/javascript" src="js/jqSprites.js"></script>
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
			$("<img src=\"images/ballCOmplete.png\"");
			$(document).ready(function(){
				var ballSpritesheet= new jSprites.Spritesheet("images/ballComplete.png");
				var ballSpriteType;
				var ballSprite;
				var balls=new Array();
				$("#stage").draggable();
				ballSpritesheet.element.load(function(){
					ballSpriteType=new jSprites.SpriteType(ballSpritesheet,32,32);
					ballSpriteType.calculate();
					for(var i=0;i<20;i++){
						ballSprite=new jSprites.Sprite(ballSpriteType);
						ballSprite.element.appendTo("#stage");
						var top=Math.random()*568;
						var left=Math.random()*568;
						ballSprite.element.css("top",top+"px");
						ballSprite.element.css("left",left+"px");
						balls.push(ballSprite);
					}
					$.each(balls,function(i,val){
						val.play();
					});
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
