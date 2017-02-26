'use strict';
require('dotenv');
const fs = require('fs');
const express = require('express');
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const app = express();
var ejs = require('ejs');
var path = require('path');


app.use(express.static(__dirname + '/public'));

var filepath = path.join(__dirname, 'new.wav');


const text_to_speech = new TextToSpeechV1({
  username: '',
  password: '',
});

var params = {
  text: 'Hello Jaren. I finally got it to work!',
  voice: 'en-US_AllisonVoice', // Optional voice
  accept: 'audio/wav',
};
// Pipe the synthesized text to a file
text_to_speech.synthesize(params).pipe(fs.createWriteStream('new.wav'));

app.get('/', function(req, res){
  res.set({'Content-Type': 'audio/wav'});
  var readStream = fs.createReadStream(filepath);
  readStream.pipe(res);
});


app.listen(3000, console.log('server up'));
