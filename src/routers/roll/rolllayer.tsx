import React from 'react';
import { Game } from '../../types/game';
import { apiruta } from '../../config/apiruta';
import useLigaInfo from '../../Use/useLigaInfo';

interface ContentResultRollProps {
  gamesFinal: Game[];
  dayOfWeek: string;
  liga: string | undefined;
  date:string;
}

const RollLayer = React.forwardRef<HTMLDivElement, ContentResultRollProps>(({ gamesFinal, dayOfWeek, liga,date }, ref) => {
  const { claseCSS, logoLiga } = useLigaInfo(liga);

  return (
    <div id="content_resul_roll" ref={ref} className={`content_resul_roll ${claseCSS}`}>
      <div className='versus_top'>
        <p>{date}</p>
        <p>Liga {liga}</p>
      </div>
      <p className='dayOfWeek'>{dayOfWeek}</p>
      {gamesFinal.map((game, index) => (
        <div key={index} className='content_versus_data'>
          <div>
            <img className="equipos" src={`${apiruta}/public/teams/${game.awayTeam}`} alt={`${game.awayTeam}`} />
          </div>
          <div className='versus_center'>
            <p>{game?.gameTime}</p>
            <p>{game?.category}</p>
          </div>
          <div>
            <img className="equipos" src={`${apiruta}/public/teams/${game.homeTeam}`} alt={`${game.homeTeam}`} />
          </div>
        </div>
      ))}
      <div className='versus_bottom'>
        <p className="Logo">
          <img className="logo-img" src={`${apiruta}/public/teams/${logoLiga}`} alt={`${liga}Logo`} />
        </p>
      </div>
    </div>
  );
});

export default RollLayer;