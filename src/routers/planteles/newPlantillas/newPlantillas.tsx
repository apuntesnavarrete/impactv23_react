import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getTournamentIdPrevious from "../../../functions/getTournametIdPrevious";
import { getTeamsTournaments } from "../../../functions/getTeamsTournaments";
import { EquiposByTournamentType } from "../../../types/equipostype";
import getPlayersTournament from "../../../functions/getPlayersByTournament";
import { Plantelestype } from "../../../types/plantelestype";
import getTournamentId from "../../../functions/getTournamentId";
import { SuccessMessage } from "../../SuccesMessage";

function NewPlantillas() {
    const { torneo, liga } = useParams();
    const [lastIdTorneo, setLastIdTorneo] = useState<number | null>(null);
    const [IdTorneo, setIdTorneo] = useState<number | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const [teams, setTeams] = useState<EquiposByTournamentType[]>([]);  // Estado para almacenar equipos
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);  // Estado para el ID del equipo seleccionado
    const [plantillaSelect, setplantillaSelect] = useState<Plantelestype[]>();  // Estado para el ID del equipo seleccionado
    const token = localStorage.getItem('token');

    // Obtener el ID del torneo
    useEffect(() => {
        const fetchTournamentId = async () => {
            try {
                const idtorneoLast = await getTournamentIdPrevious(liga, torneo);
                const idtorneo = await getTournamentId(liga,torneo)
                setLastIdTorneo(idtorneoLast);
                setIdTorneo(idtorneo)

            } catch (error) {
                console.error("Error al obtener el ID del torneo:", error);
            }
        };

        fetchTournamentId();
    }, [liga, torneo]);

    // Obtener los equipos cuando el ID del torneo esté disponible
    useEffect(() => {
        if (lastIdTorneo !== null) {
            getTeamsTournaments(lastIdTorneo)
                .then(response => {
                    const teamData = response.map((team: EquiposByTournamentType) => ({
                        id: team.id,
                        teams: team.teams,  // Aquí no permitimos null
                        tournaments: team.tournaments,
                        participants: team.participants
                    }));
                    setTeams(teamData);  // Guardamos el array completo de equipos
                })
                .catch(error => {
                    console.error("Error al obtener los equipos:", error);
                });
        }

        getPlayersTournament(lastIdTorneo)
                .then(dataJugadores => {
                    console.log("Jugadores del torneo:", dataJugadores);
                
       const jugadoresFiltrados = dataJugadores.filter(jugador => jugador.teams.id === selectedTeamId);

        console.log("jugadores filtrados" , jugadoresFiltrados);
                setplantillaSelect(jugadoresFiltrados)
                })
                .catch(error => {
                    console.error("Error al obtener los jugadores:", error);
                });
    }, [lastIdTorneo,selectedTeamId]);

    // Manejar el cambio del equipo seleccionado (guardar solo el ID)
    const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedTeamId(selectedId);  // Actualiza el ID del equipo seleccionado
    };

    function EnviarForm(){
        console.log("¡Botón clicado!"  , plantillaSelect);
        if(plantillaSelect){
            const dataToSend = plantillaSelect.map(item => ({
                dorsal: item.dorsal,
                typeParticipant:"jugador",
                participants: item.participants.id,
                tournaments: IdTorneo, //modificar al nuevo
                teams:item.teams.id
            }));
            console.log("¡newdata!"  ,dataToSend);

            //cambiar a dinamica la direeccion.
            fetch('http://localhost:4000/api/v1/Rosters', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSend),
              })
                .then(response => response.json())
                .then(data => {
                  console.log('Success:', data);
                    setShowSuccess(true); // Mostrar el mensaje de éxito si la solicitud fue exitosa
                    setTimeout(() => {
                    setShowSuccess(false);
                    }, 3000);
                })
                .catch(error => {
                  console.error('Error:', error);
                });

        }
    
        

    }

    return (
        <div>

            <h3>Selecciona un equipo:</h3>
            <select onChange={handleTeamChange} value={selectedTeamId || ""}>
                <option value="">-- Selecciona un equipo --</option>
                {teams.map((team) => (
                    <option key={team.id} value={team.teams.id}>  {/* Usamos el ID del equipo */}
                        {team.teams.name}  {/* Mostramos el nombre del equipo */}
                    </option>
                ))}
            </select>

            {selectedTeamId && (
                <div>
                    <p>Equipo seleccionado: {selectedTeamId}</p>
                </div>
            )}
                        <button onClick={EnviarForm}>Registrar plantilla pasada</button>
                        {showSuccess && <SuccessMessage message="¡Creado con éxito!" />}

        </div>

    );
}

export default NewPlantillas;



