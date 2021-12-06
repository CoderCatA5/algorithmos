import React, { Component } from "react";
import SubmissionDataService from "../services/submission.service";

export default class Submission extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getSubmission = this.getSubmission.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateSubmission = this.updateSubmission.bind(this);
    this.deleteSubmission = this.deleteSubmission.bind(this);

    this.state = {
      currentSubmission: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSubmission(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSubmission: {
          ...prevState.currentSubmission,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentSubmission: {
        ...prevState.currentSubmission,
        description: description
      }
    }));
  }

  getSubmission(id) {
    SubmissionDataService.get(id)
      .then(response => {
        this.setState({
          currentSubmission: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentSubmission.id,
      title: this.state.currentSubmission.title,
      description: this.state.currentSubmission.description,
      published: status
    };

    SubmissionDataService.update(this.state.currentSubmission.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentSubmission: {
            ...prevState.currentSubmission,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSubmission() {
    SubmissionDataService.update(
      this.state.currentSubmission.id,
      this.state.currentSubmission
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Submission was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSubmission() {    
    SubmissionDataService.delete(this.state.currentSubmission.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/submissions')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSubmission } = this.state;

    return (
      <div>
        {currentSubmission ? (
          <div className="edit-form">
            <h4>Submission</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentSubmission.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentSubmission.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentSubmission.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentSubmission.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSubmission}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSubmission}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Submission...</p>
          </div>
        )}
      </div>
    );
  }
}
