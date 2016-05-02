window.U = window.U || {};
(function() {
    var current = 'big';
    var fadedLayer = $('.faded-layer');
    var menuDelay = 200; //Delay for menu animations
	var delay = 300;
	var open = false;
	var scrollSpot = 50;
	var $headerEl = $('header .header');

	var header = {
		$preHeaderEl: $('.preheader'),
		$logoEl: $headerEl.find('.logo'),
		$logoImageEl: $headerEl.find('.logo img'),
		$ulEl: $headerEl.find('ul'),
		$liEl: $headerEl.find('li'),
		$aEl: $headerEl.find('ul li a'),
		$contactLinkEl: $headerEl.find('.contact-link'),
		$loginEl: $headerEl.find('.login'),
		$signupEl: $headerEl.find('.signup'),

		//Collapsed nav bar
		smallHeader: function(delay) {

			//General
			$headerEl.animate({height: '52px'}, delay);
			header.$preHeaderEl.slideUp(delay);

			//Logo
			header.$logoEl.animate({marginRight: 27, width: '92px'}, delay);
			header.$logoImageEl.animate({top: 10}, delay);

			//Navigation
			header.$liEl.css({'font-size':'14px'});
			header.$aEl.hover(function(){
				$(this).css({'background-color':'rgba(249, 249, 249, 0.7)'});
			}, function(){
				$(this).css({'background-color':''});
			});
			header.$contactLinkEl.css({'display':'block'});
			header.$liEl.animate({lineHeight: "49px"}, delay);

			//Signup & Login
			header.$loginEl.animate({padding: '4px 10px'}, delay);
			header.$signupEl.animate({padding: '4px 10px'}, delay);
		},

		//Normal sized nav bar
		bigHeader: function(delay) {

			//General
			$headerEl.animate({height: '69px'}, delay);
			header.$preHeaderEl.slideDown(delay);

			//Logo
			if($(window).width() >= 1199){
				header.$logoEl.animate({marginRight: 54, width: '140px'}, delay, '', function(){
					header.$logoEl.css({'margin-right':''});
				});
			}else{
				header.$logoEl.animate({marginRight: 27, width: '140px'}, delay, '', function(){
					header.$logoEl.css({'margin-right':''});
				});
			}
			header.$logoImageEl.animate({top: 15}, delay);

			//Navigation
			header.$liEl.css('font-size', '');
			header.$aEl.hover(function(){
				$(this).css({'background-color':''});
			}, function(){
				$(this).css({'background-color':''});
			});
			header.$contactLinkEl.css({'display':''});
			header.$liEl.animate({lineHeight: "69px"}, delay);

			//Signup & Login
			header.$loginEl.animate({padding: '7px 15px'}, delay);
			header.$signupEl.animate({padding: '7px 15px'}, delay);
		},

		//Resetting of the navbar into normal state, especially during window resizes
		resetHeader: function() {
			header.$logoEl.css({'margin-right': '', 'width': ''});
			header.$loginEl.css({'padding': ''});
			header.$signupEl.css({'padding': ''});
			$headerEl.css({'height': ''});
			header.$preHeaderEl.show();
			header.$logoImageEl.css({'top': ''});
			header.$liEl.css('font-size', '');
			header.$aEl.hover(function(){
				$(this).css({'background-color':''});
			}, function(){
				$(this).css({'background-color':''});
			});
			header.$liEl.css({'lineHeight': '69px'});
		}
	};

	var delayResize = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();

	U.smallHeader = header.smallHeader;
	U.bigHeader = header.bigHeader;
	U.resetHeader = header.resetHeader;
	var $ulEl = $headerEl.find('ul');
	var menuWrapEl = $('#menu-btn-wrap');
	var $liLoginEl = $headerEl.find('li.menu-login');

	$(window).scroll(function() {
		if ($(window).scrollTop() > scrollSpot && current == 'big') {
			if($(window).width() > 991) {
				U.smallHeader(delay);
				current = 'small';
			}
		} else if ($(window).scrollTop() <= scrollSpot && current == 'small') {
			U.bigHeader(delay);
			current = 'big';
		}
	});

	//Readjust the header when a user resizes depending on the dimensions
	$(window).resize(function(){
		delayResize(function() {
			if ($(window).width() <= 991) {
				U.resetHeader();
				current = 'big';
			}else{
				closeMenu();
			}
		}, 100);
	});

	//Open/close menu
	menuWrapEl.click(function(){
		toggleMenu();
	});

	//Close menu if outside of the menu area is clicked
	fadedLayer.click(function(){
		closeMenu();
	});

	//Close menu if esc key is pressed
	$(document).keyup(function(e) {
		if (e.keyCode == 27){
			closeMenu();
		}
	});

	//Toggle mobile menu on/off
	function toggleMenu(){
		menuWrapEl.find('#menu-btn').toggleClass('open');
		fadedLayer.toggle();

		if(open == false){
			$ulEl.toggle();
			menuWrapEl.css({'border-right':'1px solid #e7e7e7', 'border-bottom':'1px solid #fff'});
			$liLoginEl.css({'left':'0'});
			$ulEl.animate({left: 0}, menuDelay);
			open = true;
		}else{
			menuWrapEl.css({'border-right':'', 'border-bottom':''});
			$liLoginEl.css({'left':''});
			$ulEl.animate({left: -250}, menuDelay, '', function(){
				$ulEl.toggle();
			});
			open = false;
		}
	}

	//Reset the menu to closed state
	function closeMenu(){
		//header.$contactLinkEl.css({'display':''});
		menuWrapEl.find('#menu-btn').removeClass('open'); //reset menu morph icon
		menuWrapEl.css({'border-right':''});
		menuWrapEl.css({'border-bottom':''});
		$ulEl.css({'left': '', 'display':''});
		fadedLayer.hide();
		open = false;
	}
})();

//BACK TO TOP FUNCTIONALITY
$(document).ready(function(){

    $('body').css('position','relative');
    var backToTop = $('#climb-to-top');
    var speed = 500;
    var affixInit = false;
    $('#myAffix').affix({
        offset: {
            top: 0,
            bottom: function () {
                return 924;
            }
        }        
    });
    
    //User scrolling
    $(window).scroll(function(){
        windowTop = $(window).scrollTop();

        //Persist even on mobile devices
        if (windowTop >= 368){
            backToTop.fadeIn(speed);
        }else{
            backToTop.fadeOut(speed);
        }
    });

    //User window resize
    $(window).resize(function(){
        windowTop = $(window).scrollTop();
        
        if (windowTop >= 368) {
            backToTop.fadeIn(speed);            
        } 
        else{
            backToTop.fadeOut(speed);
        }
        
        if(windowTop >= 1040 ){            
            $(window).trigger('resize');
        }
    });
    
    //When the button is clicked it takes the viewer to the top of the page
    $('#climb-to-top a').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 500); 
        return false; 
    }); 
       
    setTimeout(function() { $("#myAffix").affix('checkPosition'); }, 100);
});