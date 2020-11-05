// ** create-user.component.js ** //

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import NavBar from "../components/NavBar";
import ErrorAlert12 from "./ErrorAlert12";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeISBN = this.onChangeISBN.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      ISBN: "",
      stock: "",
      author: "",
      errors: {
        title: "",
        ISBN: "",
        stock: "",
        author: "",
      },
      alert_message: "",
    };
  }

  onChangeTitle(e) {
    let value = e.target.value;
    let errors = this.state.errors;
    errors.title =
      value.length < 3
        ? "Title must contain between 3 to 10 character shoul be string "
        : "";
    this.setState({ title: e.target.value });
  }

  onChangeISBN(e) {
    let value = e.target.value;
    let errors = this.state.errors;
    errors.ISBN =
      value.length < 6 ? "ISBN must contain atleast 6 character" : "";
    this.setState({ ISBN: e.target.value });
  }
  onChangeStock(e) {
    let value = e.target.value;
    let errors = this.state.errors;
    errors.stock =
      value.length < 1 ? "stock must be a Integer and greater than 0" : "";
    this.setState({ stock: e.target.value });
  }
  onChangeAuthor(event) {
    let value = event.target.value;
    let errors = this.state.errors;
    errors.author = value.length < 3 ? "author must contain 3 character" : "";
    this.setState({ author: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let errors = this.state.errors;
    if (this.state.title === "") {
      errors.title = "Can not be null";
    } else if (this.state.ISBN === "") {
      errors.ISBN = "Can not be null";
    } else if (this.state.stock === "") {
      errors.stock = "Can not be null";
    } else if (this.state.author === "") {
      errors.author = "Can not be null";
    } else if (this.state.errors.title.length !== 0) {
      errors.title = this.state.errors.title;
    } else if (this.state.errors.ISBN.length !== 0) {
      errors.ISBN = this.state.errors.ISBN;
    } else if (this.state.errors.stock.length !== 0) {
      errors.stock = this.state.errors.stock;
    } else if (this.state.errors.author.length !== 0) {
      errors.author = this.state.errors.author;
    }
    const userObject = {
      title: this.state.title,
      ISBN: this.state.ISBN,
      stock: this.state.stock,
      author: this.state.author,
    };

    axios
      .post("/api/books", userObject)
      .then((res) => {
        console.log(res.data);
        this.setState({ alert_message: "success" });
        // return this.props.history.push("/books");
      })
      .catch((error) => {
        //console.log(error);
        this.setState({ alert_message: "error" });
        //alert(error);
      });

    this.setState({ title: "", ISBN: "", stock: "", author: "" });
  }

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <div className="wrapper m-5 ">
          {this.state.alert_message === "success" ? <ErrorAlert12 /> : ""}

          <form onSubmit={this.onSubmit}>
            <div className="form-group m-3">
              <label forhtml="title">Title</label>
              <input
                autoFocus
                type="text"
                id="title"
                placeholder="Title"
                value={this.state.title}
                onChange={this.onChangeTitle}
                className="form-control"
              />
              {errors.title ? (
                <div className="alert alert-danger m-1" role="alert">
                  {errors.title}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group m-3">
              <label forhtml="ISBN">ISBN</label>
              <input
                // autoFocus
                type="text"
                id="ISBN"
                placeholder="ISBN"
                value={this.state.ISBN}
                onChange={this.onChangeISBN}
                className="form-control"
              />
              {errors.ISBN ? (
                <div className="alert alert-danger m-1" role="alert">
                  {errors.ISBN}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group m-3 ">
              <label forhtml="stock">Stock</label>
              <input
                // autoFocus
                type="text"
                id="stock"
                placeholder="stock"
                value={this.state.stock}
                onChange={this.onChangeStock}
                className="form-control"
              />
              {errors.stock ? (
                <div className="alert alert-danger m-1" role="alert">
                  {errors.stock}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group m-3">
              <label forhtml="author">Author</label>
              <input
                //autoFocus
                type="text"
                id="author"
                placeholder="Author"
                value={this.state.author}
                onChange={this.onChangeAuthor}
                className="form-control"
              />
              {errors.author ? (
                <div className="alert alert-danger m-1" role="alert">
                  {errors.author}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group m-3">
              <input
                type="submit"
                value="ADD"
                className="btn btn-success mr-3"
              />
              <Link to="/books">
                <button className="btn btn-secondary">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
