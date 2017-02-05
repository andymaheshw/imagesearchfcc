import express from 'express';
import request from 'request';
import mongoose from 'mongoose';

const app = express();
exports.app = app;
mongoose.Promise = global.Promise;
 
export const app = express();
mongoose.connect(process.env.MONGODB);

// Set up the urlEntry schema
var search_term = mongoose.Schema({
  original: String,
});

// I create an index here so it's faster to search by shortCode
//urlEntrySchema.index({ shortCode: 1 });
 
// Now, I create the model:
var searchTerm = mongoose.model('searchTerm', search_term);


app.get('/api/imagesearch/:search_term?', (req, res) => {
	let search_term = req.params.search_term;
	res.end(search_term);
 
let options = {
  url: 'https://api.github.com/repos/request/request',
  headers: {
    'User-Agent': 'request'
  }
};
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
  }
  res.send(response);
}
 
request(options, callback);

});

app.get('/api/latest/imagesearch/', (req, res) = {

	searchTerm.find(function (err, search_terms) {
		  if (err) return console.error(err);
		  console.log(search_terms);
})

});