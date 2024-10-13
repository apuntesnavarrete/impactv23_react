/*
import { useState, useEffect, useMemo } from "react";
import { EstadisticasJugadorType } from "../../types/EstadisticasJugadorType";
import { apiruta } from "../../config/apiruta";
import GoleoImg from "./goleoimg";
import { getSumDataPlayer } from "../../functions/getSumDataPlayer";
import useFetch from "../../Use/UseFetch";

function GoleoGlobal() {
  const [ordenPor, setOrdenPor] = useState<'goles' | 'promedio' | 'partidos'>('goles');
  const [mesFiltrado, setMesFiltrado] = useState<number | null>(null);
  
  const { data, loading, error } = useFetch<EstadisticasJugadorType[]>(`${apiruta}/api/v1/PlayerStatistics`);

  // Filtrar los datos por mes si se ha seleccionado uno
  const datosFiltradosPorMes = useMemo(() => {
    if (!data) return [];
    if (mesFiltrado === null) return data;

    const filtrados = data.filter((objeto) => {
      if (!objeto.matches || !objeto.matches.date) {
        console.warn(`Objeto con ID ${objeto.id} no tiene matches.date`);
        return false;
      }

      const fecha = new Date(objeto.matches.date);
      if (isNaN(fecha.getTime())) {
        console.warn(`Fecha inválida para objeto con ID ${objeto.id}: ${objeto.matches.date}`);
        return false;
      }

      const mes = fecha.getMonth() + 1;
      console.log(`Objeto ID ${objeto.id}: Mes de la fecha = ${mes}`);
      return mes === mesFiltrado;
    });

    console.log(`Mes Filtrado: ${mesFiltrado}`);
    console.log('Datos Filtrados por Mes:', filtrados);

    return filtrados;
  }, [data, mesFiltrado]);

  // Obtener la suma de datos por jugador
  const goleadoresArray = useMemo(() => {
    if (datosFiltradosPorMes && datosFiltradosPorMes.length > 0) {
      console.log('Datos para getSumDataPlayer:', datosFiltradosPorMes);
      const resultado = getSumDataPlayer(datosFiltradosPorMes, 20);
      console.log('Resultado de getSumDataPlayer:', resultado);
      return resultado;
    }
    return [];
  }, [datosFiltradosPorMes]);

  // Ordenar los goleadores según el criterio seleccionado
  const tablaOrdenada = useMemo(() => {
    const ordenada = [...goleadoresArray].sort((a, b) => {
      if (ordenPor === 'goles') {
        return b.goles - a.goles;
      } else if (ordenPor === 'promedio') {
        return b.promedio - a.promedio;
      } else {
        return b.partidos - a.partidos;
      }
    });

    console.log('Tabla Ordenada:', ordenada);
    return ordenada;
  }, [goleadoresArray, ordenPor]);

  // Monitorear cambios en mesFiltrado
  useEffect(() => {
    console.log(`Estado de mesFiltrado actualizado: ${mesFiltrado}`);
  }, [mesFiltrado]);

  // Monitorear cambios en tablaOrdenada
  useEffect(() => {
    console.log('Tabla Ordenada:', tablaOrdenada);
  }, [tablaOrdenada]);

  const OrderTableGoleadores = (tipoOrden: 'goles' | 'promedio' | 'partidos') => {
    setOrdenPor(tipoOrden);
  };

  const handleMesChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const valor = e.target.value;
    if (valor === "") {
      setMesFiltrado(null);
    } else {
      setMesFiltrado(parseInt(valor, 10));
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
        <select onChange={handleMesChange} value={mesFiltrado ?? ""}>
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
      <p>Estadísticas Individuales Históricas .- Impacto Under</p>

      {tablaOrdenada.length > 0 ? (
        <GoleoImg 
          order={ordenPor} 
          infoType="Global" 
          liga="Registro Impacto" 
          goleadores={tablaOrdenada} 
          torneo="Impacto Under" 
          tipoTorneo="Goleo Histórico"
        />
      ) : (
        <p>No hay datos disponibles para el mes seleccionado.</p>
      )}

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
            <tr key={jugador.id}> }
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
*/

import { useMemo, useState } from "react";
import { apiruta } from "../../config/apiruta";
import { getSumDataPlayer } from "../../functions/getSumDataPlayer";
import { EstadisticasJugadorType } from "../../types/EstadisticasJugadorType";
import useFetch from "../../Use/UseFetch";
import GoleoImg from "./goleoimg";
import { OrderTableGoleadores } from "./partials/ordertablagoleadores";
import OrderButtons from "./partials/orderButtons";
import MonthFilter from "../../functions/monthFileter";

function GoleoGlobal() {
  const { data, loading, error } = useFetch<EstadisticasJugadorType[]>(`${apiruta}/api/v1/PlayerStatistics`);
  const [ordenartable, setOrdenartable] = useState<"goles" | "promedio" | "partidos">("goles");
  const [mesFiltrado, setMesFiltrado] = useState<string>("");

  const goleadoresArray = useMemo(() => {
    if (data) {
      // Filtrar los datos según el mes seleccionado
      let filteredData = data;
      if (mesFiltrado) {
        filteredData = data.filter((player) => {
          const matchMonth = new Date(player.matches.date).getMonth() + 1;
          return matchMonth === parseInt(mesFiltrado, 10);
        });
      }

      // Determinar el número mínimo de partidos según el tipo de orden
      const partidosMinimos = ordenartable === "promedio" ? 30 : 10;
      const result = getSumDataPlayer(filteredData, partidosMinimos);

      // Usamos la función para ordenar los resultados
      return OrderTableGoleadores(result, ordenartable);
    }
    return [];
  }, [data, mesFiltrado, ordenartable]);

  const handleOrderChange = (tipoOrden: "goles" | "promedio" | "partidos") => {
    setOrdenartable(tipoOrden);
  };

  const handleMesChange = (mes: string) => {
    setMesFiltrado(mes);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <>
      <MonthFilter selectedMonth={mesFiltrado} onMonthChange={handleMesChange} />

      <OrderButtons handleOrderChange={handleOrderChange} /> {/* Usamos el componente aquí */}

      <GoleoImg
        order={ordenartable}
        infoType="Global"
        liga={"ed"}
        goleadores={goleadoresArray}
        torneo={"ed"}
        tipoTorneo="Goleo Historico"
      />
    </>
  );
}

export default GoleoGlobal;


