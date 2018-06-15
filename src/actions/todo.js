import { TodoTypes as types } from "../action-types";

const fetchTodoObjects = todos => {
  return {
    type: types.FETCH_TODO_OBJECTS,
    todos,
  };
};

export function fetchTodos() {
  return async dispatch => {
    try {
      // pretent this is an api call...
      const todosFromAPI = [
        "do something1",
        "do something 2",
        "do something 3",
      ];
      dispatch(fetchTodoObjects(todosFromAPI));
    } catch (e) {
      throw e;
    }
  };
}
