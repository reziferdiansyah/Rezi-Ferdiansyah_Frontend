import { LOAD_DATA_FAILURE, LOAD_DATA_SUCCESS } from "constants/index";

const initialState = {
  data: false,
  isLoading: false,
};

const list = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA_SUCCESS:
      return {
        ...state,
      };
    case LOAD_DATA_FAILURE:
      return state;

    default:
      return state;
  }
};

export default list;
