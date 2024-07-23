export interface TypeGoleador {
    id: number;
    goles: number;
    equipo: string;
    equipoLogo:string | null;
    asistencias: number;

}

export interface TypeGoleadorArray extends TypeGoleador{
    nombre: string;
}

export interface TypeGoleadorDetallado {
    id: number;
    nombre: string;
    goles: number;
    partidos: number;
    promedio: number;
  }