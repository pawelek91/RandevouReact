import {createStore} from 'redux';

var defaultLoginState={
    loginInfo : {
        loggedIn: false,
        identity: '',
        apiKey: '',
    }
    
}

function updateLoginInfo(state = defaultLoginState, action){
    if(action.type=== 'LOGIN_SUCCESSFUL'){
        debugger;
        return{
            ...state,
            loginInfo : {
                loggedIn : true,
                identity: action.data.identity,
                apiKey: action.data.apiKey,
            }
        }
    }
    else if(action.type === 'LOGOUT'){
        debugger;
        return{
            ...state,
            loginInfo : {
                loggedIn : false,
                identity: '',
                apiKey: ''
            }
        }
    }

    return state;
}

var store = createStore(updateLoginInfo);
export default store;