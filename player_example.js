var StreamPlayer = require('stream-player');
var player = new StreamPlayer();
var Leap = require('leapjs');
var loudness = require('loudness');

 // Create a new instance of node-core-audio 
// Grab a buffer 
// var coreAudio = require("node-core-audio");
// var engine = coreAudio.createNewAudioEngine();

// Add a song url to the queue 
player.add('./j5.mp3');
 
// Add a song url to the queue along with some metadata about the song 
// Metadata can be any object that you want in any format you want 
var metadata = {
  "title": "Some song",
  "artist": "Some artist",
  "duration": 234000,
  "humanTime": "3:54"
};
 
player.add('./j5.mp3', metadata);
 
// Start playing all songs added to the queue (FIFO) 
player.play();
//console.log("yolo");
// Get the metadata for the current playing song and a time stamp when it started playing 
player.nowPlaying();
 
// Get an array of metadata for the songs in the queue (excludes the current playing song) 
player.getQueue();
 
// Get if the player is currently playing 
player.isPlaying()
 
 
// EMIT EVENTS 
 
player.on('play start', function() {
  // Code here is executed every time a song starts playing 
  console.log("yolo");
});

var controller = Leap.loop(function(frame){
    if(frame.hands.length > 0)
    {
      var hand = frame.hands[0];
      var position = hand.palmPosition;
      // var velocity = hand.palmVelocity;
      // var direction = hand.direction;
      var volume = Math.sqrt(position[0]*position[0] + position[2]*position[2]);
      // var volume = Math.sqrt(position[0]*position[0] + position[1]*position[1] + position[2]*position[2]);
      loudness.setVolume(volume, function (err) {
    		// Done 
		});
      console.log("x = " + position[0] + "y = " + position[1] + " z = " + position[2] + " volume = " + volume);
    }
  });
 
player.on('play end', function() {
  // Code here is executed every time a song ends 
});
 
player.on('song added', function() {
  // Code here is executed every time a song is added to the queue 
});

loudness.setVolume(45, function (err) {
    // Done 
});