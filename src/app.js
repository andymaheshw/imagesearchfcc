import express from 'express';
import request from 'request';
import mongoose from 'mongoose';
import Search from 'bing.search';
import util from 'util';

const app = express();
exports.app = app;
mongoose.Promise = global.Promise;
 
mongoose.connect(process.env.MONGODB);

// Set up the urlEntry schema
var search_term = mongoose.Schema({
  original: String,
});
 
// Now, I create the model:
var searchTerm = mongoose.model('searchTerm', search_term);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongoose");
});


app.get('/api/imagesearch/:search_term?', (req, res) => {
	let search_term = req.params.search_term;

	if (search_term)
	{
		var search_save = new searchTerm({ original: search_term });
		search_save.save();
		var options = {
		 url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=cute animals',
		  headers: {
		    'Content-Type': 'multipart/form-data',
		    'Ocp-Apim-Subscription-Key': process.env.SEARCH_KEY
		  }
		};
		 
		function callback(error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	//console.log(body);
		    var info = JSON.parse(body);
		    res.send(info);
		  }
      }

     request(options, callback);
	}
	      else {
     	res.end("Nothing to search")
 		};
});

app.get('/api/latest/imagesearch/', (req, res) => {

	searchTerm.find(function (err, search_terms) {
		  if (err) return console.error(err);
		  console.log(search_terms);
		  res.send(search_terms)
})

});