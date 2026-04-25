import { api } from '../../config/axios';

const REGISTER_SUCCESS_STATUSES = new Set([200, 201]);

/**
 * @param {string} baseUrl
 * @param {string} posterReference
 */
function buildR2PutUrl(baseUrl, posterReference) {
	const base = String(baseUrl).replace(/\/+$/, '');
	const key = String(posterReference).replace(/^\/+/, '');

	if (!key) {
		throw new Error('Invalid poster reference');
	}

	for (const segment of key.split('/')) {
		if (segment === '' || segment === '.' || segment === '..') {
			throw new Error('Invalid poster reference');
		}
	}

	const encodedKey = key
		.split('/')
		.map((segment) => encodeURIComponent(segment))
		.join('/');

	return `${base}/${encodedKey}`;
}

/**
 * @param {string} posterReference
 * @param {File} file
 */
export async function uploadPosterToR2(posterReference, file) {
	const baseUrl = import.meta.env.VITE_R2_WORKER_URL;

	if (!baseUrl || !String(baseUrl).trim()) {
		throw new Error('VITE_R2_WORKER_URL is not configured');
	}

	const url = buildR2PutUrl(baseUrl, posterReference);
	console.log('Builded url:', url);
	const response = await fetch(url, {
		method: 'PUT',
		body: file,
		headers: {
			'Content-Type': file.type || 'application/octet-stream',
		},
	});

	if (!REGISTER_SUCCESS_STATUSES.has(response.status)) {
		const text = await response.text().catch(() => '');
		const suffix = text ? ` ${text}` : '';

		throw new Error(`Poster upload failed: ${response.status}${suffix}`);
	}
}

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

export const registerTournament = async (payload, posterFile) => {
	try {
		console.log(payload);
		const response = await api.post('/v1/tournament/register', { payload });

		if (!REGISTER_SUCCESS_STATUSES.has(response.status)) {
			throw new Error(`Failed to post new tournament: ${response.status}`);
		}

		if (posterFile && payload.posterReference) {
			await uploadPosterToR2(payload.posterReference, posterFile);
		}

		return response.data;
	} catch (error) {
		console.error('Error registering tournament', error);

		return [];
	}
};