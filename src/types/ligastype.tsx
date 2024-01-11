import { Jugadorestype } from "./jugadores";

export default interface Ligatype{

    id: number;
    name: string;
    date_foundation: string;
    logo: string;
    createdAt: string;
    updatedAt: string;
    participants: Jugadorestype
//mejorar el tipado de name
}