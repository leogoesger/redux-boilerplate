import React from 'react';
import PropTypes from 'prop-types';
import LinePlot from '../plot/LinePlot';
import Avatar from 'material-ui/Avatar';
import {CardHeader} from 'material-ui/Card';

import Construction from './Construction';

export default class Plot extends React.Component {
  renderLinePlot(data) {
    if (data.length > 5) {
      return (
        <LinePlot
          x={40}
          y={10}
          data={data}
          width={500}
          height={400}
          xValue={value => value.time}
          yValue={value => value.score}
        />
      );
    } else {
      return <Construction />;
    }
  }
  render() {
    if (!this.props.currentUser) {
      return null;
    }
    const {currentUser} = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.userInfoContainer}>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Avatar
              alt={currentUser.name}
              src={currentUser.profile_pic}
              style={{
                marginTop: '10px',
                width: '60px',
                height: '60px',
              }}
            />
            <CardHeader
              title={currentUser.name}
              subheader={currentUser.location}
            />
          </div>
          <div style={{marginTop: '20px'}}>
            <span style={styles.scoreLabel}>{'score: '}</span>
            <span style={styles.score}>{currentUser.score}</span>
          </div>
        </div>

        {this.renderLinePlot(currentUser.scores)}
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'fixed',
    top: '22%',
    left: '5%',
    height: '600px',
    minWidth: '40%',
  },
  userInfoContainer: {
    width: '95%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
  scoreLabel: {
    fontSize: '20px',
    color: '#9e9e9e',
  },
  score: {
    fontSize: '30px',
  },
};

Plot.propTypes = {
  currentUser: PropTypes.object,
};
