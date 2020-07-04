const express = require('express');
const fs = require('fs');
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = express();

// Bring in the Fortnite module
const Client = require('fortnite');
// Create an instance of the client with your API Key
const fortnite = new Client('646ddfcf-71a8-46b9-9231-b738e48b22cd');
 
// All methods
// fortnite.user('FluffyBrickz', 'pc').then(console.log);
// fortnite.store().then(console.log);
// fortnite.challenges().then(console.log);

let cache = {};
cache['index'] = fs.readFileSync( __dirname + '/index.html', 'utf8');
cache['store'] = fs.readFileSync( __dirname + '/store.html', 'utf8');
cache['challenges'] = fs.readFileSync( __dirname + '/challenges.html', 'utf8');

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
	fortnite.user('FluffyBrickz', 'pc').then(data => {
		// console.log(data);
    	let page = cache['index'].replace('{{body-text}}', JSON.stringify(data));
		res.send( page );
	});
    // res.send( cache['index'] );
});

app.get('/store', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
	fortnite.store().then(data => {
		// console.log(data);
    	let page = cache['store'].replace('{{body-text}}', JSON.stringify(data));
		res.send( page );
	});
    // res.send( cache['store'] );
});

app.get('/challenges', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
	fortnite.challenges().then(data => {
		// console.log(data);
    	let page = cache['challenges'].replace('{{body-text}}', JSON.stringify(data));
		res.send( page );
	});
    // res.send( cache['challenges'] );
});

app.listen(port, () => {
    console.log(`
        Server is running at http://${hostname}:${port}/ 
        Server hostname ${hostname} is listening on port ${port}!
    `);
});
