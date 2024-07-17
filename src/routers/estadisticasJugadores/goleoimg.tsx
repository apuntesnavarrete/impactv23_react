import React, { useRef } from 'react';
import useLigaInfo from "../../Use/useLigaInfo";
import BottomImg from "../../components/bottomimg";
import TopImg from "../../components/topimg";
import { apiruta } from "../../config/apiruta";
import './cardgoleo.css';
import { TypeGoleadorArray } from '../../types/goleadores';
import useTodayDate from '../../Use/useTodayDay';
import { obtenerPrimerYtercerNombre } from '../../functions/getNameShort';
import ButtonCapture from '../../components/buttonCapture';

interface GoleoImgProps {
    liga: string | undefined;
    torneo?: string
    goleadores: TypeGoleadorArray[];
}

const GoleoImg: React.FC<GoleoImgProps> = ({ liga, torneo,goleadores}) => {
    const { claseCSS, logoLiga } = useLigaInfo(liga);
    const top5Goleadores = goleadores ? goleadores.slice(0, 5) : [];
 const { date } = useTodayDate()

 const cardgoleador = useRef<HTMLDivElement>(null);


    return (
        <>
        <ButtonCapture captureRef={cardgoleador} /> 

        <div className={`content_resul_roll ${claseCSS}`} ref={cardgoleador}>
            <TopImg date={date} liga={liga} />
            <p className='dayOfWeek'>Campeonato de Goleo</p>
            <p>{torneo}</p>

            {top5Goleadores.map((goleador, index) => (

            <div className="card_goleadores" >
                <img className="jugador_img" src={`${apiruta}/public/participants/${goleador.id}.jpg`} alt="Foto del jugador" />
                <div>
                    <div className="card_goleadores_top">
                        <p className="card_goleadores_name">ID.- {goleador.id} </p>
                        <p> {obtenerPrimerYtercerNombre(goleador.nombre)}</p>
                    </div>
                    <div className="card_goleadores_bottom">
                        <img className="card-goleador_equipos" src={`${apiruta}/public/teams/${goleador.equipoLogo}`} alt="relenar" />
                        <p>{goleador.equipo}</p>
                    </div>
                </div>
                <p className="goleadores-card-goles">{goleador.goles}</p>
                
            </div>

        ))}


            <BottomImg logoLiga={logoLiga} />
        </div>
        </>
    );
};

export default GoleoImg;
