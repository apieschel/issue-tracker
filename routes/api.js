/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const Issue = require("../models.js").issueModel;

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      const project = req.params.project;
      
    })
    
    .post(function (req, res){
      const project = req.params.project;
      const title = req.body.issue_title;
      if(title === '' || title === undefined) {
        res.json("Please enter a title for your book.");
      } else {
        Issue.findOne({title: title}, function(err, data) {
          if(data !== null) {
            if(err) throw err;
            res.json("That issue is already in our database!");						
          } else {			
              if(err) throw err;

              let newIssue = new Issue({
                title: title, 
                text: req.body.issue_text, 
                created_by: req.body.created_by, 
                assigned_to: req.body.assigned_to,
                status: req.body.status_text,
                project: project,
                open: true
              });

              newIssue.save(function(err, data) {
                if(err) throw err;
                res.json(data);
              });																		
          }
        });
      }
    })
    
    .put(function (req, res){
      if(req.body._id.length !== 24) {
        res.json("Please enter an ID that is exactly 24 characters.");
      } else {
        Issue.findById(req.body_id, function(err, issue) {
          res.json(issue); 
        });
        const project = req.params.project;
      }
    })
    
    .delete(function (req, res){
      const project = req.params.project;
      
    });
    
};
