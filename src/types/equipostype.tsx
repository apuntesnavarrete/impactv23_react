import { Jugadorestype } from "./jugadores";

export interface EquiposType {
    id: number;
    name: string;
    logo: string | null;
    participants: Jugadorestype | null;
}