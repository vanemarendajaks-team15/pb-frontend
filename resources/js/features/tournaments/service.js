import { TOURNAMENT_STATUS_TYPES } from '../constants';
import { fetchTournaments } from './tournamentApi'

const REGISTER_SUCCESS_STATUSES = new Set([200, 201]);


export const fetchHomepageTournaments = async () => {
    try {
        const [live, ended] = await Promise.all([
            fetchTournaments(TOURNAMENT_STATUS_TYPES.LIVE),
            fetchTournaments(TOURNAMENT_STATUS_TYPES.ENDED)
        ]);

        return { 
            live: Array.isArray(live) ? live : [], 
            ended: Array.isArray(ended) ? ended : [] 
        };
    } catch (error) {
        console.error(error);

        return { live: [], ended: [] };
    }
};

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
};

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
};