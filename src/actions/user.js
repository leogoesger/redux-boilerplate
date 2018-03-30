import request from 'superagent';
import {UserTypes as types} from '../action-types';

const createUserObject = user => {
  return {
    type: types.CREATE_USER_OBJECT,
    user,
  };
};

const createUserErrorObject = message => {
  return {
    type: types.CREATE_USER_ERROR_OBJECT,
    message,
  };
};

const fetchUserObjects = users => {
  return {
    type: types.FETCH_USER_OBJECTS,
    users,
  };
};

const fetchUserObject = user => {
  return {
    type: types.FEATCH_USER_OBJECT,
    user,
  };
};

const fetchingObject = fetchingStatus => {
  return {
    type: types.FETCHING_OBJECT,
    fetchingStatus,
  };
};

export function createUser(userName) {
  return async dispatch => {
    try {
      dispatch(fetchingObject(true));
      const user = await request
        .post(`${process.env.SERVER_ADDRESS}/users`)
        .send({username: userName});
      dispatch(createUserObject(user.body));
      const users = await request.get(`${process.env.SERVER_ADDRESS}/users`);
      dispatch(fetchUserObjects(users.body));
      dispatch(fetchUserObject(user.body));
      dispatch(createUserErrorObject());
      dispatch(fetchingObject(false));
    } catch (e) {
      dispatch(createUserErrorObject(e.response.body.message));
      dispatch(fetchingObject(false));
    }
  };
}

export function createUserError(message) {
  return dispatch => {
    dispatch(createUserErrorObject(message));
  };
}

export function fetchUsers() {
  return async dispatch => {
    try {
      dispatch(fetchingObject(true));

      const users = await request.get(`${process.env.SERVER_ADDRESS}/users`);
      dispatch(fetchUserObjects(users.body));
      dispatch(fetchUserObject(users.body[0]));
      dispatch(fetchingObject(false));
    } catch (e) {
      dispatch(fetchingObject(false));
      throw e;
    }
  };
}

export function fetchUser(user) {
  return async dispatch => {
    try {
      dispatch(fetchUserObject(user));
    } catch (e) {
      throw e;
    }
  };
}
