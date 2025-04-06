import {
    CREATE_JOB_REQUEST,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_FAILURE,
    FETCH_JOBS_REQUEST,
    FETCH_JOBS_SUCCESS,
    FETCH_JOBS_FAILURE
} from '../types';

const initialState = {
    jobs: [],
    pagination: {
        totalJobs: 0,
        totalPages: 0,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false
    },
    loading: false,
    error: null,
    createJobStatus: {
        loading: false,
        success: false,
        error: null
    }
};

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_JOB_REQUEST:
            return {
                ...state,
                createJobStatus: {
                    loading: true,
                    success: false,
                    error: null
                }
            };
        
        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                jobs: [action.payload, ...state.jobs],
                createJobStatus: {
                    loading: false,
                    success: true,
                    error: null
                }
            };
        
        case CREATE_JOB_FAILURE:
            return {
                ...state,
                createJobStatus: {
                    loading: false,
                    success: false,
                    error: action.payload
                }
            };
        
        case FETCH_JOBS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case FETCH_JOBS_SUCCESS:
            return {
                ...state,
                jobs: action.payload.jobs,
                pagination: action.payload.pagination,
                loading: false,
                error: null
            };
        
        case FETCH_JOBS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        
        default:
            return state;
    }
};

export default jobReducer;