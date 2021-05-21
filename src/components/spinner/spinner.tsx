import React from 'react';
import pulse from '../../assets/images/pulse.svg';

const Spinner = () => {
  return (
    <img style={{maxHeight: '60px', maxWidth: '60px'}} src={pulse} alt="spinner"/>
  );
};

export default Spinner;