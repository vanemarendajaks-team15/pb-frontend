class User {
    constructor(data) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.isAdmin = data.isAdmin;
    }
    
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

export default User;