import React from 'react';

interface topImg {
  date: string;
  liga: string | undefined;
}

const TopImg: React.FC<topImg> = ({ date, liga }) => (
  <div className='versus_top'>
    <p>{date}</p>
    <p>Liga {liga}</p>
  </div>
);

export default TopImg;