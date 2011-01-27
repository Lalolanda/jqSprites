var jSprites={
	Spritesheet:Spritesheet,
	SpriteType:SpriteType,
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
function Sprite(spriteType){
	var self=this;
	this.spritesheet=spriteType.spritesheet;
	this.width=spriteType.width;
	this.height=spriteType.height;
	this.frames=spriteType.frames;
	this.fps=10;
	this.frame=0;
	this.step=function(){};
	this.element=$("<div></div>").
		width(this.width).
		height(this.height).
		css({
			"background-image":"url("+this.spritesheet.path+")",
			"background-position":"0px 0px",
			"position":"absolute"
		});
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
		if(right1 <= left2 ||
			left1 >= right2 ||
			top1 >= bottom2 ||
			bottom1 <= top2
		){
			return false
		}
		if(left1-left2>=0){
			startX1=0;
			startX2=left1-left2;
			endX1=right2-left1;
			endX2=startX2+this.width;
		}else{
			startX1=left2-left1;
			startX2=0;
			endX1=startX1+element.width;
			endX2=right1-left2;
		}
		if(bottom1-bottom2>=0){
			startY1=0;
			startY2=top1-top2;
			endY1=bottom2-top1;
			endY2=startY2+this.height;
		}else{
			startY1=top2-top1;
			startY2=0;
			endY1=startY1+element.height;
			endY2=bottom1-top2;
		}
		if(endX2>element.width){
			endX2=element.width;
		}else if(endX1>this.width){
			endX1=this.width;
		}
		if(endY2>element.height){
			endY2=element.height;
		}else if(endY1>this.height){
			endY1=this.height;
		}
		for(var i=0;i<endX1-startX1;i++){
			for(var j=0;j<endY1-startY1;j++){
				if(this.frames[this.frame].matrix[startX1+i][startY1+j]>0 && element.frames[element.frame].matrix[startX2+i][startY2+j]>0){
					return true;
				}
			}
		}
		return false;
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
function SpriteType(spritesheet,width,height){
	var self=this;
	this.spritesheet=spritesheet;
	this.width=width;
	this.height=height;
	this.fps=10;
	this.frame=0;
	this.calculate=function(){
		var framesLenght=parseInt(this.spritesheet.width/this.width)*parseInt(this.spritesheet.height/this.height);
		this.frames=new Array();
		var
			y=0,
			x=0;
		for(var i=0;i<framesLenght;i++){
			this.frames.push(new jSprites.Frame(this.spritesheet, x, y, this.width, this.height));
			x+=this.width;
			if(x>=this.width){
				x=0;
				y+=this.height;
			}
		}
		this.frames.reverse();
		return this;
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
	try{
		ctx.drawImage(this.spritesheet.element.get(0),x,y,this.width,this.height,0,0,this.width,this.height);
	}catch(e){
		var test=0;
	}
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