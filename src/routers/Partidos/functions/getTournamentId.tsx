import { TorneoType } from "../../../types/torneotype";

const getTournamentId = async (liga: string | undefined, torneo: string | undefined): Promise<number | null> => {
      // Realizar la solicitud fetch
      const response = await fetch('http://18.188.110.39:83/api/v1/tournaments');
  
      // Verificar si la respuesta es exitosa (código de estado 200)
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
  
      // Convertir la respuesta a formato JSON
      const data: TorneoType[] = await response.json();

      // Filtrar los resultados basados en la liga y el torneo
      const resultadosFiltrados = data.filter(
        (item) => item.leagues && item.leagues.Alias === liga?.toUpperCase() && item.categories.categorias.toUpperCase() === torneo?.toUpperCase()
        //            const resultadosFiltrados = data.filter(item => item.leagues && item.leagues.Alias === liga?.toUpperCase() && item.categories.categorias.toUpperCase() === torneo );

      );
  


      // Ordenar los resultados por el nombre de ID en orden descendente
      const RESULTIRDENADOS = resultadosFiltrados.sort((b, a) => a.idName.localeCompare(b.idName));

      // Devolver el ID del primer elemento en el array ordenado (si existe)
      return RESULTIRDENADOS.length > 0 ? RESULTIRDENADOS[0].id : null;
   
  };

  export default getTournamentId