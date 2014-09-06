$(document).ready(function(){
    MSIE8 = ($.browser.msie) && ($.browser.version == 8),
    MSIE9 = ($.browser.msie) && ($.browser.version == 9),
	$.fn.ajaxJSSwitch({
		topMargin: 253,//mandatory property for decktop
		bottomMargin: 193,//mandatory property for decktop
		topMarginMobileDevices: 253,//mandatory property for mobile devices
		bottomMarginMobileDevices: 193,//mandatory property for mobile devices
        delaySubMenuHide: 400,
        bodyMinHeight: 1100,
		menuInit:function (classMenu, classSubMenu){
        },
		buttonOver:function (item){
        },
		buttonOut:function (item){
        },
		subMenuButtonOver:function (item){
		},
		subMenuButtonOut:function (item){
		},
		subMenuShow:function(subMenu){
        	subMenu.stop(true,true).animate({"height":"show"}, 400, "easeOutCubic");
		},
		subMenuHide:function(subMenu){
        	subMenu.stop(true,true).animate({"height":"hide"}, 500, "easeOutCubic");
		},
		pageInit:function (pages){
		},
		currPageAnimate:function (page){
            page.css({"left":$(window).width()}).stop(true).delay(300).animate({"left":0}, {duration: 500, easing: "easeOutCubic", step: onAnimate, complete: onAnimate});
            $('.nextBtn').stop().animate({'marginLeft':-$(window).width()},500,'easeInOutCubic',function (){$(this).css('display','none')})
            $('.prevBtn').stop().animate({'marginLeft':$(window).width()},500,'easeInOutCubic',function (){$(this).css('display','none')})
		},
		prevPageAnimate:function (page){
            page.stop(true).animate({"display":"block", "left":-$(window).outerWidth()*2}, 700, "easeInCubic");
		},
		backToSplash:function (){
            $('.nextBtn').css({'display':'block'}).stop().animate({'marginLeft':0},500,'easeOutCubic')
            $('.prevBtn').css({'display':'block'}).stop().animate({'marginLeft':0},500,'easeOutCubic')
		},
		pageLoadComplete:function (){
            $('.scroll')
        	.uScroll({			
        		mousewheel:true,
                lay:'outside'
        	});
            
            $('.list2>li>a')
            .prepend('<span class="sitem_over"><strong></strong></span>')
            .attr('rel','Appendix').fancybox();
            
            if ($(".wishesList").length) {
                $('.wishesList').cycle({
                    fx: 'scrollHorz',
                    speed: 800,
            		timeout: 0,                
            		easing: 'easeInOutCubic',
            		cleartypeNoBg: true ,
                    rev:0,
                    startingSlide: 0,
                    wrap: true
          		})
            };
            $('.pagination a').click(function (){
                $(this).parent().siblings().removeClass('active');
                $(this).parent().addClass('active');
                $(".wishesList").cycle($(this).parent().index());
            })
        }
	});
})
$(window).load(function(){
    setTimeout(function (){ $(window).trigger('resize') },600)
    $(".image_resize").image_resize({});
    
    $(".carousel").jCarouselLite({
        btnNext: ".prevBtn",
        btnPrev: ".nextBtn",
        scroll:1,
        visible: 3,
        easing: 'easeInOutCubic',
        speed: 1000,
        auto: 10000   
    });
    
	$("#webSiteLoader").delay(500).animate({opacity:0}, 600, "easeInCubic", function(){$("#webSiteLoader").remove()});
});

function windowH(sel) {
	return (($(window).height()>=parseInt($(sel).css('minHeight')))?$(window).height():parseInt($(sel).css('minHeight')));
}

function onAnimate(){
    var diff, str;
    if (!MSIE9) {
        str = 'body';
    } else{
        str = 'html';
    }
    diff = windowH(str)-1100;
    if (diff >= 0) $('.splash').css({'marginTop': diff*.5})
}1