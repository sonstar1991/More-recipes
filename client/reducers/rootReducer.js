import { combineReducers } from 'redux';
import authReducer from './authReducer';
import addRecipeReducer from './addRecipeReducer';
import saveImageToCloud from './saveImageToCloudReducer';
import editRecipeReducer from './editRecipeReducer';
import deleteRecipeReducer from './deleteRecipeReducer';
import recipeReducer from './recipeReducer';
import getUserRecipeReducer from './getUserRecipeReducer';
import getPopularRecipeReducer from './getPopularRecipeReducer';
import getFavoriteRecipeReducer from './getFavoriteRecipeReducer';

/**
 * @description make all reducers into a single reducer function which are passed to createstore
 */
const rootReducer = combineReducers({
  authReducer,
  addRecipeReducer,
  saveImageToCloud,
  recipeReducer,
  getFavoriteRecipeReducer,
  deleteRecipeReducer,
  editRecipeReducer,
  getUserRecipeReducer,
  getPopularRecipeReducer
});

export default rootReducer;
