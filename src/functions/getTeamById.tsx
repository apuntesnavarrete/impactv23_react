import { apiruta } from "../config/apiruta";

export async function getTeamsById(id: number) {
    const response = await fetch(`${apiruta}/api/v1/teams/${id}`);
    const result = await response.json();
    return result[0];
}