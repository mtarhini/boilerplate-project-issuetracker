const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const IssueSchema = new Schema(
  {
    project: { type: String, required: true },
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    assigned_to: { type: String, required: false },
    status_text: { type: String, required: false },
    open: { type: Boolean, required: false, default: true },
  },
  {
    timestamps: { createdAt: "created_on", updatedAt: "updated_on" },
    collection: "issues",
  }
);

module.exports = Issue = mongoose.model("issue", IssueSchema);
