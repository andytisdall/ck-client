import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ThunkMiddleware from 'redux-thunk-recursion-detect';

import clearError from './middlewares/clearError';
import errorHandlerMiddleware from './middlewares/errorHandler';
import reducers from './reducers';

const Root = ({ children, initialState = {} }) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(clearError, errorHandlerMiddleware, ThunkMiddleware)
    )
  );
  return <Provider store={store}>{children}</Provider>;
};

export default Root;
