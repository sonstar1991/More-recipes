// Action Types
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESSFUL = 'SIGNIN_SUCCESSFUL';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';

// Actions
export const signinRequest = userData => ({
  type: SIGNIN_REQUEST,
  userData,
  isAuthenticated: false
});

export const signinSuccess = (responseMessage, userData) => ({
  type: SIGNIN_SUCCESSFUL,
  responseMessage,
  userData,
  isAuthenticated: true
});

export const signinError = errorMessage => ({
  type: SIGNIN_ERROR,
  errorMessage,
  isAuthenticated: false
});
