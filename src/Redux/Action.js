
import axios from 'axios';
import { ADD_USER, DELETE_USER, FAIL_REQUEST, GET_USER_LIST, GET_USER_OBJ, MAKE_REQUEST, UPDATE_USER } from './ActionType';
import { toast } from 'react-toastify';

export const makeRequest = () => {
    return {
        type: MAKE_REQUEST
    }
}

export const failRequest = (err) => {
    return {
        type: FAIL_REQUEST,
        payload: err,
    }
}

export const getUSerList = (data) => {
    return {
        type: GET_USER_LIST,
        payload: data
    }
}

export const deleteUser = () => {
    return {
        type: DELETE_USER
    }
}

export const addUser = () => {
    return {
        type: ADD_USER
    }
}

export const updateUser = () => {
    return {
        type: UPDATE_USER
    }
}

export const getUSerObj = (data) => {
    return {
        type: GET_USER_OBJ,
        payload: data
    }
}

export const FetchUserList = ()=> {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get('http://localhost:8000/user').then(res=>{
            const userlist = res.data;
            dispatch(getUSerList(userlist));
        }).catch(err=> {
            dispatch(failRequest(err.message))
        })
    }
}

export const RemoveUser = (code)=> {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.delete('http://localhost:8000/user/'+code).then(res=>{
            dispatch(deleteUser());
        }).catch(err=> {
            dispatch(failRequest(err.message))
        })
    }
}

export const AddUser = (data)=> {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.post('http://localhost:8000/user',data).then(res=>{
            dispatch(addUser());
            toast.success('User Added successfully.')
        }).catch(err=> {
            dispatch(failRequest(err.message))
        })
    }
}

export const UpdateUser = (data,code)=> {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.put('http://localhost:8000/user/'+code,data).then(res=>{
            dispatch(updateUser());
            toast.success('User Updated successfully.')
        }).catch(err=> {
            dispatch(failRequest(err.message))
        })
    }
}

export const GetUserObj = (code)=> {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get('http://localhost:8000/user/'+code).then(res=>{
            const userlist = res.data;
            dispatch(getUSerObj(userlist));
        }).catch(err=> {
            dispatch(failRequest(err.message))
        })
    }
}