/* Author: Matt Rubin

*/

var canvas = document.getElementById("canvas");
var balls = [];
var playhead = new Playhead();

function resizeToWindow() {
	canvas.setAttribute("width", $(window).width());
	canvas.setAttribute("height", $(window).height());
    canvas.context.fillStyle = 'rgb(0,0,0)';
    canvas.context.fillRect( 0, 0, canvas.width, canvas.height );
};


$(window).resize(function(){
	waitForFinalEvent(function(){
		//var dataurl = canvas.toDataURL();

		resizeToWindow()
		
		//var img  = new Image();
		//img.src = dataurl;
		//img.onload= function(){
		//	canvas.context.drawImage(img, 0, 0);
		//}
	}, 500, "resize");
});


$(document).ready(function(){
	init();
	animate();
});



function init() {
	document.documentElement.style.overflow = 'hidden';	 // firefox, chrome
	document.body.scroll = "no";	// ie only
	
	extendCanvas(canvas);
	resizeToWindow();
}


function animate(time) {
    requestAnimFrame( animate );
	advance();
    draw();
}

var prevTime = 0;
function advance() {
    var time = new Date().getTime() * 0.002;
	var timeDelta = 0;
	if(time!=0 && prevTime!=0){
		timeDelta = time-prevTime;
	}
	prevTime = time;

	playhead.advance(timeDelta);
	for(var i=0; i<balls.length; i++){
		balls[i].advance(timeDelta);
		if(playhead.x>=balls[i].x && playhead.x-playhead.dx*timeDelta<balls[i].x) balls[i].play();
	}
}
function draw() {
    canvas.context.globalCompositeOperation = "source-over";
    canvas.context.fillStyle = 'rgba(0,0,0,0.03)';
    canvas.context.fillRect( 0, 0, canvas.width, canvas.height );

    canvas.context.globalCompositeOperation = "lighter";

	for(var i=0; i<balls.length; i++){
		balls[i].draw(canvas.context);
		window.status = "Draw "+i;
	}
	//playhead.draw(canvas.context);
}

$(canvas).click(function(event) {
	
	var xx = event.pageX - $(event.target).offset().left;
	var yy = event.pageY - $(event.target).offset().top;
	
	var ball = new Ball();
	ball.x = xx;
	ball.y = yy;
	//alert(ball.color);
	balls[balls.length] = ball;
/*	
	$(canvas).drawArc({
		fillStyle: '#729fcf',
		x: xx, y: yy,
		radius: 50
	})
	*/
	
/*	var audio = new Audio(); // create the HTML5 audio element
	var wave = new RIFFWAVE(); // create an empty wave file
	wave.header.sampleRate = 44100;
	
    var tempo = 120;

addNote(wave, Note.C4*Math.pow(2, 2*(canvas.height-yy)/canvas.height-1), Duration.eighth, tempo);
//addNote(wave, Note.A3, Duration.eighth, tempo);
//addNote(wave, Note.A3, Duration.sixteenth, tempo);
//addNote(wave, Note.A3, Duration.sixteenth, tempo);


	wave.Make();
	ball.audio.src = wave.dataURI;
*/
	balls[balls.length] = ball;

});