const twenty17 = require('./17-routes');

module.exports = (app) => {
  app.get('/api/v2/basic', twenty17.basic );
  app.get('/api/v2/basicCityByKey/:key', twenty17.basicCityByKey);
  app.get('/api/v2/basic/:key', twenty17.basicByKey);
  app.get('/api/v2/state', twenty17.getState);
  app.get('/api/v2/state/:city', twenty17.getCityFromStates);
  app.get('/api/v2/tophalf',  twenty17.getTopHalf);
}
