import axios from 'axios';
import Helper from '../Helpers/helper';
import { signinError, signinRequest, signinSuccess } from '../actions/signinAction';

const URL = '/api/v1';

/**
 * @description signin user's actiom
 * @param {*} userdata user login details
 * @return {object} Redux action to be dispatch to the store
 */
export default function signin(userdata) {
  return (dispatch) => {
    dispatch(signinRequest(userdata));
    axios.post(`${URL}/users/signin`, userdata)
      .then((res) => {
        const { token, message } = res.data;
        localStorage.setItem('token', token);
        Helper.setAuthorizationToken(token);
        dispatch(signinSuccess(message));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(signinError(errors[0].message));
      });
  };
}
