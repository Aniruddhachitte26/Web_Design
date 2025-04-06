import api from '../../services/api';
import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
} from '../types';

// Fetch all users
export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    
    try {
        const response = await api.get('/getUser');
        
        dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: response.data.users
        });
        
        return response.data.users;
    } catch (error) {
        dispatch({
            type: FETCH_USERS_FAILURE,
            payload: error.response?.data?.error || 'Failed to fetch users.'
        });
        
        throw error;
    }
};