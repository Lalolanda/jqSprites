(function($) {
	$.widget("jSprite.sprite",{
		
	});
	

});

function spritesheet(path){
	var self=this;
	this.spritesheet=$("<img />").
		attr("src",path).
		load(function(){
			self.width=this.width;
			self.height=this.height;
		});
	this.path=path;
}
function frame(spritesheet,x,y,width,height){
	this.spritesheet=spritesheet;
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
}
function animation(spritesheet,x,y,width,height,n){
	if(typeof spritesheet!="undefined"){
		this.spritesheet=spritesheet;
		this.x=x;
		this.y=y;
		this.width=width;
		this.height=height;
		this.start=0;
		this.frame=0;
		this.state="stopped";
		this.direction="right";
		this.setDirection=function(){
			
		}
		this.setStart=function(nStart){
			this.start=nStart;
		}
		this.nextFrame=function(){
			
		}
		this.prevFrame=function(){
			
		}
		this.play=function(){
			this.state="playing";
		}
		this.stop=function(){
			this.state="stopped";
		}
		this.pause=function(){
			this.state="paused";
		}
		this.show=function(){
		
		}
		this.hide=function(){
		
		}
		this.getObject=function(){
			
		}
	}else{
		this.frames=new Array();
		
	}
}
function action(frame){
	this.frame=frame;
}
function animatedAction(){
	
}
function sprite(){
	
}
function sprite(){
	this.setAnimation=function(){
	
	}
	this.setAnimationArray=function(){
	
	}
}
	
var marioSpritesheet=new spritesheet("marioSheet.png");
var marioHammer=new animation(marioSpritesheet,0,265,39,50,5);

