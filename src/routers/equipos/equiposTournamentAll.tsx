import  { useEffect, useState } from "react";
//import { apiruta } from "../../config/apiruta";
import { EquiposByTournamentType } from "../../types/equipostype";
import { apiruta } from "../../config/apiruta";

export default function EquiposTournamentAll() {
  const [data, setData] = useState<EquiposByTournamentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [jugadoresfiltrados, setjugadoresfiltrados] = useState<EquiposByTournamentType[]>([]);
  const [busqueda, setBusqueda] = useState('');  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiruta}/api/v1/teams-tournament`);
        console.log('API response:', response);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result: EquiposByTournamentType[] = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
console.log(err)
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorBusqueda = e.target.value;
    setBusqueda(valorBusqueda);
    // Filtrar los datos basándonos en la búsqueda
   const datosFiltrados = data.filter((datos) =>
    datos.teams?.name.toLowerCase().includes(valorBusqueda.toLowerCase())
    );
    setjugadoresfiltrados(datosFiltrados)
  }


  return (
    <div>
      <h1>EquiposByTournament</h1>

      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={handleBusquedaChange}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Teams</th>
            <th>Tournaments</th>
            <th>Participants</th>
          </tr>
        </thead>
        <tbody>
          {jugadoresfiltrados.map((equipo, index) => (
            <tr key={index}>
              <td>{equipo.teams?.id}</td>
              <td>{equipo.teams?.name}</td> {/* Asumiendo que 'nombre' es una propiedad del tipo EquiposType */}
              <td>{equipo.tournaments?.idName}</td> {/* Asumiendo que 'nombre' es una propiedad del tipo TorneoType */}
              <td>{equipo.participants?.name}</td> {/* Asumiendo que 'nombre' es una propiedad del tipo Jugadorestype */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}