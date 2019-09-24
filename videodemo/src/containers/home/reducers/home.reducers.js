import { MOVIE_POPULAR_GET_REQUEST,MOVIE_POPULAR_GET_SUCCESS,MOVIE_POPULAR_GET_FAILURE,
        MOVIE_TRENDING_GET_REQUEST,MOVIE_TRENDING_GET_SUCCESS,MOVIE_TRENDING_GET_FAILURE,
        MOVIE_GENRES_GET_SUCCESS } from "../actions/home.actionTypes";

initialHomeState = {

    is_loading_popular: false,
    is_loading_trending: false,
    page:null,
    total_results:null,
    total_pages: null,
    results_popular: null,
    results_trending:null,
    genres: null,

}

export const homeReducer = (state = initialHomeState, action) => {

    const {type,payload} = action

    switch (type) {
        case MOVIE_POPULAR_GET_REQUEST:
            
            return {
                ...state,
                is_loading_popular: true,
                results_popular:null,

            }

        case MOVIE_POPULAR_GET_SUCCESS:
            
            return {
                ...state,
                is_loading_popular: false,
                results_popular:payload.results,
                page: payload.page,
                total_results: payload.total_results,
                total_pages: payload.total_pages,
                genres: state.genres ? state.genres : payload.genres ? payload.genres : null

            }

        case MOVIE_POPULAR_GET_FAILURE:
            
            return {
                ...state,
                is_loading_popular: false,

            }

        case MOVIE_TRENDING_GET_REQUEST:
            
            return {
                ...state,
                is_loading_trending: true,
                results_trending:null,

            }

        case MOVIE_TRENDING_GET_SUCCESS:
            
            return {
                ...state,
                is_loading_trending: false,
                results_trending:payload.results,

            }

        case MOVIE_TRENDING_GET_FAILURE:
            
            return {
                ...state,
                is_loading_trending: false,

            }

        default:
        
            return {
                ...state
            }
    }

}
