/*
RootReducer.js
==Root Reducer Function==
This is the root reducer function for our redux store, a pure function with (state, action) => state signature.
It describes how any actions transform the app state into the next state.

To add functionality to the reducer, add smaller reducers to "./Reducers" and import them into the root reducer.
*/

import { TOGGLE_PLAY_CONTENT, TOGGLE_LIKE_CONTENT, HIDE_POST } from "./actions";

const INITIAL_STATE = {
    user: {},
    feedId: -1, //id of the playlist or feed we're playing from
    feedIndex: 0, //place in the current feed
    contentFeedsById: {},
    contentTypeById: {},
    contentInfoById: {},
    contentSocialById: {},
    contentDataById: {}, //redundant?
    contentPlayInfoById: {}, //info to pause and replay stopped tracks, organized by id
    audioInfo: {
        isPlaying: false,
        contentId: -1, //current content being played
    },
    hiddenPostIds: []
};


function reducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case TOGGLE_PLAY_CONTENT:
            if(!(action.contentId in state.contentDataById)) {
                console.error(new Error(`Failed to dispatch TOGGLE_PLAY_CONTENT for contentId:${action.contentId} - the requested content is not available!`));
            }
            var newContentPlayInfoById = Object.assign({}, state.contentPlayInfoById);
            var newAudioInfo = {
                contentId: action.contentId
            };
            if(action.contentId !== state.audioInfo.contentId){
                //user started playing a new track
                newAudioInfo.isPlaying = true;
                
                if(!(action.contentId in newContentPlayInfoById)){
                    //we haven't played this track before in our current session, so
                    //add the new track info to the list of tracks we've started playing
                    newContentPlayInfoById[action.contentId] = {
                        currentTime: action.nextTrackTime
                    };
                }
            }
            else {
                //user is toggling play of the current track
                newAudioInfo.isPlaying = !state.audioInfo.isPlaying;
                //save where we left off last
                newContentPlayInfoById[action.contentId].currentTime = action.nextTrackTime;
            }
            
            var newState = Object.assign({}, state, {audioInfo: newAudioInfo}, {contentPlayInfoById: newContentPlayInfoById});
            return newState;
        case TOGGLE_LIKE_CONTENT:
            if(action.postId !== -1){
                var newState = Object.assign({}, state);
                newState.contentSocialById = Object.assign({}, state.contentSocialById);
                newState.contentSocialById[action.contentId] = Object.assign({}, newState.contentSocialById[action.contentId], {likes: newState.contentSocialById[action.contentId].likes + 1});
                return newState;
            }
            return state;
        case HIDE_POST:
            if(action.postId !== -1){
                var newState = Object.assign({}, state);
                newState.hiddenPostIds = state.hiddenPostIds.concat(action.postId);
                return newState;
            }
            return state;
        default:
            return state;
    }
}

export default reducer;