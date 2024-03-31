export interface TablageneralType {
    equipoId: number;
    equipo: string;
    puntos: number;
    goles: number;
    golesRecibidos: number;
    partidosJugados: number;
    partidosGanados: number;
    partidosPerdidos: number;
    partidosEmpatados: number;
    partidosPerdidosDesempate: number; 
    partidosGanadosDesempate: number; 
}

export interface TablageneralGlobalType extends TablageneralType {
    equipoId: number;
    equipo: string;
    puntos: number;
    goles: number;
    golesRecibidos: number;
    partidosJugados: number;
    partidosGanados: number;
    partidosPerdidos: number;
    partidosEmpatados: number;
    partidosPerdidosDesempate: number; 
    partidosGanadosDesempate: number; 
    porcentual : number;
}