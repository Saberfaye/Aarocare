var express     = require( 'express' ),
	path        = require( 'path' ),
	bp          = require('body-parser'), 
	expressJWT  = require('express-jwt'),
	root        = __dirname,
	port        = process.env.PORT || 8000,
	app         = express(),
	cert 		= require('./key');


app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
app.use( bp.json() );
app.use( expressJWT( {secret: cert} ).unless({ path: [{url: '/users', methods: ['POST']}, '/users/login', {url: '/doctors', methods: ['POST']}, '/doctors/login']}));

require('./server/config/db.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen( port, function() {
	console.log( `server running on port ${ port }` );
});