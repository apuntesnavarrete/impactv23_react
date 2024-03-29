import  { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {  EquiposByTournamentType } from "../../types/equipostype";
import { apiruta } from "../../config/apiruta";
import getTournamentId from "../Partidos/functions/getTournamentId";

function EquiposByTournament() {
    const { liga, torneo } = useParams();
    const [idTorneo, setIdTorneo] = useState<number | null>(null);

    const [data, setData] = useState<EquiposByTournamentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(`${apiruta}/api/v1/teams-tournament`);
                if (!response.ok) {
                    throw new Error('La solicitud no pudo ser completada');
                }
                const result: EquiposByTournamentType[] = await response.json();

             getTournamentId(liga,torneo)
                .then((idTorneo:number | null)=>{
                    if (idTorneo !== null) {
                        // Hacer algo con el ID del torneo
                        console.log('ID del torneo:', idTorneo);
                        setIdTorneo(idTorneo);
                        const teamsFilterbyId = result.filter((item) => item.tournaments.id === idTorneo);
                        console.log('equiposfilter', teamsFilterbyId);
                        setData(teamsFilterbyId);
                      } else {
                        console.error('No se pudo obtener el ID del torneo.');
                      }
                })
            



            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Ocurrió un error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (data.length === 0) {
        return <p>No se encontraron equipos.</p>;
    }

    return (
        <>
        <h2>Detalles del Torneo</h2>
      <p>Liga: {liga}</p>
      <p>Categoria: {torneo}</p>
      <p>idTorneo: {idTorneo}</p>
            <p>lectura de Equipos</p>
            <NavLink to="newEquipo">Crear Nuevo Equipo</NavLink>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Equipo</th>
                        <th>Entrenador</th>
                        {/* Agrega más encabezados según la estructura de tus datos */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((Equipo) => (
                        <tr key={Equipo.id}>
                            <td>{Equipo.id}</td>
                            <td>{Equipo.teams.name}</td>
                           
                            <td>{Equipo.participants ? Equipo.participants.name : 'sin asignar'}</td>
                            {/* Renderiza más celdas según la estructura de tus datos */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default EquiposByTournament;
