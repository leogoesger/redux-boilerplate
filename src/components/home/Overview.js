import React from 'react';
import PropTypes from 'prop-types';
import {sortBy, reverse} from 'lodash';
import Card, {CardHeader, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';

import {metrics} from '../../static/metrics';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card0: false,
      card1: false,
    };
  }

  handleExpansion(index) {
    this.setState({[`card${index}`]: !this.state[`card${index}`]});
  }

  highToLowSort(array) {
    return reverse(sortBy(array, o => Number(o.score)));
  }

  renderTable(users) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{'User Name'}</TableCell>
            <TableCell numeric>{'Score'}</TableCell>
            <TableCell>{'Location'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.highToLowSort(users).map(n => {
            return (
              <TableRow
                key={n.username}
                style={{cursor: 'pointer'}}
                onClick={() => this.props.fetchUser(n)}
                hover={true}
              >
                <TableCell>{n.name}</TableCell>
                <TableCell numeric>{n.score}</TableCell>
                <TableCell>{n.location}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  renderCard(name, description, index) {
    return (
      <Card key={index}>
        <CardHeader
          title={name}
          action={
            <IconButton onClick={() => this.handleExpansion(index)}>
              <ExpandMoreIcon />
            </IconButton>
          }
        />

        <CardContent>
          <Typography component="p">{description}</Typography>
        </CardContent>

        <Collapse in={this.state[`card${index}`]} timeout="auto" unmountOnExit>
          <CardContent>{this.renderTable(this.props.users)}</CardContent>
        </Collapse>
      </Card>
    );
  }

  render() {
    return (
      <div style={styles.mainContainer}>
        {metrics.map((metric, index) => {
          return this.renderCard(metric.name, metric.description, index);
        })}
      </div>
    );
  }
}

Overview.propTypes = {
  users: PropTypes.array,
  fetchUser: PropTypes.func,
};

const styles = {
  mainContainer: {
    margin: '0px auto',
    marginBottom: '50px',
  },
};
