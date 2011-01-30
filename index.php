

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
			$(document).ready(function(){
				var ballSpritesheet=$("<img />",{
					src:"images/ballComplete.png"
				});
				var ballSpriteClass;
				var ballSprite;
				var balls=new Array();
				$("#stage").draggable();
				ballSpritesheet.load(function(){
					$.jSprites.play();
					ballSpriteClass=new $.jSprites.SpriteClass(ballSpritesheet,32,32);
					ballSpriteClass.calculate();
					ballSprite=$("<div>").
							sprite({spriteClass:ballSpriteClass}).
							appendTo("#stage").
							sprite("play").
							css("position","absolute").
							draggable();
					ballSprite2=$("<div>").
							sprite({spriteClass:ballSpriteClass}).
							appendTo("#stage").
							sprite("play").
							css("position","absolute").
							draggable().
							sprite("enterFrame",function(){
								if(this.checkCollisionWith(ballSprite))console.log(true);
							});
					/*for(var i=0;i<20;i++){
						ballSprite=$("<div>").
							sprite({spriteClass:ballSpriteClass}).
							appendTo("#stage").
							sprite("play").
							css("position","absolute").
							sprite("enterFrame",function(){
								var top=Math.random()*568;
								var left=Math.random()*568;
								this.element.
									css("top",top+"px").
									css("left",left+"px");
							});
					}*/
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
