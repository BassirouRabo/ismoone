/***********************
Big Gallery
Author: Jan Skwara
***********************/

var hovered = false;
var menu_hovered = false;
var left=false;
var right=true;
var thumb_shown=false;


//variables
var w_width = $(window).width();
var w_height = $(window).height();
var $loader;
var $gallery_img;
var $gallery;
var $logo;
var $menu_show;
var $menu_hide;
var $menu;
var $page;
var $body;
var $gallery_show;
var $mini_cont;
var $mini_prev;
var $mini_next;
var $thumbnails;
var $left;
var $right;
var $desc_info;
var fullscreen;
var play;
var sound;
var myPlayer;

$(document).ready(function() {



/***** INITIALIZATION *****/



	//SET CONFIG 
  if(typeof homePage !== 'undefined' && homePage==true)
	{
    autoplay = autoplayHome;
		slideSize = slideSizeHome;
		soundplay = soundplayHome;
	}
	
	$body = $("body");
	$loader=$("#loader");
	$gallery=$("#gallery");
	$logo=$("#logo");
	$menu_show=$("#menu-show");
	$menu_hide=$("#menu-hide");
	$menu=$("#menu");
	$page = $("#page");
	$gallery_show=$("#gallery-show");
	$mini_cont=$("#mini_cont");
	$gallery_hide=$("#gallery_hide");
	$mini_prev=$("#mini_prev");
	$mini_next=$("#mini_next");
	$thumbnails=$("#thumbnails");
	$left=$("#left");
	$right=$("#right");
	$desc_info=$("#desc_info");
	$video_desc_info=$("#video_desc_info");
	$fullscreen=$("#fullscreen");
	$play=$("#play");
	$sound=$("#sound");
	$video_play=$("#video_play");
	$video_sound=$("#video_sound");
  $background_img=$("#background img");	
	
	
	
	//LOADER ICON POSITION
	
	
	
	$loader.css("left",(w_width - $loader.innerWidth())/2 + "px");
	$loader.css("top",(w_height - $loader.innerHeight())/2 + "px");
	$loader.css("display","block");
	
 $background_img.css("width",w_width + "px");
 $background_img.css("visibility","visible");
 
 
 
  //POSITIONING LOGO AND MENU
	
	
	
	$logo.css("margin-left",(w_width- 960)/2 + "px");
	$menu_show.css("margin-left",(w_width - 960)/2 + "px")
	$menu.css("margin-left",(w_width - 960)/2 + "px")
	$logo.fadeTo('fast',1);
	$menu_show.fadeTo('fast',1);
	$desc_info.css('right',(w_width- 960)/2 +'px');
	$video_desc_info.css('right',(w_width- 960)/2 +'px');
	$fullscreen.css('left',(w_width - 960)/2  + $logo.innerWidth() + 30 +'px');
	$play.css('left',(w_width - 960)/2  + $logo.innerWidth() + ($fullscreen.innerWidth() ? (10 + $fullscreen.innerWidth()): 0) + 30 +'px');
	$sound.css('left',(w_width - 960)/2  + $logo.innerWidth()  + 30 + ($fullscreen.innerWidth() ? (10 + $fullscreen.innerWidth()): 0)  + ($play.innerWidth() ? (10+$play.innerWidth()) : 0) +'px');
	$video_play.css('left',(w_width - 960)/2  + $logo.innerWidth() + ($fullscreen.innerWidth() ? (10 + $fullscreen.innerWidth()): 0) + 30  +'px');
	$video_sound.css('left',(w_width - 960)/2  + $logo.innerWidth() +  30 + ($fullscreen.innerWidth() ? (10 + $fullscreen.innerWidth()): 0)  + ($video_play.innerWidth() ? (10+$video_play.innerWidth()) : 0) +'px');
	$menu_hide.css("margin-left",(w_width - 960)/2 + "px")
	$menu_hide.css("top",$logo.innerHeight() + $menu.innerHeight() +"px");


	
	//PATTERNS
	
	
	
	if(videopattern==true) $("#video-pattern").css("visibility","visible");
	if(imgpattern==true) $("#img-pattern").css("visibility","visible");
	
	
	
	//POSITIONING PAGE
	
	
	
	if($page.length) 
	{
		$page.css("left",((w_width - 960)/2 + $logo.innerWidth() + 30)  + "px");
		$page.fadeTo('fast',1);
	} //end if
  else
	{
	
	

	//SETTING WIDTH AND HEIGHT OF GALLERY
	
	
	
	$gallery_img = $("#gallery img");
	$body.css("height",w_height + "px");	
	if(slideSize=='width')
	{  $gallery_img.css("width",w_width + "px"); }
  else if(slideSize=='height')
	{	$gallery_img.css("height",w_height + "px"); }
	else
	{	$gallery_img.css("height",(slideSize + "px")); }
		
	$("#slider").css("width",w_width + "px");
	$gallery.css("width",w_width + "px");
	
	
	
	//POSITIONING THUMBANILS GALLERY
	
	
	
	$gallery_show.css("margin-left",(w_width - 960)/2 + "px")
	$mini_cont.css("left",(w_width - $mini_cont.innerWidth())/2 + "px");
	$gallery_hide.css("left",(w_width - $mini_cont.innerWidth())/2 + "px");
	$gallery_hide.css({bottom:-w_height- $gallery_hide.innerHeight() + 'px'});
	$mini_prev.css("bottom",($mini_cont.innerHeight() - $mini_prev.innerHeight() )/2 + $("#bottom-line").innerHeight()/2);
	$mini_next.css("bottom",($mini_cont.innerHeight() - $mini_prev.innerHeight() )/2 + $("#bottom-line").innerHeight()/2);
	$mini_cont.css({bottom:-w_height- $mini_cont.innerHeight()-$gallery_hide.innerHeight() + 'px'});
	
	
	
	//ADDING ATRIBUTES TO GALLERY ITEMS, DESCRIPTIONS AND THUMBNAILS
	
	
	
	$gallery_img.each(function( num ) {
		$(this).attr( 'id', 'item_' + (num+1) );
		
	});
	$("#desc_cont > div").each(function( num ) {
		$(this).attr( 'id', 'desc_item_' + (num+1) ); 
		if($('#desc_item_' + (num+1)).html()) $('#item_' + (num+1)).css('cursor','pointer');
	});
	
		$("#videos > div").each(function( num ) {
			$(this).attr( 'id', 'vid_item_' + (num+1) ); 
	});
		
	$("#thumbnails a").each(function( num ) {
  $(this).attr( 'class', 'caroufredsel');
	var l = $gallery_img.length;
	if(num==0)
		$(this).attr( 'href', '#item_' + (l - 1));
	else if(num==1)
		$(this).attr( 'href', '#item_' + (l));
	else
		$(this).attr( 'href', '#item_' + (num - 1));
		});	
  } //end else
	
	
		
/***** SHOW / HIDE MENU *****/


		
	if($page.length) 
	{	
			$menu.fadeIn('fast');
			
	}
	else
	{
		$menu.hover(function()  {hovered=true; menu_hovered=true;},
			function() {  
					window.setTimeout(function() {
				//alert(menu_hovered);
				   if(menu_hovered == false)
					 {
							$menu.fadeOut('slow');
							$menu_hide.fadeOut('slow');
					}
		},300);
				hovered=false;
				menu_hovered=false;	
			});  
		$menu_show.hover(function()  {  
				hovered = true;
				$menu.stop().fadeIn('slow');
				$menu_hide.stop().fadeIn('slow');
			}, function() { hovered = false});  
	}
	
	
	
/***** SUPERFISH MENU *****/


	
	$("ul.sf-menu").superfish({ 
            animation: {height:'show'},   // slide-down effect without fade-in 
            delay:     200,               // 1.2 second delay on mouseout 
						autoArrows:  false,
						dropShadows:   false
        }); 
				
				
				
/***** SAFARI & CHROME POSITIONING FIX *****/				
				
				
				
window.setTimeout(function() {$menu_hide.css("top",$logo.innerHeight() + $menu.innerHeight() +"px"); if($page.length) { $menu_hide.fadeTo('fast',1);} },100);				
window.setTimeout(function() {$menu_hide.css("top",$logo.innerHeight() + $menu.innerHeight() +"px");  },600);	
window.setTimeout(function() {	$('.page-footer').children(".shadow-reverse").css("top", $('.page_block').innerHeight() -$('.shadow-reverse').innerHeight()+ 'px'); },1000);



});



