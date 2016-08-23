import React from "react";

import Header from "./Components/Header";
import Content from "./Components/Content";
import Miniplayer from "./Components/Miniplayer";

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            posts: this.props.posts,
            user: this.props.client
        };
    }
    appHandleLike(options) {
        //do nothing for now
    }
    appHandlePlay(options) {
        
    }
    render() {
        return (
            <div className="app">
                <Header user={this.state.user} />
                <Content initPosts={this.state.posts} appHandleLike={this.appHandleLike.bind(this)} />
                <Miniplayer />
            </div>
        );
    }
}

export default App;