import express from 'express';
import request from 'request';

const app = express();
exports.app = app;

app.get('/api/imagesearch/:search_term?', (req, res) => {
	let search_term = req.params.search_term;
	res.end(search_term);

})?