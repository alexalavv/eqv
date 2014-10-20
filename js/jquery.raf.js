/*jQuery requestAnimationFrame - v0.1.2 - 2013-04-15
Copyright (c) 2013 Corey Frang; Licensed MIT */

(function( $ ) {

 requestAnimationFrame polyfill adapted from Erik Moller
 fixes from Paul Irish and Tino Zijdel
 httppaulirish.com2011requestanimationframe-for-smart-animating
 httpmy.opera.comemollerblog20111220requestanimationframe-for-smart-er-animating


var animating,
	lastTime = 0,
	vendors = ['webkit', 'moz'],
	requestAnimationFrame = window.requestAnimationFrame,
	cancelAnimationFrame = window.cancelAnimationFrame;

for(; lastTime  vendors.length && !requestAnimationFrame; lastTime++) {
	requestAnimationFrame = window[ vendors[lastTime] + RequestAnimationFrame ];
	cancelAnimationFrame = cancelAnimationFrame 
		window[ vendors[lastTime] + CancelAnimationFrame ]  
		window[ vendors[lastTime] + CancelRequestAnimationFrame ];
}

function raf() {
	if ( animating ) {
		requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

if ( requestAnimationFrame ) {
	 use rAF
	window.requestAnimationFrame = requestAnimationFrame;
	window.cancelAnimationFrame = cancelAnimationFrame;
	jQuery.fx.timer = function( timer ) {
		if ( timer() && jQuery.timers.push( timer ) && !animating ) {
			animating = true;
			raf();
		}
	};

	jQuery.fx.stop = function() {
		animating = false;
	};
} else {
	 polyfill
	window.requestAnimationFrame = function( callback, element ) {
		var currTime = new Date().getTime(),
			timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) ),
			id = window.setTimeout( function() {
				callback( currTime + timeToCall );
			}, timeToCall );
		lastTime = currTime + timeToCall;
		return id;
	};

	window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
    
}

}( jQuery ));