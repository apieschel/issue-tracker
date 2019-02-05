const mongoose = require("mongoose");
const Schema = mongoose.Schema;
                    
const issueSchema = new Schema({
	title: String,
  text: String,
  created_by: String,
  assigned_to: String,
  status: String,
  project: String,
  open: Boolean
}, {timestamps: true} );

const Issue = mongoose.model('Issue', issueSchema);

exports.issueModel = Issue;