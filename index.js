var express = require('express'),
    restful = require('node-restful'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = restful.mongoose,
    app = express();

// Needed to expose API
app.use(bodyParser());
app.use(methodOverride());
app.set('port', (process.env.PORT || 5000));
app.set('db', process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/iconit');

// Connect to our database
mongoose.connect(app.get('db'), function(err, res) {
  if (err) {
    console.log('Error connecting to database: ', app.get('db'), err); 
  } else {
    console.log('Successfully connected to database: ', app.get('db'));
  }
});

/*
// Movies API
var Movies = restful.model('movies', mongoose.Schema({
  info: String,
  medium: String,
  condition: String
}));
Movies.methods(['get', 'put', 'post', 'delete']);

// Expose API
Users.register(app, '/api/users');
Movies.register(app, '/api/movies');
*/

// Expose app
app.use(express.static(__dirname + '/public'));

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});