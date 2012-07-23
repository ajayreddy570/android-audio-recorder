// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var window = Ti.UI.createWindow({
	backgroundColor:'white',
	layout: 'vertical'
});
var label = Ti.UI.createLabel();
window.add(label);
window.open();

// TODO: write your module tests here
var recorder = require('com.imobble.recorder');

var recording=false;
var recordButton = Ti.UI.createButton({
	title: "record",
	width: 200,
	height: 60
});

recordButton.addEventListener('click', function () {
	Ti.API.info("recording: "+recording);
	if (recording) {
		// in recording state
		recorder.stopRecord();
		recordButton.setTitle("record")
	} else {
		// not in recording state
		recorder.startRecord();
		recordButton.setTitle("stop recording")
	}
	recording = recording? false:true;   
});


var playing=false;
var playButton= Ti.UI.createButton({
	title: "play",
	width: 200,
	height: 60
});

playButton.addEventListener('click', function () {
	Ti.API.info("playing: "+playing);
	if (playing) {
		playButton.setTitle("play")
		recorder.stopPlay();
	} else {
		playButton.setTitle("stop")
		recorder.startPlay();
	}
	playing = playing? false:true;
});


window.add(recordButton);
window.add(playButton);

/*
if (Ti.Platform.name == "android") {
	var proxy = recorder.createExample({
		message: "Creating an example Proxy",
		backgroundColor: "red",
		width: 100,
		height: 100,
		top: 100,
		left: 150
	});

	proxy.printMessage("Hello world!");
	proxy.message = "Hi world!.  It's me again.";
	proxy.printMessage("Hello world!");
	window.add(proxy);
}

*/
