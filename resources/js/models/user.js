import Permission from './permission';

class User {
    constructor(data) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.sex = data.sex;
        this.role = data.role;
        this.permissions = data.permissions ? data.permissions.map(p => new Permission(p)) : [];  // Kõik erinevad admini õigused (permission klassi objektid)
        this.settings = data.settings ?? null;  // pole veel jõudnud läbi arutada, kas üldse vaja
        this._lastLogin = data.lastLogin ?? this.lastLogin(); // pole veel jõudnud läbi arutada, kas üldse vaja
        this.loggedIn = data.loggedIn ?? false;
    }
    
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get isAdmin() {
        return this.permissions.length > 0;
    }

    get hasGeneralAccess() {
        return this.permissions?.some(p => p.isGeneral) ?? false;
    }

    get tournamentPermissions() {
        return this.permissions?.filter(p => p.isTournament) ?? [];
    }

    get courtPermissions() {
        return this.permissions?.filter(p => p.isCourt) ?? [];
    }

    get isLoggedIn() {
        return this.loggedIn;
    }

    get lastLogin() {
        if (this.isLoggedIn) {
            return this._lastLogin ? new Date(this._lastLogin).toLocaleDateString() : new Date().toLocaleDateString();
        } else {
            return 'Last login unknown'
        }
    }
}

export default User;