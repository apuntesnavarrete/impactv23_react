import { apiruta } from "../config/apiruta";

export async function getParticipantById(id: number) {
    const response = await fetch(`${apiruta}/api/v1/participants/${id}`);
    const result = await response.json();
    return result[0];
}