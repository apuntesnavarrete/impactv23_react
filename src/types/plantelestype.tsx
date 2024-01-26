import { EquiposType } from "./equipostype"
import { Jugadorestype } from "./jugadores"
import { TorneoType } from "./torneotype"

export interface Plantelestype {

    id: number
    dorsal: number
    typeParticipant: string
    //mejorar tipado
    //tupo de participante debe ser un enum
    tournaments: TorneoType
    participants: Jugadorestype
    teams: EquiposType

}