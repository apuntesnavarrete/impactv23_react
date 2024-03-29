import { Jugadorestype } from "./jugadores";
import { TorneoType } from "./torneotype";

export interface EquiposType {
    id: number;
    name: string;
    logo: string | null;
    participants: Jugadorestype | null;
}

export interface EquiposByTournamentType {
    id: number;
    teams: EquiposType;
    tournaments: TorneoType
    participants: Jugadorestype | null;
}