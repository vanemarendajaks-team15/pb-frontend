import { PERMISSION_TYPES } from '../models/constants';


class Permission {
    constructor(data) {
        this.type = data.type;
        this.name = data.name ?? null;
        this.tournamentId = data.tournamentId ?? null;
        this.courtId = data.courtId ?? null;
    }

    get isGeneral() {
        return this.type === PERMISSION_TYPES.GENERAL;
    }

    get isTournament() {
        return this.type === PERMISSION_TYPES.TOURNAMENT;
    }

    get isCourt() {
        return this.type === PERMISSION_TYPES.COURT;
    }
}

export default Permission;

// class TournamentAdmin extends Permission {
//     constructor(data) {
//         super(tournamentId)
//         this.tournamentId = data.tournamentId ?? null;
//     }
// }

// class CourtAdmin extends Permission {
//     constructor(data) {
//         super(tournamentId, courtId)
//         this.tournamentId = data.tournamentId ?? null;
//         this.courtId = data.courtId ?? null;
//     }
// }