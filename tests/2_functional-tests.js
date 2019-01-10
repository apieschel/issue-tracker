const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          expect(res.body).to.satisfy(function(issue) {
            if ((typeof issue === 'object') || (issue === "That issue is already in our database!")) {
              // if the issue isn't already in the database, check that the returned object has all the correct properties  
              if(typeof issue === 'object') {
                  console.log(issue._id);
                  if(
                     issue.hasOwnProperty('title') &&
                     issue.hasOwnProperty('text') && 
                     issue.hasOwnProperty('created_by') &&
                     issue.hasOwnProperty('assigned_to') && 
                     issue.hasOwnProperty('status') &&
                     issue.hasOwnProperty('project') &&
                     issue.hasOwnProperty('open') &&
                     issue.hasOwnProperty('createdAt') &&
                     issue.hasOwnProperty('updatedAt')
                    ) {
                        return true;
                  } else {
                    return false;
                  }
                } 
                // if the issue is already in the database, then the check for the correct String message is above, so return true
                else {
                  return true;
                }
            } else {
                return false;
            }
          });
          
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title 2',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          expect(res.body).to.satisfy(function(issue) {
            if ((typeof issue === 'object') || (issue === "That issue is already in our database!")) {
              // if the issue isn't already in the database, check that the returned object has all the required properties  
              if(typeof issue === 'object') {
                  console.log(issue._id);
                  if(
                     issue.hasOwnProperty('title') &&
                     issue.hasOwnProperty('text') && 
                     issue.hasOwnProperty('created_by') &&
                     issue.hasOwnProperty('project') &&
                     issue.hasOwnProperty('open') &&
                     issue.hasOwnProperty('createdAt') &&
                     issue.hasOwnProperty('updatedAt')
                    ) {
                        return true;
                  } else {
                    return false;
                  }
                } 
                // if the issue is already in the database, then the check for the correct String message is above, so return true
                else {
                  return true;
                }
            } else {
                return false;
            }
          });
          
          done();
        });
      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, "Please fill out the title, text, and created_by fields.");  
          done();
        });
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        
      });
      
      test('One field to update', function(done) {
        
      });
      
      test('Multiple fields to update', function(done) {
        
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        
      });
      
      test('Valid _id', function(done) {
        
      });
      
    });

});
