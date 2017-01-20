    
$(document).ready(function(){

    $(function(){
        $("#about_we").hover(function(){
          $("#about_we_f").slideDown(100);
           },function(){
           $("#about_we_f").slideUp(100);
        });

        $(".img_1").hover(function(){
          $(".img_1").css({"transform":"scale(1.1)"});
           },function(){
           $(".img_1").css({"transform":"scale(1)"});
        });
        $(".img_2").hover(function(){
          $(".img_2").css({"transform":"matrix(1.1,0,0,1.1,0,40)"});
           },function(){
           $(".img_2").css({"transform":"matrix(1,0,0,1,0,40)"});
        });
        $(".img_3").hover(function(){
          $(".img_3").css({"transform":"scale(1.1)"});
           },function(){
           $(".img_3").css({"transform":"scale(1)"});
        });
        $(".img_4").hover(function(){
          $(".img_4").css({"transform":"matrix(1.1,0,0,1.1,0,40)"});
           },function(){
           $(".img_4").css({"transform":"matrix(1,0,0,1,0,40)"});
        });
        $(".img_5").hover(function(){
          $(".img_5").css({"transform":"scale(1.1)"});
           },function(){
           $(".img_5").css({"transform":"scale(1)"});
        });

        /*团队轮播点击事件*/
        $("#index1").click(function(){
          $(".pic_f") .css({"display": "flex","justify-content":"space-between"}) 
          $("#pic1").show()
          $("#pic2").hide()
          $("#pic3").hide()
          $("#pic4").hide()
          $("#index1").css({"background-color":"#fc5825"})
          $("#index4").css({"background-color":"#dddddd"})
          $("#index2").css({"background-color":"#dddddd"})
          $("#index3").css({"background-color":"#dddddd"})
        });
        $("#index2").click(function(){
          $(".pic_f") .css({"display": "flex","justify-content":"space-between"}) 
          $("#pic1").hide()
          $("#pic2").show()
          $("#pic3").hide()
          $("#pic4").hide()
          $("#index2").css({"background-color":"#fc5825"})
          $("#index1").css({"background-color":"#dddddd"})
          $("#index3").css({"background-color":"#dddddd"})
          $("#index4").css({"background-color":"#dddddd"})
        });
        $("#index3").click(function(){
          $(".pic_f") .css({"display": "flex","justify-content":"space-between"}) 
          $("#pic1").hide()
          $("#pic2").hide()
          $("#pic3").show()
          $("#pic4").hide()
          $("#index3").css({"background-color":"#fc5825"})
          $("#index1").css({"background-color":"#dddddd"})
          $("#index2").css({"background-color":"#dddddd"})
          $("#index4").css({"background-color":"#dddddd"})
        });
        $("#index4").click(function(){
          $(".pic_f") .css({"display": "flex","justify-content":"space-between"})
          $(".pic_f4").css({"width":"410px"})
          $("#pic1").hide()
          $("#pic2").hide()
          $("#pic3").hide()
          $("#pic4").show()
          $("#index4").css({"background-color":"#fc5825"})
          $("#index1").css({"background-color":"#dddddd"})
          $("#index2").css({"background-color":"#dddddd"})
          $("#index3").css({"background-color":"#dddddd"})
        });
    
    $(function() {
      var showcase = $("#showcase"), title = $('#item-title')
      showcase.Cloud9Carousel({
        yOrigin: 34,
        yRadius: 30,
        farScale:0.65,
        buttonLeft: $("#nav > .left"),
        buttonRight: $("#nav > .right"),
        autoPlay: 0,
        bringToFront: true,
        onRendered: rendered,
        onLoaded: function() {
       showcase.css( 'visibility', 'visible' )
       showcase.css( 'display', 'none' )
       showcase.fadeIn( 1500 )
       }
    })

      
    function rendered( carousel ) {
    a=carousel.nearestIndex()
    title.text( carousel.nearestItem().element.alt)
    var c = Math.cos((carousel.floatIndex() % 1) * 2 * Math.PI)
    title.css('opacity', 0.5 + (0.5 * c))
    if(a==1){
            $(".lyq_txt").show()
            $(".cy_txt").hide()
            $(".cbj_txt").hide()
            $("#img1").css({"opacity":"0.5","cursor": "pointer"})
            $("#img3").css({"opacity":"0.5","cursor": "pointer"})
            $("#img2").css({"opacity":"1","cursor": "auto"})
        }
        else if(a=='0'){
            $(".lyq_txt").hide()
            $(".cy_txt").show()
            $(".cbj_txt").hide()
            $("#img1").css({"opacity":"1","cursor": "auto"})
            $("#img3").css({"opacity":"0.5","cursor": "pointer"})
            $("#img2").css({"opacity":"0.5","cursor": "pointer"})
        }
        else{
            $(".lyq_txt").hide()
            $(".cy_txt").hide()
            $(".cbj_txt").show()
            $("#img1").css({"opacity":"0.5","cursor": "pointer"})
            $("#img3").css({"opacity":"1","cursor": "auto"})
            $("#img2").css({"opacity":"0.5","cursor": "pointer"})
        }
    }

    });
  });  
});
