import { TypeGoleadorDetallado } from "../../../types/goleadores";

// Función para ordenar goleadores
export const OrderTableGoleadores = (
  goleadoresArray: TypeGoleadorDetallado[],
  tipoOrden: 'goles' | 'promedio' | 'partidos'
): TypeGoleadorDetallado[] => {
  
  if (tipoOrden === "goles") {
    return goleadoresArray.sort((a, b) => b.goles - a.goles);
  }
  if (tipoOrden === "promedio") {
    return goleadoresArray.sort((a, b) => b.promedio - a.promedio);
  }
  if (tipoOrden === "partidos") {
    return goleadoresArray.sort((a, b) => b.partidos - a.partidos);
  }
  
  return goleadoresArray;
};