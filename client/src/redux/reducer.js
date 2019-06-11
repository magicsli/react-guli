import {combineReducers} from 'redux'; 

import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './types';

const initUser = {
    username:'',
    msg:'',
    _id: ''
}
function user ( state = initUser, action ){

    switch (action.type){
        case AUTH_SUCCESS:
            return { msg: '', ...action.data };

        case ERROR_MSG:
            return {...state, msg: action.data};

        default: 
            return state
    }
}



export default combineReducers({
    user, 

})

