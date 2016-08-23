import React from "react";

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="container">
                    <div className="header-left header-pt">
                        <div className="logo">
                            SoundFoundry
                        </div>
                    </div>
                    <div className="header-right header-pt">
                        <div className="header-btn upload-btn">
                            <a className="secondary" href="#">
                            Upload
                            </a>
                        </div>
                        
                        <div className="header-btn profile-btn">
                            <a className="primary" href="#">
                                <span className="icon-user"></span> {this.props.user.username} <span className="icon-circle-down"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;