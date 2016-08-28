
   // jquery动画
 // $(function(){
	// animate() 动画宽高
	// queue() 排列
	//dequeue()队列  必须在queue后面使用
	//delay() 设置延迟时间
	//stop()


// $('.animation') 
// .animate({width:400 },400)
// .delay(1000)
// .queue(function(){
//   $(this).css('backgroundColor','black').dequeue();
// })
// .animate({height:400},1000)


//    // 子弹发射
// for (var i = 0; i <10; i++) {

// var w = Math.floor(Math.random()*10+10);
// var r = Math.floor(Math.random()*255);
// var g = Math.floor(Math.random()*255);
// var b = Math.floor(Math.random()*255);
// var left = Math.floor(Math.random()*$(document).width());
// var top = Math.floor(Math.random()*$(document).height());
// $('<div>')   /*jqery创建DIV*/
// .addClass('zidan')  /*创建的div起名字*/
// .width(w)
// .height(w)
// .css({
// 	backgroundColor:'rgba('+r+','+g+','+b+',1)'
// })
// .appendTo('body')/*把创建下的返回大盒子里*/
// .delay(i*200)
//  .animate({
//  	left:left,
//  	top:top,
//  })	
// };

// })
 $(function(){
    $('.wanfa').click(function(){
      $(".content").toggle(1000)
    })
   
    $('.wanfa1').click(function(){

     // 扑克牌
     var poker = []; //定义一个数组生成一副扑克牌
     var colors = ['c','h','d','s'];//定义花色
     var biao = {}; //定义个空表格借助一个空表格去除重复的扑克牌
     while( poker.length < 52){  //拍的张数
        var huase = colors [Math.floor(Math.random()*4)]; //花色数组里随机取花色
        var shuzi = Math.ceil(Math.random()*13); //每个颜色的扑克牌的张数
        var item = { 
            huase : huase,
            shuzi : shuzi
        };
            //去除重复的扑克牌 
        if( ! biao[huase + '-' + shuzi] ){   //取反
        poker.push(item);
        biao[huase + '-' + shuzi] = true;
       }  
     }
     // console.table(poker); //console后台测试是否生成扑克


   
     //创建一了表 代表每一张的名字
     var biao2 = {
        1:'A',
        2:'2',
        3:'3',
        4:'4',
        5:'5',
        6:'6',
        7:'7',
        8:'8',
        9:'9',
        10:'10',
        11:'J',
        12:'Q',
        13:'K'
     }
     var d=0;
     var index = 0;
     for (var i = 0; i <7 ; i++) {
     	for (var j = 0; j < i+1; j++) {
     		d+=100;
            index+=1;
               
     		$('<div>')// 创建一个扑克牌的类
     		.addClass('pai shang')//定义创建的扑克牌类名字为pai  在css里设置样式         
     		.css({                
     			backgroundImage:'url(images/'+poker[index].shuzi+poker[index].huase+'.png)'
     		})
        .attr('id',i+'-'+j) 
        .data('shuzi',poker[index].shuzi)         
     		.appendTo('.zhuozi')
     		.delay(d)
     		.animate({
                 top:i*60,
                 left:(6-i)*50+j*100,
                 opacity:1
     		})
     	};
     };

       // 下面的牌
      for (;index < poker.length; index++) {
        d+=100;
        $('<div>')
        .addClass('pai zuo')
        .css({
            backgroundImage:'url(images/'+poker[index].shuzi+poker[index].huase+'.png)'
        })
        .appendTo('.zhuozi')
        .delay(d)
        .data('shuzi',poker[index].shuzi)
        .animate({
            top:510,
            left:120,
            opacity:1
        })       
       }
         //这个就是和为13就消失
       var covered=function(el){
        var x=parseInt(el.attr('id').split('-')[0]);
        var y=parseInt(el.attr('id').split('-')[1]);
        // console.log($('#'+(x+1)+'-'+y).length)
        return $('#'+(x+1)+'-'+y).length || $('#'+(x+1)+'-'+(y+1)).length;
       }

       // 给所有的牌添加点击事件
        var shangyizhang;
        $('.zhuozi .pai').on('click',function(){
            if($(this).hasClass('shang')){
              if(covered($(this))){
                return;
              }

              // 第一次点击
            if ($(this).data('shuzi')===13){
            $(this).animate({
                top:0,
                left:610,
                opacity:0,
            })
            .queue(function(){
                $(this).remove();
            })

            return;
          }
      }

                          //点击动画
         $(this).toggleClass('chulie');
         if($(this).hasClass('chulie')){
            $(this).animate({top:'-=30'})
         }else{
            $(this).animate({top:'+=30'})
         }

      if(!shangyizhang){
       shangyizhang=$(this)
    }else{
      if(shangyizhang.data('shuzi')+$(this).data('shuzi')===13){
        shangyizhang.delay(400).animate(
      {
       top:0,
       left:600,
         opacity:0
      }).queue(function(){
        $(this).remove()
      })
       $(this).animate(
      {
       top:0,
       left:600,
         opacity:0
      }).queue(function(){
        $(this).remove()
      })  
      }else{
      $('.zhuozi .chulie')
      .removeClass('chulie')
      .animate({top:'+=30'})
    }
    shangyizhang=null;
}
})

var zIndex = 0;
$('.anniu_left').on('click',function(){
  zIndex+=1;
  $('.zhuozi .zuo')
  .eq(-1)
  .removeClass('zuo')
  .addClass('you')
  .animate({
    top:510,
    left:440
  })
  .css({
    zIndex:zIndex
  })
})
  var cishu = 0;
  $('.anniu_right').on('click',function(){
    if($('zuo').length){
       alert('再接再厉哦')
    return;  
  }
  
  cishu += 1;
  if (cishu>3) {
    alert('那边还有哦')
    return;
  };
  $('.you').each(function(i,el){
    $(this)
    .delay(i*50)
    .animate({
      top:510,
      left:120
    })
    .css({
      zIndex:0
    })
    .removeClass('you')
    .addClass('zuo')
  })
  })
   })
 $('.zailaiyici').on('click',function(){
  location.reload();
 })
    
})
