import { GET_MOVIE_VIDEO_REQUEST,GET_MOVIE_VIDEO_SUCCESS,GET_MOVIE_VIDEO_FAILURE,
GET_MOVIE_CASTS_REQUEST,GET_MOVIE_CASTS_SUCCESS,GET_MOVIE_CASTS_FAILURE,
CLEAN_MOVIE } from "./playMovie.actionTypes";

import { APIController } from "../../../network/axios.config";
import { movieVideoPath_01,movieVideoPath_02,movieCastsPath_02 } from ".././../../network/network.path";
import errorHandler from ".././../../network/network.errorHandler";

export const getVideo = (movie_id) => {

    return dispatch => {
        dispatch({type:GET_MOVIE_VIDEO_REQUEST})

        const original_path = movieVideoPath_01 + movie_id + movieVideoPath_02
        let index = 0
        if (movie_id === 429617){
            index = 1
        }
        APIController.get(original_path)
        .then(res => {

            const data = res.data

            if (res.status == 200 && data.results && data.results.length){
                dispatch({type:GET_MOVIE_VIDEO_SUCCESS,payload:{key:data.results[index].key}})
            }else{
                dispatch({type:GET_MOVIE_VIDEO_FAILURE})
            }

        }).catch(err => {
            dispatch({type:GET_MOVIE_VIDEO_FAILURE})
            dispatch(errorHandler(err))
        })
    }
}

export const getCasts = (movie_id) => {

    return dispatch => {
        dispatch({type:GET_MOVIE_CASTS_REQUEST})

        const original_path = movieVideoPath_01 + movie_id + movieCastsPath_02

        APIController.get(original_path)
        .then(res => {
            const data = res.data
            if (res.status == 200){
                dispatch({type:GET_MOVIE_CASTS_SUCCESS,payload:{cast:data.cast}})
            }else{
                dispatch({type:GET_MOVIE_CASTS_FAILURE})
            }
        }).catch(err => {
            dispatch({type:GET_MOVIE_CASTS_FAILURE})
            dispatch(errorHandler(err))
        })
    }

}   

export const clear = () => {
    return (dispatch) => {

        dispatch({type:CLEAN_MOVIE})

    }
}