import React from "react";
import "./MyProfile.css";
import { connect } from "react-redux";
import Collapsible from 'react-collapsible';

class MyProfile extends React.Component {
  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      var user_id = localStorage.getItem("user_id");
      var headers = {"Content-Type": "application/json", Accept: "application/json", Authorization: token};
      console.log(`http://localhost:3000/users/${user_id}`);
      fetch(`http://localhost:3000/users/${user_id}`, { headers: headers })
        .then(resp => resp.json())
        .then(data => {
          console.log("data", data);
          this.props.dispatch({type: "SET_PROFILE",myprofile: data.profile,activity: data.activity});
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
      e.target.information.value = '';
      e.target.image.value = ''
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
            type: "ADD_POST",
            posts: data.posts
          });
        })
        .catch(error => {
          console.error("Error", error);
        });
    }
  };

  render() {
    return (
      <div className="Profile">
        <h3>Your Amazing Works are here!</h3>
        
        <ol>
          {this.props.user.activity ? 
            <div>
              {(this.props.user.activity.videos.length > 0) ? 
              <div>
            {this.props.user.activity.videos.map(video => {
              return (
                <div className="Works">
                  <div className="SavedPost">
                  <li>  {video.name}<br />
                    {/* Video Type: {video.video_type}<br /> */}
                    <iframe height="200" width="400" src={video.url}></iframe><br /></li>
                  </div>
                  <Collapsible trigger="Click to create new post" className="DropM">
                  <div className="NewPost">
                    <h3>Create new Post</h3>
                    <form onSubmit={e => this.handleSubmit(e, video)}>
                      <input type="text"  name="image" placeholder="Add image url" style={{width:"300px",height:"30px"}}/>
                      <input type="textarea" name="information" placeholder="Comments " style={{width:"600px",height:"30px"}}/>
                      <input type="submit" value="Create a post" className="Create"/><br/><br/>
                    </form>
                  </div></Collapsible><br />
                  
                  
                  {this.props.user.activity.works.map(work => {
                    return (
                      work.video_id === video.id ? (
                        <div >
                          <Collapsible trigger="Click to view your previous posts" className="DropM"><div className="Posts">
                          {this.props.user.activity.posts.map(post => {
                            return (
                              (post.user_work_id === work.id) ? (
                                  <div className="SinglePost">
                                  <img src={post.image} alt="No image available" height="10px" width="20px" /><br/>
                                  Comments : {post.information}
                                </div>
                              )
                              :<h5>There are no posts available for this work. Try adding them.</h5>
                              );
                          })}
                          
                          </div></Collapsible>  <br/>    
                        </div>
                      )
                      :<h5>There are no notes to show up.</h5>
                      );
                  })}
            </div>
              )
            })}</div>
            :<div className="EmptyContent"><h5>There are no posts available for this work. Try adding them.</h5></div>}
            </div>
          : 
              <h5>
                There are no works saved.Try adding them from your collections.
              </h5>
            }
        </ol>

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
