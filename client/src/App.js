import React from "react";
import ReactDOM from "react-dom";

import Header from "./Components/Header";
import Content from "./Components/Content";
import Miniplayer from "./Components/Miniplayer";

const TEST_USER = {
    userId: 50,
    username: "Bob"
};

const TEST_POSTS = {
  posts: [
      {
          postInfo: {
              postId: 0,
              postType: 0, //0 - OP, 1 - repost
              postAuthor: "author"
          },
          postContent: {
              contentType: 0, //0 - song, 1 - playlist
              contentInfo: {
                  title: "Hitsong",
                  author: "author",
                  features: ["author2", "author3"]
              },
              contentSocial: {
                  reposts: 20,
                  plays: 5140,
                  likes: 2500,
                  comments: 5
              },
              contentData: {
                  songId: 1,
                  duration: 300
              }
          }
      },
      {
          postInfo: {
              postId: 1,
              postType: 0,
              postAuthor: "author"
          },
          postContent: {
              contentType: 1,
              contentInfo: {
                  title: "Playlist",
                  author: "author",
                  features: []
              },
              contentSocial: {
                  reposts: 105,
                  plays: 20000,
                  likes: 5000,
                  comments: 25
              },
              contentData: {
                  playlist: [
                      {
                          songId: 2,
                          duration: 300
                      },
                      {
                          songId: 3,
                          duration: 400
                      },
                      {
                          songId: 4,
                          duration: 250
                      },
                      {
                          songId: 5,
                          duration: 200
                      }
                  ]
              }
          }
      },
      {
          postInfo: {
              postId: 2,
              postType: 1,
              postAuthor: "reposter"
          },
          postContent: {
              contentType: 0,
              contentInfo: {
                  title: "Some Song",
                  author: "author",
                  features: []
              },
              contentSocial: {
                  reposts: 50,
                  plays: 5000,
                  likes: 3000,
                  comments: 2
              },
              contentData: {
                  songId: 6,
                  duration: 180
              }
          }
      }
  ]  
};

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            posts: TEST_POSTS,
            client: TEST_USER
        };
    }
    render() {
        return (
            <div className="app">
                <Header initUser={this.state.client} />
                <Content initPosts={this.state.posts} />
                <Miniplayer />
            </div>
        );
    }
}

ReactDOM.render(<App client={TEST_USER} posts={TEST_POSTS} />, document.getElementById("root"));