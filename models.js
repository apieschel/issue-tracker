let mongoose = require("mongoose");
let Schema = mongoose.Schema;
                    
let issueSchema = new Schema({
	title: String,
  text: String,
  created_by: String,
  assigned_to: String,
  status: String
});

let Issue = mongoose.model('Issue', issueSchema);

exports.issueModel = Issue;