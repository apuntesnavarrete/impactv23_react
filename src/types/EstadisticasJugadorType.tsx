import { EquiposType } from "./equipostype"
import { Jugadorestype } from "./jugadores"
import { MatchType } from "./partidoType"

export interface EstadisticasJugadorType {

id:number
annotations: number
attendance: boolean
matches: MatchType
participants: Jugadorestype
teams: EquiposType

}