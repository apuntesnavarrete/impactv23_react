import { useState, useEffect, SetStateAction, useMemo } from "react";
import { EstadisticasJugadorType } from "../../../types/EstadisticasJugadorType";
import { apiruta } from "../../../config/apiruta";
import useFetch from "../../../Use/UseFetch";
import { getSumDataPlayer } from "../../../functions/getSumDataPlayer";
import GoleoImg from "../goleoimg";
import { useParams } from "react-router-dom";



function GoleoHistoricoLiga() {
    const { torneo ,liga } = useParams();

  const [datos, setDatos] = useState<EstadisticasJugadorType[]>([]);
  const [ordenPor, setOrdenPor] = useState<'goles' | 'promedio' | 'partidos'>('goles');
  const [datosOriginales, setDatosOriginales] = useState<EstadisticasJugadorType[]>([]);
  const [mesFiltrado, setMesFiltrado] = useState<string>("");

  const [ordenartable, setOrdenartable] = useState("goles")
  const { data, loading, error } = useFetch<EstadisticasJugadorType[]>(`${apiruta}/api/v1/PlayerStatistics`);
  
//mete data enun set para poder manipularlo.

 //Arregglar desde el backends
  const goleadoresArray = useMemo(() => {
    if (data) {
        let torneoMayus = torneo?.toUpperCase()
        console.log(torneoMayus)
        console.log("data new" ,data); 
        const searchTerm = `${liga}-${torneoMayus}` // El término de búsqueda basado en los dos primeros segmentos
console.log(searchTerm)
        const filteredData = data.filter(item => {
          const idName = item.matches?.tournaments?.idName;
          if (!idName) return false; // Si no existe `idName`, lo descartamos
        
          const firstTwoSegments = idName.split('-').slice(0, 2).join('-');
          return firstTwoSegments === searchTerm;
        });        console.log("data del torneo" ,filteredData); 

        // Convierte el array de objetos en JSON y lo formatea con sangrías
        return getSumDataPlayer(filteredData, 10);
    }
    return [];
  }, [data]);



  const OrderTableGoleadores = (tipoOrden: 'goles' | 'promedio' | 'partidos') => {

    if(data){
      let datosFiltrados = [...data];

      if (tipoOrden === 'partidos') {
        setDatos(datosFiltrados);
      } else if (tipoOrden === 'promedio') {
        const dataFiltrada = datosFiltrados.filter((objeto) => {
          const contieneMixta = objeto.matches.tournaments.idName.toLowerCase().includes('mixta');
          const sexoEsMasculino = objeto.participants.sex === 'M';
          return !(contieneMixta && sexoEsMasculino);
        });
        setDatos(dataFiltrada);
      } else {
        setDatos(datosFiltrados);
      }
    }



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

  const handleMesChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const mesFiltrado2 = e.target.value;
    if (data) {
      const datosFiltrados = data.filter((objeto) => {
        const mes = new Date(objeto.matches.date).getMonth() + 1; // Los meses en JavaScript van de 0 a 11

        return mes === parseInt(mesFiltrado2, 10);
      });

      console.log(datosFiltrados);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <button onClick={() => OrderTableGoleadores('goles')}>Ordenar por Goles</button>
        <button onClick={() => OrderTableGoleadores('promedio')}>Ordenar por Promedio</button>
        <button onClick={() => OrderTableGoleadores('partidos')}>Ordenar por Partidos Jugados</button>
        <select onChange={handleMesChange}>
          <option value="">Filtrar por Mes</option>
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </div>
      <p>Estadisticas Individuales Historicas .- Impacto Under</p>


      {tablaOrdenada && <GoleoImg order={ordenartable} infoType="Global" liga={liga} goleadores={tablaOrdenada} torneo={torneo} tipoTorneo="Goleo Historico"/>}



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

export default GoleoHistoricoLiga;