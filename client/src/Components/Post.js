import React from "react";

class Post extends React.Component {
    constructor() {
        super();
        
        this.state = {
            liked: false,
            reposted: false
        };
        this.handleLike = this.handleLike.bind(this);
    }
    handleLike() {
        this.setState({liked: !this.state.liked});
        this.props.appHandleLike({
            liked: this.state.liked,
            postId: this.props.postInfo.postId
        });
    }
    handlePlay() {
        
    }
    render() {
        var authorshipString;
        if(this.props.postInfo.postType === 1){
            //repost
            authorshipString = this.props.postInfo.postAuthor + " reposted " + this.props.postContent.contentInfo.author;
        }
        else{
            authorshipString = this.props.postInfo.postAuthor;
        }
        
        return (
            <div className="post-container">
                <div className="post-container-main">
                    <div className="post-preview">
                    </div>
                    <div className="post-body">
                        <div className="post-meta">
                            <div className="post-authorship">
                                {authorshipString}
                            </div>
                            <div className="post-title">
                                {this.props.postContent.contentInfo.title}
                            </div>
                        </div>
                        <div className="content-media">
                            <button className="play-btn play-md"><span className="icon-play3"></span></button>
                            <div className="media-waveform"></div>
                        </div>
                    </div>
                </div>
                <div className="post-container-bottom">
                    <div className="content-social">
                        <button 
                            className={this.state.liked ? "btn1 btn-xs likes active" : "btn1 btn-xs likes"} 
                            onClick={this.handleLike}>
                            <span className="icon-fire"></span> {this.state.liked ? this.props.postContent.contentSocial.likes + 1 : this.props.postContent.contentSocial.likes}
                        </button>
                        <button className="btn1 btn-xs repost"><span className="icon-loop"></span> {this.props.postContent.contentSocial.reposts}</button>
                        <button className="btn1 btn-xs plays"><span className="icon-play3"></span> {this.props.postContent.contentSocial.plays}</button>
                        <button className="btn1 btn-xs comments"><span className="icon-bubble"></span> {this.props.postContent.contentSocial.comments}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;