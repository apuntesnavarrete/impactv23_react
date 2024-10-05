export interface TablageneralType {
    logo: string;
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
    porcentual : number;
}