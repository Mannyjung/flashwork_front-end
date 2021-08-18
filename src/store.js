import {createStore} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from './reducers/rootReducer';

//Production mode
//const store = createStore(rootReducer);

//Dev Mode
const store = createStore(rootReducer,composeWithDevTools());

export default store;