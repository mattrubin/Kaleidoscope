function Playhead(){
	this.x = 0;
	this.dx = 300;
}

Playhead.prototype.advance = function(timeDelta){
	this.x += this.dx*timeDelta;
	if(this.x>canvas.width) this.x = 0;
}

Playhead.prototype.draw = function(context){
	context.beginPath();
	context.moveTo(this.x,0);
	context.lineTo(this.x, canvas.height);
	context.strokeStyle = "rgba(255,255,255,0.1)";
	context.stroke();
}