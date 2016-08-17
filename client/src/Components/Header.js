import React from "react";

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            user: props.initUser
        };
    }
    render() {
        return (
            <div className="header">
                <div className="container">
                    <span className="logo">
                        SoundFoundry
                    </span>
                    <span className="profile-text">
                        {this.state.user.username}
                    </span>
                </div>
            </div>
        );
    }
}

export default Header;