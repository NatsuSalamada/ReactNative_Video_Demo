import { MOVIE_POPULAR_GET_REQUEST,MOVIE_POPULAR_GET_SUCCESS,MOVIE_POPULAR_GET_FAILURE,
        MOVIE_TRENDING_GET_REQUEST,MOVIE_TRENDING_GET_SUCCESS,MOVIE_TRENDING_GET_FAILURE,
        MOVIE_GENRES_GET_SUCCESS } from "../actions/home.actionTypes";

import { APIController } from "../../../network/axios.config";
import { movieTrendingPath,moviePopularPath,movieGenresPath } from ".././../../network/network.path";
import errorHandler from ".././../../network/network.errorHandler";
export const getMovieTrending = () => {

    return dispatch => {

        dispatch({type:MOVIE_TRENDING_GET_REQUEST})

        APIController.get(movieTrendingPath)
        .then( res => {

            const data = res.data

            if (res.status == 200){
                const payload = {
                    results:data.results
                }
                dispatch({type:MOVIE_TRENDING_GET_SUCCESS,payload:payload})
            }else{
                dispatch({type:MOVIE_TRENDING_GET_FAILURE})
            }

        }).catch(err => {
                dispatch({type:MOVIE_TRENDING_GET_FAILURE})
                dispatch(errorHandler(err))
            })
    }

}

export const getMoviePopular = (page) => {

    return (dispatch,getState) => {

        dispatch({type:MOVIE_POPULAR_GET_REQUEST})

        const params = JSON.stringify({
            language:'en-US',
            page:page
        })

        const is_call_genres = getState().homeReducer.genres ? false : true

        APIController.get(moviePopularPath,params)
        .then( res => {

            const data = res.data

            if (res.status == 200){
                let payload = {
                    page:data.page,
                    results:data.results,
                    total_pages: data.total_pages,
                    total_results: data.total_results
                }
                

                if (is_call_genres){
                    
                    APIController.get(movieGenresPath).then(res_genres => {
                        const data_genres = res_genres.data

                        payload = {
                            ...payload,
                            genres:data_genres.genres
                        }
                        
                        dispatch({type:MOVIE_POPULAR_GET_SUCCESS,payload:payload})
                        
                    }).catch( err_genres => {
                        dispatch({type:MOVIE_POPULAR_GET_SUCCESS,payload:payload})
                        dispatch(errorHandler(err_genres))
                    })

                }else{
                    dispatch({type:MOVIE_POPULAR_GET_SUCCESS,payload:payload})
                }
            }else{
                dispatch({type:MOVIE_POPULAR_GET_FAILURE})
            }

        }).catch(err => {
                dispatch({type:MOVIE_POPULAR_GET_FAILURE})
                dispatch(errorHandler(err))
            })
    }

}