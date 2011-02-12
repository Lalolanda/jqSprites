(function( $ ){
	$.jSprites={
		options:{
			fps: 12
		},
		sprites:$([]),
		classes:[],
		SpriteClass:SpriteClass,
		Frame:Frame,
		setOptions:function(options){
			$.extend(this.options,options);
		},
		init:function(){
			this.sprites.sprite("init");
		},
		play:function(){
			this.sprites.sprite("play");
		},
		stop:function(){
			window.clearInterval(this.timer);
		},
		getSpritesheet:function(path,spritesheetClass){
			return $("<img/>",{
				"src":path,
				"class":spritesheetClass
			});
		}
	};
	$.widget("ui.spriteClass", {
		options: {
			fps:12,
			totalFrames:0
		},
		_create:function(){
			$.jSprites.sprites=$.jSprites.sprites.add(this.element);
			this.options.calculated=false;
		},
		calculate:function(){
			var framesLenght=this.options.spritesheet[0].width/this.options.width*this.options.spritesheet[0].height/this.options.height;
			this.options.frames=new Array();
			var
			y=0,
			x=0;
			for(var i=0;i<framesLenght;i++){
				this.options.frames.push(new $.jSprites.Frame(this.options.spritesheet, x, y, this.options.width, this.options.height));
				x+=this.options.width;
				if(x>=this.options.spritesheet[0].width){
					x=0;
					y+=this.options.height;
				}
			}
			this.options.calculated=true;
			return this;
		}
	});
	$.widget("ui.sprite", {
		options: {
			fps:12,
			totalFrames:0
		},
		_create:function(){
			$.jSprites.sprites=$.jSprites.sprites.add(this.element);
		},
		init: function() {
			var self=this
				options=this.options;
			this.spritesheet=options.spriteClass.spriteClass("option","spritesheet");
			this.width=options.spriteClass.spriteClass("option","width");
			this.height=options.spriteClass.spriteClass("option","height");
			this.frames=options.spriteClass.spriteClass("option","frames");
			this.fps=10;
			this.frame=0;
			this.element.
			width(this.width).
			height(this.height).
			css({
				"background-image":"url("+this.spritesheet.attr("src")+")",
				"background-position":(-self.frames[self.frame].x)+"px "+(-self.frames[self.frame].y)+"px"
			});
		},
		checkCollisionWith:function(element2){
			var self=this,
				returnVal=false;
			element2.each(function(){
				if(returnVal==true)return true;
				var
					right1=Math.floor(self.element.offset().left+self.width),
					left1=Math.floor(self.element.offset().left),
					top1=Math.floor(self.element.offset().top),
					bottom1=Math.floor(self.element.offset().top+self.height),
					right2=Math.floor($(this).offset().left+$(this).width()),
					left2=Math.floor($(this).offset().left),
					top2=Math.floor($(this).offset().top),
					bottom2=Math.floor($(this).offset().top+$(this).height());
				if(right1 <= left2 ||
					left1 >= right2 ||
					top1 >= bottom2 ||
					bottom1 <= top2
					){
					returnVal=false;
				}
				if(left1-left2>=0){
					startX1=0;
					startX2=left1-left2;
					endX1=right2-left1;
					endX2=startX2+self.element.width();
				}else{
					startX1=left2-left1;
					startX2=0;
					endX1=startX1+$(this).width();
					endX2=right1-left2;
				}
				if(bottom1-bottom2>=0){
					startY1=0;
					startY2=top1-top2;
					endY1=bottom2-top1;
					endY2=startY2+self.element.height();
				}else{
					startY1=top2-top1;
					startY2=0;
					endY1=startY1+$(this).height();
					endY2=bottom1-top2;
				}
				if(endX2>$(this).width()){
					endX2=$(this).width();
				}else if(endX1>self.element.width()){
					endX1=self.element.width();
				}
				if(endY2>$(this).height()){
					endY2=$(this).height();
				}else if(endY1>self.element.height()){
					endY1=self.element.height();
				}
				for(var i=0;i<endX1-startX1;i++){
					for(var j=0;j<endY1-startY1;j++){
						if(self.getMatrix()[startX1+i][startY1+j]>0 && $(this).sprite("getMatrix")[startX2+i][startY2+j]>0){
							returnVal=true;
							return true;
						}
					}
				}
				returnVal=false;
			});
			return returnVal;
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
			this.timerFlag=window.setInterval(function(){
				self.nextFrame();
				self.element.
					css("background-position",(-self.frames[self.frame].x)+"px "+(-self.frames[self.frame].y)+"px");
				self.step.apply(self.element,new Array({frames:self.options.totalFrames}));
				self.options.totalFrames++;
			},1000/this.options.fps);
		},
		enterFrame:function(fn){
			this.step=fn;
		},
		step:function(){
			
		},
		stop:function(){
			window.clearInterval(this.timerFlag);
		},
		addFunction:function(fn,name){
			this[name]=fn;
			var self=this;
		},
		destroy: function() {
			$.Widget.prototype.destroy.apply(this, arguments); // default destroy
		}
	});
	function SpriteClass(spritesheet,width,height){
		
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
		ctx.drawImage(this.spritesheet[0],x,y,this.width,this.height,0,0,this.width,this.height);
		var pixelMatrix = ctx.getImageData(0,0,this.width,this.height).data;
		for(var i=0;i<this.width;i++){
			var column=new Array();
			for(var j=0;j<this.height;j++){
				column.push(pixelMatrix[(j*this.width*4)+(i*4)+3]);
			}
			this.matrix.push(column);

		}
	}
})( jQuery );