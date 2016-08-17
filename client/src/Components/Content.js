import React from "react";

import PostList from "./PostList";

class Content extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            posts: props.initPosts.posts
        };
    }
    render() {
        return (
            <div className="content">
                <PostList posts={this.state.posts} />
            </div>
        );
    }
}

export default Content;