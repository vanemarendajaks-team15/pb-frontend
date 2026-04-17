import { api } from "../../config/axios";

export const fetchTournaments = async (status) => {
    try {
        const response = await api.get('/v1/tournaments', { params: { status }});

        if (response.status !== 200) {
            throw new Error(`Failed to fetch ${status} tournaments: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error(error);

        return [];
    }
};