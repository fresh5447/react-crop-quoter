var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./api/routes');

// Express only serves static assets in production
const isProd = process.env.NODE_ENV === 'production';
const clientPath = isProd ? 'client/build' : 'client/public';

if (isProd) {
  app.use(express.static(clientPath));
}


routes(app);

app.use('/img', express.static('img'));

app.set('port', (process.env.PORT || 3001));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, clientPath, 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
