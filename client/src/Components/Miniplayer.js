import React from "react";

class Miniplayer extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            isPlaying: false
        };
    }
    render() {
        if(this.state.isPlaying){
            return (
                <div className="miniplayer">
                </div>
            );
        }
        return <div />;
    }
}

export default Miniplayer;