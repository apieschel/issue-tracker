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
      if(req.body._id === "" || req.body._id === undefined || req.body._id.length !== 24) {
        res.json("Please enter an ID that is exactly 24 characters.");
      } else {
        Issue.findById(req.body._id, function(err, issue) {   
          if(issue === null || issue === undefined) {
            res.json("Could not find that issue in our database.");
          } else {
            if(req.body.issue_title === "" && req.body.issue_text === "" && req.body.created_by === "" && req.body.assigned_to === "" && req.body.status_text === "" && req.body.open === undefined) {
               res.json("No update fields sent.");
            } else {
              if(err) throw err;
              if(req.body.issue_title) {
                issue.title = req.body.issue_title; 
              }
              if(req.body.issue_text) {
                issue.text = req.body.issue_text; 
              }
              if(req.body.created_by) {
                issue.created_by = req.body.created_by; 
              }
              if(req.body.assigned_to) {
                issue.assigned_to = req.body.assigned_to; 
              }
              if(req.body.status_text) {
                issue.status = req.body.status_text; 
              }
              if(req.body.open) {
                issue.open = false;
              }
              issue.save();
              res.json("Update successful for the following issue: " + issue); 
            }
          }
        });
      }
    })
    
    .delete(function (req, res){
      if(req.body._id === "" || req.body._id === undefined || req.body._id.length !== 24) {
        res.json("Please enter an ID that is exactly 24 characters.");
      } else {
        Issue.findByIdAndDelete(req.body._id, function(err, issue) {
          if(issue === null || issue === undefined) {
            res.json("Could not find that issue in our database.");
          } else {
            if(err) throw err;
            res.json("Your issue was successfully deleted.");
          }
        }); 
      }
    });
    
};
