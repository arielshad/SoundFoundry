import React from "react";

import Post from "./Post";

class PostList extends React.Component {
    render() {
        var self = this;
        var postNodes = this.props.posts.map(function(post) {
           return (
               <Post postInfo={post.postInfo} postContent={post.postContent} key={post.postInfo.postId} appHandleLike={self.props.appHandleLike} />
           ); 
        });
        return (
            <div className="postlist">
                {postNodes}
            </div>
        );
    }
}

export default PostList;