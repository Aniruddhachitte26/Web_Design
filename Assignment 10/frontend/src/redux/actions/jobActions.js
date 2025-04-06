import api from '../../services/api';
import {
    CREATE_JOB_REQUEST,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_FAILURE,
    FETCH_JOBS_REQUEST,
    FETCH_JOBS_SUCCESS,
    FETCH_JOBS_FAILURE
} from '../types';

// Create a new job
export const createJob = (jobData) => async (dispatch) => {
    dispatch({ type: CREATE_JOB_REQUEST });
    
    try {
        const response = await api.post('/jobs/create', jobData);
        
        dispatch({
            type: CREATE_JOB_SUCCESS,
            payload: response.data.job
        });
        
        return response.data.job;
    } catch (error) {
        dispatch({
            type: CREATE_JOB_FAILURE,
            payload: error.response?.data?.error || 'Failed to create job.'
        });
        
        throw error;
    }
};

// Fetch all jobs with pagination
export const fetchJobs = (page = 1, limit = 10) => async (dispatch) => {
    dispatch({ type: FETCH_JOBS_REQUEST });
    
    try {
        const response = await api.get(`/jobs?page=${page}&limit=${limit}`);
        
        dispatch({
            type: FETCH_JOBS_SUCCESS,
            payload: {
                jobs: response.data.jobs,
                pagination: response.data.pagination
            }
        });
        
        return response.data;
    } catch (error) {
        dispatch({
            type: FETCH_JOBS_FAILURE,
            payload: error.response?.data?.error || 'Failed to fetch jobs.'
        });
        
        throw error;
    }
};