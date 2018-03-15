import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import validator from 'express-validator';
import config from '../webpack.config';
import prodConfig from '../webpack.config.prod';
import routes from '../server/routes';

require('babel-core/register');
require('babel-polyfill');
require('dotenv').config();

const HMR = require('webpack-hot-middleware');

let compiler;


const app = express();

if (process.env.NODE_ENV === 'production') {
  compiler = webpack(prodConfig);
} else {
  compiler = webpack(config);
  app.use(HMR(compiler));
}

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

routes(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.all('*', (req, res) => {
  res.status(404).send({
    message: 'Page not found'
  });
});

export default app;
