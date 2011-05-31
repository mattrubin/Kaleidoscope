//var A4 = 440;
//var samplesPerA4 = sampleRate/A4;
//var A4Quotient = samplesPerA4/(2*Math.PI);
var halfStep = Math.pow(2,1/12)

var Interval = {
	unison				: 1,
	perfectUnison		: 1,
	diminishedSecond	: 1,
	
	minorSecond			: halfStep,
	augmentedUnison		: halfStep,
	semitone			: halfStep,
	
	second				: Math.pow(halfStep,2),
	majorSecond			: Math.pow(halfStep,2),
	diminishedThird		: Math.pow(halfStep,2),
	
	minorThird			: Math.pow(halfStep,3),
	augmentedSecond		: Math.pow(halfStep,3),
	
	third				: Math.pow(halfStep,4),
	majorThird			: Math.pow(halfStep,4),
	diminishedFourth	: Math.pow(halfStep,4),
	
	fourth				: Math.pow(halfStep,5),
	perfectFourth		: Math.pow(halfStep,5),
	augmentedThird		: Math.pow(halfStep,5),
	
	diminishedFifth		: Math.pow(halfStep,6),
	augmentedFourth		: Math.pow(halfStep,6),
	tritone				: Math.pow(halfStep,6),
	
	fifth				: Math.pow(halfStep,7),
	perfectFifth		: Math.pow(halfStep,7),
	diminishedSixth		: Math.pow(halfStep,7),
	
	minorSixth			: Math.pow(halfStep,8),
	augmentedFifth		: Math.pow(halfStep,8),
	
	sixth				: Math.pow(halfStep,9),
	majorSixth			: Math.pow(halfStep,9),
	diminishedSeventh	: Math.pow(halfStep,9),
	
	minorSeventh		: Math.pow(halfStep,10),
	augmentedSixth		: Math.pow(halfStep,10),
	
	seventh				: Math.pow(halfStep,11),
	majorSeventh		: Math.pow(halfStep,11),
	diminishedOctave	: Math.pow(halfStep,11),
	
	octave				: Math.pow(halfStep,12),
	perfectOctave		: Math.pow(halfStep,12),
	augmentedSeventh	: Math.pow(halfStep,12),
}

var Note = {
	Eb2	: transposeDown(110, Interval.tritone),
	E2	: transposeDown(110, Interval.fourth),
	F2	: transposeDown(110, Interval.third),
	Fs2	: transposeDown(110, Interval.minorThird),
	Gb2	: transposeDown(110, Interval.minorThird),
	G2	: transposeDown(110, Interval.second),
	Gs2	: transposeDown(110, Interval.minorSecond),
	Ab2	: transposeDown(110, Interval.minorSecond),
	A2	: 110,
	As2	: transposeUp(110, Interval.minorSecond),
	Bb2	: transposeUp(110, Interval.minorSecond),
	B2	: transposeUp(110, Interval.second),
	C3	: transposeUp(110, Interval.minorThird),
	Cs3	: transposeUp(110, Interval.third),
	Db3	: transposeUp(110, Interval.third),
	D3	: transposeUp(110, Interval.fourth),
	Ds3	: transposeUp(110, Interval.tritone),
	
	Eb3	: transposeDown(220, Interval.tritone),
	E3	: transposeDown(220, Interval.fourth),
	F3	: transposeDown(220, Interval.third),
	Fs3	: transposeDown(220, Interval.minorThird),
	Gb3	: transposeDown(220, Interval.minorThird),
	G3	: transposeDown(220, Interval.second),
	Gs3	: transposeDown(220, Interval.minorSecond),
	Ab3	: transposeDown(220, Interval.minorSecond),
	A3	: 220,
	As3	: transposeUp(220, Interval.minorSecond),
	Bb3	: transposeUp(220, Interval.minorSecond),
	B3	: transposeUp(220, Interval.second),
	C4	: transposeUp(220, Interval.minorThird),
	Cs4	: transposeUp(220, Interval.third),
	Db4	: transposeUp(220, Interval.third),
	D4	: transposeUp(220, Interval.fourth),
	Ds4	: transposeUp(220, Interval.tritone),
	
	Eb4	: transposeDown(440, Interval.tritone),
	E4	: transposeDown(440, Interval.fourth),
	F4	: transposeDown(440, Interval.third),
	Fs4	: transposeDown(440, Interval.minorThird),
	Gb4	: transposeDown(440, Interval.minorThird),
	G4	: transposeDown(440, Interval.second),
	Gs4	: transposeDown(440, Interval.minorSecond),
	Ab4	: transposeDown(440, Interval.minorSecond),
	A4	: 440,
	As4	: transposeUp(440, Interval.minorSecond),
	Bb4	: transposeUp(440, Interval.minorSecond),
	B4	: transposeUp(440, Interval.second),
	C5	: transposeUp(440, Interval.minorThird),
	Cs5	: transposeUp(440, Interval.third),
	Db5	: transposeUp(440, Interval.third),
	D5	: transposeUp(440, Interval.fourth),
	Ds5	: transposeUp(440, Interval.tritone)
}

var Duration = {
	thirtySecond	: .125,
	sixteenth		: .25,
	eighth			: .5,
	quarter			: 1,
	dottedQuarter	: 1.5,
	half			: 2,
	dottedHalf		: 3,
	whole			: 4,
}

function transposeUp(note, interval){
	return note*interval;
}
function transposeDown(note, interval){
	return note/interval;
}

function addNote(wave, tone, duration, tempo){
	var samplesPerBeat = wave.header.sampleRate * 60/tempo; // samples-per-second * seconds-per-minute / beats-per-minute 
    
	var d = wave.data.length;
	for (var i=0; i<samplesPerBeat*duration-Math.round(samplesPerBeat/20); i++) wave.data[d++] = 128 + Math.round(127 * Math.sin(i/(wave.header.sampleRate/tone/(2*Math.PI))));
	for (var i=0; i<Math.round(samplesPerBeat/20); i++) wave.data[d++] = 128;
}


function addFade(wave, tone, duration, tempo){
	var samplesPerBeat = wave.header.sampleRate * 60/tempo; // samples-per-second * seconds-per-minute / beats-per-minute 
    
	var d = wave.data.length;
	var max = samplesPerBeat*duration;
	for (var i=0; i<max; i++) wave.data[d++] = 128 + Math.round(127 * (1-i/max)  * Math.sin(i/(wave.header.sampleRate/tone/(2*Math.PI))));
}