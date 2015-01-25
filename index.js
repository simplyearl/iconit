var express = require('express'),
    restful = require('node-restful'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = restful.mongoose,
    schema = mongoose.Schema,
    app = express();

// Needed to expose API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// Configuration options
app.set('public', '/app');
app.set('api', '/api/');
app.set('port', process.env.PORT || 5000);
app.set('db', process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/iconit');

// Connect to our database
mongoose.connect(app.get('db'), function(err, res) {
  console.log('Connecting to database %s was %ssuccessful.', app.get('db'), err ? 'un' : '');
});

// Create owner schema
var ownerSchema = restful.model('Owner', schema({
  name: String,
  url: String,
  icons: [{
    type: schema.Types.ObjectId,
    ref: 'Icon'
  }]
}));

// Create icon schema
var iconSchema = restful.model('Icon', schema({
  owner: {
    type: Number,
    ref: 'Owner'
  },
  name: String,
  class: String,
  unicode: String
}));

// API methods
ownerSchema.methods(['get', 'post', 'put']);
iconSchema.methods(['get', 'post', 'put']);

// Expose API
ownerSchema.register(app, app.get('api') + 'owner');
iconSchema.register(app, app.get('api') + 'icon');

// Expose app
app.use(express.static(__dirname + app.get('public')));

// Start our server
var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});