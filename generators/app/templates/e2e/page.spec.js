'use strict';

var chai = require('chai');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Common', function() {

  var page;

  before('lancement de la page', function() {
    browser.get('/');
    page = require('./page.po');
  });

  it('doit afficher du text!', function(done) {
    page.text.then(function(text) {
      text.should.contain('Some text');
      done();
    })
  });

});