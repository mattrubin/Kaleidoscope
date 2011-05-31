/* Author: Matt Rubin

*/

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var playhead = new Playhead();
var balls = [];


function resizeToWindow() {
	canvas.setAttribute("width", $(window).width());
	canvas.setAttribute("height", $(window).height());
	// Canvas is reset by the resize, so don't worry about the composite mode
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect( 0, 0, canvas.width, canvas.height );
};


$(window).resize(function(){
	waitForFinalEvent(function(){
		resizeToWindow()
	}, 500, "resize");
});


$(document).ready(function(){
	init();
	animate();
});



function init() {
	document.documentElement.style.overflow = 'hidden';	 // firefox, chrome, safari, etc.
	document.body.scroll = "no";	// ie only
	
	resizeToWindow();
}


function animate(time) {
    requestAnimFrame( animate );
	advance();
    draw();
}

var prevTime = 0;
var oldPlayX = 0;
function advance() {
    var time = new Date().getTime() * 0.002;
	var timeDelta = 0;
	if(time!=0 && prevTime!=0){
		timeDelta = time-prevTime;
	}
	prevTime = time;
	
	oldPlayX = playhead.x;
	playhead.advance(timeDelta);
	for(var i=0; i<balls.length; i++){
		balls[i].advance(timeDelta);
		if(playhead.x>=balls[i].x && oldPlayX<balls[i].x) balls[i].play();
	}
}

function draw() {
    context.globalCompositeOperation = "source-over";
    context.fillStyle = 'rgba(0,0,0,0.03)';
    context.fillRect( 0, 0, canvas.width, canvas.height );

    context.globalCompositeOperation = "lighter";
	for(var i=0; i<balls.length; i++){
		balls[i].draw(context);
		window.status = "Draw "+i;
	}
	//playhead.draw(context);
}

$(canvas).click(function(event) {
	var ball = new Ball();
	ball.x = event.pageX - $(event.target).offset().left;
	ball.y = event.pageY - $(event.target).offset().top;
	balls[balls.length] = ball;
});