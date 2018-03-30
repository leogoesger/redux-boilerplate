import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Layout from '../components/home/Layout';
import {
  createUser,
  fetchUsers,
  fetchUser,
  createUserError,
} from '../actions/user';

export class Home extends React.Component {
  componentWillMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <Layout
        users={this.props.users}
        error={this.props.error}
        createUser={userName => this.props.createUser(userName)}
        fetchUser={userName => this.props.fetchUser(userName)}
        createUserError={message => this.props.createUserError(message)}
        fetchingStatus={this.props.fetchingStatus}
        currentUser={this.props.currentUser}
      />
    );
  }
}

Home.propTypes = {
  users: PropTypes.array,
  createUser: PropTypes.func,
  fetchUsers: PropTypes.func,
  fetchUser: PropTypes.func,
  error: PropTypes.string,
  createUserError: PropTypes.func,
  fetchingStatus: PropTypes.bool,
  currentUser: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    users: state.user.users,
    error: state.user.error,
    fetchingStatus: state.user.fetchingStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: userName => dispatch(createUser(userName)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUser: userName => dispatch(fetchUser(userName)),
    createUserError: message => dispatch(createUserError(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
