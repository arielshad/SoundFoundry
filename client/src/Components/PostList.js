import React from "react";

import Post from "./Post";

class PostList extends React.Component {
    render() {
        var postNodes = this.props.posts.map(function(post) {
           return (
               <Post postInfo={post.postInfo} postContent={post.postContent} key={post.postInfo.postId} />
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