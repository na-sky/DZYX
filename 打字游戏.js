 function Typegame(){
     this.num=3;
     this.scor=0;
     this.stage=1;
     this.letterObj={}
     this.createScene()
     this.play() 
     this.keydown();
  }
//场景   创建字母  消除字母   如何开始 如何过关 如何结束 
Typegame.prototype={
 	createScene:function(){
       $("<div class='scene'></div>").appendTo("body").css({
          width:"100%",height:$(window).height(),position:"relative",border:"1px solid #fff",overflow:"hidden"
       }) 
       $("<div class='scor'>0</div>").appendTo("body") 
 	},
 	createLetter:function(){
 	  do{
 	  var randomNum=Math.floor(Math.random()*26+65)
 	  var randomLetter=String.fromCharCode(randomNum)
       }while(this.letterObj[randomLetter])
      do{ 
 	  var randomLeft=Math.round(Math.random()*1000)
 	  }while(this.checkLeft(randomLeft))
 	  var randomTop=-Math.round(Math.random()*100)
      var that=this;
 	  var ele=$("<div></div>").css({
 	   	 width:100,
      height:100,lineHeight:"100px",position:"absolute",left:randomLeft,top:randomTop,background:"url(images/"+randomLetter+".png) center no-repeat",backgroundSize:"contain"
 	   }).appendTo(".scene").animate({top:$(window).height()},8000,"linear",function(){
 	   	   	  that.num=3;
            that.scor=0;
            that.stage=1;
           $.each(that.letterObj,function(index,value){
               value.el.stop()
               value.el.remove()
            })
            that.letterObj={} 
 	   	      that.createFailBord()
 	   })
     this.letterObj[randomLetter]={start:randomLeft-100,end:randomLeft+100,keycode:randomNum,el:ele};
 	},
 	play:function(){
 		for (var i = 0; i <this.num; i++) {
 			this.createLetter()
 		};
 	},
 	checkLeft:function(left){
 		var flag=false;
 		$.each(this.letterObj,function(index,value){
           if(left>value.start&&left<value.end){
           	 flag=true;
           }
 		})
 		return flag;
 	},
 	keydown:function(){
 		var that=this;
       $(document).keydown(function(e){
        var code=e.keyCode;
        var letter=String.fromCharCode(code)
        if(that.letterObj[letter]){
          var value=that.letterObj[letter];
          value.el.stop()
          value.el.remove()
          delete that.letterObj[letter]
          that.createLetter()
          that.scor++;
          $(".scor").html(that.scor)
          if(that.scor>=that.stage*10){
           that.scor=0;
           that.stage++;
           that.num++;
           $.each(that.letterObj,function(index,value){
           value.el.stop()
           value.el.remove()
           })  
           that.letterObj={};
           that.createStageBord()
         }
        }
       })
 	},
 	createStageBord:function(){
 		var that=this;
 		var btn=$("<div class='btn'></div>").click(function(){
          that.play() 
          $(".scor").html(0) 
          $(this).parent().remove()
 		})
 		$("<div class='bord'><img src='images/success.jpg'></div>").appendTo("body").append(btn)
 	},
 	createFailBord:function(){
 		var that=this;
 		var btn=$("<div class='btn'></div>").click(function(){
 		$(".scor").html(0)
          that.play()  
          $(this).parent().remove()
 		})
 		$("<div class='bord'><img src='images/fail.jpg'></div>").appendTo("body").append(btn)
 	}
 }       
