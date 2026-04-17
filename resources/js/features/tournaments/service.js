import { TOURNAMENT_STATUS_TYPES } from '../constants';
import {fetchTournaments} from './tournamentApi'


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