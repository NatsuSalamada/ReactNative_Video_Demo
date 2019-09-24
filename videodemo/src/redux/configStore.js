import { createStore, applyMiddleware } from 'redux'

// Middleware
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// Root reducer
import rootReducer from './rootReducer'

// Create Store
const store = createStore(rootReducer, applyMiddleware(logger, thunk))


export { store }
