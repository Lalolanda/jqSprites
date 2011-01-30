(function( $ ){
	var originalCss = jQuery.fn.css;
	jQuery.fn.css = function() {
		if(arguments.length==2 && typeof arguments[1]=="String"){
			
		}
		return originalCss.apply(this, arguments);
	};
	$.jSprites={
		options:{
			fps: 12
		},
		sprites:$([]),
		SpriteClass:SpriteClass,
		Frame:Frame,
		setOptions:function(options){
			this.
			$.extend(this.options,options);
		},
		play:function(){
			var self=this;
			this.timer=window.setInterval(function(){
				self.sprites.sprite("nextFrame");self.sprites.sprite("step");
			},1000/self.options.fps);
		},
		stop:function(){
			window.clearInterval(this.timer);
		}
	};
	var jSpriteInit=
	$.widget("ui.sprite", {
		options: {
			option1: "defaultValue",
			hidden: false
		},
		_create: function() {
			var self=this
				options=this.options;
			this.spritesheet=options.spriteClass.spritesheet;
			this.width=options.spriteClass.width;
			this.height=options.spriteClass.height;
			this.frames=options.spriteClass.frames;
			this.fps=10;
			this.frame=0;
			this.step2=function(){};
			$.jSprites.sprites=$.jSprites.sprites.add(this.element);
			this.step=function(){};
			this.element.
			width(this.width).
			height(this.height).
			css({
				"background-image":"url("+this.spritesheet.attr("src")+")",
				"background-position":(-self.frames[self.frame].x)+"px "+(-self.frames[self.frame].y)+"px"
			});
		},
		checkCollisionWith:function(element2){
			var
				right1=Math.floor(this.element.offset().left+this.width),
				left1=Math.floor(this.element.offset().left),
				top1=Math.floor(this.element.offset().top),
				bottom1=Math.floor(this.element.offset().top+this.height),
				right2=Math.floor(element2.offset().left+element2.width()),
				left2=Math.floor(element2.offset().left),
				top2=Math.floor(element2.offset().top),
				bottom2=Math.floor(element2.offset().top+element2.height());
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
				endX2=startX2+this.element.width();
			}else{
				startX1=left2-left1;
				startX2=0;
				endX1=startX1+element2.width();
				endX2=right1-left2;
			}
			if(bottom1-bottom2>=0){
				startY1=0;
				startY2=top1-top2;
				endY1=bottom2-top1;
				endY2=startY2+this.element.height();
			}else{
				startY1=top2-top1;
				startY2=0;
				endY1=startY1+element2.height();
				endY2=bottom1-top2;
			}
			if(endX2>element2.width()){
				endX2=element2.width();
			}else if(endX1>this.element.width()){
				endX1=this.element.width();
			}
			if(endY2>element2.height()){
				endY2=element2.height();
			}else if(endY1>this.element.height()){
				endY1=this.element.height();
			}
			for(var i=0;i<endX1-startX1;i++){
				for(var j=0;j<endY1-startY1;j++){
					if(this.getMatrix()[startX1+i][startY1+j]>0 && element2.sprite("getMatrix")[startX2+i][startY2+j]>0){
						return true;
					}
				}
			}
			return false;
		},
		getMatrix:function(){
			return this.frames[this.frame].matrix;
		},
		nextFrame:function(){
			var self=this;
			if(this.frame<this.frames.length-1){
				this.frame++;
			}else{
				this.frame=0;
			}
			self.element.
					css("background-position",(-self.frames[self.frame].x)+"px "+(-self.frames[self.frame].y)+"px");
			return this;
		},
		prevFrame:function(){
			var self=this;
			if(this.frame>0){
				this.frame--;
			}else{
				this.frame=this.frames.length-1;
			}
			self.element.
					css("background-position",(-self.frames[self.frame].x)+"px "+(-self.frames[self.frame].y)+"px");
			return this;
		},
		play:function(){
			var self=this;
			
			/*this.timerFlag=window.setInterval(function(){
				self.nextFrame();
				self.element.
					css("background-position",(-self.frames[self.frame].x)+"px "+(-self.frames[self.frame].y)+"px");
				self.step.apply(self,new Array());
			},1000/this.fps);*/
		},
		enterFrame:function(fn){
			this.step=fn;
		},
		step:function(){
			
		},
		stop:function(){
			window.clearInterval(this.timerFlag);
		},
		destroy: function() {
			$.Widget.prototype.destroy.apply(this, arguments); // default destroy
		}
	});
	function SpriteClass(spritesheet,width,height){
		var self=this;
		this.spritesheet=spritesheet;
		this.width=width;
		this.height=height;
		this.fps=10;
		this.frame=0;
		this.calculate=function(){
			var framesLenght=this.spritesheet[0].width/this.width*this.spritesheet[0].height/this.height;
			this.frames=new Array();
			var
			y=0,
			x=0;
			for(var i=0;i<framesLenght;i++){
				this.frames.push(new $.jSprites.Frame(this.spritesheet, x, y, this.width, this.height));
				x+=this.width;
				if(x>=this.spritesheet[0].width){
					x=0;
					y+=this.height;
				}
			}
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
			ctx.drawImage(this.spritesheet[0],x,y,this.width,this.height,0,0,this.width,this.height);
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
})( jQuery );




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