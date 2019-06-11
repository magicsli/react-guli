import { reqAddUser, reqLogin } from '../api/index';

import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './types'; 

const errMsg = ( msg ) => ({type: ERROR_MSG, data:msg})
const authSuccess = ({ username, _id }) => ({ type: AUTH_SUCCESS, data: { username, _id}})

export const register =  user => {
    const { username, password} = user;
    return async dispath => {
        const response = await reqAddUser({username, password})
        const result = response.data
        console.log(result)
        if(result.code === 0){
            dispath(authSuccess( result.data))

        }else{
            dispath(errMsg(result.msg))
        }
    }
}

export const login = user => {
    const { username, password } = user;
    
    return async dispath => {
        const response = await reqLogin( {username, password} )
        const result = response.data;
        if(result.code === 0) {

            dispath( authSuccess(result.data) )
        }else{

            dispath( errMsg(result.msg) )
        }
    }
}