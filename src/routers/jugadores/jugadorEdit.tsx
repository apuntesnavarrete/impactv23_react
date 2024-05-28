import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getParticipantById } from '../Partidos/functions/getParticipantById';


function JugadoresEdit(){
    const { id} = useParams();
    let idAsNumber: number;

    if (id !== undefined) {
        idAsNumber = parseInt(id, 10);
    } else {
        // Handle the case where id is undefined, such as setting a default value or throwing an error
    }

    useEffect(() => {
        async function fetchParticipantsData() {
            const participantsById = await getParticipantById(idAsNumber);
            console.log(participantsById)
        }

        fetchParticipantsData();
    }, []); // Empty dependency array to ensure useEffect runs only once after initial render




return(
    <p>eDIT jugadores</p>
)
}

export default JugadoresEdit