var expect  = require('chai').expect;
var request = require('request');
var app = require('../app.js')

describe('Status and content', function() {
  
    describe ('Main page', function() {
        it('status', function(done){
            request('http://localhost:3000/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content', function(done) {
            request('http://localhost:3000/' , function(error, response, body) {
                expect(body).to.equal('Hello World');
                done();
            });
        });
    });

    describe ('About page', function() {
        it('status', function(done){
            request('http://localhost:3000/about', function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

    });
});
describe('Failing Test', function() {
    it('Failure #1', function() {
        expect(true).to.equal(false)
      });
    it('Failure #2', function() {
        expect(true).to.equal(false)
      });
});