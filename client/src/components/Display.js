import React, { Component } from "react";
import SubmissionDataService from "../services/submission.service";
import { Link } from "react-router-dom";

export default class SubmissionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
    this.retrieveSubmissions = this.retrieveSubmissions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSubmission = this.setActiveSubmission.bind(this);
    this.removeAllSubmissions = this.removeAllSubmissions.bind(this);
    this.searchUsername = this.searchUsername.bind(this);

    this.state = {
      submissions: [],
      currentSubmission: null,
      currentIndex: -1,
      searchUsername: ""
    };
  }

  componentDidMount() {
    this.retrieveSubmissions();
  }

  onChangeSearchUsername(e) {
    const searchUsername = e.target.value;

    this.setState({
      searchUsername: searchUsername
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

  searchUsername() {
    this.setState({
      currentSubmission: null,
      currentIndex: -1
    });

    SubmissionDataService.findByUsername(this.state.searchUsername)
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
    const { searchUsername, submissions, currentSubmission, currentIndex } = this.state;

    return (
      <div style={{background:'teal', color:'black', fontFamily:'Arial', fontSize:'35px', paddingLeft:'25px'}} className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              style={{
              margin: '15px 0 15px 0',
              padding: '15px', 
              border: '1px solid #bfbfbf',
              borderRadius: '15px',
              boxSizing: 'border-box',
              width: '250px',
              paddingRight:'20px'
              }}
              type="text"
              className="form-control"
              placeholder="Search by Username"
              value={searchUsername}
              onChange={this.onChangeSearchUsername}
            />
             <button
                style={{
                  margin: '15px 0 15px 0',
                  padding: '15px', 
                  border: '1px solid #bfbfbf',
                  borderRadius: '15px',
                  boxSizing: 'border-box',
                  width: '20%'
                }}
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchUsername}
              >
                Search
              </button>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Submissions List</h4>

          <ul className="list-group">
            {submissions &&
              submissions.map((submission, index) => (
                <li style={{background:'', borderRadius:'5px', paddingLeft:'20px', width:'250px'}}
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSubmission(submission, index)}
                  key={index}
                >
                  {submission.username}
                </li>
              ))}
          </ul>

          <button
            style={{
              margin: '15px 0 15px 0',
              padding: '15px', 
              border: '1px solid #bfbfbf',
              borderRadius: '15px',
              boxSizing: 'border-box',
              width: '20%'
              }}
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
                  <strong>Username:</strong>
                </label>{" "}
                {currentSubmission.username}
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
