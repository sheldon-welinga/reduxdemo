//imports
const redux = require("redux");
const {createStore, applyMiddleware} = redux;
const thunk = require("redux-thunk").default;
const axios = require("axios");

//initial state
const initialState ={
    loading: false,
    users: [],
    error: ''
};

//action types
const FETCH_USERS_REQUEST ="FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

//action creators
const fetchUsersRequest =()=>{
    return{
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users)=>{
    return{
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error)=>{
    return{
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const fetchUsers =()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest());
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res)=>{
                //res.data is the array of users
                const users = res.data.map(user=> user.name);
                dispatch(fetchUsersSuccess(users));
            }).catch((error)=>{
                //error.message
                dispatch(fetchUsersFailure(error.message));
            })
    }
}

//reducer function
const reducer = (state = initialState, action)=>{
    switch(action.type){
        default: return state;
        case FETCH_USERS_REQUEST: return {
            ...state,
            loading: true
        };
        case FETCH_USERS_SUCCESS : return {
            ...state,
            loading: false,
            users: action.payload
        }
        case FETCH_USERS_FAILURE : return {
            ...state,
            loading: false,
            error: action.payload
        }
    }
}

//redux store
const store = createStore(reducer, applyMiddleware(thunk));

//making an api call(asynchronous) and dispatch the expected request using redux
    //we need axios and redux-thunk

store.subscribe(()=> {console.log(store.getState())});
store.dispatch(fetchUsers());


