(function( $ ){
	$.parseInt=function(string){
		var patt=/[0-9]+/g;
		patt.lastIndex=0;
		var parsedString=parseInt(string),
			execString=patt.exec(string),
			parsedExecString=parseInt(execString);
		if(isNaN(parseInt(string))){
			return parsedExecString;
		}else{
			return parsedString;
		}
	};
	var originalCss = jQuery.fn.css;
	jQuery.fn.css = function() {
		var
			attrSupported=["top","left","bottom","right"],
			prefixSupported=["+=","-="];
		if(arguments.length==2 && $.inArray(arguments[0],attrSupported)>-1 && $.inArray(arguments[1].slice(0,2),prefixSupported)>-1){
			var newArgs=new Array();
			newArgs.push(arguments[0]);
			var arg0=this.css(arguments[0]);
			var arg0parsed=$.parseInt(arg0);
			var arg1=$.parseInt(arguments[1]);
			if(arguments[1].slice(0,2)=="+="){
				var newValue=$.parseInt(this.css(arguments[0]))+$.parseInt(arguments[1]);
			}else if(arguments[1].slice(0,2)=="-="){
				var newValue=$.parseInt(this.css(arguments[0]))-$.parseInt(arguments[1]);
			}
			newArgs.push(newValue);
			return originalCss.apply(this,newArgs);
		}
		return originalCss.apply(this, arguments);
	};
	$.fn.arrayLoad=function(fn,arguments){
		var
			self=this,
			length=this.length,
			i=0;
		this.load(function(){
			i++;
			if(i==length){
				fn.apply(this,arguments);
			}
		})
		return this;
	};
})( jQuery );