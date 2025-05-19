import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getGlobalTablaGeneral from '../../../functions/getGlobalTablaGeneral';
import { TablageneralGlobalType } from '../../../types/tablageneral';
import { apiruta } from '../../../config/apiruta';
import { MatchType } from '../../../types/partidoType';
import TablaGeneralLayer from '../tablageneralayer';

const TablaGeneralHistoricaByTournament: React.FC = () => {
  const { liga , torneo} = useParams<{ liga: string, torneo: string }>();
  const [clasificacion, setClasificacion] = useState<TablageneralGlobalType[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const responseMatches = await fetch(`${apiruta}/api/v1/matches`);
      if (!responseMatches.ok) {
        throw new Error('Error al obtener los datos de los partidos');
      }
      const dataMatches: MatchType[] = await responseMatches.json();
  

      // Convertir liga y torneo a mayúsculas
    const ligaUpper = liga?.toUpperCase();
    const torneoUpper = torneo?.toUpperCase();

     // Filtrar los partidos por idName en tournaments
     const filteredMatches = dataMatches.filter(
      (match) => match.tournaments.idName.startsWith(`${ligaUpper}-${torneoUpper}`)
    );

      // Realizar una llamada a la función getRapidFootballStandings solo si se ha obtenido el ID del torneo
      if (liga) {
       
        getGlobalTablaGeneral(filteredMatches)
          .then((result) => {
            console.log(result);
            setClasificacion(result);
          })
          .catch((error) => {
            console.error('Error fetching global table:', error);
          });
      }
    };
    fetchMatches();
  }, [liga]);

  return (
    <>
      <p>Tabla de Efectividad Multitorneo, Impacto Under</p>
      <TablaGeneralLayer  clasificacion={clasificacion} liga={liga} torneo={torneo} typeTorneo="Tabla General Historica"/>

    </>
  );
};

export default TablaGeneralHistoricaByTournament;