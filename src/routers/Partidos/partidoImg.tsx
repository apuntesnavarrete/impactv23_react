import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchType } from '../../types/partidoType';
import { getMatchByIdMatch } from './functions/getPlayersStatisticsByIdTournament';
import { apiruta } from '../../config/apiruta';
import './partidoimg.css'; // Importa el archivo de estilos


function PartidoImg(){
    const { idPartido, liga, torneo} = useParams();
    const numeroIdPartido = parseInt(idPartido ?? "0", 10);
  
    
  const [partidoinfo, setpartidoinfo] = useState<MatchType>();


    console.log(numeroIdPartido)


    useEffect(() => {
        const fetchData = async () => {

               
         

            try {
                
               const infoPartidoData = await getMatchByIdMatch(numeroIdPartido)
                console.log(infoPartidoData[0])
                setpartidoinfo(infoPartidoData[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    


        
        fetchData();
      }, [idPartido, numeroIdPartido]);



    return(
        <>
             <p style={{ textAlign: 'center' }}> Liga {liga} Categoria {torneo}</p>

                    <p style={{ textAlign: 'center' }}> Marcador del partido ; {partidoinfo?.teamHome.name} {partidoinfo?.localgoals}-{partidoinfo?.visitangoals} {partidoinfo?.teamAway.name}</p>
     
        <div style={{ display: 'flex' }}>
        <table>

                <thead>
                    
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th> 
                        <th>Anotaciones</th> 

                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                        <th>Nombre</th> 
                        <th>Anotaciones</th> 
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
        <div>

        <div className="content_resul">
            <p className="fecha">{partidoinfo?.date}</p>
            <p className="Cat">{torneo}</p>
            <p className="Jor">Jornada {partidoinfo?.matchday}</p>
            <div className="equipo_1">
            <img className="equipos" src={`${apiruta}/public/teams/${partidoinfo?.teamHome.logo}`} alt="Foto del jugador" />
            </div>
            <p className="versus"></p>
            <div className="Equipo_2">
            <img className="equipos" src={`${apiruta}/public/teams/japon.png`} alt="Foto del jugador" />
            </div>
            <p className="marcador">{partidoinfo?.localgoals} - {partidoinfo?.visitangoals}</p>
            <p className="Logo">
                <img className="logo-img" src={`/images/modificar.png`} alt="" />
            </p>
            <p className="liga">{liga}</p>
        </div>

        </div>
        </>
    )
}


export default PartidoImg
