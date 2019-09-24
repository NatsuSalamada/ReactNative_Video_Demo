import { combineReducers } from 'redux'

import { homeReducer } from "../containers/home/reducers/home.reducers";
import { playMovieReducer } from "../containers/movie/reducers/playMovie.reducers";

export default rootReducer = combineReducers({
    // Add Reducer
    homeReducer: homeReducer,
    playMovieReducer: playMovieReducer
})