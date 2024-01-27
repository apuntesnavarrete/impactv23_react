import { EquiposType } from "./equipostype";
import { Jugadorestype } from "./jugadores";
import { MatchType } from "./partidoType";

// Interfaz base
export interface EstadisticasJugadorBase {
  id: number;
  annotations: number;
  attendance: boolean;
  matches: MatchType;
}

// Primera interfaz extiende la interfaz base
export interface EstadisticasJugadorType extends EstadisticasJugadorBase {
  participants: Jugadorestype;
  teams: EquiposType;
}

// Segunda interfaz extiende la interfaz base
export interface EstadisticasJugadorTypeNuevo extends EstadisticasJugadorBase {
  participants: {
    player1: {
      id: number;
      name: string;
      birthDate: string;
      createdAt: string;
      annotations: number;
      attendance: boolean;
    };
    player2: {
      id: number;
      name: string;
      birthDate: string;
      createdAt: string;
      annotations: number;
      attendance: boolean;
    };
  };
  teams: EquiposType;
}