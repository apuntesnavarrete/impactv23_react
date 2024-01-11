import { CategoriesType } from "./categoriestype";
import Ligatype from "./ligastype";

export interface TorneoType {
    id: number;
    idName: string;
    description: string ;
    date_fundation: string;
    leagues: Ligatype
    categories: CategoriesType
    //recordar parametro opcionales
}