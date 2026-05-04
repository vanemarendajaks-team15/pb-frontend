import { api } from '../../config/axios';

const REGISTER_SUCCESS_STATUSES = new Set([200, 201]);

export const fetchTournaments = async (status) => {
    try {
        const response = await api.get('/v1/tournaments', { params: { status }});

        if (response.status !== 200) {
            throw new Error(`Failed to fetch ${status} tournaments: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching tournaments', error);

        return [];
    }
};

export const registerTournament = async (payload) => {
	try {
		const response = await api.post('/v1/tournament/register', payload);

		if (!REGISTER_SUCCESS_STATUSES.has(response.status)) {
			throw new Error(`Failed to post new tournament: ${response.status}`);
		}

		return true;
	} catch (error) {
		console.error('Error registering tournament', error);

		return [];
	}
};