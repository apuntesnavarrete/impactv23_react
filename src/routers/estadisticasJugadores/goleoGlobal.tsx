import { useState, useEffect } from "react";
import {  EstadisticasJugadorType } from "../../types/EstadisticasJugadorType";

interface Registro {
  id: number;
  annotations: number;
  matches: {
    id: number;
    date: string;
  };
  participants: {
    id: number;
    name: string;
  };
  teams: {
    name: string;
  };
}



function GoleoGlobal() {
  const [datos, setDatos] = useState<Registro[]>([]);
  const [partidosJugados, setPartidosJugados] = useState<{ [key: string]: { id: number, count: number } }>({});
  const [ordenPor, setOrdenPor] = useState<'goles' | 'promedio' | 'partidos'>('goles');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://18.188.110.39:83/api/v1/PlayerStatistics"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await response.json();
        console.log(data);

        // Filtrar los registros que cumplan los criterios especificados
        data = data.filter((objeto: EstadisticasJugadorType) => {
          // Verificar si el nombre del torneo contiene la palabra "mixta"
          const contieneMixta: boolean = objeto.matches.tournaments.idName.toLowerCase().includes('mixta');
          // Verificar si el sexo del participante es "M"
          const sexoEsMasculino: boolean = objeto.participants.sex === 'M'; // Verificar si el sexo está presente y es "M"
    
          // Retornar true para mantener el objeto si no cumple ambos criterios
          return !(contieneMixta && sexoEsMasculino);
        });
    
        console.log(data);
        setDatos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const partidosPorJugador: { [key: string]: { id: number, count: number } } = {};

    datos.forEach(registro => {
      const { id, name } = registro.participants;

      if (!partidosPorJugador[name]) {
        partidosPorJugador[name] = { id, count: 0 };
      }

      partidosPorJugador[name].count++;
    });

    setPartidosJugados(partidosPorJugador);
  }, [datos]);

  const totalGoles: { [key: string]: number } = datos.reduce(
    (acumulador, registro) => {
      const { id, name } = registro.participants;

      if (!acumulador[name]) {
        acumulador[name] = 0;
      }

      acumulador[name] += registro.annotations;

      return acumulador;
    },
    {} as { [key: string]: number }
  );

  const goleadoresArray = Object.keys(totalGoles)
    .filter(nombreJugador => partidosJugados[nombreJugador] && partidosJugados[nombreJugador].count > 5)
    .map((nombreJugador) => {
      const { id } = partidosJugados[nombreJugador];
      const goles = totalGoles[nombreJugador];
      const partidos = partidosJugados[nombreJugador].count || 0;
      const promedio = partidos > 0 ? goles / partidos : 0;

      return {
        id,
        nombre: nombreJugador,
        goles,
        partidos,
        promedio,
      };
    });


const handleOrdenarTabla = (tipoOrden: 'goles' | 'promedio' | 'partidos') => {
    setOrdenPor(tipoOrden);
  };

  const tablaOrdenada = [...goleadoresArray].sort((a, b) => {
    if (ordenPor === 'goles') {
      return b.goles - a.goles;
    } else if (ordenPor === 'promedio') {
      return b.promedio - a.promedio;
    } else {
      return b.partidos - a.partidos;
    }
  });

  return (
    <>
      <div>
        <button onClick={() => handleOrdenarTabla('goles')}>Ordenar por Goles</button>
        <button onClick={() => handleOrdenarTabla('promedio')}>Ordenar por Promedio</button>
        <button onClick={() => handleOrdenarTabla('partidos')}>Ordenar por Partidos Jugados</button>

      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Id Jugador</th>

            <th>Nombre</th>
            <th>Goles</th>
            <th>Partidos Jugados</th>
            <th>Promedio de Goles</th>
          </tr>
        </thead>
        <tbody>
          {tablaOrdenada.map((jugador, index) => (
            <tr key={index}>
              <td>{index + 1}</td>         
                   <td>{jugador.id}</td>

              <td>{jugador.nombre}</td>
              <td>{jugador.goles}</td>
              <td>{jugador.partidos}</td>
              <td>{jugador.promedio.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default GoleoGlobal;


