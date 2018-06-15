import React from "react";
import PropTypes from "prop-types";

const Layout = props => (
  <div style={{ marginBottom: "100px" }}>
    <ul>{props.todos.map(todo => <li key={`todo-${todo}`}>{todo}</li>)}</ul>

    <button onClick={() => props.fetchTodos()}>Click to fetch Todos</button>
  </div>
);

Layout.propTypes = {
  todos: PropTypes.array.isRequired,
  fetchTodos: PropTypes.func.isRequired,
};

export default Layout;
