import express from 'express';
import request from 'request';
import mongoose from 'mongoose';
import Search from 'bing.search';
import util from 'util';
import path from 'path';
import multer from 'multer';

const app = express();
exports.app = app;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB);

// Set up the urlEntry schema
var search_term = mongoose.Schema({
    original: String,
});

var searchTerm = mongoose.model('searchTerm', search_term);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("mongoose");
});

app.set('view engine', 'jade');
app.set('views', './views/');

app.get('/', function(req, res){
  res.render('index');
});

var storage = multer.memoryStorage(); // Create memory storage
var upload = multer({ storage: storage }); // Create middleware with the storage above

app.post('/file_size', upload.single('upl'), (req, res) => {
    //form files
	/* example output:
            { fieldname: 'upl',
              originalname: 'grumpy.png',
              encoding: '7bit',
              mimetype: 'image/png',
              destination: './uploads/',
              filename: '436ec561793aa4dc475a88e84776b1b9',
              path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
              size: 277056 }
	 */
	 res.send({"fizesize": req.file.size.toString() + " bytes"})
});


app.get('/api/imagesearch/:search_term?', (req, res) => {
    let search_term = req.params.search_term;

    if (search_term) {
        var search_save = new searchTerm({
            original: search_term
        });
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
    } else {
        res.end("Nothing to search")
    };
});

app.get('/api/latest/imagesearch/', (req, res) => {

    searchTerm.find(function(err, search_terms) {
        if (err) return console.error(err);
        console.log(search_terms);
        res.send(search_terms)
    })

});