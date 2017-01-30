import express from 'express';
import request from 'request';


const app = express();
exports.app = app;

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
    console.log(info.stargazers_count + " Stars");
    console.log(info.forks_count + " Forks");
  }
}
 
request(options, callback);

})?