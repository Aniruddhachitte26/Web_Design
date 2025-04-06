import api from '../../services/api';
import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE,
    LOGOUT
} from '../types';

// Login action creator
export const login = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    
    try {
        const response = await api.post('/login', credentials);
        
        if (response.data.user) {
            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('isAuthenticated', 'true');
            
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data.user
            });
            
            return response.data.user;
        } else {
            dispatch({
                type: LOGIN_FAILURE,
                payload: response.data.error || 'Unknown error occurred'
            });
            
            return null;
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data?.error || 'Login failed. Please try again.'
        });
        
        throw error;
    }
};

// Logout action creator
export const logout = () => (dispatch) => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    
    dispatch({ type: LOGOUT });
};

// Action to check and restore user session from localStorage
export const checkUserSession = () => (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (isAuthenticated && user) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: user
        });
    }
};