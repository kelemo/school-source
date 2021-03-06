import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import "./ResourceForm.css";
import API from "../../utils/API";

class ResourceForm extends Component {
  state = {
    title: "",
    category: "",
    school: "",
    school_location: "",
    quantity: "",
    description: "",
    redirect: false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/resources'/>
    }
  }

  componentDidMount() {
    this.loadresources();
  }

  loadresources = () => {
    API.getresources()
      .then(res =>
        this.setState({ resources: res.data, title: "", category: "", school: "", school_location: "", quantity: "", description: "" })
      )
      .catch(err => console.log(err));
  };

  deleteresource = id => {
    API.deleteresource(id)
      .then(res => this.loadresources())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // alert("You added a resource.")
    if (this.state.title && this.state.category) {
      API.saveresource({
        title: this.state.title,
        category: this.state.category,
        school: this.state.school,
        school_location: this.state.school_location,
        quantity: this.state.quantity,
        description: this.state.description
      })
        .then(res => this.setRedirect())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className ="container">
      {this.renderRedirect()}
        <div className="row">
          <div className="md-12">
            <form>
            	<div className="form-group">
	            	<label htmlFor="title">Title</label>
	              <input
                  className="form-control" 
	                value={this.state.title}
	                onChange={this.handleInputChange}
	                name="title"
	              />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select 
                  className="form-control"
	                value={this.state.category}
	                onChange={this.handleInputChange}
	                name="category">
                  <option>Books</option>
                  <option>Lession Plans</option>
                  <option>Furniture</option>
                  <option>Computers</option>
                  <option>Sports equipment</option>
                  <option>Lab equipment</option>
                  <option>Theater props</option>
                </select>
              </div>
              <div className="form-group">
	            	<label htmlFor="school">School</label>
	              <input
                  className="form-control" 
	                value={this.state.school}
	                onChange={this.handleInputChange}
	                name="school"
	              />
              </div>
              <div className="form-group">
	            	<label htmlFor="school_location">School Location</label>
	              <input
                  className="form-control" 
	                value={this.state.school_location}
	                onChange={this.handleInputChange}
	                name="school_location"
	              />
              </div>
              <div className="form-group">
	            	<label htmlFor="quantity">Quantity</label>
	              <input
                  className="form-control" 
	                value={this.state.quantity}
	                onChange={this.handleInputChange}
	                name="quantity"
	              />
              </div>
              <div className="form-group">
	            	<label htmlFor="description">Description</label>
	              <input
                  className="form-control" 
	                value={this.state.description}
	                onChange={this.handleInputChange}
	                name="description"
	              />
              </div>
              <button
                disabled={!(this.state.title && this.state.category)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ResourceForm;
