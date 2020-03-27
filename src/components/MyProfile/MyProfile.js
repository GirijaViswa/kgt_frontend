import React from "react";
import "./MyProfile.css";
import { connect } from "react-redux";

class MyProfile extends React.Component {
  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      var user_id = localStorage.getItem("user_id");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      };
      console.log(`http://localhost:3000/users/${user_id}`);
      fetch(`http://localhost:3000/users/${user_id}`, { headers: headers })
        .then(resp => resp.json())
        .then(data => {
          console.log("data", data);
          this.props.dispatch({
            type: "SET_PROFILE",
            myprofile: data.profile,
            activity: data.activity
          });
        });
    } else {
      this.props.history.push("/login");
    }
  }

  handleSubmit = (e, work) => {
    e.preventDefault();
    if (localStorage.getItem("token") || this.props.user.loggedIn) {
      const token = localStorage.getItem("token");
      var data = {
        information: e.target.information.value,
        image: e.target.image.value,
        video_id: work.id
      };
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      };
      // debugger
      fetch(
        `http://localhost:3000/users/${localStorage.getItem(
          "user_id"
        )}/posts/new`,
        { method: "POST", headers: headers, body: JSON.stringify(data) }
      )
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          alert(data.msg);
          //   debugger;
          this.props.dispatch({
            type: "SET_PROFILE",
            myprofile: data.profile,
            user_works: data.user_works,
            user_posts: data.user_posts
          });
        })
        .catch(error => {
          console.error("Error", error);
        });
    }
  };

  gatherPosts = video => {
    this.props.user.activity.works.map(work => {
      if (work.video_id === video.id) {
        this.props.user.activity.posts.map(post => {
          if (post.user_work_id === work.id) {
            return (
              <div className="SinglePost">
                <img src={post.image} alt="No image available" />
                Comments : {post.information}
              </div>
            );
          }
        });
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <div className="Profile">
        <h3>Your Amazing Works are here!</h3>
        <ol>
          {this.props.user.activity ? (
            this.props.user.activity.videos.map(video => {
              return (
                <div className="Works">
                  <div className="SavedPost">
                    Title of the video : {video.name}
                    <br />
                    Video Type: {video.video_type}
                    <br />
                    <iframe src={video.url}></iframe>
                    <br />
                  </div>

                  <div className="NewPost">
                    <h3>Create new Post</h3>
                    <form onSubmit={e => this.handleSubmit(e, video)}>
                      <input
                        type="text"
                        name="image"
                        placeholder="Add any image"
                      />
                      <br />
                      <input
                        type="textarea"
                        name="information"
                        placeholder="Comments "
                      />
                      <br />
                      <input type="submit" value="Create a post" />
                    </form>
                  </div>
                  <br />
                  <hr />
                  {/* {this.gatherPosts(video)} */}
                  {this.props.user.activity.works.map(work => {
                    return (
                      work.video_id === video.id && (
                        <div>
                          {this.props.user.activity.posts.map(post => {
                            return (
                              post.user_work_id === work.id && (
                                <div className="SinglePost">
                                  <img
                                    src={post.image}
                                    alt="No image available"
                                  />
                                  Comments : {post.information}
                                </div>
                              )
                            );
                          })}
                        </div>
                      )
                    );
                  })}
                </div>
              );
            })
          ) : (
            <h5>
              There are no works saved.Try adding them from your collections.
            </h5>
          )}
        </ol>

        <h3>Your Posts are here!</h3>
        {this.props.user.activity ? (
          this.props.user.activity.posts.map(post => {
            return (
              <div className="Posts">
                <div className="SinglePost">
                  <img src={post.image} alt="No image available" />
                  Comments : {post.information}
                </div>
              </div>
            );
          })
        ) : (
          <h5>There are no posts.</h5>
        )}

        <h3>User Details</h3>
        {this.props.user.myprofile ? (
          <table className="TContents">
            <tbody>
              <tr>
                <td>Username </td> <td>: {this.props.user.myprofile.name}</td>
              </tr>
              <tr>
                <td>Email </td> <td>: {this.props.user.myprofile.email}</td>
              </tr>
            </tbody>
          </table>
        ) : null}
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return { user: state.user };
};

export default connect(mapStatetoProps)(MyProfile);
