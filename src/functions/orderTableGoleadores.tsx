import { EstadisticasJugadorType } from "../types/EstadisticasJugadorType";
import { TypeGoleadorDetallado } from "../types/goleadores";
import { getSumDataPlayer } from "./getSumDataPlayer";

export function getGoleadoresArray(data: EstadisticasJugadorType[], tipoOrden: 'goles' | 'promedio' | 'partidos', mesFiltrado: string | null): TypeGoleadorDetallado[] {
    let datosFiltrados = [...data];
  
    if (mesFiltrado) {
      datosFiltrados = data.filter((objeto) => {
        const mes = new Date(objeto.matches.date).getMonth() + 1; // Los meses en JavaScript van de 0 a 11
        return mes === parseInt(mesFiltrado, 10);
      });
    }
  
    if (tipoOrden === 'promedio') {
      datosFiltrados = datosFiltrados.filter((objeto) => {
        const contieneMixta = objeto.matches.tournaments.idName.toLowerCase().includes('mixta');
        const sexoEsMasculino = objeto.participants.sex === 'M';
        return !(contieneMixta && sexoEsMasculino);
      });
    }
  
    // Aquí iría tu lógica para convertir datosFiltrados a TypeGoleadorDetallado[]
    // Esto puede depender de la implementación de getSumDataPlayer
    const goleadoresArray = getSumDataPlayer(datosFiltrados, 20); // Asegúrate de definir esta función en tu código
  
    return goleadoresArray;
  }