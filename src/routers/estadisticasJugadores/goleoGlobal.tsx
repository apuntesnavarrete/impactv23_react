import { useState, useEffect, SetStateAction } from "react";
import {  EstadisticasJugadorType } from "../../types/EstadisticasJugadorType";
import { apiruta } from "../../config/apiruta";
import GoleoImg from "./goleoimg";
import { TypeGoleadorDetallado } from "../../types/goleadores";
import { getSumDataPlayer } from "../../functions/getSumDataPlayer";


function GoleoGlobal() {
  const [datos, setDatos] = useState<EstadisticasJugadorType[]>([]);
  const [ordenPor, setOrdenPor] = useState<'goles' | 'promedio' | 'partidos'>('goles');
  const [datosOriginales, setDatosOriginales] = useState<EstadisticasJugadorType[]>([]);
  const [mesFiltrado, setMesFiltrado] = useState<string>("");

  const [ordenartable, setOrdenartable] = useState("goles")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiruta}/api/v1/PlayerStatistics`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setDatosOriginales(data);

        setDatos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleOrdenarTabla = (tipoOrden: 'goles' | 'promedio' | 'partidos') => {

    setOrdenartable(tipoOrden)

    console.log("Ordenar por:", tipoOrden);
    console.log("Mes filtrado:", mesFiltrado);



    let datosFiltrados = [...datosOriginales];

    if (mesFiltrado) {

      datosFiltrados = datosOriginales.filter((objeto) => {
        const mes = new Date(objeto.matches.date).getMonth() + 1; // Los meses en JavaScript van de 0 a 11

        return mes === parseInt(mesFiltrado, 10);
      });

    }

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

    setOrdenPor(tipoOrden);
  };

const goleadoresArray: TypeGoleadorDetallado[] = getSumDataPlayer(datos,20);



  const tablaOrdenada = [...goleadoresArray].sort((a, b) => {
    if (ordenPor === 'goles') {
      return b.goles - a.goles;
    } else if (ordenPor === 'promedio') {
      return b.promedio - a.promedio;
    } else {
      return b.partidos - a.partidos;
    }
  });

  const handleMesChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setMesFiltrado(e.target.value);
  };

  return (
    <>
      <div>
        <button onClick={() => handleOrdenarTabla('goles')}>Ordenar por Goles</button>
        <button onClick={() => handleOrdenarTabla('promedio')}>Ordenar por Promedio</button>
        <button onClick={() => handleOrdenarTabla('partidos')}>Ordenar por Partidos Jugados</button>
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


      {tablaOrdenada && <GoleoImg order={ordenartable} infoType="Global" liga="Registro Impacto" goleadores={tablaOrdenada} torneo="Impacto Under" tipoTorneo="Goleo Historico"/>}



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


