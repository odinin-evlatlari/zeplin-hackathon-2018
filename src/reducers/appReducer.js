import Common from '../constants/Common.constants';
const initialState = {
  init: false
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case Common.INIT_START:
      return {
        ...state,
        init: true,
      }
    case Common.INIT_FINISH:
      return {
        ...state,
        init: false,
      }
    default:
      return state;
  }
};

export default appReducer;
