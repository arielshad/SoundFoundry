/*
Action types
*/

export const HIDE_POST = "HIDE_POST";
export const TOGGLE_LIKE_CONTENT = "LIKE_CONTENT";
export const TOGGLE_PLAY_CONTENT = "TOGGLE_PLAY_CONTENT";

/*
Action creators
*/

/*

*/
export function hidePostById(options) {
    options.postId = options.postId || -1;
    return {
        type: HIDE_POST,
        options
    };
}

/*

*/
export function toggleLikeContentById(options) {
    options.contentId = options.contentId || -1;
    return {
        type: TOGGLE_LIKE_CONTENT,
        options
    };
} 

/*

*/
export function togglePlayContentById(options) {
    options.contentId = options.contentId || -1;
    options.nextTrackTime = options.nextTrackTime || 0;
    options.prevTrackTime = options.prevTrackTime || 0;
    return {
        type: TOGGLE_PLAY_CONTENT,
        options
    };
}
