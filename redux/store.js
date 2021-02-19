import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducers";
import rootSaga from "./sagas";
import { createWrapper } from 'next-redux-wrapper';

// const configureStore = (initState) => {
//     const sagaMiddleware = createSagaMiddleware();
//     return {
//         ...createStore(rootReducer || {}, initState || {}, applyMiddleware(sagaMiddleware)),
//         runSaga: sagaMiddleware.run
//     };
// };

// export const wrapper = createWrapper(configureStore, { debug: true });
// configureStore().runSaga(rootSaga || {});

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
        return composeEnhancers(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

export const makeStore = (context) => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, {}, bindMiddleware([sagaMiddleware]));

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });