const twenty17 = require('./17-routes');
const twenty16 = require('./16-routes');

module.exports = (app) => {
  //17
  app.get('/api/v2/basic', twenty17.basic );
  app.get('/api/v2/basicCityByKey/:key', twenty17.basicCityByKey);
  app.get('/api/v2/basic/:key', twenty17.basicByKey);
  app.get('/api/v2/state', twenty17.getState);
  app.get('/api/v2/state/:city', twenty17.getCityFromStates);
  app.get('/api/v2/tophalf',  twenty17.getTopHalf);

  //16
  app.get('/api/v2/old/basic', twenty16.basic );
  app.get('/api/v2/old/basicCityByKey/:key', twenty16.basicCityByKey);
  app.get('/api/v2/old/basic/:key', twenty16.basicByKey);
  app.get('/api/v2/old/tophalf',  twenty16.getTopHalf);

}
