import { apiruta } from "../config/apiruta";

export async function getAllParticipants() {
    const response = await fetch(`${apiruta}/api/v1/participants`);
    const result = await response.json();
    return result;
}