$(window).load(function() {



/***** HIDE / SHOW ITEMS *****/



  $loader.fadeOut('slow');
	$fullscreen.css('visibility','visible');
	$play.css('visibility','visible');
	$sound.css('visibility','visible');
	$video_play.css('visibility','visible');
	$video_sound.css('visibility','visible');
	if(!$page.length) 
	{	
		$("#thumbnails_bg").css('visibility','visible');
		$gallery_show.css('visibility','visible');
		$desc_info.attr('class','item_1');
		if(!$('#desc_'+ $desc_info.attr('id')).html()) {$desc_info.css('visibility','visible');}
		$gallery_img.css('visibility','visible');

	
	
	
/***** MAIN CAROUSEL *****/


		
	var cfs = $gallery.carouFredSel({
		padding: 0,
		width: 8000,
		auto: {
				play: autoplay,
				pauseDuration: autoplaySpeed
		},
		scroll: {
				items: 1,
				duration:11,
				onBefore: function(oldItems,newItems) {
						
						var $prev_vid = $("#vid_"+$(newItems.get(1)).attr('id'));
						$prev_vid.css('z-index','-1');
						var $next_vid = $("#vid_"+$(newItems.get(3)).attr('id'));
						$next_vid.css('z-index','-1');
						if(myPlayer) {
						myPlayer.currentTime(0);
						myPlayer.pause();
						}
						
						var old_margin = parseInt($('#slider div.caroufredsel_wrapper').css('margin-left'));
					
						var margin = -$(newItems.get(0)).innerWidth() -$(newItems.get(1)).innerWidth() - $(newItems.get(2)).innerWidth()/2 + w_width/2;
						
						$('#slider div.caroufredsel_wrapper').animate({marginLeft:margin},11);
						
						$("#overlay_r").css("left", (w_width + $(newItems.get(2)).innerWidth()) / 2);
						$("#overlay_l").css("left", (w_width - $(newItems.get(2)).innerWidth()) / 2 - $("#overlay_l").innerWidth());

						$(newItems.get(1)).fadeTo('fast',0.1);
						$(oldItems.get(2)).fadeTo('fast',0.1);
						
						$(newItems.get(2)).fadeTo(2000,1);
						$desc_info.attr('class',$(newItems.get(2)).attr('id'));
						if(!$('#desc_'+ $(newItems.get(2)).attr('id')).html()) {
							$desc_info.css('visibility','hidden');
						}
						else {
							$desc_info.css('visibility','visible');
						}
					}
			},
		items: {
				visible: 5,
				start:-2,
				width: "variable"
		},
		prev: {	
				button: "#scroll_left",
				key: "left"
				
			},
		next: { 
				button: "#scroll_right",
				key: "right"
			}
	});
	

	
	
/***** THUMBNAIL CAROUSEL *****/


	
	var cfs2 = $thumbnails.carouFredSel({
		width: 798,
		padding: 5,
		auto : false,
		infinite:false,
		circular: false,
		items: {
			width: 104,
			visible: 7
		},
		scroll: {
			items: 1,
			duration: 200,
			start:-2,
			easing: "linear"
		},
	prev : { 
		onAfter : function() {
			$mini_next.fadeIn();
			right = true;
			if (scroll_prev) setTimeout(function() { $thumbnails.trigger("prev"); }, 10);
		},
		onEnd: function() {
				$mini_prev.fadeOut();
				left = false;
		}
	},
	next : { 
		onAfter : function() {
		     //alert('next');
				$mini_prev.fadeIn();
				left = true;
			if (scroll_next) setTimeout(function() { $thumbnails.trigger("next"); }, 10);
		},
		onEnd: function() {
				$mini_next.fadeOut();
				right = false;
		}
	}
	});

	//INITIAZING SMALL ARROWS FOR THUMBNAILS SCROLL
	$mini_prev.hover(
	function() { 
		scroll_prev = true;
		$thumbnails.trigger("prev"); 
	},
	function() { 
		scroll_prev = false;
	}
).click(function() {
	return false;
});
$mini_next.hover(
	function() { 
		scroll_next = true;
		$thumbnails.trigger("next"); 
	},
	function() {
		scroll_next = false;
	}
).click(function() {
	return false;
});

 
 $thumbnails.children("a").hover(
		function() { 
		$(this).children("img").fadeTo("medium",1);
	},
	function() { 
			$(this).children("img").fadeTo("medium",0.7);
	}
);
	
	
	
	
	//POSITIONING MAIN GALLERY ITEMS
	
	
	
	var obj = $("#gallery img");
	var l = obj.length;
 var $slider_wrapper = $('#slider div.caroufredsel_wrapper');
	
	// slide width
	var slide = $(obj.get(2)).innerWidth();
	var slide2 = $(obj.get(1)).innerWidth();
	var slide3 = $(obj.get(0)).innerWidth()
	
	// negative margin to apply
	var margin = ( ( w_width - slide ) / 2 ) - slide3 - slide2;
	var margin_top = ( ( w_height - $(obj.get(0)).innerHeight() ) / 2 );
	
	// apply negative margin
	$slider_wrapper.css({'overflow':'hidden'});
	$slider_wrapper.css({'margin-left':margin+'px'});
	
	$slider_wrapper.css({'margin-top':margin_top+'px'});
  $(obj.get(2)).fadeTo('fast',1);
	
	$left.css("top",(w_height  - $left.innerHeight() )/2);
	$left.css("left",0);
	
	$right.css("top",(w_height  - $right.innerHeight() )/2);
	$right.css("right",0);
	
	//OVERLAY POSITION
	$("#overlay_r").css("left", (w_width + slide ) / 2);
	$("#overlay_l").css("left", (w_width - slide) / 2 - $("#overlay_l").innerWidth());

	
	
/***** SHOW / HIDE THUMBNAILS*****/
	
	
	
		$("#thumbnails_bg").hover(function()  {},
		function() {  
        thumb_shown=false;
				$($gallery_hide, this).stop().animate({bottom:-w_height - $gallery_hide.innerHeight() + 'px'},{queue:false,duration:1500});
				$($mini_cont, this).stop().animate({bottom:-w_height - $mini_cont.innerHeight() - $gallery_hide.innerHeight() + 'px'},{queue:false,duration:1500}, function() {
					$gallery_show.fadeIn('slow');
				}); 				
     });  
		 
		 $gallery_show.hover(function()  {  
       thumb_shown=true;
			 hovered = true;
			 $gallery_show.fadeOut('slow');
			 $($gallery_hide, this).stop().animate({bottom:  $mini_cont.innerHeight() +'px'},500,"linear");
			 $mini_cont.stop().animate({bottom: '0px'},500,"linear", function() {
				
				if(left) $mini_prev.fadeTo('slow',0.8);
				if(right) $mini_next.fadeTo('slow',0.8);
			});
    }, function() {hovered = false});  

		
		
/***** PHOTO DESCRIPTION  *****/  
	
	

	
		$desc_info.click(function (e) {
	  var slideshow = cfs.configuration("auto.play");
		if($('#desc_'+ $(this).attr('class')).html()) {
			$('#desc_'+ $(this).attr('class')).modal({
				close: true,
				opacity: 0,
				overlayClose: true,
				onShow: function() {
						if(slideshow==true)
						{
								cfs.configuration("auto.play", false);
								$gallery.trigger("play", true);
						}
						$simplemodal_container=$('#simplemodal-container');
						$simplemodal_container.css('height', 'auto');
						$simplemodal_container.css('top', ((w_height -$simplemodal_container.innerHeight())/2)+'px');
						$("#modal_shadow").css('top',(w_height -$simplemodal_container.innerHeight())/2 + $simplemodal_container.innerHeight() - 1 +'px');
						$("#modal_shadow").css('left',$simplemodal_container.css('left'));
						$("#modal_shadow").css('margin-left',$simplemodal_container.css('margin-left'));
						$("#modal_shadow").css('display','block');
				 },
				onClose: function() {
						$("#modal_shadow").css('display','none');
						if(slideshow==true)
						{
								cfs.configuration("auto.play", true);
								$gallery.trigger("play", true);
						}
						$.modal.close();
				 } 
			});
			return false;
		}
	});


	
/***** START / STOP AUTOPLAY  *****/ 



	if(autoplay==true) { $("#play #play_icon").addClass("play_on");}
	else {$("#play #play_icon").addClass("play_off");}
	
	$play.click(function() {
		if($("#play_icon").hasClass("play_on"))
		{
			cfs.configuration("auto.play", false);
			$gallery.trigger("play", true);
			$("#play_icon").removeClass("play_on");
			$("#play_icon").addClass("play_off");
		}
		else
		{
			cfs.configuration("auto.play", true);
			$gallery.trigger("play", true).trigger("next");
			$("#play_icon").removeClass("play_off");
			$("#play_icon").addClass("play_on");		
		}
	});

} //end if
else
{
	$page.css('visibility','visible');
}
	
	
	
/*****MUSIC  *****/ 


if(sound_m4a || sound_oga)
{
 var commend="play";
 if(soundplay==true) { $("#sound_icon").addClass("sound_on"); }
	else {
		$("#sound_icon").addClass("sound_off"); 
		commend = "pause";
	}
	$("#jquery_jplayer_1").jPlayer({
        ready: function () {
          $(this).jPlayer("setMedia", {
            m4a: sound_m4a,
            oga: sound_oga
          }).jPlayer(commend);
        },
				ended: function() { // The $.jPlayer.event.ended event
					$(this).jPlayer("play"); // Repeat the media
				},
        swfPath: "js/jPlayer",
        supplied: "m4a, oga",
				wmode:"window"
      });
	
	
	
		$sound.click(function() {
		if($("#sound_icon").hasClass("sound_on"))
		{
			$("#jquery_jplayer_1").jPlayer("pause");
			$("#sound_icon").removeClass("sound_on");
			$("#sound_icon").addClass("sound_off");
		}
		else
		{
			$("#jquery_jplayer_1").jPlayer("play");
			$("#sound_icon").removeClass("sound_off");
			$("#sound_icon").addClass("sound_on");		
		}
	});	
}
else
{
	$sound.css('visibility','hidden');
}
	
	

/***** FULLSCREEN BUTTON  *****/ 



 $("#fullscreen_icon").addClass("full_on");
	var fullscreen_on = false;
		$fullscreen.click(function() {
		if($("#fullscreen_icon").hasClass("full_on"))
		{
							fullscreen_on = true;
							$menu_show.fadeOut("fast");
							$gallery_show.fadeOut("fast");
							$left.fadeOut("fast");
							$right.fadeOut("fast");
							$desc_info.fadeOut("fast");
							$video_desc_info.fadeOut("fast");
							$play.fadeOut("fast");
							$sound.fadeOut("fast");
							$logo.fadeOut("fast");
							$video_sound.fadeOut("fast");
							$video_play.fadeOut("fast");
							$page.fadeOut("fast");
							$menu.fadeOut("fast");
							$menu_hide.fadeOut("fast");
			$("#fullscreen_icon").removeClass("full_on");
			$("#fullscreen_icon").addClass("full_off");
		}
		else
		{
					fullscreen_on = false;
					$logo.stop(true,true);
					$logo.fadeIn('fast');
					$menu_show.stop(true,true);
					$menu_show.fadeIn('fast');
					if(!thumb_shown)
					{
						$gallery_show.stop(true,true);
						$gallery_show.fadeIn(1000);
					}
					$left.stop(true,true);
					$left.fadeIn('fast');
					$right.stop(true,true);
					$right.fadeIn('fast');
					$desc_info.stop(true,true);
					$desc_info.fadeIn('fast');
					$video_desc_info.stop(true,true);
					$video_desc_info.fadeIn('fast');
					$fullscreen.stop(true,true);
					$play.stop(true,true);
					$play.fadeIn('fast');
					$sound.stop(true,true);
					$sound.fadeIn('fast');
					$video_play.stop(true,true);
					$video_play.fadeIn('fast');
					$video_sound.stop(true,true);
					$video_sound.fadeIn('fast');
					if($page.length) {
						$page.stop(true,true);
						$page.fadeIn('fast');
						$menu.stop(true,true);
						$menu.fadeIn('fast');
						$menu_hide.stop(true,true);
						$menu_hide.fadeIn('fast');
					}
			$("#fullscreen_icon").removeClass("full_off");
			$("#fullscreen_icon").addClass("full_on");		
		}
	});
		
		
		
/***** SHOW / HIDE LOGO, ARROWS, ETC. *****/



	if(!$page.length&&logoHide!=0) 
	{
		var i = 0;
		$mini_cont.hover(function()  {hovered=true;},function()  {hovered=false;});
		$logo.hover(function()  {hovered=true;},function()  {hovered=false;});
		$left.hover(function()  {hovered=true;},function()  {hovered=false;});
		$right.hover(function()  {hovered=true;},function()  {hovered=false;});
		$desc_info.hover(function()  {hovered=true;},function()  {hovered=false;});
		$video_desc_info.hover(function()  {hovered=true;},function()  {hovered=false;});
		$fullscreen.hover(function()  {hovered=true;},function()  {hovered=false;});
		$play.hover(function()  {hovered=true;},function()  {hovered=false;});
		$sound.hover(function()  {hovered=true;},function()  {hovered=false;});
		$video_play.hover(function()  {hovered=true;},function()  {hovered=false;});
		$video_sound.hover(function()  {hovered=true;},function()  {hovered=false;});
		$(window).everyTime(1000,function() {
					i = i + 1;
					if(i==logoHide && hovered==false && fullscreen_on==false) 
					{
							$menu_show.fadeOut(3000);
							$menu_hide.fadeOut(3000);
							$menu.fadeOut(3000);
							$gallery_show.fadeOut(3000);
							$left.fadeOut(3000);
							$right.fadeOut(3000);
							$desc_info.fadeOut(3000);
							$video_desc_info.fadeOut(3000);
							$play.fadeOut(3000);
							$sound.fadeOut(3000);
							$video_play.fadeOut(3000);
							$video_sound.fadeOut(3000);
							$logo.fadeOut(3000, function() { 
							if (!$.browser.webkit ) { $body.css({cursor: 'none'}); }
								});
					}
					if(i==logoHide && hovered==false)  {$fullscreen.fadeOut(3000);if (!$.browser.webkit ) { $body.css({cursor: 'none'});}}
		});
		
		$(document).mousemove(function(event) {
				i = 0;
				if(fullscreen_on==false)
				{
					i = 0;
					$logo.stop(true,true);
					$logo.fadeIn('slow');
					$menu_show.stop(true,true);
					$menu_show.fadeIn('slow');
					if(!thumb_shown)
					{
						$gallery_show.stop(true,true);
						$gallery_show.fadeIn(1000);
					}
					$left.stop(true,true);
					$left.fadeIn('slow');
					$right.stop(true,true);
					$right.fadeIn('slow');
					$desc_info.stop(true,true);
					$desc_info.fadeIn('fast');
					$video_desc_info.stop(true,true);
					$video_desc_info.fadeIn('fast');
					$play.stop(true,true);
					$play.fadeIn('fast');
					$sound.stop(true,true);
					$sound.fadeIn('fast');
					$video_play.stop(true,true);
					$video_play.fadeIn('fast');
					$video_sound.stop(true,true);
					$video_sound.fadeIn('fast');
					
				}
				$fullscreen.stop(true,true);
				$fullscreen.fadeIn('fast');
				if (!$.browser.webkit ) {$body.css({cursor: 'default'});}
		});
	}
	

	
/***** FLOATCENTER *****/
	
	
	
	$("img.floatcenter").parent("a").each(function(index) {
		$(this).css("width",$(this).children('img.floatcenter').css("width"));
		$(this).css("margin","auto");

  });

	
		
/***** QTIP *****/



 if(($qtip=$('.qtip')).length)
 {
		$qtip.qtip({
		  position: { target: 'mouse', adjust: { x: 5, y:25} },
			hide: { effect: { type: 'slide', length: 0 } },
			show: { effect: { type: 'slide', length: 0 } },
			style: {	 
      'padding': '6px',
      'background': '#0c0c0c',
      'color': '#c0c0c0',
      'textAlign': 'center',
			width: { min: 100 },
      border: {
         width: 0,
         color: '#333333'
      },
      tip: { 
         corner: 'topLeft', // We declare our corner within the object using the corner sub-option
         color: '#0c0c0c',
         size: {
            x: 15, // Be careful that the x and y values refer to coordinates on screen, not height or width.
            y : 10 // Depending on which corner your tooltip is at, x and y could mean either height or width!
         }
  }, 
      name: 'dark' // Inherit the rest of the attributes from the preset dark style
   }	 
	});
}

			
			
			
/***** JSCROLLPANE  *****/  
			
			
			
 if($page.length)
 {			
 $('.scroll-pane','#page').css('height',w_height-$('.big_header','#page').outerHeight()-$('.submenu','#page').outerHeight()-$page.css('margin-top').replace('px', '') -$('#page_top').outerHeight() +'px');

			var settings = {
		//showArrows: true,
		hijackInternalLinks: true
	};
		
	 var pane = $('.scroll-pane')
	pane.jScrollPane(settings);
	var api = pane.data('jsp');
	$('.submenu a','#page').click(function() {
	$('.page-footer').children(".shadow-reverse").css("display", "none"); 
	window.setTimeout(function() {
	api.reinitialise(); 
	$('.page-footer').children(".shadow-reverse").css("top", $('.page_block').innerHeight() -$('.shadow-reverse').innerHeight()+ 'px'); 
	$('.page-footer').children(".shadow-reverse").css("display", "block"); 
	window.setTimeout(function() {
		api.reinitialise();
		$('.page-footer').children(".shadow-reverse").css("top", $('.page_block').innerHeight() -$('.shadow-reverse').innerHeight()+ 'px'); 
		},1000)},1000) });
			
	$('.item','#page').each(
		function(index)
		{
			$(this).css('height',$(this).children('img').innerHeight() + 'px');
			$(this).css('width',$(this).children('img').innerWidth() + 'px');
			$(this).css('visibility','visible');
			$(this).stop().fadeTo(0,1);
			$(this).append('<a href="#"  class="loupe"></a>');
			$(this).children(".loupe").css("top",$(this).innerHeight()/2-$(this).children(".loupe").innerHeight()/2 + "px").css('left',$(this).innerWidth()/2-$(this).children(".loupe").innerWidth()/2 + "px");
			$(this).append('<img src="img/shadow.png" class="shadow" />');
			$(this).children(".shadow").css("width",$(this).innerWidth());
			$(this).children(".shadow").css("top",$(this).innerHeight() + 1 +'px');
		});
		$('.item img','#page').stop().fadeTo(0,1);	
		api.reinitialise();			
			
		$(".loupe").click(function() {
			var $loupelink = $(this).parent().children('a').not(".loupe").not(".butt");
			 if($loupelink.hasClass('fancybox') || $loupelink.hasClass('gallery_group'))
				$loupelink.click();
			else
				window.location =$loupelink.attr("href");
		});
		
		$('.blogitem','#page').each(
			function(index)
			{
				$(this).css('height',$(this).children('img').innerHeight() + 'px');
				$(this).css('width',$(this).children('img').innerWidth() + 'px');
				$(this).css('visibility','visible');
				$(this).stop().fadeTo(0,1);
				$(this).children(".mblogfooter").css('left',$(this).innerWidth()/2-$(this).children(".mblogfooter").innerWidth()/2 + "px");
				$(this).append('<img src="img/shadow.png" class="shadow" />');
				$(this).children(".shadow").css("width",$(this).innerWidth());
				$(this).children(".shadow").css("top",$(this).innerHeight() + 1 +'px');
			}
			);
			$('.blogitem img','#page').stop().fadeTo(0,1);	
			api.reinitialise();			
}
			
			
			
/***** IMAGE HOVER  *****/  



	var img_hovered=false;

 if(($item_a=$('.item a').not(".loupe").not(".butt")).length)
 {
	$item_a.not(".loupe").not(".butt").hover(
		function()  {
		  $(this).parent().children('a.loupe').fadeTo(0,1);	
			$(this).next('.details').stop().fadeTo('slow',1);		
			$(this).prev().stop().fadeTo('slow',0.2);	
			//hide all others
			var $selected_item = $(this).parent();
			$('.item','#page').each(
					function(index)
					{
						if($(this)[0] != $selected_item[0])
						{
							
							$(this).children('a.loupe').fadeTo(0,0);
							$(this).children('.details').stop().fadeTo(0,0);
							$(this).children('img').stop().fadeTo(0,1);
					}
			}
			 );			
		},
	  function() {
		var $elements = $(this);
		window.setTimeout(function() {
		//alert("a "+img_hovered);
		 if(img_hovered==false) {
			 $elements.parent().children('a.loupe').fadeTo(0,0);
			 $elements.next('.details').stop().fadeTo('slow',0);
			 $elements.prev().stop().fadeTo('slow',1);	
		}
		},100);
   }
  ); 		
}

	var blogimg_hovered=false;

 if(($blogitem_a=$('.blogitem a.overlay')).length)
 {
	$blogitem_a.hover(
		function()  {

		  $(this).parent().children('div.mblogfooter').stop().fadeTo('slow',1);	
			$(this).next('.details').stop().fadeTo('slow',1);		
			$(this).prev().stop().fadeTo('slow',0.1);	
			//hide all others
			var $selected_item = $(this).parent();
			$('.blogitem','#page').each(
					function(index)
					{
						if($(this)[0] != $selected_item[0])
						{
							$(this).children('div.mblogfooter').fadeOut(0);
							$(this).children('.details').stop().fadeTo(0,0);
							$(this).children('img').stop().fadeTo(0,1);
					}
			}
			 );		
		},
	  function() {
		var $elements = $(this);
		window.setTimeout(function() {
		 if(blogimg_hovered==false) {
			 $elements.parent().children('div.mblogfooter').stop().fadeOut(0);
			 $elements.next('.details').stop().fadeTo('slow',0)
			 $elements.prev().stop().fadeTo('slow',1);	
		}
		},100);
   }
  ); 		
}

 	$(".loupe").mouseover(function(){ 
			$(this).stop().animate({backgroundPosition:"(0 -46px)"}, {duration:400});
			img_hovered=true;
		})
		.mouseout(function(){
			$(this).stop().animate({backgroundPosition:"(0 0)"}, {duration:400});
			img_hovered=false;
		}); 

		
		 	$(".mblogfooter a.butt").mouseover(function(){ 
			blogimg_hovered=true;
		})
		.mouseout(function(){
			blogimg_hovered=false;
		}); 

		
		
/***** TWEETABLE  *****/  


	
	$('#tweets').tweetable({username: twitterUsr, time: false, limit: 5, replies: false, position: 'append'});
	

	
/***** FILTERABLE  *****/  



	$('.submenu').append('<img src="img/shadow.png" class="shadow" />');
	$('.submenu').children(".shadow").css("width",$('.submenu').innerWidth());
	$('.submenu').children(".shadow").css("top",$('div.big_header').innerHeight() + $('.submenu').innerHeight()  +'px');
	
  $('.page-footer').append('<img src="img/shadow_reverse.png" class="shadow-reverse" />');
	$('.page-footer').children(".shadow-reverse").css("width",$('.page-footer').innerWidth());
	$('.page-footer').children(".shadow-reverse").css("top", $('.page_block').innerHeight() -$('.shadow-reverse').innerHeight()+ 'px'); 
	
	$('input:not([type=submit]):not([type=button])').each(
				function(index)
				{
					var position = $(this).position();
					$(this).after('<img src="img/shadow.png" class="shadow" />');
					$(this).next(".shadow").css("width",$(this).innerWidth());
					$(this).next(".shadow").css("top",position.top + $(this).innerHeight() -7);
					$(this).next(".shadow").css("left",position.left);
				}
			);

				$('textarea').each(
				function(index)
				{
					var position = $(this).position();
					$(this).after('<img src="img/shadow.png" class="shadow" />');
					$(this).next(".shadow").css("width",$(this).innerWidth());
					$(this).next(".shadow").css("top",position.top + $(this).innerHeight() -7);
					$(this).next(".shadow").css("left",position.left);
				}
			);
			
	$('.submenu a').click(function() {
		var rel = $(this).attr('rel');
		if(rel=='all')
			$('.item a').attr('rel','gallery_group');
		else
		{
			
			$('.item a').each(function() {
				if($(this).parent().parent().hasClass(rel))
					$(this).attr('rel','gallery_group');
				else
					$(this).attr('rel','');
				});
		}
	});
	
	
	
	/***** FANCYBOX  *****/  

	
	
	$("a[rel=gallery_group]").fancybox({
				'transitionIn'	: 'fade',
				'transitionOut'	: 'elastic',
				'titlePosition'	: 'over'
			});
			
	$("a.fancybox").fancybox({
				'transitionIn'	: 'fade',
				'transitionOut'	: 'elastic',
				'titlePosition'	: 'over'
			});

 if(($mosaic_block=$(".mosaic-block")).length)
 {
	$mosaic_block.each(function( num ) {
		
			alert($(this).find('img').css('width'));
			$(this).css('width',$(this).find('img').innerWidth());
			$(this).css('height',$(this).find('img').innerHeight());
	
	});
}			
	
	
	/***** ICON HOVER  *****/  
		
		

	$("#scroll_left").css( {backgroundPosition: "0 0"} )
		.mouseover(function(){
			$("#arrow_left").stop().animate({backgroundPosition:"(0 -25px)"}, {duration:400});
			$left.fadeTo('slow',0.9);
		})
		.mouseout(function(){
			$("#arrow_left").stop().animate({backgroundPosition:"(0 0)"}, {duration:400});
			$left.fadeTo('slow',0.3);
		});
		
		$("#scroll_right").css( {backgroundPosition: "0 0"} )
		.mouseover(function(){
			$("#arrow_right").stop().animate({backgroundPosition:"(0 -25px)"}, {duration:400});
			$right.fadeTo('slow',0.9);
		})
		.mouseout(function(){
			$("#arrow_right").stop().animate({backgroundPosition:"(0 0)"}, {duration:400});
			$right.fadeTo('slow',0.3);
		});
		$("#desc_info").css( {backgroundPosition: "0 0"} )
		.mouseover(function(){
			$("#desc_info_icon").stop().animate({backgroundPosition:"(0 -25px)"}, {duration:400})
		})
		.mouseout(function(){
			$("#desc_info_icon").stop().animate({backgroundPosition:"(0 0)"}, {duration:400})
		});
		
		$("#video_desc_info").css( {backgroundPosition: "0 0"} )
		.mouseover(function(){
			$("#desc_info_icon").stop().animate({backgroundPosition:"(0 -25px)"}, {duration:400})
		})
		.mouseout(function(){
			$("#desc_info_icon").stop().animate({backgroundPosition:"(0 0)"}, {duration:400})
		});
	
		$("#fullscreen").css( {backgroundPosition: "0 0"} )
		.mouseover(function(){
			$("#fullscreen_icon").stop().animate({backgroundPosition:"(0 -25px)"}, {duration:400})
		})
		.mouseout(function(){
			$("#fullscreen_icon").stop().animate({backgroundPosition:"(0 0)"}, {duration:400})
		});

		$("#play").css( {backgroundPosition: "0 0"} )
		.mouseover(function(){
			$("#play_icon").stop().animate({backgroundPosition:"(0 -25px)"}, {duration:400})
		})
		.mouseout(function(){
			$("#play_icon").stop().animate({backgroundPosition:"(0 0)"}, {duration:400})
		});

		$("#sound")
		.mouseover(function(){
			$("#sound_icon").stop().animate({backgroundPosition:"(0 -25px)"}, {duration:400})
		})
		.mouseout(function(){
			$("#sound_icon").stop().animate({backgroundPosition:"(0 0)"}, {duration:400})
		});
		
		$("#video_play").css( {backgroundPosition: "0 0"} )
		.mouseover(function(){
			$("#play_icon").stop().animate({backgroundPosition:"(0 -25px)"}, {duration:400})
		})
		.mouseout(function(){
			$("#play_icon").stop().animate({backgroundPosition:"(0 0)"}, {duration:400})
		});

		$("#video_sound").css( {backgroundPosition: "0 0"} )
		.mouseover(function(){
			$("#sound_icon").stop().animate({backgroundPosition:"(0 -25px)"}, {duration:400})
		})
		.mouseout(function(){
			$("#sound_icon").stop().animate({backgroundPosition:"(0 0)"}, {duration:400})
		});


		$(".simplemodal-close").css( {backgroundPosition: "0 0"} )
		.mouseover(function(){ 
			$("a.modalCloseImg simplemodal-close").stop().animate({backgroundPosition:"(0 -41px)"}, {duration:400})
		})
		.mouseout(function(){
			$("a.modalCloseImg simplemodal-close").stop().animate({backgroundPosition:"(0 0)"}, {duration:400})
		});
		
		$("#fancybox-close").css( {backgroundPosition: "0 0"} )
		.mouseover(function(){ 
			$(this).stop().animate({backgroundPosition:"(0 -41px)"}, {duration:400})
		})
		.mouseout(function(){
			$(this).stop().animate({backgroundPosition:"(0 0)"}, {duration:400})
		});
		
				$("#fancybox-left-ico").css( {backgroundPosition: "0 0"} )
		.mouseover(function(){ 
			$(this).stop().animate({backgroundPosition:"(0 -41px)"}, {duration:400})
		})
		.mouseout(function(){
			$(this).stop().animate({backgroundPosition:"(0 0)"}, {duration:400})
		});
		
				$("#fancybox-right-ico").css( {backgroundPosition: "0 0"} )
		.mouseover(function(){ 
			$(this).stop().animate({backgroundPosition:"(0 -41px)"}, {duration:400})
		})
		.mouseout(function(){
			$(this).stop().animate({backgroundPosition:"(0 0)"}, {duration:400})
		});
		
		
			$(".sf-menu a").mouseover(function(){ 
			if($(this).parent().children('ul').length > 0)
				{
						$(this).addClass("right_arrow");
				}
			}).mouseout(function(){$(this).removeClass("right_arrow") });
			
			$(".sf-menu ul li a").mouseover(function(){ 
			if($(this).parent().children('ul').length > 0)
				{
						$(this).addClass("right_arrow2");
				}
			}).mouseout(function(){$(this).removeClass("right_arrow2") });
			
		$(".follow li ul li a img")
		.mouseover(function(){
			$(this).stop().animate({"margin-top":"-20px"}, {duration:400})
		})
		.mouseout(function(){
			$(this).stop().animate({"margin-top":"0px"}, {duration:400})
		});
		
		$(".buy li ul li a img")
		.mouseover(function(){
			$(this).stop().animate({"margin-top":"-20px"}, {duration:400})
		})
		.mouseout(function(){
			$(this).stop().animate({"margin-top":"0px"}, {duration:400})
		});
		
		
	
	/***** VIDEO BACKGROUND  *****/  
	
	
	
	$("#video_play #play_icon").addClass("play_on");
	
	if($("#example_video").length)
	{
		if(videopattern==true) $("#video-pattern").css("visibility","visible");
		if(imgpattern==true) $("#img-pattern").css("visibility","visible");
		var myPlayer;
		var play = true;
		_V_("example_video").ready(function(){
			myPlayer = this;
			var player_width= myPlayer.width()
			var player_height = myPlayer.height();
			if(player_width/player_height>=w_width/w_height)
				myPlayer.size(player_width*w_height/player_height,w_height);
			else
				myPlayer.size(w_width,player_height*w_width/player_width);
				
      myPlayer.play();
			if($("#sound_icon").hasClass("sound_off"))  { myPlayer.volume(0);  }	
			});
			
	
		
	$video_sound.click(function() {
		if($("#sound_icon").hasClass("sound_on"))
		{
			myPlayer.volume(0);
			$("#sound_icon").removeClass("sound_on");
			$("#sound_icon").addClass("sound_off");
		}
		else
		{
			myPlayer.volume(1);
			$("#sound_icon").removeClass("sound_off");
			$("#sound_icon").addClass("sound_on");		
		}
	});
	
			$video_play.click(function() {
		if($("#play_icon").hasClass("play_on"))
		{
			myPlayer.pause();
			play=false;
			$("#play_icon").removeClass("play_on");
			$("#play_icon").addClass("play_off");
		}
		else
		{
			myPlayer.play();
			play=true;
			$("#play_icon").removeClass("play_off");
			$("#play_icon").addClass("play_on");		
		}
		});
		if($('#video_desc').html()) $video_desc_info.css('visibility','visible');
		$video_desc_info.click(function (e) {
		if($('#video_desc').html()) {
			//alert($('#desc_'+ $(this).attr('id')).innerHeight());
			$('#video_desc').modal({
				close: true,
				opacity: 0,
				overlayClose: true,
				onShow: function() {
							/* myPlayer.pause(); */
						$simplemodal_container=$('#simplemodal-container');
						$simplemodal_container.css('height', 'auto');
						$simplemodal_container.css('top', ((w_height -$simplemodal_container.innerHeight())/2)+'px');
						$("#modal_shadow").css('top',(w_height -$simplemodal_container.innerHeight())/2 + $simplemodal_container.innerHeight() - 1 +'px');
						$("#modal_shadow").css('left',$simplemodal_container.css('left'));
						$("#modal_shadow").css('margin-left',$simplemodal_container.css('margin-left'));
						$("#modal_shadow").css('display','block');
				 },
				onClose: function() {
						$("#modal_shadow").css('display','none');

						$.modal.close();
				 } 
			});
			return false;
		}
	});
	}
});

