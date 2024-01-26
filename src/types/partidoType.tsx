import { EquiposType } from "./equipostype";
import { TorneoType } from "./torneotype";

export interface MatchType {
    id: number;
    matchday: number;
    date: string;
    localgoals: number;
    pointsLocal: number;
    visitangoals: number;
    pointsVisitan: number;
    tournaments: TorneoType;
    teamHome: EquiposType;
    teamAway: EquiposType;
  }