import React from 'react';
import { apiruta } from '../config/apiruta';

interface botomimg {
  logoLiga: string;
}

const BottomImg: React.FC<botomimg> = ({ logoLiga }) => (
  <div className='versus_bottom'>
    <p className="Logo">
    <img className="logo-img" src={`${apiruta}/public/teams/${logoLiga}`} alt={`${logoLiga}Logo`} />
    </p>
  </div>
);

export default BottomImg;