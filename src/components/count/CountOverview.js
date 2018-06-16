import React from "react";
import PropTypes from "prop-types";

const CountOverview = props => <h1>{`Count: ${props.count}`}</h1>;

CountOverview.propTypes = {
  count: PropTypes.number.isRequired,
};

export default CountOverview;
