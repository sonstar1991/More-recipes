'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;


_chai2.default.use(_chaiHttp2.default);

var doBeforeAll = function doBeforeAll() {
  before(function (done) {
    _models.Favorites.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
};

var value = void 0;

describe('Testing API endpoints associated with favorites', function () {
  doBeforeAll();
  it('should login a user', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      username: 'sannikays',
      password: 'developer'
    }).end(function (err, res) {
      expect(res.body.message).equal('Signin successful');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message').that.is.a('string');
      expect(res.body).to.have.all.keys('message', 'token');
      value = res.body.token;
      done();
    });
  });
  it('Should not add a recipe to favorite list without authentication', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes/1/favorites').send({
      recipeId: 1,
      userId: 1
    }).end(function (err, res) {
      expect(res).to.have.status(403);
      expect(res.body.message).equal('Not Authorized');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message').that.is.a('string');
      done();
    });
  });
  it('should give error when trying to favorite a recipe with invalid recipeId datatype', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes/:recipeId/favorites').set('x-access-token', value).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body.message).equal('RecipeId parameter should be a number');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message').that.is.a('string');
      done();
    });
  });
  it('should give error when trying to favorite a recipe that doesn\'t exist', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes/20/favorites').set('x-access-token', value).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Recipe does not exist in this catalog');
        expect(errors[0]).to.be.an('object');
        expect(errors).to.be.an('array');
        expect(errors[0].message).to.be.a('string');
        expect(errors[0]).to.have.property('message').that.is.a('string');
      }
      expect(res).to.have.status(404);
      done();
    });
  });
  it('Should add a recipe to favorite list with authentication', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes/2/favorites').set('x-access-token', value).send({
      recipeId: 1,
      userId: 1
    }).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body.message).equal('recipe sucessfully added to favorite');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message').that.is.a('string');
      done();
    });
  });
  it('Should not get a recipe from favorite list without authentication', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/users/1/favorites?page=0').end(function (err, res) {
      expect(res).to.have.status(403);
      expect(res.body.message).equal('Not Authorized');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message').that.is.a('string');
      done();
    });
  });
  it('Should get recipe from favorite list', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/users/1/favorites?page=0').set('x-access-token', value).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body.success).equal(true);
      expect(res.body.data).to.be.an('array');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.all.keys('success', 'pages', 'count', 'data');
      done();
    });
  });
});