import { useParams } from "react-router-dom";

function PlantelesDelete(){
    const { idPlantel } = useParams();

    if(idPlantel){
        console.log(idPlantel)

    }

return(
    <p>Eliminar</p>
)
}

export default PlantelesDelete