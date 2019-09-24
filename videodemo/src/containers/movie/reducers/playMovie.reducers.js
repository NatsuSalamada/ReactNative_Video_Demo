import { GET_MOVIE_VIDEO_REQUEST,GET_MOVIE_VIDEO_SUCCESS,GET_MOVIE_VIDEO_FAILURE,
GET_MOVIE_CASTS_REQUEST,GET_MOVIE_CASTS_SUCCESS,GET_MOVIE_CASTS_FAILURE,
CLEAN_MOVIE } from "../actions/playMovie.actionTypes";

initialPlayMovieState = {
    is_loading_video:false,
    is_loading_casts:false,
    key_movie: null,
    cast: null,
}

export const playMovieReducer = (state = initialPlayMovieState,action) => {

    const {type,payload} = action

    switch (type) {
        case GET_MOVIE_VIDEO_REQUEST:
            
            return {
                ...state,
                is_loading_video:true
            }
        
        case GET_MOVIE_VIDEO_SUCCESS:

            return {
                ...state,
                is_loading_video:false,
                key_movie: payload.key
            }

        case GET_MOVIE_VIDEO_FAILURE:

            return {
                ...state,
                is_loading_video: false
            }

        case GET_MOVIE_CASTS_REQUEST:

            return {
                ...state,
                is_loading_casts: true
            }

        case GET_MOVIE_CASTS_SUCCESS:

            return {
                ...state,
                is_loading_casts: false,
                cast: payload.cast
            }

        case GET_MOVIE_CASTS_FAILURE:

            return {
                is_loading_casts: false
            }

        case CLEAN_MOVIE:

            return initialPlayMovieState
    
        default:
            return{
                ...state
            }
    }
}