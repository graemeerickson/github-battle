import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className='home-container'>
      <h1>GitHub Battle: Battle your friends.</h1>
      <Link className='button' to='/battle'>
        Battle
      </Link>
    </div>
  );
