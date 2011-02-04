$(document).ready(function(){
	$("#stage").draggable();
	spritesheets.
		arrayLoad(function(){
      var isLoaded;
      do{
        isLoaded=true;
        $.each(classes,function(i,val){
          if(!val.completed){
            isLoaded=false;
          }
        });
      }while(isLoaded==true);
			$.jSprites.init();
			$.jSprites.play();
			$("body").click(function(event){
				console.log(event);
			});
		});

});