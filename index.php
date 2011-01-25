

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

		</style>
		<script>
			var sd;
			$(document).ready(function(){
				var marioSprite;
				var marioSpritesheet=new jSprites.Spritesheet("marioAnimation.png");
				marioSpritesheet.element.load(function(){
					marioSprite=new jSprites.Sprite(marioSpritesheet,30,32);
					marioSprite.calculate();
					marioSprite.element.appendTo("body").draggable();
					marioSprite.play();
					marioSprite2=new jSprites.Sprite(marioSpritesheet,30,32);
					marioSprite2.calculate();
					marioSprite2.element.appendTo("body").draggable();
					marioSprite2.play();
					marioSprite2.step=function(){
						if(this.checkCollisionWith(marioSprite)){
							console.log(true);
						}
					}
				});
				var test=test;
			});
		
		</script>
	</head>

	<body>
	</body>
</html>
