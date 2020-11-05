import React, { Component, Fragment } from "react";
import NavBar from "./NavBar";
import Pagination from "./Pagination";
import { Paginate } from "./util/Paginate";

import axios from "axios";
class Message extends Component {
  state = {
    message: [],
    issue: [],
    pageSize: 10,
    count: 0,
    currentPage: 1,
  };

  componentDidMount() {
    axios
      .get("/api/messages")
      .then((response) => {
        //this.state.movie = response.data;

        this.setState({ message: [...response.data] });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  IssueBook = (book_id, u_id, user_id) => {
    // const user_id = localStorage.getItem("id");

    //console.log(user_id);
    axios
      .post(`/api/book/${book_id}/issue/${user_id}`)
      .then((res) => {
        //const users = this.state.user.filter((c) => c._id !== book_id);
        console.log(res.data);

        //this.setState((this.state.pos = 1));
        // this.state.bool = false;
        this.setState({ issue: res.data });
        this.allowBook(u_id);
        return this.props.history.push("/dashboard");
        //res.data.st === 0 ? toast("Stock is zero") : "";
      })
      .catch((error) => {
        //const msg = "you can not isssue more than 5 books";
        console.log(error);
        //toast.error(msg);
      });
  };

  allowBook = (id) => {
    axios.put(`/api/messages/${id}`).then((res) => {
      //const message = this.state.message.filter((c) => c._id !== id);
      this.setState({ message: res.data });
    });
  };

  RejectBook = (id) => {
    axios.put(`/api/messages/reject/${id}`).then((res) => {
      //const message = this.state.message.filter((c) => c._id !== id);
      this.setState({ message: res.data });
      return this.props.history.push("/dashboard");
    });
  };
  control = (id) => {
    this.setState({ count: this.state.count + 1 });
    // return this.state.count;
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { pageSize, currentPage, message: allmessage } = this.state;
    const message = Paginate(allmessage, currentPage, pageSize);
    return (
      <Fragment>
        <NavBar />
        <table className="table table-bordered table-hover table-lg  p-2 m-2">
          <thead>
            <tr>
              <th scope="col">BookId</th>
              <th>UserId</th>
             
              <th>Message</th>
              <th>Allow</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {message.map((u, i) => {
             // const name=localStorage.getItem("name");
              return (
                <tr key={i}>
                  <td>{u.book_id}</td>
                  <td>{u.user_id}</td>

              
                  <td>{u.text}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-primary float-right"
                      onClick={() => {
                        this.IssueBook(u.book_id, u.message_id, u.user_id);
                      }}
                    >
                      Allow
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary float-right"
                      onClick={() => {
                        this.RejectBook(u._id);
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          itemsCount={this.state.message.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </Fragment>
    );
  }
}

export default Message;
