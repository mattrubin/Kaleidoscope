function Ball(){
	this.x = 0;
	this.y = 0;
	this.dx = Math.random()*4-2;
	this.dy = Math.random()*4-2;
	
	this.radius = 50;
	this.dradius = -Math.random()*.3+.3;
	this.bump = 1;
	this.dbump = -.05;
	
	this.audio = new Audio();
	this.audio.volume = .5;
	
	this.r = Math.round(Math.random()*10);
	this.g = Math.round(Math.random()*10);
	this.b = Math.round(Math.random()*10);
	this.color = 'rgba('+this.r+','+this.g+','+this.b+',.5)'
}



Ball.prototype.setPosition = function(newX, newY){
	this.x = newX; this.y = newY;
}

Ball.prototype.setVelocity = function(newDX, newDY){
	this.dx = newDX; this.dy = newDY;
}

Ball.prototype.advance = function(timeDelta){
	this.x += this.dx*timeDelta;
	if(this.x>canvas.width) this.x = 0;
	if(this.x<0) this.x = canvas.width;
	
	this.y += this.dy*timeDelta;
	if(this.y>canvas.height){
		this.y = canvas.height
		this.dy *= -1;
	}
	if(this.y<0){
		this.y = 0
		this.dy *= -1;
	}
	
	this.radius += this.dradius*timeDelta;
	if(this.radius<10){
		this.radius == 10;
		this.dradius *=-1;
	}
	if(this.radius>50){
		this.radius == 50;
		this.dradius *=-1;
	}
	
	if(this.bump>1) this.bump+=this.dbump*timeDelta;
	if(this.bump>1.2){
		this.bump = 1.2;
		this.dbump*=-1;;
	}
	if(this.bump<1) this.bump=1;
}

Ball.prototype.play = function(){
		var wave = new RIFFWAVE(); // create an empty wave file
		wave.header.sampleRate = 44100;

	    var tempo = 120;

	addFade(wave, Note.C4*Math.pow(2, 2*(canvas.height-this.y)/canvas.height-1), Duration.half, tempo);
	//addNote(wave, Note.A3, Duration.eighth, tempo);
	//addNote(wave, Note.A3, Duration.sixteenth, tempo);
	//addNote(wave, Note.A3, Duration.sixteenth, tempo);


		wave.Make();
		this.audio.src = wave.dataURI;
		this.audio.volume = this.radius/50;
		if(this.audio.volume<0) this.audio.volume==0;
	this.audio.play();
	this.bump = 1.2;
	this.dbump = .05;
}

Ball.prototype.draw = function(context){
	$(canvas).drawArc({
		fillStyle: this.color,
		x: this.x, y: this.y,
		radius: this.radius*this.bump
	})
}