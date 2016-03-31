var express = require('express');
var path = require('path');

var app = express();
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set("view options", {layout: false});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

/* All Routes Redirect to Index */
var index = function(req, res){
  res.render('index.html');
};
app.get('/', index);
//app.get('*', index);

app.listen(process.env.PORT || 8080);
