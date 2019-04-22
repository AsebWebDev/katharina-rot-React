import React, { Component } from 'react'
import api from '../../api';

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      titlePic: '',
      tags: '',
      description: '',
      message: null
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      title: this.state.title,
      titlePic: this.state.titlePic,
      tags: this.state.tags,
      description: this.state.description
    };
    api.addArt(data)
    .then(result => {
      console.log('SUCCESS!')
      this.setState({
        title: '',
        titlePic: '',
        tags: '',
        description: '',
        message: `Your Art '${result.Art.title}' has been created`
      })
      setTimeout(() => {
        this.setState({
          message: null
        })
      }, 2000)
    })
    .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange}/><br />
          <label htmlFor="titlePic">Picture</label>
          <input type="text" name="titlePic" id="titlePic" value={this.state.titlePic} onChange={this.handleChange}/><br />
          <label htmlFor="tags">Tags</label>
          <input type="text" name="tags" id="tags" value={this.state.tags} onChange={this.handleChange}/><br />
          <label htmlFor="tags">Description</label>
          <input type="textarea" name="description" id="description" value={this.state.description} onChange={this.handleChange}/><br />
          <button type="submit">Submit</button>
        </form>
        {this.state.message && <h2>{this.state.message}</h2>}
      </div>
    )
  }
}
