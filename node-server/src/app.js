/* SERVER CONFIG */
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const expressSession = require('express-session');
const cors = require('cors');
const dashboardRouter = require('./website/routes/DashboardRoutes');
const loginRouter = require('./website/routes/AuthRoutes');

async function App() {
  const app = express();
  app.use(cors());
  app.set('view engine', 'ejs'); /* RENDER HTML ENGINE */
  app.set('views', path.resolve(__dirname, 'website/views')); /* VIEWS ROUTE */
  app.use(express.static(path.resolve(__dirname, 'website/public'))); /* SET STATIC VIEWS FOLDER */
  app.set('host', 'localhost');
  app.set('port', process.env.PORT || 8081);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(expressLayouts);

  /* SESSION */
  const session = expressSession({
    secret: 'SESSIONSECRET1234',
    resave: false,
    saveUninitialized: true,
  });
  app.use(session);


  /* ROUTES */
  app.use('/', loginRouter);
  app.use('/', dashboardRouter);
  app.use('*', (req, res) => {
    res.status(404).send('Not Found');
  });
  process.on('warning', e => console.warn(e.stack));
  return app;
}

module.exports = App;
