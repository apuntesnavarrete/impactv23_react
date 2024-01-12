import { EquiposType } from "./equipostype"
import { TorneoType } from "./torneotype"

export interface Plantelestype {

    id: number
    dorsal: number
    typeParticipants: string
    //mejorar tipado
    //tupo de participante debe ser un enum
    tournaments: TorneoType
    participants: TorneoType
    teams: EquiposType

}