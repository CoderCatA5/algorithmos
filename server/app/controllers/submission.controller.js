const db = require("../models");
const Submission = db.submissions;

// Create and Save a new Submission
exports.create = (req, res) => {
  // Validate 
  console.log(req.body.username)
  if (!req.body.username)
  {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Submission
  const submission = new Submission({
    username: req.body.username,
    description: req.body.description,
    history:req.body.history,
    published: req.body.published ? req.body.published : false
  });

  // Save Submission in the database
  submission
    .save(submission)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Submission."
      });
    });
};

// Retrieve all Submissions from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

  Submission.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving submissions"
      });
    });
};

// Find a single Submissions with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Submission.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Submission with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Submission with id=" + id });
    });
};

// Update a Submission by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Submission.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Submission with id=${id}. Maybe Submission was not found!`
        });
      } else res.send({ message: "Submission was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Submission with id=" + id
      });
    });
};

// Delete a Submission with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Submission.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Submission with id=${id}. Maybe Submission was not found!`
        });
      } else {
        res.send({
          message: "Submission was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Submission with id=" + id
      });
    });
};

// Delete all Submissions from the database.
exports.deleteAll = (req, res) => {
  Submission.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Submission were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all submissions."
      });
    });
};

// Find all published Submissions
exports.findAllPublished = (req, res) => {
  Submission.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving submissions."
      });
    });
};
