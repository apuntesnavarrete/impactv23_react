import  { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {  EquiposByTournamentType } from "../../types/equipostype";
//import { apiruta } from "../../config/apiruta";
import getTournamentId from "../Partidos/functions/getTournamentId";
import { getTeamsTournaments } from "../Partidos/functions/getTeamsTournaments";

function EquiposByTournament() {
    const { liga, torneo } = useParams();
    const [idTorneo, setIdTorneo] = useState<number | null>(null);

    const [data, setData] = useState<EquiposByTournamentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const idTorneo = await getTournamentId(liga, torneo);
                setIdTorneo(idTorneo);
                const tournamentData = await getTeamsTournaments(idTorneo);
                setData(tournamentData);
                setLoading(false);
            } catch (error) {
                setError("Error al obtener los datos");
                setLoading(false);
            }
        };

        fetchData();

    }, [liga, torneo]);

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (data.length === 0) {
        return (
<>
<h2>Detalles del Torneo</h2>
      <p>Liga: {liga}</p>
      <p>Categoria: {torneo}</p>
      <p>idTorneo: {idTorneo}</p>

<p>No se encontraron equipos.</p>
        <NavLink to="newEquipo">Crear Nuevo Equipo</NavLink></>
            

        );
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
                       <th>#</th>
                        <th>Id Registro</th>
                        <th>Id Equipo</th>
                        <th>Equipo</th>
                        <th>Entrenador</th>
                        {/* Agrega más encabezados según la estructura de tus datos */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((Equipo,index) => (
                        <tr key={Equipo.id}>
                               <td>{index + 1}</td>
                            <td>{Equipo.id}</td>
                            <td>{Equipo.teams?.id}</td>

                            <td>{Equipo.teams?.name}</td>
                           
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
