/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
var expect = require("chai").expect;
const Issue = require("../models/Issue");

// const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      var project = req.params.project;
      console.log(req.query);
      Issue.find({ project: project, ...req.query }).then((issues) => {
        res.json(issues);
      });
    })

    .post(function (req, res) {
      var project = req.params.project;
      if (
        !req.body.issue_title ||
        !req.body.issue_text ||
        !req.body.created_by
      ) {
        res.status(400).json({ error: "Some required fileds are missing" });
      } else {
        const issueToPost = new Issue({ ...req.body, project: project });
        issueToPost
          .save()
          .then((issue) => {
            res.json(issue);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      }
    })

    .put(function (req, res) {
      var project = req.params.project;
      const _id = req.body._id;
      if (!_id) {
        res.status(400).json({ error: "id must be provided" });
      }

      let newObj = {};
      Object.keys(req.body).forEach((key) => {
        if (key !== "_id") {
          if (req.body[key]) {
            newObj[key] = req.body[key];
          }
        }
      });

      Issue.updateOne({ _id: _id, project: project }, newObj)
        .then((result) => {
          if (result.nModified === 0) {
            res.json({ warning: "no updated field sent" });
          } else {
            res.json({ success: "successfully updated" });
          }
        })
        .catch((err) => {
          res.status(400).json({ error: `could not update ${_id}` });
        });
    })

    .delete(function (req, res) {
      var project = req.params.project;
      const _id = req.body._id;
      if (!_id) {
        res.status(400).json({ error: "_id error" });
      } else {
        Issue.deleteOne({ _id: _id, project: project })
          .then((result) => {
            res.json({ success: `deleted ${_id}` });
          })
          .catch((err) => {
            res.status(400).json({ error: `could not delete ${_id}` });
          });
      }
    });
};
