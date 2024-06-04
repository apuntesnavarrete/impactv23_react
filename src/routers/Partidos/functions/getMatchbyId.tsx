import { apiruta } from "../../../config/apiruta";

export async function getMatchById(id: number) {
    const response = await fetch(`${apiruta}/api/v1/matches/${id}`);
    const result = await response.json();
    return result[0];
}