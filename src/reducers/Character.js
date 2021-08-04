import { types } from "../actions/types";

export const initialState = {
    info:[


    ]
};

export const characterReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SET_ADD:
      return {
        ...state,
        info: payload || null,
      };
    case types.SET_DELETE:
      return {
        ...state,
        info: payload,
      };
      case types.SET_EDIT:
        return{
            ...state,
            info: state.info.filter((chrt) => chrt.id !== payload)
        };
    default:
      return state;
  }
};
