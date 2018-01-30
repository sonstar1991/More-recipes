import { filter } from 'lodash';
import { GET_USER_RECIPE_REQUEST, GET_USER_RECIPE_SUCCESSFUL, GET_USER_RECIPE_ERROR } from '../actions/getUserRecipeAction';
import { DELETE_RECIPE_SUCCESSFUL } from '../actions/deleteRecipeAction';

const initialState = [{
  isFetched: false,
  recipeData: {},
  errorMessage: ''
}];

/**
 * @description get user recipes reducer
 * @param {object} state - default application state
 * @param {object} action - response from the api
 * @return {Object} - Object containg new state
 */
const getUserRecipeReducer = (state = initialState, action) => {
  const { isFetched, recipeData, errorMessage } = action;
  switch (action.type) {
    case GET_USER_RECIPE_REQUEST:
      return [{
        isFetched,
        recipeData: {},
        errorMessage: ''
      },
      ...state
      ];
    case GET_USER_RECIPE_SUCCESSFUL:
      return [{
        isFetched,
        recipeData,
        errorMessage: ''
      },
      ...state
      ];
    case GET_USER_RECIPE_ERROR:
      return [{
        isFetched,
        recipeData: {},
        errorMessage
      },
      ...state
      ];
    case DELETE_RECIPE_SUCCESSFUL:
      return [{
        isFetched: true,
        recipeData: filter(state[0].recipeData, recipe => recipe.id !== action.recipeId),
        errorMessage: ''
      },
      ...state
      ];

    default:
      return state;
  }
};

export default getUserRecipeReducer;
