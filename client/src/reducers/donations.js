import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_DONATION, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, donations: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        donations: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, donations: action.payload.data };
    case FETCH_DONATION:
      return { ...state, donation: action.payload.donation };
    case LIKE:
      return { ...state, donations: state.donations.map((donation) => (donation._id === action.payload._id ? action.payload : donation)) };
    case COMMENT:
      return {
        ...state,
        donations: state.donations.map((donation) => {
          if (donation._id === +action.payload._id) {
            return action.payload;
          }
          return donation;
        }),
      };
    case CREATE:
      return { ...state, donations: [...state.donations, action.payload] };
    case UPDATE:
      return { ...state, donations: state.donations.map((donation) => (donation._id === action.payload._id ? action.payload : donation)) };
    case DELETE:
      return { ...state, donations: state.donations.filter((donation) => donation._id !== action.payload) };
    default:
      return state;
  }
};

