import { createStore } from 'redux';
import reducer from '../Store/Reducer/Reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// const rootReducer = combineReducers({    
//     // ctr: counterReducer,
//     // res: resultReducer
// });

//  const store = createStore(reducer);




const store = createStore(reducer, composeWithDevTools(
  //applyMiddleware(...middleware),
  // other store enhancers if any
))

export default store ;