import React from 'react';
import PropTypes from 'prop-types';

const Btn = props => {
  return <button style={{ padding: '4rem' }}>{props.label}</button>;
};

Btn.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Btn;
