require('babel-register');

const app = require('./src/app').app, 
      PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
	console.log('Request header parser microservice running on port', PORT);
})