/**
 * Background position animation
 * @author Alexander Farkas
 * v. 1.22
 */
 
 
(function($) {
        if(!document.defaultView || !document.defaultView.getComputedStyle){ // IE6-IE8
                var oldCurCSS = $.curCSS;
                $.curCSS = function(elem, name, force){
                        if(name === 'background-position'){
                                name = 'backgroundPosition';
                        }
                        if(name !== 'backgroundPosition' || !elem.currentStyle || elem.currentStyle[ name ]){
                                return oldCurCSS.apply(this, arguments);
                        }
                        var style = elem.style;
                        if ( !force && style && style[ name ] ){
                                return style[ name ];
                        }
                        return oldCurCSS(elem, 'backgroundPositionX', force) +' '+ oldCurCSS(elem, 'backgroundPositionY', force);
                };
        }
 
        var oldAnim = $.fn.animate;
        $.fn.animate = function(prop){
                if('background-position' in prop){
                        prop.backgroundPosition = prop['background-position'];
                        delete prop['background-position'];
                }
                if('backgroundPosition' in prop){
                        prop.backgroundPosition = '('+ prop.backgroundPosition;
                }
                return oldAnim.apply(this, arguments);
        };
 
        function toArray(strg){
                strg = strg.replace(/left|top/g,'0px');
                strg = strg.replace(/right|bottom/g,'100%');
                strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
                var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
                return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
        }
 
        $.fx.step. backgroundPosition = function(fx) {
                if (!fx.bgPosReady) {
                        var start = $.curCSS(fx.elem,'backgroundPosition');
                        if(!start){//FF2 no inline-style fallback
                                start = '0px 0px';
                        }
 
                        start = toArray(start);
                        fx.start = [start[0],start[2]];
                        var end = toArray(fx.end);
                        fx.end = [end[0],end[2]];
 
                        fx.unit = [end[1],end[3]];
                        fx.bgPosReady = true;
                }
                //return;
                var nowPosX = [];
                nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
                nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];           
                fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];
 
        };
})(jQuery);