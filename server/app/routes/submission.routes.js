module.exports = app => {
  const submissions = require("../controllers/submission.controller");

  var router = require("express").Router();

  // Create a new Submission
  router.post("/", submissions.create);

  // Retrieve all Submissions
  router.get("/", submissions.findAll);

  // Retrieve all published Submissions
  router.get("/published", submissions.findAllPublished);

  // Retrieve a single Submission with id
  router.get("/:id", submissions.findOne);

  // Update a Submission with id
  router.put("/:id", submissions.update);

  // Delete a Submission with id
  router.delete("/:id", submissions.delete);

  // Create a new Submission
  router.delete("/", submissions.deleteAll);

  app.use("/api/submissions", router);
};
