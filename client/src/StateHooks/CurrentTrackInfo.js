/*
CurrentTrackInfo.js

A state hook that components can connect to in order to get the info of the current track selected.
Output:
    -currentTrackInfo: %null if no track selected, else an object with keys...%
        -contentId: the content id of the current track
        -isPlaying: true if the track is actually playing audio, false if paused
        -contentInfo: object with keys...
            -title: track text title
            -author: original author of the track (for now just text)
            -features: [featured artists in text]
        -contentSocial: object with keys...
            -reposts: # of reposts
            -plays: # of plays
            -likes: # of likes
            -comments: # of comments
*/

function getCurrentTrackInfo(state) {
    if(state.audioInfo.contentId !== -1){
        return {
            currentTrackInfo:
                Object.assign({}, state.audioInfo, {
                    contentInfo: state.contentInfoById[state.audioInfo.contentId],
                    contentSocial: state.contentSocialById[state.audioInfo.contentId]
                })
        };
    }
    return {currentTrackInfo: null}; //no track currently playing
}