import { useEffect, useState } from "react";
import { TorneoType } from "../types/torneotype";

export function useResultadosFiltrados(dataTorneos: TorneoType[], liga?: string , torneo?: string | null) {
    const [resultadosFiltrados, setResultadosFiltrados] = useState<TorneoType[]>([]);
  
    useEffect(() => {
      if (!liga || !torneo) {
        setResultadosFiltrados([]);
        return;
      }
  
      const filtrados = dataTorneos.filter(
        (item) => 
          item.leagues && 
          item.leagues.Alias === liga.toUpperCase() && 
          item.categories.categorias.toUpperCase() === torneo.toUpperCase()
      );
  
      setResultadosFiltrados(filtrados);
    }, [dataTorneos, liga, torneo]);
  
    return resultadosFiltrados;
  }