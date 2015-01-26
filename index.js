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
  console.log('%s connected to %s', (err ? 'Unsuccessfully' : 'Successfully'), app.get('db'));
});

// Create owner schema
var ownerSchema = restful.model('Owner', schema({
  name: String,
  url: String
}));

// Create icon schema
var iconSchema = restful.model('Icon', schema({
  owner: {
    type: schema.Types.ObjectId,
    ref: 'Owner'
  },
  name: String,
  class: String,
  unicode: String,
  tags: [{
    name: String,
    status: { type: Number, default: 0 }
  }]
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