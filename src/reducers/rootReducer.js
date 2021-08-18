import { combineReducers } from 'redux'
import roomReducer from './roomChatRdeucer'
const rootReducer = combineReducers({

    roomReducer: roomReducer,
    //users:userReducer,
    //cart:cartReducer
});
export default rootReducer