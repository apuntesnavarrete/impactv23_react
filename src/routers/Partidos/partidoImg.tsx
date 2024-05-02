import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchType } from '../../types/partidoType';
import { getMatchByIdMatch } from './functions/getPlayersStatisticsByIdTournament';
import { apiruta } from '../../config/apiruta';
import './partidoimg.css'; // Importa el archivo de estilos
import useLigaInfo from '../../Use/useLigaInfo';

function PartidoImg(){
    const { idPartido, liga, torneo } = useParams();
    const numeroIdPartido = parseInt(idPartido ?? "0", 10);
    const [partidoinfo, setpartidoinfo] = useState<MatchType>();
    const { claseCSS, logoLiga } = useLigaInfo(liga);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const infoPartidoData = await getMatchByIdMatch(numeroIdPartido);
                setpartidoinfo(infoPartidoData[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [idPartido, numeroIdPartido]);

    useEffect(() => {
        const equipo1Img = new Image();
        const equipo2Img = new Image();

        equipo1Img.src = `${apiruta}/public/teams/${partidoinfo?.teamHome.logo}`;
        equipo2Img.src = `${apiruta}/public/teams/japon.png`;

        

        return () => {
            equipo1Img.onload = equipo2Img.onload = null; // Limpiar eventos de carga de imágenes al desmontar el componente
        };
    }, [partidoinfo]);

    

    return(
        <>
            <p style={{ textAlign: 'center' }}> Liga {liga} Categoria {torneo}</p>
            <p style={{ textAlign: 'center' }}> Marcador del partido ; {partidoinfo?.teamHome.name} {partidoinfo?.localgoals}-{partidoinfo?.visitangoals} {partidoinfo?.teamAway.name}</p>
     
            <div id="content_resul" className={`content_resul ${claseCSS}`}>
                <p className="fecha">{partidoinfo?.date}</p>
                <p className="Cat">{torneo}</p> 
                <p className="Jor">Jornada {partidoinfo?.matchday}</p>
                <div className="equipo_1">
                    <img className="equipos" src={`${apiruta}/public/teams/${partidoinfo?.teamHome.logo}`} alt="Foto del jugador" />
                </div>
                <p className="versus"></p>
                <div className="Equipo_2">
                <img className="equipos" src={`${apiruta}/public/teams/${partidoinfo?.teamAway.logo}`} alt="Foto del jugador" />
                </div>
                <p className="marcador">{partidoinfo?.localgoals} - {partidoinfo?.visitangoals}</p>
                <p className="Logo">
                    <img className="logo-img" src={`${apiruta}/public/teams/${logoLiga}`} alt="" />
                </p>
                <p className="liga">{liga}</p>
            </div>
            <p className="">{partidoinfo?.pointsLocal} - {partidoinfo?.pointsVisitan}</p>

        </>
    )
}

export default PartidoImg;


