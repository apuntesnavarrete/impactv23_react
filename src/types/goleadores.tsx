export interface TypeGoleador {
    id: number;
    goles: number;
    equipo: string;
    equipoLogo:string;
}

export interface TypeGoleadorArray extends TypeGoleador{
    nombre: string;
}