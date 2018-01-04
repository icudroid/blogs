export class Author {
    public id?: any;
    public login?: string;
    constructor(
        id?: any,
        login?: string,
    ) {
        this.id = id ? id : null;
        this.login = login ? login : null;
    }
}
