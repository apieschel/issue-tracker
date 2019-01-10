'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const Issue = require("../models.js").issueModel;

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      // Source: How to build a conditional query in Mongoose?
      // https://stackoverflow.com/questions/19693029/how-to-build-a-conditional-query-in-mongoose/19693726
    
      let conditions = {};

      for (var key in req.query) {
        if (req.query.hasOwnProperty(key)) {
          if(key === 'open') {
            conditions[key] = JSON.parse(req.query[key]);
          } else {
            conditions[key] = new RegExp('^' + req.query[key] + '$', 'i');
          }
        }
      }
    
      const query = Issue.find(conditions);
      query.exec(function(err, issues) {
        if (err) throw err;
        res.json(issues);
      });
    })
    
    .post(function (req, res){
      const project = req.params.project;
      const title = req.body.issue_title;
      const text = req.body.issue_text; 
      const created_by = req.body.created_by;
      if(title === '' || title === undefined || text === '' || text === undefined || created_by === '' || created_by === undefined) {
        res.json("Please fill out the title, text, and created_by fields.");
      } else {
        Issue.findOne({title: title}, function(err, data) {
          if(data !== null) {
            if(err) throw err;
            res.json("That issue is already in our database!");						
          } else {			
              if(err) throw err;

              let newIssue = new Issue({
                title: title, 
                text: text, 
                created_by: created_by, 
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
            if(req.body.issue_title === "" && req.body.issue_text === "" && req.body.created_by === "" && req.body.assigned_to === "" && req.body.status_text === "" && req.body.open === undefined ||
              req.body.issue_title === undefined && req.body.issue_text === undefined && req.body.created_by === undefined && req.body.assigned_to === undefined && req.body.status_text === undefined && req.body.open === undefined) {
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
              res.json("Update successful"); 
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