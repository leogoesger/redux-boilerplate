import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import {find} from 'lodash';
import Divider from 'material-ui/Divider';

import Loader from './Loader.js';
import Overview from './Overview';
import Plot from './Plot';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      open: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({open: true});
    }
  }

  handleChange(e) {
    this.setState({input: e.target.value});
  }

  handleSnackBarClose() {
    this.setState({open: false});
    this.props.createUserError();
  }

  createUser(input) {
    const searchUser = find(
      this.props.users,
      user => user.username === input.toLowerCase()
    );

    if (searchUser) {
      this.props.createUserError('User already exists!');
    } else {
      this.props.createUser(input);
    }
  }

  render() {
    return (
      <div style={{marginBottom: '100px'}}>
        <div
          className="row col-lg-8 col-md-8 col-xs-12"
          style={styles.inputContainer}
        >
          <div className="col-lg-9 col-md-9 col-xs-9">
            <TextField
              label="Enter FCC User Name to Compete!"
              onChange={e => this.handleChange(e)}
              fullWidth
            />
          </div>
          <div className="col-lg-2 col-md-2 col-xs-2">
            <Button
              variant="raised"
              color="primary"
              onClick={() => this.createUser(this.state.input)}
            >
              Enter!
            </Button>
          </div>
        </div>

        <Divider style={{width: '90%', margin: '10px auto'}} />

        <div
          className="row col-lg-10 col-md-10 col-xs-12"
          style={{
            margin: '30px auto',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{width: '45%'}}>
            <Plot currentUser={this.props.currentUser} />
          </div>
          <div style={{margin: '0px', width: '50%'}}>
            <Overview
              users={this.props.users}
              fetchUser={userName => this.props.fetchUser(userName)}
            />
          </div>
        </div>

        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          open={this.state.open}
          onClose={() => this.handleSnackBarClose()}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={this.props.error}
        />
        <Loader loading={this.props.fetchingStatus} />
      </div>
    );
  }
}

Layout.propTypes = {
  error: PropTypes.string,
  users: PropTypes.array,
  createUser: PropTypes.func,
  createUserError: PropTypes.func,
  fetchingStatus: PropTypes.bool,
  currentUser: PropTypes.object,
  fetchUser: PropTypes.func,
};

const styles = {
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '80px auto 30px auto',
  },
};
