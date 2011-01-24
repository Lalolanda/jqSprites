var jSprites={
	Spritesheet:Spritesheet,
	Sprite:Sprite,
	Frame:Frame
};


function Spritesheet(path){
	var self=this;
	this.element=$("<img />").
	attr("src",path).
	load(function(){
		self.width=this.width;
		self.height=this.height;
	});
	this.path=path;
}

function Sprite(spritesheet,width,height){
	var self=this;
	this.spritesheet=spritesheet;
	this.width=width;
	this.height=height;
	this.fps=10;
	this.frame=0;
	this.step=function(){};
	this.element=$("<div></div>").
		width(this.width).
		height(this.height).
		css({
			"background-image":"url("+this.spritesheet.path+")",
			"background-position":"0px 0px",
			"position":"relative"
		});
	this.calculate=function(){
		var framesLenght=parseInt(this.spritesheet.width/this.width)*parseInt(this.spritesheet.height/this.height);
		this.frames=new Array();
		var
			y=0,
			x=0;
		for(var i=0;i<framesLenght;i++){
			this.frames.push(new jSprites.Frame(this.spritesheet, x, y, this.width, this.height));
			x+=this.width;
			if(y>=this.width){
				x=0;
				y+=this.height;
			}
		}
		this.frames.reverse();
		return this;
	}
	this.checkCollisionWith=function(element){
		var
			right1=this.element.offset().left+this.width,
			left1=this.element.offset().left,
			top1=this.element.offset().top,
			bottom1=this.element.offset().top+this.height,
			right2=element.element.offset().left+element.width,
			left2=element.element.offset().left,
			top2=element.element.offset().top,
			bottom2=element.element.offset().top+element.height,
			collide=false,
			collisionX,
			collisionY;
		if(right1 < left2 ||
			left1 > right2 ||
			top1 > bottom2 ||
			bottom1 < top2
		){
			return false
		}
		
		//console.log(rectangle);
		//console.log(rectangle2);
		console.log("x:"+collisionX+" y:"+collisionY+" left1-left2:"+(left1-left2)+" left2-left1:"+(left2-left1));
		return true;
	};
	this.nextFrame=function(){
		if(self.frame<self.frames.length-1){
			self.frame++;
		}else{
			self.frame=0;
		}
		return this;
	}
	this.prevFrame=function(){
		if(self.frame>0){
			self.frame--;
		}else{
			self.frame=self.frames.length-1;
		}
		return this;
	}
	this.play=function(){
		this.timerFlag=window.setInterval(function(){
			self.
				nextFrame().
				element.
					css("background-position",self.frames[self.frame].x+"px "+self.frames[self.frame].y+"px");
			self.step.apply(self,new Array());
		},1000/this.fps);
	}
	this.stop=function(){
		window.clearInterval(this.timerFlag);
	}
}

function Frame(spritesheet,x,y,width,height){
	var self=this;
	this.spritesheet=spritesheet;
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.matrix=new Array();
	var canvas=$("<canvas></canvas>").
	attr("width",this.width).
	attr("height",this.height);
	var ctx=canvas.get(0).getContext('2d');
	ctx.drawImage(this.spritesheet.element.get(0),x,y,this.width,this.height,0,0,this.width,this.height);
	var pixelMatrix = ctx.getImageData(0,0,this.width,this.height).data;
	for(var i=0;i<this.width;i++){
		var column=new Array();
		for(var j=0;j<this.height;j++){
			column.push(pixelMatrix[(j*this.width*4)+(i*4)+3]);
		}
		this.matrix.push(column);
		
	}
	var test=test;
}


/*

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
*/