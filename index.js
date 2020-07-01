const redux = require("redux");
const reduxLogger = require("redux-logger");

const {createStore, combineReducers, applyMiddleware} = redux;
const logger = reduxLogger.createLogger();


const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM ="BUY_ICECREAM";

const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'Buying cake'
    }
}

const buyIcecream = ()=>{
    return{
        type: BUY_ICECREAM
    }
}

const initCakeState = {
    numOfCakes: 10
}

const initIcecreamState ={
    numOfIceCreams: 5
}

const cakeReducer = (state = initCakeState, action)=>{
    switch(action.type){
        default: return state;
        case BUY_CAKE : return {
            ...state,
            numOfCakes: state.numOfCakes -1
        }
    }
}

const icecreamReducer = (state = initIcecreamState, action)=>{
    switch(action.type){
        default: return state;
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams -1
        }
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: icecreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger));

console.log("Initial state is: ", store.getState());
store.subscribe(()=>{});
store.dispatch(buyCake());
store.dispatch({type: BUY_CAKE, info: "Another cake being bought"});
store.dispatch(buyIcecream());