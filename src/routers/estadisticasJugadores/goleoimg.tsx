import React, { useRef } from 'react';
import useLigaInfo from "../../Use/useLigaInfo";
import BottomImg from "../../components/bottomimg";
import TopImg from "../../components/topimg";
import { apiruta } from "../../config/apiruta";
import './cardgoleo.css';
import useTodayDate from '../../Use/useTodayDay';
import { obtenerPrimerYtercerNombre } from '../../functions/getNameShort';
import ButtonCapture from '../../components/buttonCapture';
import { TypeGoleadorArray } from '../../types/goleadores';

interface GoleoImgProps {
    liga: string | undefined;
    torneo?: string;
    goleadores: (TypeGoleadorArray | TypeGoleoGlobal)[];
    tipoTorneo: string;
    infoType: 'Global' | 'torneo';
    order: string;
}

const GoleoImg: React.FC<GoleoImgProps> = ({ liga, torneo, goleadores, tipoTorneo, infoType,order }) => {
    const { claseCSS, logoLiga } = useLigaInfo(liga);
    const top5Goleadores = goleadores ? goleadores.slice(0, 5) : [];
    const { date } = useTodayDate();
    const cardgoleador = useRef<HTMLDivElement>(null);

    return (
        <>
            <ButtonCapture captureRef={cardgoleador} />
            <p>{order}</p>
            <div className={`content_resul_roll ${claseCSS}`} ref={cardgoleador}>
                <TopImg date={date} liga={liga} />
                <p className='dayOfWeek'>{tipoTorneo}</p>
                <p>{torneo}</p>

                {top5Goleadores.map((goleador, index) => (
                    <div className="card_goleadores" key={index}>
                        <img className="jugador_img" src={`${apiruta}/public/participants/${goleador.id}.jpg`} alt="Foto del jugador" />
                        <div>
                            <div className="card_goleadores_top">
                                <p className="card_goleadores_name">ID.- {goleador.id} </p>
                                <p>{obtenerPrimerYtercerNombre(goleador.nombre)}</p>
                            </div>
                            {infoType === 'torneo' && 'equipo' in goleador && (
                                <div className="card_equipos_bottom">
                                    <img className="card-goleador_equipos" src={`${apiruta}/public/teams/${goleador.equipoLogo}`} alt="relenar" />
                                    <p>{goleador.equipo}</p>
                                </div>
                            )}
                            {infoType === 'Global' && 'partidos' in goleador && (
                                <div className="card_goleadores_bottom">
                                    <p className='globalPj'>Partidos Jugados: {goleador.partidos}</p>
                                    <p className='globalPj'>Efectividad: {(goleador.goles / goleador.partidos).toFixed(2)}</p>

                                </div>
                            )}
                        </div>
                        
                        <div className='card-goles-content'>
                            <p className="goleadores-card-goles">{goleador.goles}</p>
                            <p>Goles</p>
                        </div>
                      
                    </div>
                ))}

                <BottomImg logoLiga={logoLiga} />
            </div>
        </>
    );
};

export default GoleoImg;

