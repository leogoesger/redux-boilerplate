import React from 'react';
import WarningIcon from 'material-ui-icons/Warning';

class Construction extends React.Component {
  render() {
    return (
      <div
        className="col-lg-11 col-md-11 col-sm-11 col-xs-12"
        style={styles.container}
      >
        <div
          className="animated bounce"
          style={{display: 'flex', justifyContent: 'center'}}
        >
          <WarningIcon style={styles.warningIcon} />
        </div>
        <div
          style={{color: '#616161', display: 'flex', justifyContent: 'center'}}
        >
          {'Data will be loaded after 5 mins!'}
        </div>
      </div>
    );
  }
}

export default Construction;

const styles = {
  container: {
    flexWrap: 'wrap',
    margin: '150px auto',
    height: '100%',
  },
  warningIcon: {color: '#616161', height: '60px', width: '60px'},
};
