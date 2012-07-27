var window = Ti.UI.createWindow({
    backgroundColor:'white',
    layout: 'vertical'
});
window.open();

var recorder = require('com.imobble.recorder');
// approot default to /sdcard
// file name is audio.3gp
var tmpDir = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory);
recorder.approot = tmpDir.getNativePath().substr(7); // remove path header

var startRecordButton = Ti.UI.createButton({
    title: "Start Record",
    width: 200,
    height: 60
});

var stopRecordButton = Ti.UI.createButton({
    title: "Stop Record",
    enable: false,
    width: 200,
    height: 60
});
var startPlayButton = Ti.UI.createButton({
    title: "Start Play",
    enable: false,
    width: 200,
    height: 60
});
var stopPlayButton = Ti.UI.createButton({
    title: "Stop Play",
    enable: false,
    width: 200,
    height: 60
});

window.add(startRecordButton);
window.add(stopRecordButton);
window.add(startPlayButton);
window.add(stopPlayButton);

startRecordButton.addEventListener('click', function () {
  recorder.startRecord();
});

stopRecordButton.addEventListener('click', function () {
  recorder.stopRecord();
});


startPlayButton.addEventListener('click', function () {
  recorder.startPlay();
});

stopPlayButton.addEventListener('click', function () {
  recorder.stopPlay();
});
