import React, { Component } from "react";
import SubmissionDataService from "../services/submission.service";
import { Link } from "react-router-dom";

export default class SubmissionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveSubmissions = this.retrieveSubmissions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSubmission = this.setActiveSubmission.bind(this);
    this.removeAllSubmissions = this.removeAllSubmissions.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      submissions: [],
      currentSubmission: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveSubmissions();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveSubmissions() {
    SubmissionDataService.getAll()
      .then(response => {
        this.setState({
          submissions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSubmissions();
    this.setState({
      currentSubmission: null,
      currentIndex: -1
    });
  }

  setActiveSubmission(submission, index) {
    this.setState({
      currentSubmission: submission,
      currentIndex: index
    });
  }

  removeAllSubmissions() {
    SubmissionDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentSubmission: null,
      currentIndex: -1
    });

    SubmissionDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          submissions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, submissions, currentSubmission, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Submissions List</h4>

          <ul className="list-group">
            {submissions &&
              submissions.map((submission, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSubmission(submission, index)}
                  key={index}
                >
                  {submission.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllSubmissions}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentSubmission ? (
            <div>
              <h4>Submission</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentSubmission.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentSubmission.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentSubmission.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/submissions/" + currentSubmission.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Submission...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
